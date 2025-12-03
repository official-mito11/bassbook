/**
 * Layout Property Resolvers
 * Handles position, display, overflow, and layout properties
 */

import type { StyleContext } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveLength, resolveZIndex, resolveShadow } from "./length";

// Layout prop keys
type LayoutKey =
  // Display
  | "display" | "d"
  // Position
  | "position" | "pos"
  | "top" | "right" | "bottom" | "left"
  | "inset" | "insetX" | "insetY"
  // Z-index
  | "zIndex" | "z"
  // Overflow
  | "overflow" | "overflowX" | "overflowY"
  // Visibility
  | "visibility" | "visible" | "invisible" | "hidden"
  // Cursor
  | "cursor"
  // Pointer events
  | "pointerEvents"
  // User select
  | "userSelect" | "select"
  // Object fit/position
  | "objectFit" | "objectPosition"
  // Float/Clear
  | "float" | "clear"
  // Isolation
  | "isolation"
  // Box shadow
  | "boxShadow" | "shadow"
  // Transform
  | "transform" | "transformOrigin"
  | "scale" | "scaleX" | "scaleY"
  | "rotate" | "skewX" | "skewY"
  | "translateX" | "translateY"
  // Transition
  | "transition" | "transitionProperty" | "transitionDuration" 
  | "transitionTimingFunction" | "transitionDelay"
  // Animation
  | "animation" | "animationName" | "animationDuration"
  | "animationTimingFunction" | "animationDelay"
  | "animationIterationCount" | "animationDirection"
  | "animationFillMode" | "animationPlayState";

/**
 * Resolve layout properties
 */
