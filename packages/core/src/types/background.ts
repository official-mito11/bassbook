/**
 * Background Props
 * Background and color properties
 */

export interface BackgroundProps {
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundAttachment?: string;
  backgroundClip?: string;
  backgroundOrigin?: string;
  // Aliases
  bg?: string;
  bgColor?: string;
}

export interface ColorProps {
  color?: string;
  opacity?: number | string;
  // SVG
  fill?: string;
  stroke?: string;
}