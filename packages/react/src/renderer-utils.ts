/**
 * React Renderer - Type Guards and Utilities
 * Safe type narrowing helpers for NodeSpec types
 */

import type { NodeSpec } from "@bassbook/core";

/**
 * Type guard to check if a node is an element node
 */
export function isElementNodeSpec(node: unknown): node is Extract<NodeSpec, { kind: "element" }> {
  return typeof node === "object" && node !== null && (node as { kind?: unknown }).kind === "element";
}

/**
 * Type guard to check if a node is a component node
 */
export function isComponentNodeSpec(node: unknown): node is Extract<NodeSpec, { kind: "component" }> {
  return typeof node === "object" && node !== null && (node as { kind?: unknown }).kind === "component";
}

/**
 * Type guard to check if a node is a slot node
 */
export function isSlotNodeSpec(node: unknown): node is Extract<NodeSpec, { kind: "slot" }> {
  return typeof node === "object" && node !== null && (node as { kind?: unknown }).kind === "slot";
}

/**
 * Get namespace from node if it's an element node
 */
export function getNodeNamespace(node: unknown): string | undefined {
  if (isElementNodeSpec(node)) {
    return node.namespace;
  }
  return undefined;
}

/**
 * Get tag name from node if it's an element node
 */
export function getNodeTag(node: unknown): string | undefined {
  if (isElementNodeSpec(node)) {
    return node.tag;
  }
  return undefined;
}

/**
 * Check if component name is an SVG component
 */
export function isSvgComponentName(name: string): boolean {
  return name === "Svg" || name === "CorePath";
}

/**
 * Check if a node is an SVG element based on namespace or tag
 */
export function isSvgElementNode(node: unknown): boolean {
  const namespace = getNodeNamespace(node);
  const tag = getNodeTag(node);
  return namespace === "svg" || tag === "svg" || tag === "path";
}

/**
 * Check if value is a React element (has $$typeof symbol)
 */
export function isReactElement(value: unknown): boolean {
  return typeof value === "object" && value !== null && "$$typeof" in (value as object);
}

/**
 * Flatten nested arrays in children for React compatibility
 * Skip React elements (they have $$typeof) to avoid treating them as arrays
 */
export function flattenChildren(children: React.ReactNode[]): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  for (const child of children) {
    if (Array.isArray(child) && !isReactElement(child)) {
      result.push(...flattenChildren(child));
    } else {
      result.push(child);
    }
  }
  return result;
}

/**
 * Check if a value is a valid React child
 */
export function isValidChild(child: unknown): child is React.ReactNode {
  return child !== undefined && child !== null;
}
