import * as React from "react";

import { css, cx, splitProps } from "@bassbook/core";
import type {
  AnyComponentSpec,
  ComponentRegistry,
  NodeSpec,
  SlotStyles,
  StyleContext,
  StyleOptions,
  StyleProps,
} from "@bassbook/core";

// React adapter for Bassbook component specs.

export type SlotValues = Record<string, React.ReactNode>;

export type BassbookComponentProps = Partial<StyleProps> & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  __slots?: SlotValues;
  __partProps?: Record<string, Record<string, unknown>>;
  [key: string]: unknown;
};

export interface ReactRenderer {
  render(name: string, props?: BassbookComponentProps, slots?: SlotValues): React.ReactElement | null;
  createComponent(name: string): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<BassbookComponentProps> & React.RefAttributes<unknown>
  >;
}

export interface CreateReactRendererOptions {
  registry: ComponentRegistry;
  context?: StyleContext;
}

type PartStyleMap = Record<string, Partial<StyleProps>>;
type UnknownProps = Record<string, unknown>;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Merge per-part style objects, keeping later assignments as overrides.
function mergePartStyles(target: PartStyleMap, incoming?: SlotStyles): void {
  if (!incoming) return;
  for (const [part, styles] of Object.entries(incoming)) {
    const prev = target[part] ?? {};
    target[part] = { ...prev, ...(styles ?? {}) };
  }
}

function getVariantKeys(spec: AnyComponentSpec): string[] {
  const styles = spec.styles as any;
  if (!styles || !isObject(styles)) return [];
  const variants = (styles as any).variants as Record<string, unknown> | undefined;
  if (!variants || !isObject(variants)) return [];
  return Object.keys(variants);
}

function coerceVariantSelection(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return undefined;
}

// Resolve (base + variants + compound) styles for every part of a component spec.
function resolvePartStyles(
  spec: AnyComponentSpec,
  props: UnknownProps,
  userStyleProps: Partial<StyleProps>
): PartStyleMap {
  const result: PartStyleMap = {};

  const styles = spec.styles as any;
  if (!styles || !isObject(styles)) {
    if (Object.keys(userStyleProps).length > 0) {
      result.root = { ...(result.root ?? {}), ...userStyleProps };
    }
    return result;
  }

  mergePartStyles(result, (styles as any).base as SlotStyles | undefined);

  const variants = (styles as any).variants as
    | Record<string, Record<string, SlotStyles>>
    | undefined;
  const defaultVariants = (styles as any).defaultVariants as Record<string, string> | undefined;

  if (variants && isObject(variants)) {
    for (const [variantKey, variantMap] of Object.entries(variants)) {
      const selected = coerceVariantSelection(props[variantKey] ?? defaultVariants?.[variantKey]);
      if (!selected) continue;
      const slotStyles = (variantMap as Record<string, SlotStyles>)[selected];
      if (!slotStyles) continue;
      mergePartStyles(result, slotStyles);
    }
  }

  const compoundVariants = (styles as any).compoundVariants as
    | Array<{ conditions: Record<string, string>; styles: SlotStyles }>
    | undefined;
  if (compoundVariants) {
    for (const compound of compoundVariants) {
      const matches = Object.entries(compound.conditions).every(([key, value]) => {
        const actual = (props[key] ?? defaultVariants?.[key]) as unknown;
        return actual === value;
      });
      if (!matches) continue;
      mergePartStyles(result, compound.styles);
    }
  }

  if (Object.keys(userStyleProps).length > 0) {
    result.root = { ...(result.root ?? {}), ...userStyleProps };
  }

  return result;
}

function filterDomProps(domProps: UnknownProps, keysToRemove: readonly string[]): UnknownProps {
  if (keysToRemove.length === 0) return domProps;
  const next: UnknownProps = { ...domProps };
  for (const key of keysToRemove) {
    if (key in next) delete next[key];
  }
  return next;
}

function normalizeSlots(slots: SlotValues | undefined, children: React.ReactNode): SlotValues {
  return { ...(slots ?? {}), children };
}

