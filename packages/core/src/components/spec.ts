import type { StyleProps } from "../types";

export type ComponentLayer = "core" | "unit" | "part";

export type DOMNamespace = "html" | "svg" | "mathml";

// ============================================
// State & Actions System
// ============================================

/**
 * State field definition
 */
export interface StateFieldDef {
  type: "boolean" | "string" | "number";
  default?: boolean | string | number;
  /** If true, this state can be controlled via props */
  controlled?: boolean;
}

/**
 * State schema for a component
 */
export type StateSchema = Record<string, StateFieldDef>;

/**
 * Action function type - receives current state and optional payload, returns partial state update
 */
export type ActionFn<S = Record<string, unknown>> = (
  state: S,
  payload?: unknown
) => Partial<S>;

/**
 * Actions map for a component
 */
export type ActionsMap<S = Record<string, unknown>> = Record<string, ActionFn<S>>;

/**
 * Event binding - maps DOM events to actions
 */
export interface EventBinding {
  /** Action name to trigger */
  action: string;
  /** Optional payload to pass to action */
  payload?: unknown | ((event: unknown) => unknown);
  /** For keyboard events, specify which keys trigger the action */
  keys?: readonly string[];
  /** Prevent default behavior */
  preventDefault?: boolean;
  /** Stop propagation */
  stopPropagation?: boolean;
}

/**
 * Part bindings - maps events on a part to actions
 */
export type PartBindings = {
  onClick?: string | EventBinding;
  onPointerDown?: string | EventBinding;
  onPointerUp?: string | EventBinding;
  onKeyDown?: string | EventBinding;
  onFocus?: string | EventBinding;
  onBlur?: string | EventBinding;
  onChange?: string | EventBinding;
  /** Special: triggers when clicking outside this part */
  onClickOutside?: string | EventBinding;
};

/**
 * Bindings map - maps parts to their event bindings
 */
export type BindingsMap = Record<string, PartBindings>;

/**
 * Controlled props mapping
 * Maps internal state to external controlled props
 */
export interface ControlledPropDef<PropKey extends string = string, OnChangeKey extends string = string> {
  /** The prop name for the value */
  prop: PropKey;
  /** The prop name for the change handler */
  onChange: OnChangeKey;
}

export type ControlledPropsMap = Readonly<Record<string, ControlledPropDef>>;

/**
 * Component behavior definition
 */
export interface ComponentBehavior<S extends StateSchema = StateSchema> {
  /** Internal state schema */
  state?: S;
  /** Actions that can modify state */
  actions?: ActionsMap<{ [K in keyof S]: S[K]["default"] }>;
  /** Event bindings per part */
  bindings?: BindingsMap;
  /** Controlled props mapping */
  controlledProps?: ControlledPropsMap;

  /**
   * Context provide/consume
   * - provide: expose values/functions to descendant components
   * - consume: derive extra props (e.g., selected) from ancestor-provided context
   */
  context?: {
    provide?: Record<string, (api: { state: Record<string, unknown>; dispatch: (action: string, payload?: unknown) => void; props: Record<string, unknown> }) => unknown>;
    consume?: (ctx: Record<string, unknown>, props: Record<string, unknown>) => Record<string, unknown>;
  };
}

export type DOMTagName =
  | keyof HTMLElementTagNameMap
  | keyof SVGElementTagNameMap
  | (string & {});

export type SlotStyles = Record<string, Partial<StyleProps>>;

export type KeyframesSpec = Record<
  string,
  Record<string, Record<string, string | number | undefined>>
>;

export interface BaseStyleConfig<B extends SlotStyles = SlotStyles> {
  base?: B;
}

export interface VariantStyleConfig<
  V extends Record<string, Record<string, SlotStyles>> = Record<string, Record<string, SlotStyles>>
> extends BaseStyleConfig {
  variants?: V;
  defaultVariants?: Record<string, string | boolean | number>;
  compoundVariants?: Array<{
    conditions: Record<string, string | boolean | number>;
    styles: SlotStyles;
  }>;
}

// ============================================
// Slot Definition System
// ============================================

/**
 * Slot definition for compound component pattern
 */
