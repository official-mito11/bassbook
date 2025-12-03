/**
 * Typography Props
 * Font and text properties
 */

import type { Length } from "./length";

// Text align values
export type TextAlign = "left" | "center" | "right" | "justify" | "start" | "end";

// Text transform values
export type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

// White space values
export type WhiteSpace = "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "break-spaces";

// Word break values
export type WordBreak = "normal" | "break-all" | "keep-all" | "break-word";

export interface FontProps {
  fontFamily?: string;
  fontSize?: Length;
  fontWeight?: number | string;
  fontStyle?: string;
  lineHeight?: number | string;
  letterSpacing?: Length;
}

export interface TextProps {
  textAlign?: TextAlign;
  textDecoration?: string;
  textTransform?: TextTransform;
  textOverflow?: "ellipsis" | "clip";
  textIndent?: Length;
  textShadow?: string;
  whiteSpace?: WhiteSpace;
  wordBreak?: WordBreak;
  overflowWrap?: "normal" | "break-word" | "anywhere";
  // Aliases
  align?: TextAlign;
}

export interface TypographyProps extends FontProps, TextProps {
  // Utility
  truncate?: boolean;
  lineClamp?: number;
}