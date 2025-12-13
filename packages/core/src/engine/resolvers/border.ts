/**
 * Border Property Resolvers
 * Handles border, outline, and related properties
 */

import type { StyleContext } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveLength, resolveColor, resolveRadius } from "./length";

// Border prop keys
type BorderKey =
  // Border shorthand
  | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft"
  | "borderX" | "borderY"
  // Border width
  | "borderWidth" | "borderTopWidth" | "borderRightWidth" | "borderBottomWidth" | "borderLeftWidth"
  // Border color
  | "borderColor" | "borderTopColor" | "borderRightColor" | "borderBottomColor" | "borderLeftColor"
  // Border style
  | "borderStyle" | "borderTopStyle" | "borderRightStyle" | "borderBottomStyle" | "borderLeftStyle"
  // Border radius
  | "borderRadius" | "rounded"
  | "borderTopLeftRadius" | "borderTopRightRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius"
  | "roundedTl" | "roundedTr" | "roundedBl" | "roundedBr"
  | "roundedTop" | "roundedBottom" | "roundedLeft" | "roundedRight"
  // Outline
  | "outline" | "outlineWidth" | "outlineColor" | "outlineStyle" | "outlineOffset"
  // Ring (Tailwind-like)
  | "ring" | "ringColor" | "ringWidth" | "ringOffset" | "ringOffsetColor";

/**
 * Resolve border properties
 */
