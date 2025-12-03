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
  visibility?: Visibility;
  // Aliases
  d?: Display | string;
  hidden?: boolean;
}

export interface PositionProps {
  position?: Position;
  top?: Length;
  right?: Length;
  bottom?: Length;
  left?: Length;
  inset?: Length;
  zIndex?: number | string;
  // Aliases
  pos?: Position;
  z?: number | string;
}

export interface OverflowProps {
  overflow?: Overflow;
  overflowX?: Overflow;
  overflowY?: Overflow;
}

export interface TransformProps {
  transform?: string;
  transformOrigin?: string;
  scale?: number | string;
  rotate?: number | string;
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
}

export interface EffectProps {
  boxShadow?: string;
  // Aliases
  shadow?: string;
}

export interface LayoutProps extends 
  DisplayProps, 
  PositionProps, 
  OverflowProps, 
  TransformProps, 
  TransitionProps,
  InteractionProps,
  EffectProps {}
