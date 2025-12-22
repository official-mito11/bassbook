/**
 * Design Token System
 * Extensible token definitions for colors, sizing, etc.
 */

// Token types
export type ColorToken = string;
export type SizingToken = string;
export type RadiusToken = string;
export type ShadowToken = string;
export type ZIndexToken = number;

// Token scale type
export type TokenScale<T> = Record<string, T>;

// Theme token structure
export interface ThemeTokens {
  colors?: TokenScale<ColorToken>;
  sizing?: TokenScale<SizingToken>;
  radius?: TokenScale<RadiusToken>;
  shadow?: TokenScale<ShadowToken>;
  zIndex?: TokenScale<ZIndexToken>;
  // CSS custom properties
  vars?: Record<string, string>;
}

// Sizing aliases (keywords to CSS values)
export const defaultSizing: TokenScale<SizingToken> = {
  auto: "auto",
  full: "100%",
  half: "50%",
  quarter: "25%",
  "1/2": "50%",
  "1/3": "33.333333%",
  "2/3": "66.666667%",
  "1/4": "25%",
  "2/4": "50%",
  "3/4": "75%",
  "1/5": "20%",
  "2/5": "40%",
  "3/5": "60%",
  "4/5": "80%",
  "1/6": "16.666667%",
  "5/6": "83.333333%",
  screen: "100vw",
  "screen-h": "100vh",
  min: "min-content",
  max: "max-content",
  fit: "fit-content",
};

// Default color palette (shadcn/ui + cal.com inspired)
export const defaultColors: TokenScale<ColorToken> = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#ffffff",
  // Neutral scale (zinc-based like shadcn)
  "neutral-50": "#fafafa",
  "neutral-100": "#f4f4f5",
  "neutral-200": "#e4e4e7",
  "neutral-300": "#d4d4d8",
  "neutral-400": "#a1a1aa",
  "neutral-500": "#71717a",
  "neutral-600": "#52525b",
  "neutral-700": "#3f3f46",
  "neutral-800": "#27272a",
  "neutral-900": "#18181b",
  "neutral-950": "#09090b",
  // Semantic colors
  primary: "#18181b",
  "primary-foreground": "#fafafa",
  secondary: "#f4f4f5",
  "secondary-foreground": "#18181b",
  muted: "#f4f4f5",
  "muted-foreground": "#71717a",
  accent: "#f4f4f5",
  "accent-foreground": "#18181b",
  destructive: "#ef4444",
  "destructive-foreground": "#fafafa",
  border: "#e4e4e7",
  input: "#e4e4e7",
  ring: "#18181b",
  background: "#ffffff",
  foreground: "#09090b",
};

// Default border radius (cal.com/elysiajs inspired - slightly larger)
export const defaultRadius: TokenScale<RadiusToken> = {
  none: "0",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  full: "9999px",
};

// Default shadows (subtle, modern)
export const defaultShadow: TokenScale<ShadowToken> = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  lg: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  xl: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
};

// Default z-index scale
export const defaultZIndex: TokenScale<ZIndexToken> = {
  auto: 0,
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
};

// Default theme
export const defaultTheme: ThemeTokens = {
  colors: defaultColors,
  sizing: defaultSizing,
  radius: defaultRadius,
  shadow: defaultShadow,
  zIndex: defaultZIndex,
  vars: {},
};

// Deep merge utility for theme extension
export function mergeThemes(base: ThemeTokens, extension: Partial<ThemeTokens>): ThemeTokens {
  const result: ThemeTokens = { ...base };
  
  for (const key of Object.keys(extension) as (keyof ThemeTokens)[]) {
    const extValue = extension[key];
    if (extValue !== undefined) {
      if (typeof extValue === "object" && !Array.isArray(extValue)) {
        result[key] = { ...(base[key] as object), ...extValue } as any;
      } else {
        (result as any)[key] = extValue;
      }
    }
  }
  
  return result;
}

// Create custom theme
export function createTheme(tokens: Partial<ThemeTokens>): ThemeTokens {
  return mergeThemes(defaultTheme, tokens);
}
