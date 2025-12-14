/**
 * Property Resolvers Index
 * Exports all resolvers and provides unified resolution
 */

export * from "./base";
export * from "./length";
export * from "./spacing";
export * from "./sizing";
export * from "./flex";
export * from "./border";
export * from "./background";
export * from "./typography";
export * from "./layout";

import type { StyleContext } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveSpacing, spacingKeys } from "./spacing";
import { resolveSizingProps, sizingKeys } from "./sizing";
import { resolveFlexProps, flexKeys } from "./flex";
import { resolveBorderProps, borderKeys } from "./border";
import { resolveVisualProps, visualKeys } from "./background";
import { resolveTypographyProps, typographyKeys } from "./typography";
import { resolveLayoutProps, layoutKeys } from "./layout";

const spacingKeySet = new Set<string>(spacingKeys);
const sizingKeySet = new Set<string>(sizingKeys);
const flexKeySet = new Set<string>(flexKeys);
const borderKeySet = new Set<string>(borderKeys);
const visualKeySet = new Set<string>(visualKeys);
const typographyKeySet = new Set<string>(typographyKeys);
const layoutKeySet = new Set<string>(layoutKeys);

/**
 * Resolve all style properties to CSS declarations
 */
export function resolveAllProps(
  props: Record<string, unknown>,
  ctx: StyleContext
): CSSDeclarations {
  const spacingProps: Record<string, unknown> = {};
  const sizingProps: Record<string, unknown> = {};
  const flexProps: Record<string, unknown> = {};
  const borderProps: Record<string, unknown> = {};
  const visualProps: Record<string, unknown> = {};
  const typographyProps: Record<string, unknown> = {};
  const layoutProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;

    if (spacingKeySet.has(key)) spacingProps[key] = value;
    if (sizingKeySet.has(key)) sizingProps[key] = value;
    if (flexKeySet.has(key)) flexProps[key] = value;
    if (borderKeySet.has(key)) borderProps[key] = value;
    if (visualKeySet.has(key)) visualProps[key] = value;
    if (typographyKeySet.has(key)) typographyProps[key] = value;
    if (layoutKeySet.has(key)) layoutProps[key] = value;
  }

  return {
    ...resolveSpacing(spacingProps, ctx),
    ...resolveSizingProps(sizingProps, ctx),
    ...resolveFlexProps(flexProps, ctx),
    ...resolveBorderProps(borderProps, ctx),
    ...resolveVisualProps(visualProps, ctx),
    ...resolveTypographyProps(typographyProps, ctx),
    ...resolveLayoutProps(layoutProps, ctx),
  };
}
