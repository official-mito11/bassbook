/**
 * Sizing Props
 * Width, height, and box-sizing properties
 */

import type { Length, SizingKeyword, FractionKeyword } from "./length";

// Size value: length, keyword, or fraction
export type SizeValue = Length | SizingKeyword | FractionKeyword;

// Box sizing values
export type BoxSizingValue = "border-box" | "content-box" | "border" | "content";

export interface SizingProps {
  width?: SizeValue;
  height?: SizeValue;
  minWidth?: SizeValue;
  minHeight?: SizeValue;
  maxWidth?: SizeValue;
  maxHeight?: SizeValue;
  aspectRatio?: string;
  ratio?: string;
  boxSizing?: BoxSizingValue;
  box?: BoxSizingValue;
  // Aliases
  w?: SizeValue;
  h?: SizeValue;
  minW?: SizeValue;
  minH?: SizeValue;
  maxW?: SizeValue;
  maxH?: SizeValue;
}
