/**
 * Framework Adapters
 * Utilities for integrating with different frameworks (React, Svelte, Vue, Vanilla)
 */

import type { StyleProps } from "../types";
import type { StyleResult, StyleOptions } from "./style";
import { css, extractCSS, createSSRContext } from "./style";
import type { ThemeTokens } from "../themes/tokens";

import { spacingKeys } from "./resolvers/spacing";
import { sizingKeys } from "./resolvers/sizing";
import { flexKeys } from "./resolvers/flex";
import { borderKeys } from "./resolvers/border";
import { visualKeys } from "./resolvers/background";
import { typographyKeys } from "./resolvers/typography";
import { layoutKeys } from "./resolvers/layout";
import { pseudoKeys } from "../types/pseudo";

/**
 * Props that should be filtered out before passing to DOM elements
 * (aliases and shorthand props not valid as HTML attributes)
 */
const stylePropsKeys = new Set<string>([
  ...spacingKeys,
  ...sizingKeys,
  ...flexKeys,
  ...borderKeys,
  ...visualKeys,
  ...typographyKeys,
  ...layoutKeys,
  ...pseudoKeys,
]);

/**
 * Check if a prop key is a style prop
 */
export function isStyleProp(key: string): boolean {
  return stylePropsKeys.has(key);
}

/**
 * Split props into style props and DOM props
 */
export function splitProps<T extends Record<string, unknown>>(
  props: T
): { styleProps: Partial<StyleProps>; domProps: Omit<T, keyof StyleProps> } {
  const styleProps: Record<string, unknown> = {};
  const domProps: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (isStyleProp(key)) {
      styleProps[key] = value;
    } else {
      domProps[key] = value;
    }
  }

  return {
    styleProps: styleProps as Partial<StyleProps>,
    domProps: domProps as Omit<T, keyof StyleProps>,
  };
}

/**
 * Create a styled component factory for any framework
 */
export interface StyledComponentOptions<P = {}> {
  // Base styles
  base?: Partial<StyleProps>;
  // Variant styles
  variants?: Record<string, Record<string, Partial<StyleProps>>>;
  // Default variant values
  defaultVariants?: Record<string, string>;
  // Compound variants
  compoundVariants?: Array<{
    conditions: Record<string, string>;
    styles: Partial<StyleProps>;
  }>;
}

export interface StyledResult {
  className: string;
  classNames: string[];
  style?: Record<string, string>;
}

/**
 * Create a style resolver for component variants
 */
export function createStyled<V extends Record<string, Record<string, Partial<StyleProps>>>>(
  options: StyledComponentOptions & { variants?: V }
) {
  type VariantProps = {
    [K in keyof V]?: keyof V[K];
  };

  return function styled(
    props: Partial<StyleProps> & VariantProps,
    additionalOptions?: StyleOptions
  ): StyleResult {
    const allStyles: Partial<StyleProps> = { ...options.base };

    // Apply variant styles
    if (options.variants) {
      for (const [variantKey, variantValue] of Object.entries(options.variants)) {
        const selectedVariant = (props as Record<string, unknown>)[variantKey] 
          ?? options.defaultVariants?.[variantKey];
        
        if (selectedVariant && typeof selectedVariant === "string") {
          const variantStyles = variantValue[selectedVariant];
          if (variantStyles) {
            Object.assign(allStyles, variantStyles);
          }
        }
      }
    }

    // Apply compound variants
    if (options.compoundVariants) {
      for (const compound of options.compoundVariants) {
        const matches = Object.entries(compound.conditions).every(([key, value]) => {
          const propValue = (props as Record<string, unknown>)[key] 
            ?? options.defaultVariants?.[key];
          return propValue === value;
        });

        if (matches) {
          Object.assign(allStyles, compound.styles);
        }
      }
    }

    // Apply direct style props (override variants)
    const { styleProps } = splitProps(props as Record<string, unknown>);
    Object.assign(allStyles, styleProps);

    // Generate CSS
    const result = css(allStyles as Record<string, unknown>, additionalOptions);

    return {
      className: result.className,
      classNames: result.classNames,
      style: result.style as Record<string, string> | undefined,
    };
  };
}

/**
 * SSR Helper - Collect CSS during server rendering
 */
export class SSRStyleCollector {
  private ctx: ReturnType<typeof createSSRContext>;

  constructor(options?: { theme?: Partial<ThemeTokens>; prefix?: string }) {
    this.ctx = createSSRContext(options);
  }

  css(props: Record<string, unknown>, options?: StyleOptions): StyleResult {
    return this.ctx.css(props, options);
  }

  getCSS(): string {
    return this.ctx.extractCSS();
  }

  getStyleTag(): string {
    const css = this.getCSS();
    return css ? `<style data-bassbook>${css}</style>` : "";
  }

  reset(): void {
    this.ctx.reset();
  }
}

/**
 * Create SSR collector instance
 */
export function createSSRCollector(options?: { theme?: Partial<ThemeTokens>; prefix?: string }) {
  return new SSRStyleCollector(options);
}

/**
 * Vanilla JS helper - Apply styles to an element
 */
export function applyStyles(
  element: HTMLElement,
  props: Partial<StyleProps>,
  options?: StyleOptions
): void {
  const result = css(props as Record<string, unknown>, options);
  
  // Add class names
  if (result.className) {
    element.className = result.className;
  }
  
  // Apply inline styles
  if (result.style) {
    for (const [key, value] of Object.entries(result.style)) {
      if (value === undefined || value === null) continue;
      const stringValue = String(value);
      if (key.startsWith("--") || key.includes("-")) {
        element.style.setProperty(key, stringValue);
      } else {
        (element.style as any)[key] = stringValue;
      }
    }
  }
}

/**
 * Vanilla JS helper - Create a styled element
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<StyleProps> & { className?: string },
  children?: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  const result = css(props as Record<string, unknown>, { className: props.className });
  
  if (result.className) {
    element.className = result.className;
  }
  
  if (result.style) {
    for (const [key, value] of Object.entries(result.style)) {
      if (value === undefined || value === null) continue;
      const stringValue = String(value);
      if (key.startsWith("--") || key.includes("-")) {
        element.style.setProperty(key, stringValue);
      } else {
        (element.style as any)[key] = stringValue;
      }
    }
  }
  
  if (children) {
    for (const child of children) {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
  }
  
  return element;
}
