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

// Build unified key lookup map for O(1) classification
const keyCategoryMap = new Map<string, "spacing" | "sizing" | "flex" | "border" | "visual" | "typography" | "layout">();

function buildKeyMap(): Map<string, "spacing" | "sizing" | "flex" | "border" | "visual" | "typography" | "layout"> {
  if (keyCategoryMap.size > 0) return keyCategoryMap;

  for (const key of spacingKeys) keyCategoryMap.set(key, "spacing");
  for (const key of sizingKeys) keyCategoryMap.set(key, "sizing");
  for (const key of flexKeys) keyCategoryMap.set(key, "flex");
  for (const key of borderKeys) keyCategoryMap.set(key, "border");
  for (const key of visualKeys) keyCategoryMap.set(key, "visual");
  for (const key of typographyKeys) keyCategoryMap.set(key, "typography");
  for (const key of layoutKeys) keyCategoryMap.set(key, "layout");

  return keyCategoryMap;
}

// Initialize key map once at module load
buildKeyMap();

/**
 * Resolve all style properties to CSS declarations
 * Optimized with single-pass key classification using unified lookup map
 */
export function resolveAllProps(props: Record<string, unknown>, ctx: StyleContext): CSSDeclarations {
  const spacingProps: Record<string, unknown> = {};
  const sizingProps: Record<string, unknown> = {};
  const flexProps: Record<string, unknown> = {};
  const borderProps: Record<string, unknown> = {};
  const visualProps: Record<string, unknown> = {};
  const typographyProps: Record<string, unknown> = {};
  const layoutProps: Record<string, unknown> = {};
  const unknownProps: CSSDeclarations = {};

  // Single pass: classify and collect each property
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;

    const category = keyCategoryMap.get(key);
    if (category === "spacing") spacingProps[key] = value;
    else if (category === "sizing") sizingProps[key] = value;
    else if (category === "flex") flexProps[key] = value;
    else if (category === "border") borderProps[key] = value;
    else if (category === "visual") visualProps[key] = value;
    else if (category === "typography") typographyProps[key] = value;
    else if (category === "layout") layoutProps[key] = value;
    else {
      // Pass through unknown props (CSS variables, custom CSS properties)
      (unknownProps as Record<string, string>)[key] = String(value);
    }
  }

  return {
    ...resolveSpacing(spacingProps, ctx),
    ...resolveSizingProps(sizingProps, ctx),
    ...resolveFlexProps(flexProps, ctx),
    ...resolveBorderProps(borderProps, ctx),
    ...resolveVisualProps(visualProps, ctx),
    ...resolveTypographyProps(typographyProps, ctx),
    ...resolveLayoutProps(layoutProps, ctx),
    ...unknownProps,
  };
}
