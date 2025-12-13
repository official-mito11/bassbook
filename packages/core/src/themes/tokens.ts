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

// Default color palette
export const defaultColors: TokenScale<ColorToken> = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#ffffff",
};

// Default border radius
export const defaultRadius: TokenScale<RadiusToken> = {
  none: "0",
  sm: "2px",
  md: "4px",
  lg: "8px",
  xl: "12px",
  full: "9999px",
};

// Default shadows
export const defaultShadow: TokenScale<ShadowToken> = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
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
