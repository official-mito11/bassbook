import type { GlobalValue } from "./value";
import type { Length } from "./length";

export type BoxSizing = 
  "border-box" | 
  "content-box" | 
  // aliases
  "border" | 
  "content" | 
  GlobalValue;

export type SizeLength = 
  "auto" | 
  "fit-content" | 
  "max-content" | 
  "min-content" | 
  // aliases
  "fit" | 
  "max" | 
  "min" | 
  Length;

export type SizingProps = {
  width?: SizeLength;
  height?: SizeLength;
  minWidth?: SizeLength;
  minHeight?: SizeLength;
  maxWidth?: SizeLength;
  maxHeight?: SizeLength;
  aspectRatio?: string & GlobalValue;
  boxSizing?: BoxSizing;

  // aliases
  w?: SizeLength;
  h?: SizeLength;
  minW?: SizeLength;
  minH?: SizeLength;
  maxW?: SizeLength;
  maxH?: SizeLength;
  ratio?: string & GlobalValue;
  box?: BoxSizing;
}