export interface SlotDef {
  /** Whether this slot is required (default: false) */
  required?: boolean;
  /** Whether this slot is the default slot (accepts unmatched children) */
  default?: boolean;

  /**
   * If slot value is not provided, use a value from behavior state.
   * (React/DOM renderers can apply this generically)
   */
  defaultFromState?: string;
}

/**
 * Slots map for a component
 */
export type SlotsMap = Record<string, SlotDef>;

export interface SlotNodeSpec {
  kind: "slot";
  slot: string;
}

export interface ElementNodeSpecBase<TChild> {
  kind: "element";
  tag: DOMTagName;
  part: string;
  namespace?: DOMNamespace;
  attrs?: Record<string, unknown>;
  children?: TChild[];
}

export interface ComponentNodeSpecBase<TChild> {
  kind: "component";
  component: string;
  part: string;
  props?: Record<string, unknown>;
  children?: TChild[];
}

export type NodeSpec = ElementNodeSpecBase<NodeSpec> | ComponentNodeSpecBase<NodeSpec> | SlotNodeSpec;

export type ElementNodeSpec = ElementNodeSpecBase<NodeSpec>;
export type ComponentNodeSpec = ComponentNodeSpecBase<NodeSpec>;
export type RootNodeSpec = ElementNodeSpec | ComponentNodeSpec;

export type CoreNodeSpec = ElementNodeSpecBase<CoreNodeSpec> | SlotNodeSpec;
export type CoreElementNodeSpec = ElementNodeSpecBase<CoreNodeSpec>;
export type CoreRootNodeSpec = CoreElementNodeSpec;

export interface CoreComponentSpec {
  layer: "core";
  name: string;
  tree: CoreRootNodeSpec;
  styles?: BaseStyleConfig;
  dataProps?: readonly string[];
  cssText?: string;
  keyframes?: KeyframesSpec;
}

export interface UnitComponentSpec<
  Styles extends VariantStyleConfig = VariantStyleConfig,
  Behavior extends ComponentBehavior = ComponentBehavior
> {
  layer: "unit";
  name: string;
  tree: RootNodeSpec;
  styles?: Styles;
  dataProps?: readonly string[];
  /** Component behavior: state, actions, bindings */
  behavior?: Behavior;
  cssText?: string;
  keyframes?: KeyframesSpec;
}

export interface PartComponentSpec<
  Styles extends VariantStyleConfig = VariantStyleConfig,
  Behavior extends ComponentBehavior = ComponentBehavior
> {
  layer: "part";
  name: string;
  tree: RootNodeSpec;
  styles?: Styles;
  dataProps?: readonly string[];
  /** Component behavior: state, actions, bindings */
  behavior?: Behavior;
  /** Slot definitions for compound component pattern */
  slots?: SlotsMap;
  cssText?: string;
  keyframes?: KeyframesSpec;
}

export type AnyComponentSpec = CoreComponentSpec | UnitComponentSpec | PartComponentSpec;

export function defineCoreComponent<const S extends Omit<CoreComponentSpec, "layer">>(
  spec: S
): S & { layer: "core" } {
  return { ...spec, layer: "core" };
}

export function defineUnitComponent<const S>(
  spec: S & Omit<UnitComponentSpec, "layer">
): S & { layer: "unit" } {
  return { ...spec, layer: "unit" };
}

export function definePartComponent<const S>(
  spec: S & Omit<PartComponentSpec, "layer">
): S & { layer: "part" } {
  return { ...spec, layer: "part" };
}

export function el<TChild = NodeSpec>(
  tag: DOMTagName,
  options: Omit<ElementNodeSpecBase<TChild>, "kind" | "tag">
): ElementNodeSpecBase<TChild> {
  return { kind: "element", tag, ...options };
}

export function comp<TChild = NodeSpec>(
  component: string,
  options: Omit<ComponentNodeSpecBase<TChild>, "kind" | "component">
): ComponentNodeSpecBase<TChild> {
  return { kind: "component", component, ...options };
}

export function slot(slotName: string): SlotNodeSpec {
  return { kind: "slot", slot: slotName };
}
