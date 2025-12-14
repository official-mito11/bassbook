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
  | "bt" | "br" | "bb" | "bl"
  | "borderX" | "borderY"
  // Border width
  | "borderWidth" | "borderTopWidth" | "borderRightWidth" | "borderBottomWidth" | "borderLeftWidth"
  | "btWidth" | "brWidth" | "bbWidth" | "blWidth"
  // Border color
  | "borderColor" | "borderTopColor" | "borderRightColor" | "borderBottomColor" | "borderLeftColor"
  | "btColor" | "brColor" | "bbColor" | "blColor"
  // Border style
  | "borderStyle" | "borderTopStyle" | "borderRightStyle" | "borderBottomStyle" | "borderLeftStyle"
  // Border radius
  | "borderRadius" | "rounded" | "r"
  | "borderTopLeftRadius" | "borderTopRightRadius" | "borderBottomLeftRadius" | "borderBottomRightRadius"
  | "roundedTl" | "roundedTr" | "roundedBl" | "roundedBr"
  | "rtl" | "rtr" | "rbl" | "rbr"
  | "roundedTop" | "roundedBottom" | "roundedLeft" | "roundedRight"
  | "rt" | "rb" | "rl" | "rr"
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
  const borderTop = props.borderTop ?? props.bt;
  if (borderTop !== undefined) result.borderTop = String(borderTop);
  const borderRight = props.borderRight ?? props.br;
  if (borderRight !== undefined) result.borderRight = String(borderRight);
  const borderBottom = props.borderBottom ?? props.bb;
  if (borderBottom !== undefined) result.borderBottom = String(borderBottom);
  const borderLeft = props.borderLeft ?? props.bl;
  if (borderLeft !== undefined) result.borderLeft = String(borderLeft);
  
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
  const borderTopWidth = props.borderTopWidth ?? props.btWidth;
  if (borderTopWidth !== undefined) {
    result.borderTopWidth = resolveLength(borderTopWidth as any, ctx) ?? String(borderTopWidth);
  }
  const borderRightWidth = props.borderRightWidth ?? props.brWidth;
  if (borderRightWidth !== undefined) {
    result.borderRightWidth = resolveLength(borderRightWidth as any, ctx) ?? String(borderRightWidth);
  }
  const borderBottomWidth = props.borderBottomWidth ?? props.bbWidth;
  if (borderBottomWidth !== undefined) {
    result.borderBottomWidth = resolveLength(borderBottomWidth as any, ctx) ?? String(borderBottomWidth);
  }
  const borderLeftWidth = props.borderLeftWidth ?? props.blWidth;
  if (borderLeftWidth !== undefined) {
    result.borderLeftWidth = resolveLength(borderLeftWidth as any, ctx) ?? String(borderLeftWidth);
  }

  // Border color
  if (props.borderColor !== undefined) {
    result.borderColor = resolveColor(String(props.borderColor), ctx) ?? String(props.borderColor);
  }
  const borderTopColor = props.borderTopColor ?? props.btColor;
  if (borderTopColor !== undefined) {
    result.borderTopColor = resolveColor(String(borderTopColor), ctx) ?? String(borderTopColor);
  }
  const borderRightColor = props.borderRightColor ?? props.brColor;
  if (borderRightColor !== undefined) {
    result.borderRightColor = resolveColor(String(borderRightColor), ctx) ?? String(borderRightColor);
  }
  const borderBottomColor = props.borderBottomColor ?? props.bbColor;
  if (borderBottomColor !== undefined) {
    result.borderBottomColor = resolveColor(String(borderBottomColor), ctx) ?? String(borderBottomColor);
  }
  const borderLeftColor = props.borderLeftColor ?? props.blColor;
  if (borderLeftColor !== undefined) {
    result.borderLeftColor = resolveColor(String(borderLeftColor), ctx) ?? String(borderLeftColor);
  }

  // Border style
  if (props.borderStyle !== undefined) result.borderStyle = String(props.borderStyle);
  if (props.borderTopStyle !== undefined) result.borderTopStyle = String(props.borderTopStyle);
  if (props.borderRightStyle !== undefined) result.borderRightStyle = String(props.borderRightStyle);
  if (props.borderBottomStyle !== undefined) result.borderBottomStyle = String(props.borderBottomStyle);
  if (props.borderLeftStyle !== undefined) result.borderLeftStyle = String(props.borderLeftStyle);

  // Border radius
  const radiusValue = props.borderRadius ?? props.rounded ?? props.r;
  if (radiusValue !== undefined) {
    result.borderRadius = resolveRadius(radiusValue as any, ctx) ?? String(radiusValue);
  }

  // Individual corner radius
  if (props.borderTopLeftRadius !== undefined || props.roundedTl !== undefined || props.rtl !== undefined) {
    const val = props.borderTopLeftRadius ?? props.roundedTl ?? props.rtl;
    result.borderTopLeftRadius = resolveRadius(val as any, ctx) ?? String(val);
  }
  if (props.borderTopRightRadius !== undefined || props.roundedTr !== undefined || props.rtr !== undefined) {
    const val = props.borderTopRightRadius ?? props.roundedTr ?? props.rtr;
    result.borderTopRightRadius = resolveRadius(val as any, ctx) ?? String(val);
  }
  if (props.borderBottomLeftRadius !== undefined || props.roundedBl !== undefined || props.rbl !== undefined) {
    const val = props.borderBottomLeftRadius ?? props.roundedBl ?? props.rbl;
    result.borderBottomLeftRadius = resolveRadius(val as any, ctx) ?? String(val);
  }
  if (props.borderBottomRightRadius !== undefined || props.roundedBr !== undefined || props.rbr !== undefined) {
    const val = props.borderBottomRightRadius ?? props.roundedBr ?? props.rbr;
    result.borderBottomRightRadius = resolveRadius(val as any, ctx) ?? String(val);
  }

  // Rounded top/bottom/left/right
  if (props.roundedTop !== undefined || props.rt !== undefined) {
    const v = props.roundedTop ?? props.rt;
    const val = resolveRadius(v as any, ctx) ?? String(v);
    result.borderTopLeftRadius = val;
    result.borderTopRightRadius = val;
  }
  if (props.roundedBottom !== undefined || props.rb !== undefined) {
    const v = props.roundedBottom ?? props.rb;
    const val = resolveRadius(v as any, ctx) ?? String(v);
    result.borderBottomLeftRadius = val;
    result.borderBottomRightRadius = val;
  }
  if (props.roundedLeft !== undefined || props.rl !== undefined) {
    const v = props.roundedLeft ?? props.rl;
    const val = resolveRadius(v as any, ctx) ?? String(v);
    result.borderTopLeftRadius = val;
    result.borderBottomLeftRadius = val;
  }
  if (props.roundedRight !== undefined || props.rr !== undefined) {
    const v = props.roundedRight ?? props.rr;
    const val = resolveRadius(v as any, ctx) ?? String(v);
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
  "bt", "br", "bb", "bl",
  "borderX", "borderY",
  "borderWidth", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth",
  "btWidth", "brWidth", "bbWidth", "blWidth",
  "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor",
  "btColor", "brColor", "bbColor", "blColor",
  "borderStyle", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle",
  "borderRadius", "rounded", "r",
  "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
  "roundedTl", "roundedTr", "roundedBl", "roundedBr",
  "rtl", "rtr", "rbl", "rbr",
  "roundedTop", "roundedBottom", "roundedLeft", "roundedRight",
  "rt", "rb", "rl", "rr",
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
