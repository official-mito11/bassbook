/**
 * Sizing Property Resolvers
 * Handles width, height, min/max sizing properties
 */

import type { StyleContext } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveSizing } from "./length";

// Sizing prop keys
type SizingKey =
  | "width"
  | "height"
  | "minWidth"
  | "minHeight"
  | "maxWidth"
  | "maxHeight"
  | "w"
  | "h"
  | "minW"
  | "minH"
  | "maxW"
  | "maxH"
  | "aspectRatio"
  | "ratio"
  | "boxSizing"
  | "box";

// Mapping from prop keys to CSS properties
const sizingMap: Record<SizingKey, keyof CSSDeclarations> = {
  width: "width",
  height: "height",
  minWidth: "minWidth",
  minHeight: "minHeight",
  maxWidth: "maxWidth",
  maxHeight: "maxHeight",
  w: "width",
  h: "height",
  minW: "minWidth",
  minH: "minHeight",
  maxW: "maxWidth",
  maxH: "maxHeight",
  aspectRatio: "aspectRatio",
  ratio: "aspectRatio",
  boxSizing: "boxSizing",
  box: "boxSizing",
};

export const sizingKeys = Object.keys(sizingMap) as SizingKey[];

// Box sizing aliases
const boxSizingAliases: Record<string, string> = {
  border: "border-box",
  content: "content-box",
};

/**
 * Resolve sizing properties
 */
export function resolveSizingProps(props: Partial<Record<SizingKey, unknown>>, ctx: StyleContext): CSSDeclarations {
  const result: CSSDeclarations = {};

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;

    const cssProp = sizingMap[key as SizingKey];
    if (!cssProp) continue;

    let resolved: string | undefined;

    if (key === "boxSizing" || key === "box") {
      // Handle box-sizing aliases
      resolved = boxSizingAliases[value as string] ?? (value as string);
    } else if (key === "aspectRatio" || key === "ratio") {
      // Aspect ratio is passed through
      resolved = String(value);
    } else {
      // Size values
      resolved = resolveSizing(value as string | number, ctx);
    }

    if (resolved !== undefined) {
      result[cssProp] = resolved;
    }
  }

  return result;
}

/**
 * Extract sizing props from a props object
 */
export function extractSizingProps<T extends Record<string, unknown>>(
  props: T
): { sizing: Partial<Record<SizingKey, unknown>>; rest: Omit<T, SizingKey> } {
  const sizing: Partial<Record<SizingKey, unknown>> = {};
  const rest = { ...props };

  for (const key of Object.keys(sizingMap) as SizingKey[]) {
    if (key in props) {
      sizing[key] = props[key];
      delete (rest as Record<string, unknown>)[key];
    }
  }

  return { sizing, rest: rest as Omit<T, SizingKey> };
}
