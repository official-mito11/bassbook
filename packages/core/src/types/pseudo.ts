/**
 * Pseudo-class Style Props
 * Supports _hover, _focus, _active, _disabled, etc.
 */

import type { StyleProps } from "./style-props";

/**
 * Pseudo-class style props
 * Each pseudo prop accepts a partial StyleProps object
 */
export interface PseudoProps {
  /** Styles applied on hover */
  _hover?: Partial<StyleProps>;
  /** Styles applied on focus */
  _focus?: Partial<StyleProps>;
  /** Styles applied on focus-visible (keyboard focus) */
  _focusVisible?: Partial<StyleProps>;
  /** Styles applied on focus-within */
  _focusWithin?: Partial<StyleProps>;
  /** Styles applied on active (mousedown) */
  _active?: Partial<StyleProps>;
  /** Styles applied when disabled */
  _disabled?: Partial<StyleProps>;
  /** Styles applied when checked (for checkboxes, radios, switches) */
  _checked?: Partial<StyleProps>;
  /** Styles applied on first-child */
  _first?: Partial<StyleProps>;
  /** Styles applied on last-child */
  _last?: Partial<StyleProps>;
  /** Styles applied on odd children */
  _odd?: Partial<StyleProps>;
  /** Styles applied on even children */
  _even?: Partial<StyleProps>;
  /** Styles applied when empty */
  _empty?: Partial<StyleProps>;
  /** Styles applied on placeholder-shown */
  _placeholder?: Partial<StyleProps>;
  /** Styles applied before element (::before) */
  _before?: Partial<StyleProps>;
  /** Styles applied after element (::after) */
  _after?: Partial<StyleProps>;
}

/**
 * Map pseudo prop keys to CSS selectors
 */
export const pseudoSelectors: Record<keyof PseudoProps, string> = {
  _hover: ":hover",
  _focus: ":focus",
  _focusVisible: ":focus-visible",
  _focusWithin: ":focus-within",
  _active: ":active",
  _disabled: ":disabled",
  _checked: ":checked",
  _first: ":first-child",
  _last: ":last-child",
  _odd: ":nth-child(odd)",
  _even: ":nth-child(even)",
  _empty: ":empty",
  _placeholder: "::placeholder",
  _before: "::before",
  _after: "::after",
};

/**
 * Check if a key is a pseudo prop
 */
export function isPseudoProp(key: string): key is keyof PseudoProps {
  return key.startsWith("_") && key in pseudoSelectors;
}

/**
 * Get all pseudo prop keys
 */
export const pseudoKeys = Object.keys(pseudoSelectors) as (keyof PseudoProps)[];
