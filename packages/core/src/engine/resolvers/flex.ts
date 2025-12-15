/**
 * Flex Property Resolvers
 * Handles flexbox layout properties
 */

import type { StyleContext } from "../context";
import type { CSSDeclarations } from "./base";
import { resolveSizing } from "./length";

// Flex container prop keys
type FlexContainerKey =
  | "flexDirection" | "flexRow" | "flexColumn" | "flexRowReverse" | "flexColumnReverse"
  | "flexWrap" | "flexNowrap" | "flexDoWrap" | "flexDowrap" | "flexWrapReverse"
  | "justifyContent" | "justifyStart" | "justifyEnd" | "justifyCenter" 
  | "justifyBetween" | "justifyAround" | "justifyEvenly"
  | "alignItems" | "alignStart" | "alignEnd" | "alignCenter" 
  | "alignBaseline" | "alignStretch"
  | "alignContent" | "placeContent" | "placeItems";

// Flex child prop keys
type FlexChildKey =
  | "flex" | "flexGrow" | "flexShrink" | "flexBasis"
  | "grow" | "shrink" | "basis"
  | "flexAuto" | "flexInitial" | "flexNone"
  | "alignSelf" | "order";

type FlexKey = FlexContainerKey | FlexChildKey;

/**
 * Resolve flex container properties
 */
export function resolveFlexContainer(
  props: Partial<Record<FlexContainerKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  const result: CSSDeclarations = {};

  // Flex direction
  if (props.flexDirection) result.flexDirection = props.flexDirection as string;
  if (props.flexRow) result.flexDirection = "row";
  if (props.flexColumn) result.flexDirection = "column";
  if (props.flexRowReverse) result.flexDirection = "row-reverse";
  if (props.flexColumnReverse) result.flexDirection = "column-reverse";

  // Flex wrap
  if (props.flexWrap) result.flexWrap = props.flexWrap as string;
  if (props.flexNowrap) result.flexWrap = "nowrap";
  if (props.flexDoWrap) result.flexWrap = "wrap";
  if (props.flexDowrap) result.flexWrap = "wrap";
  if (props.flexWrapReverse) result.flexWrap = "wrap-reverse";

  // Justify content
  if (props.justifyContent) result.justifyContent = props.justifyContent as string;
  if (props.justifyStart) result.justifyContent = "flex-start";
  if (props.justifyEnd) result.justifyContent = "flex-end";
  if (props.justifyCenter) result.justifyContent = "center";
  if (props.justifyBetween) result.justifyContent = "space-between";
  if (props.justifyAround) result.justifyContent = "space-around";
  if (props.justifyEvenly) result.justifyContent = "space-evenly";

  // Align items
  if (props.alignItems) result.alignItems = props.alignItems as string;
  if (props.alignStart) result.alignItems = "flex-start";
  if (props.alignEnd) result.alignItems = "flex-end";
  if (props.alignCenter) result.alignItems = "center";
  if (props.alignBaseline) result.alignItems = "baseline";
  if (props.alignStretch) result.alignItems = "stretch";

  // Other alignment
  if (props.alignContent) result.alignContent = props.alignContent as string;
  if (props.placeContent) result.placeContent = props.placeContent as string;
  if (props.placeItems) result.placeItems = props.placeItems as string;

  return result;
}

/**
 * Resolve flex child properties
 */
export function resolveFlexChild(
  props: Partial<Record<FlexChildKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  const result: CSSDeclarations = {};

  // Flex shorthand
  if (props.flex !== undefined) result.flex = String(props.flex);
  
  // Flex aliases
  if (props.flexAuto) result.flex = "1 1 auto";
  if (props.flexInitial) result.flex = "0 1 auto";
  if (props.flexNone) result.flex = "none";

  // Individual flex properties
  if (props.flexGrow !== undefined) result.flexGrow = String(props.flexGrow);
  if (props.grow !== undefined) result.flexGrow = String(props.grow);
  
  if (props.flexShrink !== undefined) result.flexShrink = String(props.flexShrink);
  if (props.shrink !== undefined) result.flexShrink = String(props.shrink);
  
  if (props.flexBasis !== undefined) {
    result.flexBasis = resolveSizing(props.flexBasis as string | number, ctx) ?? String(props.flexBasis);
  }
  if (props.basis !== undefined) {
    result.flexBasis = resolveSizing(props.basis as string | number, ctx) ?? String(props.basis);
  }

  // Align self
  if (props.alignSelf) result.alignSelf = props.alignSelf as string;
  
  // Order
  if (props.order !== undefined) result.order = String(props.order);

  return result;
}

/**
 * Resolve all flex properties
 */
export function resolveFlexProps(
  props: Partial<Record<FlexKey, unknown>>,
  ctx: StyleContext
): CSSDeclarations {
  return {
    ...resolveFlexContainer(props, ctx),
    ...resolveFlexChild(props, ctx),
  };
}

/**
 * Extract flex props from a props object
 */
export const flexKeys: FlexKey[] = [
  "flexDirection", "flexRow", "flexColumn", "flexRowReverse", "flexColumnReverse",
  "flexWrap", "flexNowrap", "flexDoWrap", "flexDowrap", "flexWrapReverse",
  "justifyContent", "justifyStart", "justifyEnd", "justifyCenter",
  "justifyBetween", "justifyAround", "justifyEvenly",
  "alignItems", "alignStart", "alignEnd", "alignCenter",
  "alignBaseline", "alignStretch",
  "alignContent", "placeContent", "placeItems",
  "flex", "flexGrow", "flexShrink", "flexBasis",
  "grow", "shrink", "basis",
  "flexAuto", "flexInitial", "flexNone",
  "alignSelf", "order",
];

export function extractFlexProps<T extends Record<string, unknown>>(
  props: T
): { flex: Partial<Record<FlexKey, unknown>>; rest: Omit<T, FlexKey> } {
  const flex: Partial<Record<FlexKey, unknown>> = {};
  const rest = { ...props };

  for (const key of flexKeys) {
    if (key in props) {
      flex[key] = props[key];
      delete (rest as Record<string, unknown>)[key];
    }
  }

  return { flex, rest: rest as Omit<T, FlexKey> };
}
