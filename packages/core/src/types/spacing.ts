import type { Length } from "./length";

export type PaddingProps = {
  padding?: Length;
  paddingTop?: Length;
  paddingRight?: Length;
  paddingBottom?: Length;
  paddingLeft?: Length;
  paddingVertical?: Length;
  paddingHorizontal?: Length;

  // aliases
  p?: Length;
  pt?: Length;
  pr?: Length;
  pb?: Length;
  pl?: Length;
  pv?: Length;
  ph?: Length;
}

export type MarginProps = {
  margin?: Length;
  marginTop?: Length;
  marginRight?: Length;
  marginBottom?: Length;
  marginLeft?: Length;
  marginVertical?: Length;
  marginHorizontal?: Length;

  // aliases
  m?: Length;
  mt?: Length;
  mr?: Length;
  mb?: Length;
  ml?: Length;
  mv?: Length;
  mh?: Length;
}

export type GapProps = {
  gap?: Length;
  gapVertical?: Length;
  gapHorizontal?: Length;

  // aliases
  g?: Length;
  gv?: Length;
  gh?: Length;
}

export type SpacingProps = PaddingProps & MarginProps & GapProps;
