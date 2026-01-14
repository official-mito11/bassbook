/**
 * Length Utilities
 * @deprecated Use engine/resolvers/length instead
 */

import type { Length, SizingKeyword } from "../types";

const SIZING_MAP: Record<SizingKeyword, string> = {
  auto: "auto",
  "fit-content": "fit-content",
  "max-content": "max-content",
  "min-content": "min-content",
  full: "100%",
  half: "50%",
  quarter: "25%",
  screen: "100vw",
  "screen-h": "100vh",
};

/**
 * Convert length value to CSS string
 * - number → px
 * - sizing keyword → CSS value
 * - string → as-is
 */
export function lengthed(length: Length): string {
  if (typeof length === "number") {
    return length === 0 ? "0" : `${length}px`;
  }
  if (typeof length === "string") {
    const mapped = SIZING_MAP[length as SizingKeyword];
    if (mapped) return mapped;
  }
  return String(length);
}
