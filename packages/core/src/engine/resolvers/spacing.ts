/**
 * Spacing Property Resolvers
 * Handles padding, margin, gap properties
 * - number → px
 * - string → as-is (standard CSS values)
 */

import type { StyleContext } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveLength } from "./length";

// Spacing prop keys (aligned with types/spacing.ts)
type SpacingKey =
  // Padding
  | "padding"
  | "paddingTop"
  | "paddingRight"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingBlock"
  | "paddingInline"
  | "p"
  | "pt"
  | "pr"
  | "pb"
  | "pl"
  | "px"
  | "py"
  // Margin
  | "margin"
  | "marginTop"
  | "marginRight"
  | "marginBottom"
  | "marginLeft"
  | "marginBlock"
  | "marginInline"
  | "m"
  | "mt"
  | "mr"
  | "mb"
  | "ml"
  | "mx"
  | "my"
  // Gap
  | "gap"
  | "rowGap"
  | "columnGap"
  | "g"
  | "gx"
  | "gy";

// Mapping from prop keys to CSS properties
const spacingMap: Record<SpacingKey, (keyof CSSDeclarations)[]> = {
  // Padding
  padding: ["padding"],
  paddingTop: ["paddingTop"],
  paddingRight: ["paddingRight"],
  paddingBottom: ["paddingBottom"],
  paddingLeft: ["paddingLeft"],
  paddingBlock: ["paddingBlock"],
  paddingInline: ["paddingInline"],
  p: ["padding"],
  pt: ["paddingTop"],
  pr: ["paddingRight"],
  pb: ["paddingBottom"],
  pl: ["paddingLeft"],
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
  // Margin
  margin: ["margin"],
  marginTop: ["marginTop"],
  marginRight: ["marginRight"],
  marginBottom: ["marginBottom"],
  marginLeft: ["marginLeft"],
  marginBlock: ["marginBlock"],
  marginInline: ["marginInline"],
  m: ["margin"],
  mt: ["marginTop"],
  mr: ["marginRight"],
  mb: ["marginBottom"],
  ml: ["marginLeft"],
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
  // Gap
  gap: ["gap"],
  rowGap: ["rowGap"],
  columnGap: ["columnGap"],
  g: ["gap"],
  gx: ["columnGap"],
  gy: ["rowGap"],
};

export const spacingKeys = Object.keys(spacingMap) as SpacingKey[];

/**
 * Resolve spacing properties
 */
export function resolveSpacing(props: Partial<Record<SpacingKey, unknown>>, ctx: StyleContext): CSSDeclarations {
  const result: CSSDeclarations = {};

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;

    const cssProps = spacingMap[key as SpacingKey];
    if (!cssProps) continue;

    const resolved = resolveLength(value as any, ctx);
    if (resolved === undefined) continue;

    for (const cssProp of cssProps) {
      result[cssProp] = resolved;
    }
  }

  return result;
}

/**
 * Extract spacing props from a props object
 */
export function extractSpacingProps<T extends Record<string, unknown>>(
  props: T
): { spacing: Partial<Record<SpacingKey, unknown>>; rest: Omit<T, SpacingKey> } {
  const spacing: Partial<Record<SpacingKey, unknown>> = {};
  const rest = { ...props };

  for (const key of Object.keys(spacingMap) as SpacingKey[]) {
    if (key in props) {
      spacing[key] = props[key];
      delete (rest as Record<string, unknown>)[key];
    }
  }

  return { spacing, rest: rest as Omit<T, SpacingKey> };
}
