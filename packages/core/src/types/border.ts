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
  borderWidth?: Length;
  borderColor?: string;
  borderStyle?: BorderStyle;
  borderRadius?: Length;
  // Aliases
  rounded?: Length;
}

export interface OutlineProps {
  outline?: string;
  outlineWidth?: Length;
  outlineColor?: string;
  outlineStyle?: BorderStyle;
  outlineOffset?: Length;
}