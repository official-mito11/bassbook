import * as React from "react";
import { css, cx, splitProps, injectGlobalStyles } from "@bassbook/core";
import type { AnyComponentSpec, NodeSpec, StyleOptions } from "@bassbook/core";
import type {
  BassbookComponentProps,
  ReactRenderer,
  CreateReactRendererOptions,
  SlotValues,
  PartStyleMap,
  UnknownProps,
} from "./types";
import {
  getVariantKeys,
  resolvePartStyles,
  filterDomProps,
  normalizeSlots,
  extractClassName,
  extractStyle,
  mergeReactStyles,
  mergeRefs,
} from "./utils";
import { useBehavior } from "./hooks/useBehavior";

export function createReactRenderer(options: CreateReactRendererOptions): ReactRenderer {
  const { registry, context, validate } = options;
  const baseStyleOptions: StyleOptions | undefined = context ? { context } : undefined;

  // Inject global styles (animations, etc.) lazily to avoid import-time side effects.
  // injectGlobalStyles() is idempotent.
  let globalStylesInjected = false;

  if (validate !== false) {
    const result = registry.validate();
    if (!result.valid) {
      const message = result.issues.map((i) => `${i.path}: ${i.message}`).join("\n");
      throw new Error(`Invalid component specs:\n${message}`);
    }
  }

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
    const dataPropKeys = spec.dataProps ?? [];

    // children should be consumed via the `children` slot, not forwarded to DOM.
    const domPropsObj = rawDomProps as UnknownProps;
    const { children: _children, ...domPropsWithoutChildren } = domPropsObj as UnknownProps & {
      children?: unknown;
    };

    const domProps = filterDomProps(domPropsWithoutChildren, [...variantKeys, ...dataPropKeys]);

    const rootDomProps = rootExtras ? { ...domProps, ...rootExtras } : domProps;
    const rootPartProps = partPropsFromProps?.root;
    // Let __partProps.root override any forwarded DOM props (including ones from forwardRef).
    const rootDomPropsWithPart = rootPartProps ? { ...rootDomProps, ...rootPartProps } : rootDomProps;

    if (rootPartProps && "ref" in rootPartProps && "ref" in rootDomProps) {
      const partRef = (rootPartProps as { ref?: unknown }).ref;
      const domRef = (rootDomProps as { ref?: unknown }).ref;
      if (partRef && domRef) {
        (rootDomPropsWithPart as { ref?: unknown }).ref = mergeRefs(domRef, partRef);
      }
    }

    const slots = normalizeSlots(
      { ...(slotsFromProps ?? {}), ...(slotsInput ?? {}) },
      propsInput?.children
    );
    const partStyles = resolvePartStyles(spec, props, userStyleProps);

    // Check if value is a React element (has $$typeof symbol)
    function isReactElement(value: unknown): boolean {
      return (
        typeof value === "object" &&
        value !== null &&
        "$$typeof" in (value as object)
      );
    }

    // Flatten nested arrays in children for React compatibility
    // Skip React elements (they have $$typeof) to avoid treating them as arrays
    function flattenChildren(children: React.ReactNode[]): React.ReactNode[] {
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

    function renderNode(node: NodeSpec, extraForThisNode?: UnknownProps): React.ReactNode {
      if (node.kind === "slot") {
        // Return slot value as-is; flattenChildren will handle arrays
        return slots[node.slot] ?? null;
      }

      const partExtra = partPropsFromProps?.[node.part];
      const mergedExtraForNode = partExtra ? { ...(extraForThisNode ?? {}), ...partExtra } : extraForThisNode;

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
      const rawChildren = (node.children ?? []).map((child) => renderNode(child as NodeSpec));
      const renderedChildren = flattenChildren(rawChildren);

      const attrs = (node.attrs ?? {}) as UnknownProps;
      const extra = mergedExtraForNode ?? {};

      const partStyleProps = partStyles[node.part] ?? {};

      const mergedStyleOptions: StyleOptions = {
        ...(baseStyleOptions ?? {}),
        className: cx(extractClassName(attrs.className), extractClassName(extra.className)),
        style: mergeReactStyles(extractStyle(attrs.style), extractStyle(extra.style)) as Record<string, unknown>,
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
        elementProps.style = styleFromSpec.style;
      }

      return React.createElement(node.tag as string, elementProps, ...renderedChildren);
    }

    return renderNode(spec.tree as unknown as NodeSpec, rootDomPropsWithPart) as React.ReactElement | null;
  }

  function render(name: string, props?: BassbookComponentProps, slots?: SlotValues): React.ReactElement | null {
    if (!globalStylesInjected) {
      injectGlobalStyles();
      globalStylesInjected = true;
    }
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
      if (!globalStylesInjected) {
        injectGlobalStyles();
        globalStylesInjected = true;
      }
      const spec = registry.get(name);
      if (!spec) {
        throw new Error(`Unknown component '${name}'`);
      }

      const behaviorResult = useBehavior(spec.layer === "core" ? undefined : spec.behavior, props as Record<string, unknown>);

      const userPartProps = (props.__partProps ?? {}) as Record<string, Record<string, unknown>>;
      const mergedPartProps: Record<string, Record<string, unknown>> = { ...behaviorResult.partProps };
      for (const [partName, partObj] of Object.entries(userPartProps)) {
        mergedPartProps[partName] = { ...(mergedPartProps[partName] ?? {}), ...(partObj ?? {}) };
      }

      const propsWithBehavior = {
        ...props,
        ...(behaviorResult.state as Record<string, unknown>),
        __partProps: mergedPartProps,
      } as BassbookComponentProps;

      if (spec.name === "Slider") {
        const v = (propsWithBehavior as unknown as { value?: unknown }).value;
        if (typeof v === "number" && Number.isFinite(v)) {
          const clamped = Math.min(100, Math.max(0, v));
          const pct = `${clamped}%`;
          const existingRoot = (propsWithBehavior.__partProps?.root ?? {}) as Record<string, unknown>;
          const existingStyle = (existingRoot.style ?? undefined) as Record<string, unknown> | undefined;
          const nextStyle: Record<string, unknown> = { ...(existingStyle ?? {}), "--slider-value": pct };
          (propsWithBehavior as unknown as { __partProps?: Record<string, Record<string, unknown>> }).__partProps = {
            ...(propsWithBehavior.__partProps ?? {}),
            root: { ...existingRoot, style: nextStyle },
          };
        }
      }

      const rootExtras: UnknownProps = {};
      if (ref) rootExtras.ref = ref;

      return renderBySpec(spec, propsWithBehavior, undefined, rootExtras, undefined) ?? null;
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
