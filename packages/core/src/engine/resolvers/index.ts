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
import { resolveSpacing } from "./spacing";
import { resolveSizingProps } from "./sizing";
import { resolveFlexProps } from "./flex";
import { resolveBorderProps } from "./border";
import { resolveVisualProps } from "./background";
import { resolveTypographyProps } from "./typography";
import { resolveLayoutProps } from "./layout";

/**
 * Resolve all style properties to CSS declarations
 */
export function resolveAllProps(
  props: Record<string, unknown>,
  ctx: StyleContext
): CSSDeclarations {
  return {
    ...resolveSpacing(props, ctx),
    ...resolveSizingProps(props, ctx),
    ...resolveFlexProps(props, ctx),
    ...resolveBorderProps(props, ctx),
    ...resolveVisualProps(props, ctx),
    ...resolveTypographyProps(props, ctx),
    ...resolveLayoutProps(props, ctx),
  };
}
