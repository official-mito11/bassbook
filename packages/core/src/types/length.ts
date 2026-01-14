/**
 * CSS Length Types
 * Standard CSS length units and values
 */

import type { GlobalValue } from "./value";

// Standard CSS length units
export type LengthUnit =
  // Absolute
  | "px"
  | "cm"
  | "mm"
  | "in"
  | "pt"
  | "pc"
  | "Q"
  // Font-relative
  | "em"
  | "rem"
  | "ex"
  | "ch"
  | "cap"
  | "ic"
  | "lh"
  | "rlh"
  // Viewport-relative
  | "vw"
  | "vh"
  | "vmin"
  | "vmax"
  | "dvw"
  | "dvh"
  | "svw"
  | "svh"
  | "lvw"
  | "lvh"
  | "vb"
  | "vi"
  | "dvb"
  | "dvi"
  | "svb"
  | "svi"
  | "lvb"
  | "lvi"
  // Container query
  | "cqw"
  | "cqh"
  | "cqi"
  | "cqb"
  | "cqmin"
  | "cqmax"
  // Grid
  | "fr"
  // Percentage
  | "%";

// CSS length with unit (e.g., "10px", "1.5rem")
export type CSSLength = `${number}${LengthUnit}` | "0";

// Sizing keywords
export type SizingKeyword =
  | "auto"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "full"
  | "half"
  | "quarter" // aliases for 100%, 50%, 25%
  | "screen"
  | "screen-h"; // aliases for 100vw, 100vh

// Fraction keywords for sizing
export type FractionKeyword =
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "2/4"
  | "3/4"
  | "1/5"
  | "2/5"
  | "3/5"
  | "4/5"
  | "1/6"
  | "5/6";

/**
 * Length value type
 * - number: converted to px (e.g., 16 → "16px")
 * - string: raw CSS value (e.g., "1rem", "50%")
 */
export type Length = CSSLength | number | GlobalValue | (string & {});

// Resolved CSS length value
export type ResolvedLength = CSSLength | GlobalValue;
