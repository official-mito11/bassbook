import type {
  AnyComponentSpec,
  ComponentNodeSpec,
  ElementNodeSpec,
  NodeSpec,
  RootNodeSpec,
  SlotNodeSpec,
  SlotStyles,
  VariantStyleConfig,
} from "../src/components/spec";
import type { StyleProps } from "../src/types";
import type { ThemeTokens } from "../src/themes/tokens";

import { createSSRCollector } from "../src/engine";
import { createComponentRegistry } from "../src/components/registry";
import { validateComponentSpecs } from "../src/components/validate";

export interface RenderOptions {
  theme?: Partial<ThemeTokens>;
  prefix?: string;
}

export interface RenderResult {
  html: string;
  css: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function attrsToString(attrs: Record<string, unknown> | undefined): string {
  if (!attrs) return "";
  const parts: string[] = [];
  for (const [key, raw] of Object.entries(attrs)) {
    if (raw === undefined || raw === null || raw === false) continue;
    if (raw === true) {
      parts.push(key);
      continue;
    }
    parts.push(`${key}="${escapeHtml(String(raw))}"`);
  }
  return parts.length ? ` ${parts.join(" ")}` : "";
}

function mergeSlotStyles(a: SlotStyles | undefined, b: SlotStyles | undefined): SlotStyles | undefined {
  if (!a && !b) return undefined;
  const result: SlotStyles = { ...(a ?? {}) };
  if (b) {
    for (const [part, styles] of Object.entries(b)) {
      result[part] = { ...(result[part] ?? {}), ...(styles ?? {}) };
    }
  }
  return result;
}

function resolveVariantSlotStyles(
  styles: VariantStyleConfig | undefined,
  props: Record<string, unknown>
): SlotStyles | undefined {
  if (!styles) return undefined;

  let slotStyles: SlotStyles | undefined = styles.base;

  if (styles.variants) {
    for (const [variantName, variantValues] of Object.entries(styles.variants)) {
      const selected = (props[variantName] ?? styles.defaultVariants?.[variantName]) as unknown;
      if (typeof selected !== "string") continue;
      const byValue = variantValues[selected];
      slotStyles = mergeSlotStyles(slotStyles, byValue);
    }
  }

  if (styles.compoundVariants) {
    for (const compound of styles.compoundVariants) {
      const matches = Object.entries(compound.conditions).every(([key, expected]) => {
        const actual = props[key] ?? styles.defaultVariants?.[key];
        return actual === expected;
      });
      if (!matches) continue;
      slotStyles = mergeSlotStyles(slotStyles, compound.styles);
    }
  }

  return slotStyles;
}

function getSpecStyles(spec: AnyComponentSpec, props: Record<string, unknown>): SlotStyles | undefined {
  if (!spec.styles) return undefined;

  if (spec.layer === "core") {
    return spec.styles.base;
  }

  return resolveVariantSlotStyles(spec.styles, props);
}

function getStyleForPart(
  spec: AnyComponentSpec,
  part: string,
  props: Record<string, unknown>
): Partial<StyleProps> | undefined {
  const all = getSpecStyles(spec, props);
  return all?.[part];
}

function nodePropsToRecord(node: ElementNodeSpec | ComponentNodeSpec): Record<string, unknown> {
  return (node.kind === "component" ? node.props : undefined) ?? {};
}

function renderNode(options: {
  node: NodeSpec;
  parentSpec: AnyComponentSpec;
  registry: ReturnType<typeof createComponentRegistry>;
  slotChildren?: string;
  ssr: ReturnType<typeof createSSRCollector>;
}): string {
  const { node, parentSpec, registry, slotChildren, ssr } = options;

  if (node.kind === "slot") {
    return slotChildren ?? "";
  }

  const nodeProps = nodePropsToRecord(node);
  const styleForPart = getStyleForPart(parentSpec, node.part, nodeProps);
  const styleResult = styleForPart ? ssr.css(styleForPart as Record<string, unknown>) : undefined;

  if (node.kind === "element") {
    const childrenHtml = (node.children ?? [])
      .map((child) =>
        renderNode({
          node: child as NodeSpec,
          parentSpec,
          registry,
          slotChildren,
          ssr,
        })
      )
      .join("");

    const classAttr = styleResult?.className ? ` class="${escapeHtml(styleResult.className)}"` : "";
    const attrString = attrsToString(node.attrs);

    return `<${node.tag}${classAttr}${attrString}>${childrenHtml}</${node.tag}>`;
  }

  const target = registry.get(node.component);
  if (!target) {
    throw new Error(`Unknown component reference '${node.component}'`);
  }

  const childrenHtml = (node.children ?? [])
    .map((child) =>
      renderNode({
        node: child as NodeSpec,
        parentSpec,
        registry,
        slotChildren,
        ssr,
      })
    )
    .join("");

  const renderedTarget = renderTree({
    spec: target,
    registry,
    props: nodeProps,
    childrenHtml,
    ssr,
  });

  if (styleResult?.className) {
    return `<div class="${escapeHtml(styleResult.className)}">${renderedTarget}</div>`;
  }

  return renderedTarget;
}

function renderTree(options: {
  spec: AnyComponentSpec;
  registry: ReturnType<typeof createComponentRegistry>;
  props: Record<string, unknown>;
  childrenHtml?: string;
  ssr: ReturnType<typeof createSSRCollector>;
}): string {
  const { spec, registry, props, childrenHtml, ssr } = options;
  const root = spec.tree as RootNodeSpec;

  return renderNode({
    node: root as unknown as NodeSpec,
    parentSpec: spec,
    registry,
    slotChildren: childrenHtml,
    ssr,
  });
}

export function renderFromSpecs(
  specs: AnyComponentSpec[],
  entryComponentName: string,
  props: Record<string, unknown> = {},
  options?: RenderOptions
): RenderResult {
  const registry = createComponentRegistry();
  registry.registerAll(specs);

  const validation = validateComponentSpecs(specs, registry);
  if (!validation.valid) {
    const message = validation.issues.map((i) => `${i.path}: ${i.message}`).join("\n");
    throw new Error(`Invalid component specs:\n${message}`);
  }

  const ssr = createSSRCollector({ theme: options?.theme, prefix: options?.prefix });

  const entry = registry.get(entryComponentName);
  if (!entry) {
    throw new Error(`Entry component not found: ${entryComponentName}`);
  }

  const html = renderTree({ spec: entry, registry, props, ssr });
  const cssText = ssr.getCSS();

  return { html, css: cssText };
}
