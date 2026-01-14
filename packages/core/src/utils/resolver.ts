/**
 * Legacy Resolver Functions
 * @deprecated Use the engine module instead
 */

import type { StyleProps } from "../types";
import type { Properties } from "csstype";
import { css, inlineStyle, cssString } from "../engine";

/**
 * Resolve props to CSS class string
 * @deprecated Use `css()` from engine instead
 */
export function resolveCSS(props: StyleProps): string {
  return css(props as Record<string, unknown>).className;
}

/**
 * Resolve props to inline style object
 * @deprecated Use `inlineStyle()` from engine instead
 */
export function resolveStyle(props: StyleProps): Properties {
  return inlineStyle(props as Record<string, unknown>);
}

/**
 * Resolve props to raw CSS string
 * @deprecated Use `cssString()` from engine instead
 */
export function resolveCSSString(props: StyleProps, selector?: string): string {
  return cssString(props as Record<string, unknown>, selector);
}
