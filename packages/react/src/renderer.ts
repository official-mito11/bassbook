import * as React from "react";
import {
  css,
  cx,
  splitProps,
  injectGlobalStyles,
  serializeNamespacedKeyframes,
  namespaceKeyframeReferencesInStyleObject,
} from "@bassbook/core";
import type { AnyComponentSpec, NodeSpec, StyleOptions, StyleContext } from "@bassbook/core";
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
import { extractSlotsFromChildren } from "./compound";
import { BassbookStyleContext } from "./styleContext";

const BassbookRuntimeContext = React.createContext<Record<string, unknown>>({});

let componentCssInjected = false;
const injectedComponentCssTexts = new Set<string>();

function injectComponentCssText(cssText: string): void {
  if (typeof document === "undefined") return;
  if (injectedComponentCssTexts.has(cssText)) return;
  injectedComponentCssTexts.add(cssText);
  const style = document.createElement("style");
  style.setAttribute("data-bassbook", "component");
  style.textContent = cssText;
  document.head.appendChild(style);
}

export function createReactRenderer(options: CreateReactRendererOptions): ReactRenderer {
  const { registry, context, validate } = options;
  const baseStyleContext = context;

  function stripZeroWidthSpaces(obj: UnknownProps): UnknownProps {
    const next: UnknownProps = { ...obj };
    for (const [k, v] of Object.entries(next)) {
      if (typeof v === "string") {
        next[k] = v.replace(/\u200b/g, "");
      }
    }
    return next;
  }

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
    parentStack?: readonly string[],
    styleContext?: StyleContext
  ): React.ReactElement | null {
    const stack = [...(parentStack ?? []), spec.name];
    if (parentStack?.includes(spec.name)) {
      throw new Error(`Circular component reference detected: ${stack.join(" -> ")}`);
    }

    const baseStyleOptions: StyleOptions | undefined = styleContext ? { context: styleContext } : undefined;

    const rawProps = (propsInput ?? {}) as UnknownProps;
    const slotsFromProps = (rawProps.__slots as SlotValues | undefined) ?? undefined;
    const partPropsFromProps = (rawProps.__partProps as Record<string, UnknownProps> | undefined) ?? undefined;

    const props: UnknownProps = { ...rawProps };
    delete props.__slots;
    delete props.__partProps;

    // For SVG element roots (e.g. <svg>, <path>), some presentation attributes like
    // `d`/`fill`/`stroke` must be forwarded as DOM attributes.
    // Our style system treats these keys as style props (`d` is display shorthand; fill/stroke are visual props),
    // which would generate invalid CSS and drop the actual attributes.
    // To avoid that, we extract them BEFORE splitProps and re-attach to DOM props after.
    const svgRoot =
      spec.name === "Svg" ||
      spec.name === "CorePath" ||
      ((spec.tree as unknown as { kind?: unknown; namespace?: unknown }).kind === "element" &&
        (((spec.tree as unknown as { namespace?: unknown }).namespace === "svg") ||
          ((spec.tree as unknown as { tag?: unknown }).tag === "svg") ||
          ((spec.tree as unknown as { tag?: unknown }).tag === "path")));

    const domOverrides: Record<string, unknown> = {};
    const propsForSplit: UnknownProps = { ...props };
    if (svgRoot) {
      // Prefer the original raw props as source-of-truth.
      if ("d" in rawProps) {
        domOverrides.d = (rawProps as UnknownProps).d;
        delete propsForSplit.d;
      }
      if ("fill" in rawProps) {
        domOverrides.fill = (rawProps as UnknownProps).fill;
        delete propsForSplit.fill;
      }
      if ("stroke" in rawProps) {
        domOverrides.stroke = (rawProps as UnknownProps).stroke;
        delete propsForSplit.stroke;
      }

      // Also support attributes passed via rootExtras (common for component nodes like CorePath).
      if (rootExtras) {
        const re = rootExtras as UnknownProps;
        if ("d" in re && domOverrides.d === undefined) domOverrides.d = re.d;
        if ("fill" in re && domOverrides.fill === undefined) domOverrides.fill = re.fill;
        if ("stroke" in re && domOverrides.stroke === undefined) domOverrides.stroke = re.stroke;
      }
    }

    const { styleProps: userStyleProps, domProps: rawDomProps } = splitProps(propsForSplit);

    if (svgRoot) {
      Object.assign(rawDomProps as UnknownProps, domOverrides);
    }
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

    if (svgRoot) {
      if ("d" in domOverrides) (rootDomPropsWithPart as UnknownProps).d = domOverrides.d;
      if ("fill" in domOverrides) (rootDomPropsWithPart as UnknownProps).fill = domOverrides.fill;
      if ("stroke" in domOverrides) (rootDomPropsWithPart as UnknownProps).stroke = domOverrides.stroke;
    }

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

    const keyframeNames =
      (spec as unknown as { keyframes?: unknown }).keyframes &&
      typeof (spec as unknown as { keyframes?: unknown }).keyframes === "object"
        ? Object.keys((spec as unknown as { keyframes: Record<string, unknown> }).keyframes)
        : [];

    // If keyframes are injected with component-level namespacing (bb-<Component>-<name>),
    // we must rewrite any animation references inside style props (which end up as CSS class rules)
    // to match the injected keyframe names.
    if (keyframeNames.length > 0) {
      for (const styles of Object.values(partStyles)) {
        if (!styles || typeof styles !== "object") continue;
        namespaceKeyframeReferencesInStyleObject({
          style: styles as Record<string, unknown>,
          componentName: spec.name,
          keyframeNames,
        });
      }
    }

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

        // Copy to avoid mutating spec objects (specs are shared singletons).
        const nodeProps = { ...((node.props ?? {}) as UnknownProps) };

        const childIsSvgRoot =
          childSpec.name === "Svg" ||
          childSpec.name === "CorePath" ||
          ((childSpec.tree as unknown as { kind?: unknown; namespace?: unknown }).kind === "element" &&
            (((childSpec.tree as unknown as { namespace?: unknown }).namespace === "svg") ||
              ((childSpec.tree as unknown as { tag?: unknown }).tag === "svg") ||
              ((childSpec.tree as unknown as { tag?: unknown }).tag === "path")));

        // Note: do NOT extract/remove SVG presentation attributes here.
        // renderBySpec() has svgRoot handling that ensures `d`/`fill`/`stroke` are forwarded
        // as DOM attributes (and not treated as style props). Removing them here breaks SSR output.
        const svgRootExtras: UnknownProps | undefined = undefined;

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

        const element = renderBySpec(
          childSpec,
          stripZeroWidthSpaces(childProps as UnknownProps) as unknown as BassbookComponentProps,
          { children: renderedChildren },
          svgRootExtras,
          stack,
          styleContext
        );

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

      // Preserve SVG presentation attributes even if they collide with style prop shorthands.
      const isSvgElement =
        (node.namespace === "svg") ||
        node.tag === "svg" ||
        node.tag === "path";
      if (isSvgElement) {
        if ("d" in extra) elementProps.d = (extra as UnknownProps).d;
        if ("fill" in extra) elementProps.fill = (extra as UnknownProps).fill;
        if ("stroke" in extra) elementProps.stroke = (extra as UnknownProps).stroke;
      }

      return React.createElement(node.tag as string, stripZeroWidthSpaces(elementProps), ...renderedChildren);
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
    return renderBySpec(spec, props, slots, undefined, undefined, baseStyleContext);
  }

  function createComponent<S extends AnyComponentSpec = AnyComponentSpec>(name: string) {
    return React.forwardRef<unknown, BassbookComponentProps<S>>(function BassbookComponent(
      props: React.PropsWithoutRef<BassbookComponentProps<S>>,
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

      const themeCtx = React.useContext(BassbookStyleContext);
      const styleContext = themeCtx ?? baseStyleContext;

      const specKeyframes = (spec as unknown as { keyframes?: unknown }).keyframes;
      const keyframesCss = serializeNamespacedKeyframes(specKeyframes, spec.name);
      if (typeof keyframesCss === "string") {
        if (!componentCssInjected) componentCssInjected = true;
        injectComponentCssText(keyframesCss);
      }

      const parentCtx = React.useContext(BassbookRuntimeContext);

      const behaviorResult = useBehavior(
        spec.layer === "core" ? undefined : spec.behavior,
        props as Record<string, unknown>
      );

      const keyframeNames =
        spec.layer !== "core" && (spec as unknown as { keyframes?: unknown }).keyframes &&
        typeof (spec as unknown as { keyframes?: unknown }).keyframes === "object"
          ? Object.keys((spec as unknown as { keyframes: Record<string, unknown> }).keyframes)
          : [];

      // Compute derived props from ancestor-provided context.
      // Important: pass effective props (external props + behavior state) so core specs can
      // derive part props/vars without renderer-level special casing.
      const consumedProps =
        spec.layer !== "core" && spec.behavior?.context?.consume
          ? spec.behavior.context.consume(parentCtx, {
              ...(props as Record<string, unknown>),
              ...(behaviorResult.state as Record<string, unknown>),
            })
          : undefined;

      const consumedPartProps =
        (consumedProps as unknown as { __partProps?: Record<string, Record<string, unknown>> } | undefined)
          ?.__partProps;

      const userPartProps = (props.__partProps ?? {}) as Record<string, Record<string, unknown>>;
      const mergedPartProps: Record<string, Record<string, unknown>> = { ...behaviorResult.partProps };

      if (consumedPartProps) {
        for (const [partName, partObj] of Object.entries(consumedPartProps)) {
          mergedPartProps[partName] = { ...(mergedPartProps[partName] ?? {}), ...(partObj ?? {}) };
        }
      }

      for (const [partName, partObj] of Object.entries(userPartProps)) {
        mergedPartProps[partName] = { ...(mergedPartProps[partName] ?? {}), ...(partObj ?? {}) };
      }

      const propsWithBehavior = {
        ...props,
        ...(consumedProps ? { ...consumedProps, __partProps: undefined } : {}),
        ...(behaviorResult.state as Record<string, unknown>),
        __partProps: mergedPartProps,
      } as BassbookComponentProps<S>;

      // Namespace keyframe references inside style props produced by behavior/context/user.
      // Keyframes themselves were injected with the same namespace in serializeKeyframes().
      if (keyframeNames.length > 0) {
        const pp = (propsWithBehavior.__partProps ?? {}) as Record<string, Record<string, unknown>>;
        for (const partObj of Object.values(pp)) {
          const style = (partObj.style ?? undefined) as unknown;
          if (style && typeof style === "object" && !Array.isArray(style)) {
            namespaceKeyframeReferencesInStyleObject({
              style: style as Record<string, unknown>,
              componentName: spec.name,
              keyframeNames,
            });
          }
        }
      }

      const slotsFromCompound =
        spec.layer === "part" && spec.slots
          ? extractSlotsFromChildren(propsWithBehavior.children, spec.slots)
          : undefined;

      const slotsFromProps = (propsWithBehavior.__slots ?? undefined) as SlotValues | undefined;

      if (slotsFromCompound) {
        (propsWithBehavior as unknown as { children?: unknown }).children = undefined;
      }

      const slotsWithDefaults: SlotValues | undefined =
        spec.layer === "part" && spec.slots
          ? (() => {
              const next: SlotValues = { ...(slotsFromCompound ?? {}), ...(slotsFromProps ?? {}) };
              for (const [slotName, def] of Object.entries(spec.slots)) {
                const d = def as { defaultFromState?: unknown };
                if (next[slotName] !== undefined) continue;
                if (typeof d.defaultFromState !== "string") continue;
                const v = (behaviorResult.state as Record<string, unknown>)[d.defaultFromState];
                if (v === undefined || v === null) continue;
                next[slotName] = String(v);
              }
              return next;
            })()
          : (slotsFromProps ?? slotsFromCompound);

      const providedCtx =
        spec.layer !== "core" && spec.behavior?.context?.provide
          ? (() => {
              const additions: Record<string, unknown> = {};
              for (const [k, fn] of Object.entries(spec.behavior.context.provide ?? {})) {
                if (typeof fn !== "function") continue;
                additions[k] = fn({
                  state: behaviorResult.state as unknown as Record<string, unknown>,
                  dispatch: behaviorResult.dispatch,
                  props: props as unknown as Record<string, unknown>,
                });
              }
              return { ...parentCtx, ...additions };
            })()
          : parentCtx;

      const rootExtras: UnknownProps = {};
      if (ref) rootExtras.ref = ref;

      const rendered = renderBySpec(spec, propsWithBehavior, slotsWithDefaults, rootExtras, undefined) ?? null;
      return React.createElement(
        BassbookRuntimeContext.Provider,
        { value: providedCtx },
        renderBySpec(spec, propsWithBehavior, slotsWithDefaults, rootExtras, undefined, styleContext)
      );
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
