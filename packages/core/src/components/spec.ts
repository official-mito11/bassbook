import type { StyleProps } from "../types";

export type ComponentLayer = "core" | "unit" | "part";

export type DOMNamespace = "html" | "svg" | "mathml";

export type DOMTagName =
  | keyof HTMLElementTagNameMap
  | keyof SVGElementTagNameMap
  | (string & {});

export type SlotStyles = Record<string, Partial<StyleProps>>;

export interface BaseStyleConfig {
  base?: SlotStyles;
}

export interface VariantStyleConfig extends BaseStyleConfig {
  variants?: Record<string, Record<string, SlotStyles>>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: Array<{
    conditions: Record<string, string>;
    styles: SlotStyles;
  }>;
}

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
}

export interface UnitComponentSpec {
  layer: "unit";
  name: string;
  tree: RootNodeSpec;
  styles?: VariantStyleConfig;
  dataProps?: readonly string[];
}

export interface PartComponentSpec {
  layer: "part";
  name: string;
  tree: RootNodeSpec;
  styles?: VariantStyleConfig;
  dataProps?: readonly string[];
}

export type AnyComponentSpec = CoreComponentSpec | UnitComponentSpec | PartComponentSpec;

export function defineCoreComponent(spec: Omit<CoreComponentSpec, "layer">): CoreComponentSpec {
  return { ...spec, layer: "core" };
}

export function defineUnitComponent(spec: Omit<UnitComponentSpec, "layer">): UnitComponentSpec {
  return { ...spec, layer: "unit" };
}

export function definePartComponent(spec: Omit<PartComponentSpec, "layer">): PartComponentSpec {
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
