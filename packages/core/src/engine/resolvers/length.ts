/**
 * Length Value Resolver
 * Converts length values to CSS strings
 * - number → px (e.g., 16 → "16px")
 * - string → as-is or token lookup
 */

import type { StyleContext } from "../context";
import { resolveToken, isTokenRef, parseAndResolveToken } from "../context";
import type { Length } from "../../types/length";

/**
 * Resolve a length value to CSS string
 */
export function resolveLength(value: Length | undefined, ctx: StyleContext): string | undefined {
  if (value === undefined || value === null) return undefined;

  // Number → px
  if (typeof value === "number") {
    return value === 0 ? "0" : `${value}px`;
  }

  // String value
  if (typeof value === "string") {
    // Token reference (e.g., "$colors.primary")
    if (isTokenRef(value)) {
      const resolved = parseAndResolveToken(ctx, value);
      if (resolved) return resolved;
    }

    // Sizing tokens (e.g., "full" → "100%")
    const sizingValue = resolveToken(ctx, "sizing", value);
    if (sizingValue) return sizingValue;

    // Return as-is (raw CSS value)
    return value;
  }

  return undefined;
}

/**
 * Resolve a sizing value (width, height, etc.)
 */
export function resolveSizing(value: string | number | undefined, ctx: StyleContext): string | undefined {
  if (value === undefined || value === null) return undefined;

  // Number → px
  if (typeof value === "number") {
    return value === 0 ? "0" : `${value}px`;
  }

  // String value
  if (typeof value === "string") {
    // Token reference
    if (isTokenRef(value)) {
      const resolved = parseAndResolveToken(ctx, value);
      if (resolved) return resolved;
    }

    // Sizing tokens
    const sizingValue = resolveToken(ctx, "sizing", value);
    if (sizingValue) return sizingValue;

    return value;
  }

  return undefined;
}

/**
 * Resolve a color value
 */
export function resolveColor(value: string | undefined, ctx: StyleContext): string | undefined {
  if (value === undefined || value === null) return undefined;

  // Check for token reference
  if (isTokenRef(value)) {
    const resolved = parseAndResolveToken(ctx, value);
    if (resolved) return resolved;
  }

  // Check color tokens
  const colorValue = resolveToken(ctx, "colors", value);
  if (colorValue) return colorValue;

  // Return as-is (raw CSS color)
  return value;
}

/**
 * Resolve a border radius value
 */
export function resolveRadius(value: string | number | undefined, ctx: StyleContext): string | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value === "number") {
    return value === 0 ? "0" : `${value}px`;
  }

  if (typeof value === "string") {
    if (isTokenRef(value)) {
      const resolved = parseAndResolveToken(ctx, value);
      if (resolved) return resolved;
    }

    const radiusValue = resolveToken(ctx, "radius", value);
    if (radiusValue) return radiusValue;

    return value;
  }

  return undefined;
}

/**
 * Resolve a shadow value
 */
export function resolveShadow(value: string | undefined, ctx: StyleContext): string | undefined {
  if (value === undefined || value === null) return undefined;

  if (isTokenRef(value)) {
    const resolved = parseAndResolveToken(ctx, value);
    if (resolved) return resolved;
  }

  // Check shadow tokens
  const shadowValue = resolveToken(ctx, "shadow", value);
  if (shadowValue) return shadowValue;

  return value;
}

/**
 * Resolve a z-index value
 */
export function resolveZIndex(value: string | number | undefined, ctx: StyleContext): string | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "string") {
    if (isTokenRef(value)) {
      const resolved = parseAndResolveToken(ctx, value);
      if (resolved) return resolved;
    }

    const zValue = resolveToken(ctx, "zIndex", value);
    if (zValue) return zValue;

    return value;
  }

  return undefined;
}
