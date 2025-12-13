/**
 * Background Props
 * Background and color properties
 */

export interface BackgroundProps {
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string | number;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundAttachment?: string;
  backgroundClip?: string;
  backgroundOrigin?: string;
  backgroundBlendMode?: string;
  // Aliases
  bg?: string;
  bgColor?: string;
  bgImage?: string;
  bgSize?: string | number;
  bgPosition?: string;
  bgRepeat?: string;
  bgAttachment?: string;
  bgClip?: string;
  bgOrigin?: string;
  bgBlend?: string;
  bgGradient?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

export interface ColorProps {
  color?: string;
  textColor?: string;
  opacity?: number | string;
  // SVG
  fill?: string;
  stroke?: string;
}