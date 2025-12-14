/**
 * Layout Props
 * Display, position, overflow, and transform properties
 */

import type { Length } from "./length";

// Display values
export type Display = 
  | "block" | "inline" | "inline-block" 
  | "flex" | "inline-flex" 
  | "grid" | "inline-grid"
  | "flow-root" | "contents" | "none";

// Position values
export type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";

// Overflow values
export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";

// Visibility values
export type Visibility = "visible" | "hidden" | "collapse";

export interface DisplayProps {
  display?: Display | string;
  visibility?: Visibility | string;
  // Aliases
  d?: Display | string;
  visible?: boolean;
  invisible?: boolean;
  hidden?: boolean;
}

export interface PositionProps {
  position?: Position;
  top?: Length;
  right?: Length;
  bottom?: Length;
  left?: Length;
  inset?: Length;
  insetX?: Length;
  insetY?: Length;
  zIndex?: number | string;
  // Aliases
  static?: boolean;
  relative?: boolean;
  absolute?: boolean;
  fixed?: boolean;
  sticky?: boolean;
  z?: number | string;
}

export interface OverflowProps {
  overflow?: Overflow;
  overflowX?: Overflow;
  overflowY?: Overflow;
  // Aliases
  overflowVisible?: boolean;
  overflowHidden?: boolean;
  overflowClip?: boolean;
  overflowScroll?: boolean;
  overflowAuto?: boolean;
}

export interface TransformProps {
  transform?: string;
  transformOrigin?: string;
  scale?: number | string;
  scaleX?: number | string;
  scaleY?: number | string;
  rotate?: number | string;
  skewX?: number | string;
  skewY?: number | string;
  translateX?: Length;
  translateY?: Length;
}

export interface TransitionProps {
  transition?: string;
  transitionProperty?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
}

export interface InteractionProps {
  cursor?: string;
  pointerEvents?: "auto" | "none";
  userSelect?: "none" | "text" | "all" | "auto";
  // Aliases
  select?: "none" | "text" | "all" | "auto";
  selectNone?: boolean;
  selectText?: boolean;
  selectAll?: boolean;
  pointerNone?: boolean;
}

export interface ObjectProps {
  objectFit?: string;
  objectPosition?: string;
  // Aliases
  objectFitCover?: boolean;
  objectFitContain?: boolean;
  objectFitNone?: boolean;
  objectFitScale?: boolean;
}

export interface FloatProps {
  float?: string;
  clear?: string;
}

export interface IsolationProps {
  isolation?: string;
}

export interface EffectProps {
  boxShadow?: string;
  // Aliases
  shadow?: string;
}

export interface AnimationProps {
  animation?: string;
  animationName?: string;
  animationDuration?: string;
  animationTimingFunction?: string;
  animationDelay?: string;
  animationIterationCount?: number | string;
  animationDirection?: string;
  animationFillMode?: string;
  animationPlayState?: string;
}

export interface LayoutProps extends 
  DisplayProps, 
  PositionProps, 
  OverflowProps, 
  TransformProps, 
  TransitionProps,
  InteractionProps,
  ObjectProps,
  FloatProps,
  IsolationProps,
  AnimationProps,
  EffectProps {}
