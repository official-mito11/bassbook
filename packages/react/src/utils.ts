import type * as React from "react";
import type { StyleProps } from "@bassbook/core";
import { getVariantKeys as coreGetVariantKeys, resolvePartStyles as coreResolvePartStyles } from "@bassbook/core";
import type { PartStyleMap, UnknownProps } from "./types";

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const SVG_ATTRIBUTES = new Set([
  "viewBox",
  "strokeWidth",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeMiterlimit",
  "fillRule",
  "clipRule",
  "fillOpacity",
  "strokeOpacity",
  "vectorEffect",
  "shapeRendering",
  "pathLength",
]);

export function filterDomProps(domProps: UnknownProps, keysToRemove: readonly string[]): UnknownProps {
  if (keysToRemove.length === 0) return domProps;
  const next: UnknownProps = { ...domProps };
  for (const key of keysToRemove) {
    // SVG 속성은 보존
    if (SVG_ATTRIBUTES.has(key)) continue;
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
  return coreGetVariantKeys(spec);
}

export function resolvePartStyles(
  spec: { styles?: unknown; dataProps?: readonly string[] },
  props: UnknownProps,
  userStyleProps: Partial<StyleProps>
): PartStyleMap {
  return coreResolvePartStyles(spec as Parameters<typeof coreResolvePartStyles>[0], props, userStyleProps);
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