export function resolveLayoutProps(
  props: Partial<Record<LayoutKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  const result: CSSDeclarations = {};

  // Display
  const display = props.display ?? props.d;
  if (display !== undefined) result.display = String(display);

  // Position
  const position = props.position ?? props.pos;
  if (position !== undefined) result.position = String(position);

  // Position offsets
  if (props.top !== undefined) result.top = resolveLength(props.top as any, ctx) ?? String(props.top);
  if (props.right !== undefined) result.right = resolveLength(props.right as any, ctx) ?? String(props.right);
  if (props.bottom !== undefined) result.bottom = resolveLength(props.bottom as any, ctx) ?? String(props.bottom);
  if (props.left !== undefined) result.left = resolveLength(props.left as any, ctx) ?? String(props.left);

  // Inset
  if (props.inset !== undefined) {
    const val = resolveLength(props.inset as any, ctx) ?? String(props.inset);
    result.top = val;
    result.right = val;
    result.bottom = val;
    result.left = val;
  }
  if (props.insetX !== undefined) {
    const val = resolveLength(props.insetX as any, ctx) ?? String(props.insetX);
    result.left = val;
    result.right = val;
  }
  if (props.insetY !== undefined) {
    const val = resolveLength(props.insetY as any, ctx) ?? String(props.insetY);
    result.top = val;
    result.bottom = val;
  }

  // Z-index
  const zIndex = props.zIndex ?? props.z;
  if (zIndex !== undefined) {
    result.zIndex = resolveZIndex(zIndex as any, ctx) ?? String(zIndex);
  }

  // Overflow
  if (props.overflow !== undefined) result.overflow = String(props.overflow);
  if (props.overflowX !== undefined) result.overflowX = String(props.overflowX);
  if (props.overflowY !== undefined) result.overflowY = String(props.overflowY);

  // Visibility shortcuts
  if (props.visibility !== undefined) result.visibility = String(props.visibility);
  if (props.visible === true) result.visibility = "visible";
  if (props.invisible === true) result.visibility = "hidden";
  if (props.hidden === true) result.display = "none";

  // Cursor
  if (props.cursor !== undefined) result.cursor = String(props.cursor);

  // Pointer events
  if (props.pointerEvents !== undefined) result.pointerEvents = String(props.pointerEvents);

  // User select
  const userSelect = props.userSelect ?? props.select;
  if (userSelect !== undefined) result.userSelect = String(userSelect);

  // Object fit/position
  if (props.objectFit !== undefined) result.objectFit = String(props.objectFit);
  if (props.objectPosition !== undefined) result.objectPosition = String(props.objectPosition);

  // Float/Clear
  if (props.float !== undefined) result.float = String(props.float);
  if (props.clear !== undefined) result.clear = String(props.clear);

  // Isolation
  if (props.isolation !== undefined) result.isolation = String(props.isolation);

  // Box shadow
  const shadow = props.boxShadow ?? props.shadow;
  if (shadow !== undefined) {
    result.boxShadow = resolveShadow(String(shadow), ctx) ?? String(shadow);
  }

  // Transform
  if (props.transform !== undefined) result.transform = String(props.transform);
  if (props.transformOrigin !== undefined) result.transformOrigin = String(props.transformOrigin);

  // Individual transforms (build transform string)
  const transforms: string[] = [];
  if (props.scale !== undefined) transforms.push(`scale(${props.scale})`);
  if (props.scaleX !== undefined) transforms.push(`scaleX(${props.scaleX})`);
  if (props.scaleY !== undefined) transforms.push(`scaleY(${props.scaleY})`);
  if (props.rotate !== undefined) {
    const val = typeof props.rotate === "number" ? `${props.rotate}deg` : props.rotate;
    transforms.push(`rotate(${val})`);
  }
  if (props.skewX !== undefined) {
    const val = typeof props.skewX === "number" ? `${props.skewX}deg` : props.skewX;
    transforms.push(`skewX(${val})`);
  }
  if (props.skewY !== undefined) {
    const val = typeof props.skewY === "number" ? `${props.skewY}deg` : props.skewY;
    transforms.push(`skewY(${val})`);
  }
  if (props.translateX !== undefined) {
    const val = resolveLength(props.translateX as any, ctx) ?? String(props.translateX);
    transforms.push(`translateX(${val})`);
  }
  if (props.translateY !== undefined) {
    const val = resolveLength(props.translateY as any, ctx) ?? String(props.translateY);
    transforms.push(`translateY(${val})`);
  }
  if (transforms.length > 0 && !props.transform) {
    result.transform = transforms.join(" ");
  }

  // Transition
  if (props.transition !== undefined) result.transition = String(props.transition);
  if (props.transitionProperty !== undefined) result.transitionProperty = String(props.transitionProperty);
  if (props.transitionDuration !== undefined) result.transitionDuration = String(props.transitionDuration);
  if (props.transitionTimingFunction !== undefined) result.transitionTimingFunction = String(props.transitionTimingFunction);
  if (props.transitionDelay !== undefined) result.transitionDelay = String(props.transitionDelay);

  // Animation
  if (props.animation !== undefined) result.animation = String(props.animation);
  if (props.animationName !== undefined) result.animationName = String(props.animationName);
  if (props.animationDuration !== undefined) result.animationDuration = String(props.animationDuration);
  if (props.animationTimingFunction !== undefined) result.animationTimingFunction = String(props.animationTimingFunction);
  if (props.animationDelay !== undefined) result.animationDelay = String(props.animationDelay);
  if (props.animationIterationCount !== undefined) result.animationIterationCount = String(props.animationIterationCount);
  if (props.animationDirection !== undefined) result.animationDirection = String(props.animationDirection);
  if (props.animationFillMode !== undefined) result.animationFillMode = String(props.animationFillMode);
  if (props.animationPlayState !== undefined) result.animationPlayState = String(props.animationPlayState);

  return result;
}

/**
 * Extract layout props from a props object
 */
const layoutKeys: LayoutKey[] = [
  "display", "d",
  "position", "pos",
  "top", "right", "bottom", "left",
  "inset", "insetX", "insetY",
  "zIndex", "z",
  "overflow", "overflowX", "overflowY",
  "visibility", "visible", "invisible", "hidden",
  "cursor",
  "pointerEvents",
  "userSelect", "select",
  "objectFit", "objectPosition",
  "float", "clear",
  "isolation",
  "boxShadow", "shadow",
  "transform", "transformOrigin",
  "scale", "scaleX", "scaleY",
  "rotate", "skewX", "skewY",
  "translateX", "translateY",
  "transition", "transitionProperty", "transitionDuration",
  "transitionTimingFunction", "transitionDelay",
  "animation", "animationName", "animationDuration",
  "animationTimingFunction", "animationDelay",
  "animationIterationCount", "animationDirection",
  "animationFillMode", "animationPlayState",
];

export function extractLayoutProps<T extends Record<string, unknown>>(
  props: T
): { layout: Partial<Record<LayoutKey, unknown>>; rest: Omit<T, LayoutKey> } {
  const layout: Partial<Record<LayoutKey, unknown>> = {};
  const rest = { ...props };

  for (const key of layoutKeys) {
    if (key in props) {
      layout[key] = props[key];
      delete (rest as Record<string, unknown>)[key];
    }
  }

  return { layout, rest: rest as Omit<T, LayoutKey> };
}
