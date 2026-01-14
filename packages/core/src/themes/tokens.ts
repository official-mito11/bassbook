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
export type FontFamilyToken = string;
export type FontSizeToken = string;
export type FontWeightToken = number | string;
export type LineHeightToken = number | string;

// Token scale type
export type TokenScale<T> = Record<string, T>;

// Theme token structure
export interface ThemeTokens {
  colors?: TokenScale<ColorToken>;
  sizing?: TokenScale<SizingToken>;
  radius?: TokenScale<RadiusToken>;
  shadow?: TokenScale<ShadowToken>;
  zIndex?: TokenScale<ZIndexToken>;
  fontFamily?: TokenScale<FontFamilyToken>;
  fontSize?: TokenScale<FontSizeToken>;
  fontWeight?: TokenScale<FontWeightToken>;
  lineHeight?: TokenScale<LineHeightToken>;
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
  // Neutral scale (zinc-based like shadcn)
  "neutral-50": "oklch(0.985 0 0)",
  "neutral-100": "oklch(0.97 0 0)",
  "neutral-200": "oklch(0.922 0 0)",
  "neutral-300": "oklch(0.87 0 0)",
  "neutral-400": "oklch(0.708 0 0)",
  "neutral-500": "oklch(0.556 0 0)",
  "neutral-600": "oklch(0.439 0 0)",
  "neutral-700": "oklch(0.371 0 0)",
  "neutral-800": "oklch(0.269 0 0)",
  "neutral-900": "oklch(0.205 0 0)",
  "neutral-950": "oklch(0.145 0 0)",
  // Semantic colors
  primary: "oklch(0.205 0 0)",
  "primary-foreground": "oklch(0.985 0 0)",
  muted: "oklch(0.967 0.001 286.375)",
  "muted-foreground": "oklch(0.752 0.016 285.938)",
  accent: "oklch(0.967 0.001 286.375)",
  "accent-foreground": "oklch(0.21 0.006 285.885)",
  destructive: "oklch(0.637 0.237 25.331)",
  "destructive-foreground": "oklch(0.985 0 0)",
  border: "oklch(0.922 0 0)",
  input: "oklch(0.922 0 0)",
  ring: "oklch(0.205 0 0)",
  background: "oklch(1 0 0)",
  foreground: "oklch(0.145 0 0)",
  surface: "oklch(0.98 0 0)",
  "surface-hover": "oklch(0.96 0 0)",
  overlay: "oklch(0 0 0 / 0.6)",
  "info-bg": "oklch(0.97 0.014 254.604 / 0.1)",
  "info-border": "oklch(0.623 0.214 259.815 / 0.3)",
  "info-text": "oklch(0.546 0.245 262.881)",
  "success-bg": "oklch(0.723 0.219 149.579 / 0.1)",
  "success-border": "oklch(0.723 0.219 149.579 / 0.3)",
  "success-text": "oklch(0.627 0.194 149.214)",
  "warning-bg": "oklch(0.769 0.188 70.08 / 0.1)",
  "warning-border": "oklch(0.769 0.188 70.08 / 0.3)",
  "warning-text": "oklch(0.666 0.179 58.318)",
  "error-bg": "oklch(0.637 0.237 25.331 / 0.1)",
  "error-border": "oklch(0.637 0.237 25.331 / 0.3)",
  "error-text": "oklch(0.577 0.245 27.325)",
  "destructive-subtle-bg": "oklch(0.637 0.237 25.331 / 0.05)",
  "destructive-subtle-border": "oklch(0.637 0.237 25.331 / 0.2)",
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
  lg: "0 2px 6px -1px rgb(0 0 0 / 0.1), 0 1px 4px -2px rgb(0 0 0 / 0.1)",
  xl: "0 4px 15px -3px rgb(0 0 0 / 0.1), 0 2px 6px -4px rgb(0 0 0 / 0.1)",
  subtle: "0 0 4px rgb(0 0 0 / 0.2)",
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

// Default font families
export const defaultFontFamily: TokenScale<FontFamilyToken> = {
  sans: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  display: '"Inter", ui-sans-serif, system-ui, sans-serif',
  body: '"Inter", ui-sans-serif, system-ui, sans-serif',
};

// Default font sizes (type scale)
export const defaultFontSize: TokenScale<FontSizeToken> = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  md: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
  "7xl": "4.5rem", // 72px
  "8xl": "6rem", // 96px
  "9xl": "8rem", // 128px
};

// Default font weights
export const defaultFontWeight: TokenScale<FontWeightToken> = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// Default line heights
export const defaultLineHeight: TokenScale<LineHeightToken> = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
  3: ".75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
};

// Default theme
export const defaultTheme: ThemeTokens = {
  colors: defaultColors,
  sizing: defaultSizing,
  radius: defaultRadius,
  shadow: defaultShadow,
  zIndex: defaultZIndex,
  fontFamily: defaultFontFamily,
  fontSize: defaultFontSize,
  fontWeight: defaultFontWeight,
  lineHeight: defaultLineHeight,
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
