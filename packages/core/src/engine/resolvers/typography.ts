/**
 * Typography Property Resolvers
 * Handles font, text, and typography properties
 */

import type { StyleContext } from "../context";
import { resolveToken } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveLength, resolveColor } from "./length";

// Typography prop keys
type TypographyKey =
  // Font
  | "fontFamily" | "font"
  | "fontSize" | "text"
  | "fontWeight" | "weight"
  | "fontStyle" | "italic"
  | "lineHeight" | "leading"
  | "letterSpacing" | "tracking"
  // Text
  | "textAlign" | "align"
  | "textDecoration" | "decoration"
  | "textDecorationColor" | "decorationColor"
  | "textDecorationStyle" | "decorationStyle"
  | "textDecorationThickness" | "decorationThickness"
  | "textUnderlineOffset" | "underlineOffset"
  | "textTransform" | "transform"
  | "textOverflow" | "overflow"
  | "textIndent" | "indent"
  | "textShadow"
  // Whitespace & wrapping
  | "whiteSpace" | "whitespace"
  | "wordBreak" | "wordWrap" | "overflowWrap"
  | "hyphens"
  // Truncate shortcut
  | "truncate" | "lineClamp";

/**
 * Resolve typography properties
 */
export function resolveTypographyProps(
  props: Partial<Record<TypographyKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  const result: CSSDeclarations = {};

  // Font family
  const fontFamily = props.fontFamily ?? props.font;
  if (fontFamily !== undefined) result.fontFamily = String(fontFamily);

  // Font size
  const fontSize = props.fontSize ?? props.text;
  if (fontSize !== undefined) {
    result.fontSize = resolveLength(fontSize as any, ctx) ?? String(fontSize);
  }

  // Font weight
  const fontWeight = props.fontWeight ?? props.weight;
  if (fontWeight !== undefined) {
    result.fontWeight = String(fontWeight);
  }

  // Font style / italic
  if (props.fontStyle !== undefined) result.fontStyle = String(props.fontStyle);
  if (props.italic === true) result.fontStyle = "italic";
  if (props.italic === false) result.fontStyle = "normal";

  // Line height
  const lineHeight = props.lineHeight ?? props.leading;
  if (lineHeight !== undefined) {
    result.lineHeight = String(lineHeight);
  }

  // Letter spacing
  const letterSpacing = props.letterSpacing ?? props.tracking;
  if (letterSpacing !== undefined) {
    result.letterSpacing = resolveLength(letterSpacing as any, ctx) ?? String(letterSpacing);
  }

  // Text align
  const textAlign = props.textAlign ?? props.align;
  if (textAlign !== undefined) result.textAlign = String(textAlign);

  // Text decoration
  const textDecoration = props.textDecoration ?? props.decoration;
  if (textDecoration !== undefined) result.textDecoration = String(textDecoration);
  
  const decorationColor = props.textDecorationColor ?? props.decorationColor;
  if (decorationColor !== undefined) {
    result.textDecorationColor = resolveColor(String(decorationColor), ctx) ?? String(decorationColor);
  }

  const decorationStyle = props.textDecorationStyle ?? props.decorationStyle;
  if (decorationStyle !== undefined) result.textDecorationStyle = String(decorationStyle);

  const decorationThickness = props.textDecorationThickness ?? props.decorationThickness;
  if (decorationThickness !== undefined) {
    result.textDecorationThickness = resolveLength(decorationThickness as any, ctx) ?? String(decorationThickness);
  }

  const underlineOffset = props.textUnderlineOffset ?? props.underlineOffset;
  if (underlineOffset !== undefined) {
    result.textUnderlineOffset = resolveLength(underlineOffset as any, ctx) ?? String(underlineOffset);
  }

  // Text transform
  const textTransform = props.textTransform ?? props.transform;
  if (textTransform !== undefined) result.textTransform = String(textTransform);

  // Text overflow
  const textOverflow = props.textOverflow ?? props.overflow;
  if (textOverflow !== undefined) result.textOverflow = String(textOverflow);

  // Text indent
  const textIndent = props.textIndent ?? props.indent;
  if (textIndent !== undefined) {
    result.textIndent = resolveLength(textIndent as any, ctx) ?? String(textIndent);
  }

  // Text shadow
  if (props.textShadow !== undefined) result.textShadow = String(props.textShadow);

  // Whitespace
  const whiteSpace = props.whiteSpace ?? props.whitespace;
  if (whiteSpace !== undefined) result.whiteSpace = String(whiteSpace);

  // Word break/wrap
  if (props.wordBreak !== undefined) result.wordBreak = String(props.wordBreak);
  if (props.wordWrap !== undefined) result.wordWrap = String(props.wordWrap);
  if (props.overflowWrap !== undefined) result.overflowWrap = String(props.overflowWrap);
  if (props.hyphens !== undefined) result.hyphens = String(props.hyphens);

  // Truncate shortcut
  if (props.truncate === true) {
    result.overflow = "hidden";
    result.textOverflow = "ellipsis";
    result.whiteSpace = "nowrap";
  }

  // Line clamp
  if (props.lineClamp !== undefined) {
    result.overflow = "hidden";
    result.display = "-webkit-box";
    (result as any)["-webkit-line-clamp"] = String(props.lineClamp);
    (result as any)["-webkit-box-orient"] = "vertical";
  }

  return result;
}

/**
 * Extract typography props from a props object
 */
const typographyKeys: TypographyKey[] = [
  "fontFamily", "font",
  "fontSize", "text",
  "fontWeight", "weight",
  "fontStyle", "italic",
  "lineHeight", "leading",
  "letterSpacing", "tracking",
  "textAlign", "align",
  "textDecoration", "decoration",
  "textDecorationColor", "decorationColor",
  "textDecorationStyle", "decorationStyle",
  "textDecorationThickness", "decorationThickness",
  "textUnderlineOffset", "underlineOffset",
  "textTransform", "transform",
  "textOverflow", "overflow",
  "textIndent", "indent",
  "textShadow",
  "whiteSpace", "whitespace",
  "wordBreak", "wordWrap", "overflowWrap",
  "hyphens",
  "truncate", "lineClamp",
];

export function extractTypographyProps<T extends Record<string, unknown>>(
  props: T
): { typography: Partial<Record<TypographyKey, unknown>>; rest: Omit<T, TypographyKey> } {
  const typography: Partial<Record<TypographyKey, unknown>> = {};
  const rest = { ...props };

  for (const key of typographyKeys) {
    if (key in props) {
      typography[key] = props[key];
      delete (rest as Record<string, unknown>)[key];
    }
  }

  return { typography, rest: rest as Omit<T, TypographyKey> };
}
