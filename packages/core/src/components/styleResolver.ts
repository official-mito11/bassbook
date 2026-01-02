import type { StyleProps } from "../types";
import type { AnyComponentSpec, SlotStyles } from "./spec";

type UnknownProps = Record<string, unknown>;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function mergePartStyles(target: Record<string, Partial<StyleProps>>, incoming?: SlotStyles): void {
  if (!incoming) return;
  for (const [part, styles] of Object.entries(incoming)) {
    const prev = target[part] ?? {};
    target[part] = { ...prev, ...(styles ?? {}) };
  }
}

function coerceVariantSelection(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return undefined;
}

export function getVariantKeys(spec: { styles?: unknown }): string[] {
  const styles = spec.styles as Record<string, unknown> | undefined;
  if (!styles || !isObject(styles)) return [];
  const variants = styles["variants"] as Record<string, unknown> | undefined;
  if (!variants || !isObject(variants)) return [];
  return Object.keys(variants);
}

export function resolvePartStyles(
  spec: Pick<AnyComponentSpec, "styles" | "dataProps">,
  props: UnknownProps,
  userStyleProps: Partial<StyleProps>
): Record<string, Partial<StyleProps>> {
  const result: Record<string, Partial<StyleProps>> = {};

  const styles = spec.styles as Record<string, unknown> | undefined;
  if (!styles || !isObject(styles)) {
    if (Object.keys(userStyleProps).length > 0) {
      result["root"] = { ...(result["root"] ?? {}), ...userStyleProps };
    }
    return result;
  }

  mergePartStyles(result, styles["base"] as SlotStyles | undefined);

  const variants = styles["variants"] as Record<string, Record<string, SlotStyles>> | undefined;
  const defaultVariants = styles["defaultVariants"] as Record<string, string> | undefined;

  if (variants && isObject(variants)) {
    for (const [variantKey, variantMap] of Object.entries(variants)) {
      const selected = coerceVariantSelection(props[variantKey] ?? defaultVariants?.[variantKey]);
      if (!selected) continue;
      const slotStyles = (variantMap as Record<string, SlotStyles>)[selected];
      if (!slotStyles) continue;
      mergePartStyles(result, slotStyles);
    }
  }

  const compoundVariants = styles["compoundVariants"] as
    | Array<{ conditions: Record<string, string>; styles: SlotStyles }>
    | undefined;

  if (compoundVariants) {
    for (const compound of compoundVariants) {
      const matches = Object.entries(compound.conditions).every(([key, value]) => {
        const actual = (props[key] ?? defaultVariants?.[key]) as unknown;
        return actual === value;
      });
      if (!matches) continue;
      mergePartStyles(result, compound.styles);
    }
  }

  if (Object.keys(userStyleProps).length > 0) {
    result["root"] = { ...(result["root"] ?? {}), ...userStyleProps };
  }

  return result;
}
