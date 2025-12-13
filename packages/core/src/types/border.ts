/**
 * Border Props
 * Border, outline, and radius properties
 */

import type { Length } from "./length";

// Border style values
export type BorderStyle = 
  | "none" | "hidden" | "dotted" | "dashed" 
  | "solid" | "double" | "groove" | "ridge" 
  | "inset" | "outset";

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
  // Aliases
  rounded?: Length;
  roundedTl?: Length;
  roundedTr?: Length;
  roundedBl?: Length;
  roundedBr?: Length;
  roundedTop?: Length;
  roundedBottom?: Length;
  roundedLeft?: Length;
  roundedRight?: Length;
  // Ring
  ring?: Length;
  ringColor?: string;
  ringWidth?: Length;
  ringOffset?: Length;
  ringOffsetColor?: string;
}

export interface OutlineProps {
  outline?: string;
  outlineWidth?: Length;
  outlineColor?: string;
  outlineStyle?: BorderStyle;
  outlineOffset?: Length;
}