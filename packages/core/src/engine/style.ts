/**
 * Style Engine
 * Core style resolution and CSS class generation
 */

import type { StyleContext } from "./context";
import { getContext, createContext } from "./context";
import type { CSSDeclarations } from "./resolvers";
import { resolveAllProps } from "./resolvers";
import type { Properties } from "csstype";

// Style result with class names and optional inline styles
export interface StyleResult {
  // Generated class names (space-separated)
  className: string;
  // Class names as array
  classNames: string[];
  // Inline styles for values that can't be atomic (e.g., CSS variables)
  style?: Properties;
  // Raw CSS string (for SSR injection)
  css?: string;
}

// Options for style resolution
export interface StyleOptions {
  // Use custom context instead of global
  context?: StyleContext;
  // Additional class names to include
  className?: string;
  // Merge with existing inline styles
  style?: Properties;
  // Force inline styles instead of classes
  inline?: boolean;
}

/**
 * Convert CSS property name to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/**
 * Check if a value should be inlined (can't be atomic)
 * - CSS variables
 * - calc() expressions with variables
 * - Complex values that need to stay together
 */
function shouldInline(property: string, value: string): boolean {
  // CSS custom properties
  if (property.startsWith("--")) return true;
  // Values containing CSS variables
  if (value.includes("var(--")) return true;
  // Complex calc with variables
  if (value.includes("calc(") && value.includes("var(")) return true;
  return false;
}

/**
 * Main style function - resolves props to class names
 */
export function css(
  props: Record<string, unknown>,
  options?: StyleOptions
): StyleResult {
  const ctx = options?.context ?? getContext();
  
  // Resolve props to CSS declarations
  const declarations = resolveAllProps(props, ctx);
  
  // Separate atomic and inline styles
  const atomicDeclarations: CSSDeclarations = {};
  const inlineStyles: Properties = {};
  
  for (const [prop, value] of Object.entries(declarations)) {
    if (value === undefined || value === null) continue;
    
    if (options?.inline || shouldInline(prop, value)) {
      (inlineStyles as Record<string, string>)[prop] = value;
    } else {
      (atomicDeclarations as Record<string, string>)[prop] = value;
    }
  }
  
  // Register atomic styles and collect class names
  const classNames: string[] = [];
  
  for (const [prop, value] of Object.entries(atomicDeclarations)) {
    if (value === undefined) continue;
    const cssProperty = toKebabCase(prop);
    const className = ctx.registry.register(cssProperty, value);
    classNames.push(className);
  }

  classNames.sort();
  
  // Add additional class names
  if (options?.className) {
    classNames.push(...options.className.split(" ").filter(Boolean));
  }
  
  // Merge inline styles
  const mergedStyle = options?.style 
    ? { ...options.style, ...inlineStyles }
    : Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined;
  
  return {
    className: classNames.join(" "),
    classNames,
    style: mergedStyle,
    css: ctx.registry.getCSSForClasses(classNames),
  };
}

/**
 * Create a style factory with pre-configured options
 */
export function createStyleFactory(defaultOptions?: StyleOptions) {
  return (props: Record<string, unknown>, options?: StyleOptions): StyleResult => {
    return css(props, { ...defaultOptions, ...options });
  };
}

/**
 * Get inline style object only (no class generation)
 */
export function inlineStyle(
  props: Record<string, unknown>,
  options?: { context?: StyleContext }
): Properties {
  const ctx = options?.context ?? getContext();
  const declarations = resolveAllProps(props, ctx);
  
  const result: Properties = {};
  for (const [prop, value] of Object.entries(declarations)) {
    if (value !== undefined && value !== null) {
      (result as Record<string, string>)[prop] = value;
    }
  }
  
  return result;
}

/**
 * Get CSS string only (for SSR or style tags)
 */
export function cssString(
  props: Record<string, unknown>,
  selector?: string,
  options?: { context?: StyleContext }
): string {
  const ctx = options?.context ?? getContext();
  const declarations = resolveAllProps(props, ctx);
  
  const cssDeclarations = Object.entries(declarations)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([prop, value]) => `${toKebabCase(prop)}:${value}`)
    .join(";");
  
  if (selector) {
    return `${selector}{${cssDeclarations}}`;
  }
  
  return cssDeclarations;
}

/**
 * Extract all generated CSS (for SSR)
 */
export function extractCSS(options?: { context?: StyleContext }): string {
  const ctx = options?.context ?? getContext();
  return ctx.registry.getCSS();
}

/**
 * Create a scoped style context for SSR
 */
export function createSSRContext(options?: Parameters<typeof createContext>[0]) {
  const ctx = createContext(options);
  
  return {
    context: ctx,
    css: (props: Record<string, unknown>, opts?: StyleOptions) => 
      css(props, { ...opts, context: ctx }),
    extractCSS: () => ctx.registry.getCSS(),
    reset: () => ctx.registry.reset(),
  };
}

/**
 * Utility to merge multiple style results
 */
export function mergeStyles(...results: (StyleResult | undefined)[]): StyleResult {
  const classNames: string[] = [];
  let style: Properties | undefined;
  const cssStrings: string[] = [];
  
  for (const result of results) {
    if (!result) continue;
    classNames.push(...result.classNames);
    if (result.style) {
      style = { ...style, ...result.style };
    }
    if (result.css) {
      cssStrings.push(result.css);
    }
  }
  
  return {
    className: classNames.join(" "),
    classNames,
    style,
    css: cssStrings.join(""),
  };
}

/**
 * Conditional style helper
 */
export function cx(
  ...inputs: (string | Record<string, boolean> | undefined | null | false)[]
): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  
  return classes.join(" ");
}
