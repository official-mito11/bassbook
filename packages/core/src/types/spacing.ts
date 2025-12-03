/**
 * Spacing Props
 * Padding, margin, and gap properties
 */

import type { Length } from "./length";

export interface PaddingProps {
  padding?: Length;
  paddingTop?: Length;
  paddingRight?: Length;
  paddingBottom?: Length;
  paddingLeft?: Length;
  // Logical properties
  paddingBlock?: Length;
  paddingInline?: Length;
  // Aliases
  p?: Length;
  pt?: Length;
  pr?: Length;
  pb?: Length;
  pl?: Length;
  px?: Length;
  py?: Length;
}

export interface MarginProps {
  margin?: Length;
  marginTop?: Length;
  marginRight?: Length;
  marginBottom?: Length;
  marginLeft?: Length;
  // Logical properties
  marginBlock?: Length;
  marginInline?: Length;
  // Aliases
  m?: Length;
  mt?: Length;
  mr?: Length;
  mb?: Length;
  ml?: Length;
  mx?: Length;
  my?: Length;
}

export interface GapProps {
  gap?: Length;
  rowGap?: Length;
  columnGap?: Length;
  // Aliases
  g?: Length;
  gx?: Length;
  gy?: Length;
}

export interface SpacingProps extends PaddingProps, MarginProps, GapProps {}
