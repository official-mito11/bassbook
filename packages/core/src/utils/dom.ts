/**
 * DOM Type Guards and Utilities
 * Provides type-safe DOM element checks
 */

export interface BoundingRectElement {
  getBoundingClientRect(): DOMRect;
}

export function hasBoundingRect(el: unknown): el is BoundingRectElement {
  return (
    typeof el === "object" &&
    el !== null &&
    "getBoundingClientRect" in el &&
    typeof (el as BoundingRectElement).getBoundingClientRect === "function"
  );
}

export function isHTMLElement(el: unknown): el is HTMLElement {
  if (typeof HTMLElement === "undefined") return false;
  return el instanceof HTMLElement;
}

export function isSVGElement(el: unknown): el is SVGElement {
  if (typeof SVGElement === "undefined") return false;
  return el instanceof SVGElement;
}

export function isElement(el: unknown): el is Element {
  if (typeof Element === "undefined") return false;
  return el instanceof Element;
}

export function hasStyleProperty(el: unknown): el is { style: CSSStyleDeclaration } {
  return typeof el === "object" && el !== null && "style" in el && typeof (el as { style: unknown }).style === "object";
}

export function setStyleProperty(element: unknown, property: string, value: string): void {
  if (!hasStyleProperty(element)) return;

  const style = element.style;
  if (property.startsWith("--") || property.includes("-")) {
    style.setProperty(property, value);
  } else if (property in style) {
    (style as unknown as Record<string, string>)[property] = value;
  }
}
