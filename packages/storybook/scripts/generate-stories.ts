import * as fs from "node:fs";
import * as path from "node:path";
import * as core from "@bassbook/core";
import type {
  AnyComponentSpec,
  BindingsMap,
  NodeSpec,
  SlotNodeSpec,
  VariantStyleConfig,
} from "@bassbook/core";

const OUT_DIR = path.resolve(import.meta.dir, "../src/stories/auto");

function isComponentSpec(value: unknown): value is AnyComponentSpec {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v["layer"] === "core" || v["layer"] === "unit" || v["layer"] === "part") &&
    typeof v["name"] === "string" &&
    typeof v["tree"] === "object" &&
    v["tree"] !== null
  );
}

function toStoryTitle(spec: AnyComponentSpec): string {
  const prefix = spec.layer === "core" ? "Core" : spec.layer === "unit" ? "Unit" : "Part";
  return `${prefix}/${spec.name}`;
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]/g, "-");
}

function traverseNode(node: NodeSpec, visit: (n: NodeSpec) => void): void {
  visit(node);
  if (node.kind === "element" || node.kind === "component") {
    const children = node.children ?? [];
    for (const c of children) traverseNode(c as NodeSpec, visit);
  }
}

function hasSlot(tree: AnyComponentSpec["tree"], slotName: string): boolean {
  let found = false;
  traverseNode(tree as unknown as NodeSpec, (n) => {
    if (n.kind === "slot") {
      const s = n as SlotNodeSpec;
      if (s.slot === slotName) found = true;
    }
  });
  return found;
}

function getVariantOptions(styles: AnyComponentSpec["styles"]): Record<string, string[]> {
  const cfg = styles as VariantStyleConfig | undefined;
  const variants = cfg?.variants;
  if (!variants) return {};

  const result: Record<string, string[]> = {};
  for (const [k, map] of Object.entries(variants)) {
    result[k] = Object.keys(map);
  }
  return result;
}

function getDefaultVariants(styles: AnyComponentSpec["styles"]): Record<string, string> {
  const cfg = styles as VariantStyleConfig | undefined;
  return (cfg?.defaultVariants ?? {}) as Record<string, string>;
}

function getBehaviorBindings(spec: AnyComponentSpec): BindingsMap | undefined {
  if (spec.layer === "core") return undefined;
  return spec.behavior?.bindings;
}

function writeFileEnsured(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function generateRegistryFile(): void {
  const registryFile = path.join(OUT_DIR, "_registry.ts");
  const content = `import { createComponentRegistry } from "@bassbook/core";\nimport type { AnyComponentSpec } from "@bassbook/core";\nimport * as core from "@bassbook/core";\n\nfunction isComponentSpec(value: unknown): value is AnyComponentSpec {\n  if (typeof value !== "object" || value === null) return false;\n  const v = value as Record<string, unknown>;\n  return (\n    (v.layer === "core" || v.layer === "unit" || v.layer === "part") &&\n    typeof v.name === "string" &&\n    typeof v.tree === "object" &&\n    v.tree !== null\n  );\n}\n\nexport const registry = createComponentRegistry();\nregistry.registerAll((Object.values(core) as unknown[]).filter(isComponentSpec));\n`;
  writeFileEnsured(registryFile, content);
}

function generateStoryFile(spec: AnyComponentSpec): void {
  const fileName = `${sanitizeFilename(spec.name)}.stories.tsx`;
  const outPath = path.join(OUT_DIR, fileName);

  const title = toStoryTitle(spec);
  const variantOptions = getVariantOptions(spec.styles);
  const defaultVariants = getDefaultVariants(spec.styles);
  const hasChildren = hasSlot(spec.tree, "children");

  const argTypesLines = Object.entries(variantOptions)
    .map(([k, opts]) => {
      if (opts.length === 2 && opts.includes("true") && opts.includes("false")) {
        return `    ${JSON.stringify(k)}: { control: "boolean" },`;
      }
      return `    ${JSON.stringify(k)}: { control: "select", options: ${JSON.stringify(opts)} },`;
    })
    .join("\n");

  const argsLines = Object.entries(defaultVariants)
    .map(([k, v]) => {
      if (v === "true" || v === "false") return `    ${JSON.stringify(k)}: ${v},`;
      return `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`;
    })
    .join("\n");

  const extraArgs = hasChildren ? `\n    children: "${spec.name}",` : "";

  const bindings = getBehaviorBindings(spec);
  const bindingsNote = bindings ? JSON.stringify(bindings, null, 2) : "";

  const content = `import * as React from "react";\n\nimport { createReactComponent } from "@bassbook/react";\nimport { registry } from "./_registry";\n\nconst Component = createReactComponent(${JSON.stringify(
    spec.name
  )}, { registry });\n\nexport default {\n  title: ${JSON.stringify(title)},\n  component: Component,\n  args: {\n${argsLines}${extraArgs}\n  },\n  argTypes: {\n${argTypesLines}\n  },\n};\n\nexport function Playground(args: any) {\n  return React.createElement(\n    "div",\n    { style: { padding: 24, display: "grid", gap: 12 } },\n    React.createElement(Component as any, args as any),\n    ${bindings ? `React.createElement(\n      "pre",\n      { style: { fontSize: 12, background: "#0b1020", color: "#e2e8f0", padding: 12, borderRadius: 8, overflow: "auto" } },\n      ${JSON.stringify(bindingsNote)}\n    )` : "null"}\n  );\n}\n`;

  writeFileEnsured(outPath, content);
}

function main(): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  generateRegistryFile();

  const specs = (Object.values(core) as unknown[]).filter(isComponentSpec);
  for (const spec of specs) {
    generateStoryFile(spec);
  }
}

main();
