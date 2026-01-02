import type * as React from "react";
import type { StyleProps, SlotStyles } from "@bassbook/core";
import type { PartStyleMap, UnknownProps } from "./types";

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function mergePartStyles(target: PartStyleMap, incoming?: SlotStyles): void {
  if (!incoming) return;
  for (const [part, styles] of Object.entries(incoming)) {
    const prev = target[part] ?? {};
    target[part] = { ...prev, ...(styles ?? {}) };
  }
}

export function coerceVariantSelection(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return undefined;
}

export function filterDomProps(domProps: UnknownProps, keysToRemove: readonly string[]): UnknownProps {
  if (keysToRemove.length === 0) return domProps;
  const next: UnknownProps = { ...domProps };
  for (const key of keysToRemove) {
    if (key in next) delete next[key];
  }
  return next;
}

export function extractClassName(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export function extractStyle(value: unknown): React.CSSProperties | undefined {
  if (!isObject(value)) return undefined;
  return value as React.CSSProperties;
}

export function mergeReactStyles(
  base: React.CSSProperties | undefined,
  next: React.CSSProperties | undefined
): React.CSSProperties | undefined {
  if (!base && !next) return undefined;
  return { ...(base ?? {}), ...(next ?? {}) };
}

export function mergeRefs(...refs: unknown[]) {
  return (value: unknown) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        (ref as (val: unknown) => void)(value);
        continue;
      }
      if (typeof ref === "object" && ref !== null && "current" in (ref as object)) {
        (ref as { current: unknown }).current = value;
      }
    }
  };
}

export function getVariantKeys(spec: { styles?: unknown }): string[] {
  const styles = spec.styles as Record<string, unknown> | undefined;
  if (!styles || !isObject(styles)) return [];
  const variants = styles["variants"] as Record<string, unknown> | undefined;
  if (!variants || !isObject(variants)) return [];
  return Object.keys(variants);
}

export function resolvePartStyles(
  spec: { styles?: unknown; dataProps?: readonly string[] },
  props: UnknownProps,
  userStyleProps: Partial<StyleProps>
): PartStyleMap {
  const result: PartStyleMap = {};

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

export function normalizeSlots<T extends Record<string, unknown>>(
  slots: T | undefined,
  children: unknown
): T & { children?: unknown } {
  const base = { ...(slots ?? {}) } as T & { children?: unknown };
  if (children !== undefined) {
    return { ...base, children };
  }
  return base;
}