export function resolveBorderProps(
  props: Partial<Record<BorderKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  const result: CSSDeclarations = {};

  // Border shorthand
  if (props.border !== undefined) result.border = String(props.border);
  if (props.borderTop !== undefined) result.borderTop = String(props.borderTop);
  if (props.borderRight !== undefined) result.borderRight = String(props.borderRight);
  if (props.borderBottom !== undefined) result.borderBottom = String(props.borderBottom);
  if (props.borderLeft !== undefined) result.borderLeft = String(props.borderLeft);
  
  // Border X/Y
  if (props.borderX !== undefined) {
    const val = String(props.borderX);
    result.borderLeft = val;
    result.borderRight = val;
  }
  if (props.borderY !== undefined) {
    const val = String(props.borderY);
    result.borderTop = val;
    result.borderBottom = val;
  }

  // Border width
  if (props.borderWidth !== undefined) {
    result.borderWidth = resolveLength(props.borderWidth as any, ctx) ?? String(props.borderWidth);
  }
  if (props.borderTopWidth !== undefined) {
    result.borderTopWidth = resolveLength(props.borderTopWidth as any, ctx) ?? String(props.borderTopWidth);
  }
  if (props.borderRightWidth !== undefined) {
    result.borderRightWidth = resolveLength(props.borderRightWidth as any, ctx) ?? String(props.borderRightWidth);
  }
  if (props.borderBottomWidth !== undefined) {
    result.borderBottomWidth = resolveLength(props.borderBottomWidth as any, ctx) ?? String(props.borderBottomWidth);
  }
  if (props.borderLeftWidth !== undefined) {
    result.borderLeftWidth = resolveLength(props.borderLeftWidth as any, ctx) ?? String(props.borderLeftWidth);
  }

  // Border color
  if (props.borderColor !== undefined) {
    result.borderColor = resolveColor(String(props.borderColor), ctx) ?? String(props.borderColor);
  }
  if (props.borderTopColor !== undefined) {
    result.borderTopColor = resolveColor(String(props.borderTopColor), ctx) ?? String(props.borderTopColor);
  }
  if (props.borderRightColor !== undefined) {
    result.borderRightColor = resolveColor(String(props.borderRightColor), ctx) ?? String(props.borderRightColor);
  }
  if (props.borderBottomColor !== undefined) {
    result.borderBottomColor = resolveColor(String(props.borderBottomColor), ctx) ?? String(props.borderBottomColor);
  }
  if (props.borderLeftColor !== undefined) {
    result.borderLeftColor = resolveColor(String(props.borderLeftColor), ctx) ?? String(props.borderLeftColor);
  }

  // Border style
  if (props.borderStyle !== undefined) result.borderStyle = String(props.borderStyle);
  if (props.borderTopStyle !== undefined) result.borderTopStyle = String(props.borderTopStyle);
  if (props.borderRightStyle !== undefined) result.borderRightStyle = String(props.borderRightStyle);
  if (props.borderBottomStyle !== undefined) result.borderBottomStyle = String(props.borderBottomStyle);
  if (props.borderLeftStyle !== undefined) result.borderLeftStyle = String(props.borderLeftStyle);

  // Border radius
  const radiusValue = props.borderRadius ?? props.rounded;
  if (radiusValue !== undefined) {
    result.borderRadius = resolveRadius(radiusValue as any, ctx) ?? String(radiusValue);
  }

  // Individual corner radius
  if (props.borderTopLeftRadius !== undefined || props.roundedTl !== undefined) {
    const val = props.borderTopLeftRadius ?? props.roundedTl;
    result.borderTopLeftRadius = resolveRadius(val as any, ctx) ?? String(val);
  }
  if (props.borderTopRightRadius !== undefined || props.roundedTr !== undefined) {
    const val = props.borderTopRightRadius ?? props.roundedTr;
    result.borderTopRightRadius = resolveRadius(val as any, ctx) ?? String(val);
  }
  if (props.borderBottomLeftRadius !== undefined || props.roundedBl !== undefined) {
    const val = props.borderBottomLeftRadius ?? props.roundedBl;
    result.borderBottomLeftRadius = resolveRadius(val as any, ctx) ?? String(val);
  }
  if (props.borderBottomRightRadius !== undefined || props.roundedBr !== undefined) {
    const val = props.borderBottomRightRadius ?? props.roundedBr;
    result.borderBottomRightRadius = resolveRadius(val as any, ctx) ?? String(val);
  }

  // Rounded top/bottom/left/right
  if (props.roundedTop !== undefined) {
    const val = resolveRadius(props.roundedTop as any, ctx) ?? String(props.roundedTop);
    result.borderTopLeftRadius = val;
    result.borderTopRightRadius = val;
  }
  if (props.roundedBottom !== undefined) {
    const val = resolveRadius(props.roundedBottom as any, ctx) ?? String(props.roundedBottom);
    result.borderBottomLeftRadius = val;
    result.borderBottomRightRadius = val;
  }
  if (props.roundedLeft !== undefined) {
    const val = resolveRadius(props.roundedLeft as any, ctx) ?? String(props.roundedLeft);
    result.borderTopLeftRadius = val;
    result.borderBottomLeftRadius = val;
  }
  if (props.roundedRight !== undefined) {
    const val = resolveRadius(props.roundedRight as any, ctx) ?? String(props.roundedRight);
    result.borderTopRightRadius = val;
    result.borderBottomRightRadius = val;
  }

  // Outline
  if (props.outline !== undefined) result.outline = String(props.outline);
  if (props.outlineWidth !== undefined) {
    result.outlineWidth = resolveLength(props.outlineWidth as any, ctx) ?? String(props.outlineWidth);
  }
  if (props.outlineColor !== undefined) {
    result.outlineColor = resolveColor(String(props.outlineColor), ctx) ?? String(props.outlineColor);
  }
  if (props.outlineStyle !== undefined) result.outlineStyle = String(props.outlineStyle);
  if (props.outlineOffset !== undefined) {
    result.outlineOffset = resolveLength(props.outlineOffset as any, ctx) ?? String(props.outlineOffset);
  }

  // Ring (box-shadow based)
  if (props.ring !== undefined || props.ringWidth !== undefined) {
    const width = resolveLength((props.ringWidth ?? props.ring) as any, ctx) ?? "3px";
    const color = props.ringColor 
      ? (resolveColor(String(props.ringColor), ctx) ?? String(props.ringColor))
      : "rgb(59 130 246 / 0.5)";
    const offset = props.ringOffset 
      ? (resolveLength(props.ringOffset as any, ctx) ?? "0px")
      : "0px";
    const offsetColor = props.ringOffsetColor
      ? (resolveColor(String(props.ringOffsetColor), ctx) ?? String(props.ringOffsetColor))
      : "transparent";
    
    result.boxShadow = `0 0 0 ${offset} ${offsetColor}, 0 0 0 calc(${width} + ${offset}) ${color}`;
  }

  return result;
}

/**
 * Extract border props from a props object
 */
export const borderKeys: BorderKey[] = [
  "border", "borderTop", "borderRight", "borderBottom", "borderLeft",
  "borderX", "borderY",
  "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
  "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
  "borderStyle", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle",
  "borderRadius", "rounded",
  "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
  "roundedTl", "roundedTr", "roundedBl", "roundedBr",
  "roundedTop", "roundedBottom", "roundedLeft", "roundedRight",
  "outline", "outlineWidth", "outlineColor", "outlineStyle", "outlineOffset",
  "ring", "ringColor", "ringWidth", "ringOffset", "ringOffsetColor",
];

export function extractBorderProps<T extends Record<string, unknown>>(
  props: T
): { border: Partial<Record<BorderKey, unknown>>; rest: Omit<T, BorderKey> } {
  const border: Partial<Record<BorderKey, unknown>> = {};
  const rest = { ...props };

  for (const key of borderKeys) {
    if (key in props) {
      border[key] = props[key];
      delete (rest as Record<string, unknown>)[key];
    }
  }

  return { border, rest: rest as Omit<T, BorderKey> };
}