function extractClassName(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function extractStyle(value: unknown): React.CSSProperties | undefined {
  if (!isObject(value)) return undefined;
  return value as React.CSSProperties;
}

function mergeReactStyles(
  base: React.CSSProperties | undefined,
  next: React.CSSProperties | undefined
): React.CSSProperties | undefined {
  if (!base && !next) return undefined;
  return { ...(base ?? {}), ...(next ?? {}) };
}

export function createReactRenderer(options: CreateReactRendererOptions): ReactRenderer {
  const { registry, context } = options;
  const baseStyleOptions: StyleOptions | undefined = context ? { context } : undefined;

  function renderBySpec(
    spec: AnyComponentSpec,
    propsInput: BassbookComponentProps | undefined,
    slotsInput: SlotValues | undefined,
    rootExtras?: UnknownProps,
    parentStack?: readonly string[]
  ): React.ReactElement | null {
    const stack = [...(parentStack ?? []), spec.name];
    if (parentStack?.includes(spec.name)) {
      throw new Error(`Circular component reference detected: ${stack.join(" -> ")}`);
    }

    const rawProps = (propsInput ?? {}) as UnknownProps;
    const slotsFromProps = (rawProps.__slots as SlotValues | undefined) ?? undefined;
    const partPropsFromProps = (rawProps.__partProps as Record<string, UnknownProps> | undefined) ?? undefined;

    const props: UnknownProps = { ...rawProps };
    delete props.__slots;
    delete props.__partProps;

    const { styleProps: userStyleProps, domProps: rawDomProps } = splitProps(props);
    const variantKeys = getVariantKeys(spec);

    // children should be consumed via the `children` slot, not forwarded to DOM.
    const domPropsObj = rawDomProps as UnknownProps;
    const { children: _children, ...domPropsWithoutChildren } = domPropsObj as UnknownProps & {
      children?: unknown;
    };

    const domProps = filterDomProps(domPropsWithoutChildren, variantKeys);

    const rootPartProps = partPropsFromProps?.root;
    const rootDomProps = rootExtras ? { ...domProps, ...rootExtras } : domProps;
    const rootDomPropsWithPart = rootPartProps ? { ...rootPartProps, ...rootDomProps } : rootDomProps;

    const slots = normalizeSlots({ ...(slotsFromProps ?? {}), ...(slotsInput ?? {}) }, propsInput?.children);
    const partStyles = resolvePartStyles(spec, props, userStyleProps);

    function renderNode(node: NodeSpec, extraForThisNode?: UnknownProps): React.ReactNode {
      if (node.kind === "slot") {
        return slots[node.slot] ?? null;
      }

      const partExtra = partPropsFromProps?.[node.part];
      const mergedExtraForNode = partExtra ? { ...partExtra, ...(extraForThisNode ?? {}) } : extraForThisNode;

      if (node.kind === "component") {
        const childSpec = registry.get(node.component);

        if (!childSpec) {
          throw new Error(`Unknown component reference '${node.component}'`);
        }

        if (stack.includes(childSpec.name)) {
          throw new Error(
            `Circular component reference detected: ${[...stack, childSpec.name].join(" -> ")}`
          );
        }

        const renderedChildren = (node.children ?? []).map((child) => renderNode(child as NodeSpec));

        // Styles for a component node are applied to the referenced component root.
        const partStyleProps = partStyles[node.part] ?? {};
        const styleFromSpec = css(partStyleProps as UnknownProps, baseStyleOptions);

        const nodeProps = (node.props ?? {}) as UnknownProps;

        const mergedNodeStyle = mergeReactStyles(
          extractStyle(nodeProps.style),
          mergeReactStyles(
            extractStyle(mergedExtraForNode?.style),
            styleFromSpec.style as React.CSSProperties | undefined
          )
        );

        const mergedNodeClassName = cx(
          extractClassName(nodeProps.className),
          extractClassName(mergedExtraForNode?.className),
          styleFromSpec.className
        );

        const childProps: BassbookComponentProps = {
          ...nodeProps,
          ...(mergedExtraForNode ?? {}),
          className: mergedNodeClassName || undefined,
          style: mergedNodeStyle,
          // children are supplied via slots below.
          children: undefined,
        };

        const element = renderBySpec(childSpec, childProps, { children: renderedChildren }, undefined, stack);

        return element;
      }

      // element node
      const renderedChildren = (node.children ?? []).map((child) => renderNode(child as NodeSpec));

      const attrs = (node.attrs ?? {}) as UnknownProps;
      const extra = mergedExtraForNode ?? {};

      const partStyleProps = partStyles[node.part] ?? {};

      const mergedStyleOptions: StyleOptions = {
        ...(baseStyleOptions ?? {}),
        className: cx(extractClassName(attrs.className), extractClassName(extra.className)),
        style: mergeReactStyles(extractStyle(attrs.style), extractStyle(extra.style)) as any,
      };

      const styleFromSpec = css(partStyleProps as UnknownProps, mergedStyleOptions);

      const elementProps: UnknownProps = {
        ...attrs,
        ...extra,
      };

      delete elementProps.className;
      delete elementProps.style;
      delete elementProps.children;

      if (styleFromSpec.className) {
        elementProps.className = styleFromSpec.className;
      }
      if (styleFromSpec.style) {
        elementProps.style = styleFromSpec.style as any;
      }

      return React.createElement(node.tag as any, elementProps as any, ...renderedChildren);
    }

    return renderNode(spec.tree as unknown as NodeSpec, rootDomPropsWithPart) as React.ReactElement | null;
  }

  function render(name: string, props?: BassbookComponentProps, slots?: SlotValues): React.ReactElement | null {
    const spec = registry.get(name);
    if (!spec) {
      throw new Error(`Unknown component '${name}'`);
    }
    return renderBySpec(spec, props, slots, undefined, undefined);
  }

  function createComponent(name: string) {
    return React.forwardRef<unknown, BassbookComponentProps>(function BassbookComponent(
      props: BassbookComponentProps,
      ref: React.ForwardedRef<unknown>
    ) {
      const spec = registry.get(name);
      if (!spec) {
        throw new Error(`Unknown component '${name}'`);
      }

      const rootExtras: UnknownProps = {};
      if (ref) rootExtras.ref = ref;

      return renderBySpec(spec, props, undefined, rootExtras, undefined) ?? null;
    });
  }

  return { render, createComponent };
}

export function createReactComponent(
  name: string,
  options: CreateReactRendererOptions
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<BassbookComponentProps> & React.RefAttributes<unknown>
> {
  return createReactRenderer(options).createComponent(name);
}