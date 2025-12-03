/**
 * Style Engine Context
 * Manages theme tokens and provides context for style resolution
 */

import type { ThemeTokens } from "../themes/tokens";
import { defaultTheme, mergeThemes } from "../themes/tokens";
import type { CSSRegistry } from "./registry";
import { getRegistry, createRegistry } from "./registry";

export interface StyleContext {
  theme: ThemeTokens;
  registry: CSSRegistry;
}

// Global context
let globalContext: StyleContext | null = null;

/**
 * Get the global style context
 */
export function getContext(): StyleContext {
  if (!globalContext) {
    globalContext = {
      theme: defaultTheme,
      registry: getRegistry(),
    };
  }
  return globalContext;
}

/**
 * Configure the global style context with custom theme
 */
export function configure(options: {
  theme?: Partial<ThemeTokens>;
  prefix?: string;
}): StyleContext {
  const theme = options.theme 
    ? mergeThemes(defaultTheme, options.theme) 
    : defaultTheme;
  
  const registry = options.prefix 
    ? createRegistry(options.prefix) 
    : getRegistry();

  globalContext = { theme, registry };
  return globalContext;
}

/**
 * Create an isolated style context (useful for SSR or testing)
 */
export function createContext(options?: {
  theme?: Partial<ThemeTokens>;
  prefix?: string;
}): StyleContext {
  const theme = options?.theme 
    ? mergeThemes(defaultTheme, options.theme) 
    : defaultTheme;
  
  const registry = createRegistry(options?.prefix);

  return { theme, registry };
}

/**
 * Reset the global context
 */
export function resetContext(): void {
  globalContext?.registry.reset();
  globalContext = null;
}

/**
 * Resolve a token value from the theme
 */
export function resolveToken<K extends keyof ThemeTokens>(
  ctx: StyleContext,
  category: K,
  key: string | number
): string | undefined {
  const scale = ctx.theme[category];
  if (!scale) return undefined;
  
  const value = (scale as Record<string | number, unknown>)[key];
  if (value === undefined) return undefined;
  
  return String(value);
}

/**
 * Resolve a CSS variable from the theme
 */
export function resolveVar(ctx: StyleContext, name: string): string | undefined {
  return ctx.theme.vars?.[name];
}

/**
 * Check if a value is a token reference (e.g., "$colors.primary" or "colors.primary")
 */
export function isTokenRef(value: string): boolean {
  return value.startsWith("$") || /^[a-z]+\.[a-zA-Z0-9.-]+$/.test(value);
}

/**
 * Parse a token reference and resolve it
 */
export function parseAndResolveToken(ctx: StyleContext, value: string): string | undefined {
  const normalized = value.startsWith("$") ? value.slice(1) : value;
  const [category, ...keyParts] = normalized.split(".");
  const key = keyParts.join(".");
  
  if (!category || !key) return undefined;
  
  return resolveToken(ctx, category as keyof ThemeTokens, key);
}
