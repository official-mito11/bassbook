/**
 * Border Props
 * Border, outline, and radius properties
 */

import type { Length } from "./length";

// Border style values
export type BorderStyle =
  | "none"
  | "hidden"
  | "dotted"
  | "dashed"
  | "solid"
  | "double"
  | "groove"
  | "ridge"
  | "inset"
  | "outset";

export interface BorderProps {
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderX?: string;
  borderY?: string;
  borderWidth?: Length;
  borderTopWidth?: Length;
  borderRightWidth?: Length;
  borderBottomWidth?: Length;
  borderLeftWidth?: Length;
  borderColor?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
  borderLeftColor?: string;
  borderStyle?: BorderStyle;
  borderTopStyle?: BorderStyle;
  borderRightStyle?: BorderStyle;
  borderBottomStyle?: BorderStyle;
  borderLeftStyle?: BorderStyle;
  borderRadius?: Length;
  borderTopLeftRadius?: Length;
  borderTopRightRadius?: Length;
  borderBottomLeftRadius?: Length;
  borderBottomRightRadius?: Length;
  // SVG stroke width (for icons, SVGs)
  strokeWidth?: Length;
  // Aliases
  bt?: string;
  br?: string;
  bb?: string;
  bl?: string;
  btWidth?: Length;
  brWidth?: Length;
  bbWidth?: Length;
  blWidth?: Length;
  btColor?: Length;
  brColor?: Length;
  bbColor?: Length;
  blColor?: Length;
  rounded?: Length;
  roundedTl?: Length;
  roundedTr?: Length;
  roundedBl?: Length;
  roundedBr?: Length;
  roundedTop?: Length;
  roundedBottom?: Length;
  roundedLeft?: Length;
  roundedRight?: Length;
  r?: Length;
  rt?: Length;
  rb?: Length;
  rl?: Length;
  rr?: Length;
  rtl?: Length;
  rtr?: Length;
  rbl?: Length;
  rbr?: Length;
  // Ring
  ring?: Length;
  ringColor?: string;
  ringWidth?: Length;
  ringOffset?: Length;
  ringOffsetColor?: string;
  // SVG stroke properties
  strokeLinecap?: "butt" | "round" | "square";
  strokeLinejoin?: "miter" | "round" | "bevel";
  strokeDasharray?: string;
  strokeDashoffset?: Length;
}

export interface OutlineProps {
  outline?: string;
  outlineWidth?: Length;
  outlineColor?: string;
  outlineStyle?: BorderStyle;
  outlineOffset?: Length;
}
