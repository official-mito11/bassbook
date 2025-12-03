/**
 * Flex Props
 * Flexbox container and child properties
 */

import type { Length } from "./length";

// Flex direction values
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

// Flex wrap values
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

// Justify content values
export type JustifyContent = 
  | "flex-start" | "flex-end" | "center" 
  | "space-between" | "space-around" | "space-evenly"
  | "start" | "end";

// Align items values
export type AlignItems = 
  | "flex-start" | "flex-end" | "center" 
  | "baseline" | "stretch" | "start" | "end";

// Flex container props
export interface FlexContainerProps {
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: string;
  placeContent?: string;
  placeItems?: string;
  // Boolean aliases
  flexRow?: boolean;
  flexColumn?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  alignCenter?: boolean;
}

// Flex child props
export interface FlexChildProps {
  flex?: number | string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: Length | "auto";
  alignSelf?: string;
  order?: number;
  // Aliases
  grow?: number;
  shrink?: number;
  basis?: Length | "auto";
}

export interface FlexProps extends FlexContainerProps, FlexChildProps {}