/**
 * Unified Style Props
 * Combines all style property interfaces
 */

// Re-export individual prop types
export type { SpacingProps, PaddingProps, MarginProps, GapProps } from "./spacing";
export type { SizingProps, SizeValue, BoxSizingValue } from "./sizing";
export type { FlexProps, FlexContainerProps, FlexChildProps, FlexDirection, FlexWrap, JustifyContent, AlignItems } from "./flex";
export type { BorderProps, OutlineProps, BorderStyle } from "./border";
export type { BackgroundProps, ColorProps } from "./background";
export type { TypographyProps, FontProps, TextProps, TextAlign, TextTransform, WhiteSpace, WordBreak } from "./font";
export type { LayoutProps, DisplayProps, PositionProps, OverflowProps, TransformProps, TransitionProps, InteractionProps, EffectProps, Display, Position, Overflow, Visibility } from "./layout";

// Import for composition
import type { SpacingProps } from "./spacing";
import type { SizingProps } from "./sizing";
import type { FlexProps } from "./flex";
import type { BorderProps, OutlineProps } from "./border";
import type { BackgroundProps, ColorProps } from "./background";
import type { TypographyProps } from "./font";
import type { LayoutProps } from "./layout";

/**
 * Combined style props interface
 * All CSS properties with shorthand aliases
 */
export interface StyleProps extends 
  SpacingProps, 
  SizingProps, 
  FlexProps, 
  BorderProps,
  OutlineProps,
  BackgroundProps, 
  ColorProps, 
  TypographyProps, 
  LayoutProps {}

/**
 * Extract style props from component props
 */
export type ExtractStyleProps<T> = Pick<T, keyof T & keyof StyleProps>;

/**
 * Omit style props from component props
 */
export type OmitStyleProps<T> = Omit<T, keyof StyleProps>;
