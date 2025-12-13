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
  font?: string;
  fontSize?: Length;
  text?: Length;
  fontWeight?: number | string;
  weight?: number | string;
  fontStyle?: string;
  italic?: boolean;
  lineHeight?: number | string;
  leading?: number | string;
  letterSpacing?: Length;
  tracking?: Length;
}

export interface TextProps {
  textAlign?: TextAlign;
  textDecoration?: string;
  decoration?: string;
  textDecorationColor?: string;
  decorationColor?: string;
  textDecorationStyle?: string;
  decorationStyle?: string;
  textDecorationThickness?: Length;
  decorationThickness?: Length;
  textUnderlineOffset?: Length;
  underlineOffset?: Length;
  textTransform?: TextTransform;
  textOverflow?: "ellipsis" | "clip";
  textIndent?: Length;
  indent?: Length;
  textShadow?: string;
  whiteSpace?: WhiteSpace;
  whitespace?: WhiteSpace;
  wordBreak?: WordBreak;
  wordWrap?: string;
  overflowWrap?: "normal" | "break-word" | "anywhere";
  hyphens?: string;
}

export interface TypographyProps extends FontProps, TextProps {
  // Utility
  truncate?: boolean;
  lineClamp?: number;
}