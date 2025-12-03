/**
 * Base Resolver Types and Utilities
 */

import type { StyleContext } from "../context";
import type { Properties } from "csstype";

// Resolved CSS declarations
export type CSSDeclarations = Partial<Record<keyof Properties, string>>;

// Property resolver function type
export type PropertyResolver<T> = (
  value: T,
  ctx: StyleContext
) => CSSDeclarations | null;

// Property definition with resolver
export interface PropertyDefinition<T = unknown> {
  // CSS property name(s) this maps to
  cssProperty: keyof Properties | (keyof Properties)[];
  // Aliases for this property
  aliases?: string[];
  // Value transformer
  transform?: (value: T, ctx: StyleContext) => string | undefined;
  // Full resolver (overrides cssProperty + transform)
  resolver?: PropertyResolver<T>;
}

// Registry of property definitions
export type PropertyRegistry = Record<string, PropertyDefinition>;

/**
 * Create a simple property definition
 */
export function defineProperty<T>(
  cssProperty: keyof Properties | (keyof Properties)[],
  options?: {
    aliases?: string[];
    transform?: (value: T, ctx: StyleContext) => string | undefined;
  }
): PropertyDefinition<T> {
  return {
    cssProperty,
    aliases: options?.aliases,
    transform: options?.transform,
  };
}

/**
 * Create a property with custom resolver
 */
export function defineCustomProperty<T>(
  resolver: PropertyResolver<T>,
  aliases?: string[]
): PropertyDefinition<T> {
  return {
    cssProperty: [] as any,
    aliases,
    resolver,
  };
}

/**
 * Apply a property definition to a value
 */
export function applyProperty<T>(
  def: PropertyDefinition<T>,
  value: T,
  ctx: StyleContext
): CSSDeclarations | null {
  // Use custom resolver if provided
  if (def.resolver) {
    return def.resolver(value, ctx);
  }

  // Transform value
  const transformed = def.transform 
    ? def.transform(value, ctx) 
    : String(value);

  if (transformed === undefined) return null;

  // Apply to CSS properties
  const props = Array.isArray(def.cssProperty) 
    ? def.cssProperty 
    : [def.cssProperty];

  const result: CSSDeclarations = {};
  for (const prop of props) {
    result[prop] = transformed;
  }

  return result;
}
