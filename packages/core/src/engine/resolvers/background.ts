/**
 * Background Property Resolvers
 * Handles background, color, and visual properties
 */

import type { StyleContext } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveColor, resolveSizing } from "./length";

// Background prop keys
type BackgroundKey =
  | "background" | "bg"
  | "backgroundColor" | "bgColor"
  | "backgroundImage" | "bgImage"
  | "backgroundSize" | "bgSize"
  | "backgroundPosition" | "bgPosition"
  | "backgroundRepeat" | "bgRepeat"
  | "backgroundAttachment" | "bgAttachment"
  | "backgroundClip" | "bgClip"
  | "backgroundOrigin" | "bgOrigin"
  | "backgroundBlendMode" | "bgBlend"
  // Gradient shortcuts
  | "bgGradient" | "gradientFrom" | "gradientVia" | "gradientTo";

// Color prop keys
type ColorKey =
  | "color" | "textColor"
  | "opacity"
  | "fill" | "stroke";

type VisualKey = BackgroundKey | ColorKey;

/**
 * Resolve background properties
 */
export function resolveBackgroundProps(
  props: Partial<Record<BackgroundKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  const result: CSSDeclarations = {};

  // Background shorthand
  const bg = props.background ?? props.bg;
  if (bg !== undefined) {
    // Check if it's a color token
    const colorValue = resolveColor(String(bg), ctx);
    if (colorValue && !String(bg).includes(" ")) {
      result.backgroundColor = colorValue;
    } else {
      result.background = String(bg);
    }
  }

  // Background color
  const bgColor = props.backgroundColor ?? props.bgColor;
  if (bgColor !== undefined) {
    result.backgroundColor = resolveColor(String(bgColor), ctx) ?? String(bgColor);
  }

  // Background image
  const bgImage = props.backgroundImage ?? props.bgImage;
  if (bgImage !== undefined) result.backgroundImage = String(bgImage);

  // Background size
  const bgSize = props.backgroundSize ?? props.bgSize;
  if (bgSize !== undefined) {
    result.backgroundSize = resolveSizing(bgSize as any, ctx) ?? String(bgSize);
  }

  // Background position
  const bgPosition = props.backgroundPosition ?? props.bgPosition;
  if (bgPosition !== undefined) result.backgroundPosition = String(bgPosition);

  // Background repeat
  const bgRepeat = props.backgroundRepeat ?? props.bgRepeat;
  if (bgRepeat !== undefined) result.backgroundRepeat = String(bgRepeat);

  // Background attachment
  const bgAttachment = props.backgroundAttachment ?? props.bgAttachment;
  if (bgAttachment !== undefined) result.backgroundAttachment = String(bgAttachment);

  // Background clip
  const bgClip = props.backgroundClip ?? props.bgClip;
  if (bgClip !== undefined) result.backgroundClip = String(bgClip);

  // Background origin
  const bgOrigin = props.backgroundOrigin ?? props.bgOrigin;
  if (bgOrigin !== undefined) result.backgroundOrigin = String(bgOrigin);

  // Background blend mode
  const bgBlend = props.backgroundBlendMode ?? props.bgBlend;
  if (bgBlend !== undefined) result.backgroundBlendMode = String(bgBlend);

  // Gradient
  if (props.bgGradient !== undefined) {
    const from = props.gradientFrom 
      ? (resolveColor(String(props.gradientFrom), ctx) ?? String(props.gradientFrom))
      : "transparent";
    const to = props.gradientTo 
      ? (resolveColor(String(props.gradientTo), ctx) ?? String(props.gradientTo))
      : "transparent";
    const via = props.gradientVia 
      ? (resolveColor(String(props.gradientVia), ctx) ?? String(props.gradientVia))
      : null;

    const direction = String(props.bgGradient);
    const stops = via ? `${from}, ${via}, ${to}` : `${from}, ${to}`;
    result.backgroundImage = `linear-gradient(${direction}, ${stops})`;
  }

  return result;
}

/**
 * Resolve color properties
 */
export function resolveColorProps(
  props: Partial<Record<ColorKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  const result: CSSDeclarations = {};

  // Text color
  const textColor = props.color ?? props.textColor;
  if (textColor !== undefined) {
    result.color = resolveColor(String(textColor), ctx) ?? String(textColor);
  }

  // Opacity
  if (props.opacity !== undefined) {
    result.opacity = String(props.opacity);
  }

  // Fill (SVG)
  if (props.fill !== undefined) {
    result.fill = resolveColor(String(props.fill), ctx) ?? String(props.fill);
  }

  // Stroke (SVG)
  if (props.stroke !== undefined) {
    result.stroke = resolveColor(String(props.stroke), ctx) ?? String(props.stroke);
  }

  return result;
}

/**
 * Resolve all visual properties
 */
export function resolveVisualProps(
  props: Partial<Record<VisualKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  return {
    ...resolveBackgroundProps(props, ctx),
    ...resolveColorProps(props, ctx),
  };
}

/**
 * Extract visual props from a props object
 */
const visualKeys: VisualKey[] = [
  "background", "bg",
  "backgroundColor", "bgColor",
  "backgroundImage", "bgImage",
  "backgroundSize", "bgSize",
  "backgroundPosition", "bgPosition",
  "backgroundRepeat", "bgRepeat",
  "backgroundAttachment", "bgAttachment",
  "backgroundClip", "bgClip",
  "backgroundOrigin", "bgOrigin",
  "backgroundBlendMode", "bgBlend",
  "bgGradient", "gradientFrom", "gradientVia", "gradientTo",
  "color", "textColor",
  "opacity",
  "fill", "stroke",
];

export function extractVisualProps<T extends Record<string, unknown>>(
  props: T
): { visual: Partial<Record<VisualKey, unknown>>; rest: Omit<T, VisualKey> } {
  const visual: Partial<Record<VisualKey, unknown>> = {};
  const rest = { ...props };

  for (const key of visualKeys) {
    if (key in props) {
      visual[key] = props[key];
      delete (rest as Record<string, unknown>)[key];
    }
  }

  return { visual, rest: rest as Omit<T, VisualKey> };
}
