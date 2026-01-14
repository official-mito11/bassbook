import type {
  AnyComponentSpec,
  BaseStyleConfig,
  ComponentLayer,
  CoreComponentSpec,
  NodeSpec,
  PartComponentSpec,
  RootNodeSpec,
  SlotStyles,
  UnitComponentSpec,
  VariantStyleConfig,
} from "./spec";

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface SpecResolver {
  get(name: string): AnyComponentSpec | undefined;
}

function issue(issues: ValidationIssue[], path: string, message: string): void {
  issues.push({ path, message });
}

function collectParts(node: NodeSpec, parts: Set<string>): void {
  if (node.kind === "element") {
    parts.add(node.part);
    if (node.children) {
      for (const child of node.children) collectParts(child as NodeSpec, parts);
    }
    return;
  }

  if (node.kind === "component") {
    parts.add(node.part);
    if (node.children) {
      for (const child of node.children) collectParts(child as NodeSpec, parts);
    }
    return;
  }
}

function validateSlotStyles(
  styles: SlotStyles | undefined,
  parts: Set<string>,
  issues: ValidationIssue[],
  basePath: string
): void {
  if (!styles) return;
  for (const partName of Object.keys(styles)) {
    if (!parts.has(partName)) {
      issue(issues, `${basePath}.${partName}`, `Unknown part '${partName}'`);
    }
  }
}

function validateBaseStyles(
  styles: BaseStyleConfig | undefined,
  parts: Set<string>,
  issues: ValidationIssue[],
  basePath: string
): void {
  if (!styles) return;
  validateSlotStyles(styles.base, parts, issues, `${basePath}.base`);
}

function validateVariantStyles(
  styles: VariantStyleConfig | undefined,
  parts: Set<string>,
  issues: ValidationIssue[],
  basePath: string
): void {
  if (!styles) return;

  validateSlotStyles(styles.base, parts, issues, `${basePath}.base`);

  const variants = styles.variants;
  if (variants) {
    for (const [variantName, variantValues] of Object.entries(variants)) {
      for (const [valueName, slotStyles] of Object.entries(variantValues)) {
        validateSlotStyles(slotStyles, parts, issues, `${basePath}.variants.${variantName}.${valueName}`);
      }
    }
  }

  if (styles.defaultVariants) {
    for (const [variantName, valueName] of Object.entries(styles.defaultVariants)) {
      const valueKey = String(valueName);
      if (!variants || !(variantName in variants)) {
        issue(issues, `${basePath}.defaultVariants.${variantName}`, `Unknown variant '${variantName}'`);
        continue;
      }

      const values = variants[variantName];
      if (!values) {
        issue(issues, `${basePath}.defaultVariants.${variantName}`, `Unknown variant '${variantName}'`);
        continue;
      }

      if (!(valueKey in values)) {
        issue(
          issues,
          `${basePath}.defaultVariants.${variantName}`,
          `Unknown variant value '${variantName}.${valueKey}'`
        );
      }
    }
  }

  if (styles.compoundVariants) {
    for (let i = 0; i < styles.compoundVariants.length; i++) {
      const compound = styles.compoundVariants[i];
      const compoundPath = `${basePath}.compoundVariants[${i}]`;

      if (!compound) {
        issue(issues, compoundPath, "Missing compound variant");
        continue;
      }

      for (const [variantName, valueName] of Object.entries(compound.conditions)) {
        const valueKey = String(valueName);
        if (!variants || !(variantName in variants)) {
          issue(issues, `${compoundPath}.conditions.${variantName}`, `Unknown variant '${variantName}'`);
          continue;
        }

        const values = variants[variantName];
        if (!values) {
          issue(issues, `${compoundPath}.conditions.${variantName}`, `Unknown variant '${variantName}'`);
          continue;
        }

        if (!(valueKey in values)) {
          issue(
            issues,
            `${compoundPath}.conditions.${variantName}`,
            `Unknown variant value '${variantName}.${valueKey}'`
          );
        }
      }

      validateSlotStyles(compound.styles, parts, issues, `${compoundPath}.styles`);
    }
  }
}

function validateNode(
  node: NodeSpec,
  parentLayer: ComponentLayer,
  parentName: string,
  issues: ValidationIssue[],
  resolver: SpecResolver | undefined,
  path: string
): void {
  if (node.kind === "element") {
    if (parentLayer === "unit") {
      issue(issues, path, `Unit components cannot include element nodes ('${node.tag}')`);
    }

    if (parentLayer === "part") {
      issue(issues, path, `Part components cannot include element nodes ('${node.tag}')`);
    }
  }

  if (node.kind === "component") {
    if (parentLayer === "core") {
      issue(issues, path, `Core components cannot include component nodes ('${node.component}')`);
    }

    if (node.component === parentName) {
      issue(issues, path, `Component cannot reference itself ('${node.component}')`);
    }

    if (resolver) {
      const target = resolver.get(node.component);
      if (!target) {
        issue(issues, path, `Unknown component reference '${node.component}'`);
      } else if (parentLayer === "unit" && target.layer !== "core") {
        issue(
          issues,
          path,
          `Unit components can only reference core components (got '${node.component}' layer '${target.layer}')`
        );
      } else if (parentLayer === "part" && target.layer === "part") {
        issue(
          issues,
          path,
          `Part components cannot reference part components (got '${node.component}' layer '${target.layer}')`
        );
      }
    }
  }

  if (node.kind === "element" || node.kind === "component") {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        validateNode(node.children[i] as NodeSpec, parentLayer, parentName, issues, resolver, `${path}.children[${i}]`);
      }
    }
  }
}

function validateDataProps(spec: AnyComponentSpec, issues: ValidationIssue[], basePath: string): void {
  if (!spec.dataProps) return;

  for (let i = 0; i < spec.dataProps.length; i++) {
    const key = spec.dataProps[i];
    if (!key || typeof key !== "string") {
      issue(issues, `${basePath}.dataProps[${i}]`, "Invalid data prop key");
    }
  }
}

export function validateComponentSpec(spec: AnyComponentSpec, resolver?: SpecResolver): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!spec.name) issue(issues, "name", "Missing component name");

  const root = spec.tree as RootNodeSpec;
  const parts = new Set<string>();
  collectParts(root as unknown as NodeSpec, parts);

  validateDataProps(spec, issues, "spec");

  if (spec.layer === "core") {
    validateBaseStyles((spec as CoreComponentSpec).styles, parts, issues, "spec.styles");
  } else if (spec.layer === "unit") {
    validateVariantStyles((spec as UnitComponentSpec).styles, parts, issues, "spec.styles");
  } else {
    validateVariantStyles((spec as PartComponentSpec).styles, parts, issues, "spec.styles");
  }

  validateNode(root as unknown as NodeSpec, spec.layer, spec.name, issues, resolver, "spec.tree");

  return { valid: issues.length === 0, issues };
}

export function validateComponentSpecs(specs: AnyComponentSpec[], resolver?: SpecResolver): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    if (!spec) continue;
    const result = validateComponentSpec(spec, resolver);
    for (const item of result.issues) {
      issues.push({ path: `[${i}].${item.path}`, message: item.message });
    }
  }

  return { valid: issues.length === 0, issues };
}
