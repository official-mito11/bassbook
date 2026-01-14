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
import {
  isElementNodeSpec,
  isComponentNodeSpec,
  isSlotNodeSpec,
  isSvgElementNode,
  isSvgComponentName,
  flattenChildren,
} from "./renderer-utils";

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

// ============================================
// SVG Helper Functions
// ============================================

/**
 * Extract SVG presentation attributes that should be forwarded as DOM attributes
 */
function extractSvgDomOverrides(rawProps: UnknownProps, rootExtras?: UnknownProps): Record<string, unknown> {
  const overrides: Record<string, unknown> = {};

  if ("d" in rawProps) overrides["d"] = rawProps["d"];
  if ("fill" in rawProps) overrides["fill"] = rawProps["fill"];
  if ("stroke" in rawProps) overrides["stroke"] = rawProps["stroke"];

  if (rootExtras) {
    if ("d" in rootExtras && overrides["d"] === undefined) overrides["d"] = rootExtras["d"];
    if ("fill" in rootExtras && overrides["fill"] === undefined) overrides["fill"] = rootExtras["fill"];
    if ("stroke" in rootExtras && overrides["stroke"] === undefined) overrides["stroke"] = rootExtras["stroke"];
  }

  return overrides;
}

/**
 * Apply SVG overrides to element props
 */
function applySvgOverrides(elementProps: UnknownProps, extra: UnknownProps): void {
  if ("d" in extra) elementProps["d"] = extra["d"];
  if ("fill" in extra) elementProps["fill"] = extra["fill"];
  if ("stroke" in extra) elementProps["stroke"] = extra["stroke"];
}

/**
 * Strip zero-width spaces from all string values in an object
 */
function stripZeroWidthSpaces(obj: UnknownProps): UnknownProps {
  let hasZeroWidth = false;
  for (const v of Object.values(obj)) {
    if (typeof v === "string" && v.includes("\u200b")) {
      hasZeroWidth = true;
      break;
    }
  }
  if (!hasZeroWidth) return obj;

  const next: UnknownProps = { ...obj };
  for (const [k, v] of Object.entries(next)) {
    if (typeof v === "string") {
      next[k] = v.replace(/\u200b/g, "");
    }
  }
  return next;
}

// ============================================
// Keyframe Helper Functions
// ============================================

/**
 * Extract keyframe names from a component spec
 */
function getKeyframeNames(spec: AnyComponentSpec): string[] {
  const keyframes = (spec as { keyframes?: Record<string, unknown> }).keyframes;
  if (keyframes && typeof keyframes === "object") {
    return Object.keys(keyframes);
  }
  return [];
}

/**
 * Namespace keyframe references in part styles
 */
function namespaceKeyframesInPartStyles(
  partStyles: Record<string, Record<string, unknown> | undefined>,
  componentName: string,
  keyframeNames: string[]
): void {
  if (keyframeNames.length === 0) return;

  for (const styles of Object.values(partStyles)) {
    if (!styles || typeof styles !== "object") continue;
    namespaceKeyframeReferencesInStyleObject({
      style: styles,
      componentName,
      keyframeNames,
    });
  }
}

// ============================================
// Main Renderer
// ============================================

export function createReactRenderer(options: CreateReactRendererOptions): ReactRenderer {
  const { registry, context, validate } = options;
  const baseStyleContext = context;

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

  /**
   * Check if a component spec represents an SVG root
   */
  function isSvgRoot(spec: AnyComponentSpec): boolean {
    if (isSvgComponentName(spec.name)) return true;
    const tree = spec.tree;
    if (!isElementNodeSpec(tree)) return false;
    const namespace = tree.namespace;
    const tag = tree.tag;
    return namespace === "svg" || tag === "svg" || tag === "path";
  }

  /**
   * Main spec rendering function
   */
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
    const slotsFromProps = rawProps["__slots"] as SlotValues | undefined;
    const partPropsFromProps = rawProps["__partProps"] as Record<string, UnknownProps> | undefined;

    const props: UnknownProps = { ...rawProps };
    delete props["__slots"];
    delete props["__partProps"];

    const svgRoot = isSvgRoot(spec);
    const domOverrides = svgRoot ? extractSvgDomOverrides(rawProps, rootExtras) : {};

    const propsForSplit: UnknownProps = { ...props };
    if (svgRoot) {
      delete propsForSplit["d"];
      delete propsForSplit["fill"];
      delete propsForSplit["stroke"];
    }

    const { styleProps: userStyleProps, domProps: rawDomProps } = splitProps(propsForSplit);

    if (svgRoot) {
      Object.assign(rawDomProps as UnknownProps, domOverrides);
    }
    const variantKeys = getVariantKeys(spec);
    const dataPropKeys = spec.dataProps ?? [];

    const domPropsObj = rawDomProps as UnknownProps;
    const { children: _children, ...domPropsWithoutChildren } = domPropsObj as UnknownProps & {
      children?: unknown;
    };

    const domProps = filterDomProps(domPropsWithoutChildren, [...variantKeys, ...dataPropKeys]);

    const rootDomProps = rootExtras ? { ...domProps, ...rootExtras } : domProps;
    const rootPartProps = partPropsFromProps?.["root"];
    const rootDomPropsWithPart = rootPartProps ? { ...rootDomProps, ...rootPartProps } : rootDomProps;

    if (svgRoot) {
      if ("d" in domOverrides) (rootDomPropsWithPart as UnknownProps)["d"] = domOverrides["d"];
      if ("fill" in domOverrides) (rootDomPropsWithPart as UnknownProps)["fill"] = domOverrides["fill"];
      if ("stroke" in domOverrides) (rootDomPropsWithPart as UnknownProps)["stroke"] = domOverrides["stroke"];
    }

    if (rootPartProps && "ref" in rootPartProps && "ref" in rootDomProps) {
      const partRef = (rootPartProps as { ref?: unknown }).ref;
      const domRef = (rootDomProps as { ref?: unknown }).ref;
      if (partRef && domRef) {
        (rootDomPropsWithPart as { ref?: unknown }).ref = mergeRefs(domRef, partRef);
      }
    }

    const slots = normalizeSlots({ ...(slotsFromProps ?? {}), ...(slotsInput ?? {}) }, propsInput?.children);
    const partStyles = resolvePartStyles(spec, props, userStyleProps);

    const keyframeNames = getKeyframeNames(spec);
    namespaceKeyframesInPartStyles(partStyles, spec.name, keyframeNames);

    /**
     * Main node rendering function
     */
    function renderNode(node: NodeSpec, extraForThisNode?: UnknownProps): React.ReactNode {
      if (isSlotNodeSpec(node)) {
        return slots[node.slot] ?? null;
      }

      const partExtra = partPropsFromProps?.[node.part];
      const mergedExtraForNode = partExtra ? { ...(extraForThisNode ?? {}), ...partExtra } : extraForThisNode;

      if (isComponentNodeSpec(node)) {
        const childSpec = registry.get(node.component);

        if (!childSpec) {
          throw new Error(`Unknown component reference '${node.component}'`);
        }

        if (stack.includes(childSpec.name)) {
          throw new Error(`Circular component reference detected: ${[...stack, childSpec.name].join(" -> ")}`);
        }

        const renderedChildren = (node.children ?? []).map((child) => renderNode(child as NodeSpec));

        const partStyleProps = partStyles[node.part] ?? {};
        const styleFromSpec = css(partStyleProps as UnknownProps, baseStyleOptions);

        const nodeProps = { ...((node.props ?? {}) as UnknownProps) };

        const mergedNodeStyle = mergeReactStyles(
          mergeReactStyles(
            styleFromSpec.style as React.CSSProperties | undefined,
            extractStyle((nodeProps as UnknownProps)["style"] as React.CSSProperties | undefined)
          ),
          extractStyle((mergedExtraForNode as UnknownProps)?.["style"] as React.CSSProperties | undefined)
        );

        const mergedNodeClassName = cx(
          extractClassName((nodeProps as UnknownProps)["className"] as string | undefined),
          extractClassName((mergedExtraForNode as UnknownProps)?.["className"] as string | undefined),
          styleFromSpec.className
        );

        const childProps: BassbookComponentProps = {
          ...nodeProps,
          ...(mergedExtraForNode ?? {}),
          className: mergedNodeClassName || undefined,
          style: mergedNodeStyle,
          children: undefined,
        };

        const element = renderBySpec(
          childSpec,
          stripZeroWidthSpaces(childProps as UnknownProps) as unknown as BassbookComponentProps,
          { children: renderedChildren },
          undefined,
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

      const behaviorRef = (mergedExtraForNode as UnknownProps)?.["ref"];
      const userRef = (partPropsFromProps?.[node.part] as UnknownProps)?.["ref"];
      const mergedRef = behaviorRef && userRef ? mergeRefs(behaviorRef, userRef) : (behaviorRef ?? userRef);
      if (mergedRef) {
        (extra as UnknownProps)["ref"] = mergedRef;
      }

      const partStyleProps = partStyles[node.part] ?? {};

      const mergedStyleOptions: StyleOptions = {
        ...(baseStyleOptions ?? {}),
        className: cx(
          extractClassName((attrs as UnknownProps)["className"] as string | undefined),
          extractClassName((extra as UnknownProps)["className"] as string | undefined)
        ),
        style: mergeReactStyles(
          extractStyle((attrs as UnknownProps)["style"] as React.CSSProperties | undefined),
          extractStyle((extra as UnknownProps)["style"] as React.CSSProperties | undefined)
        ) as Record<string, unknown>,
      };

      const styleFromSpec = css(partStyleProps as UnknownProps, mergedStyleOptions);

      const elementProps: UnknownProps = {
        ...attrs,
        ...extra,
      };

      delete elementProps["className"];
      delete elementProps["style"];
      delete elementProps["children"];

      if (styleFromSpec.className) {
        elementProps["className"] = styleFromSpec.className;
      }
      if (styleFromSpec.style) {
        elementProps["style"] = styleFromSpec.style;
      }

      if (isElementNodeSpec(node) && isSvgElementNode(node)) {
        applySvgOverrides(elementProps, extra);
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

      const specKeyframes = (spec as { keyframes?: unknown }).keyframes;
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

      const keyframeNames = getKeyframeNames(spec);

      const consumedProps =
        spec.layer !== "core" && spec.behavior?.context?.consume
          ? spec.behavior.context.consume(parentCtx, {
              ...(props as Record<string, unknown>),
              ...(behaviorResult.state as Record<string, unknown>),
            })
          : undefined;

      const consumedPartProps = (
        consumedProps as unknown as { __partProps?: Record<string, Record<string, unknown>> } | undefined
      )?.__partProps;

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

      if (keyframeNames.length > 0) {
        const pp = (propsWithBehavior.__partProps ?? {}) as Record<string, Record<string, unknown>>;
        for (const partObj of Object.values(pp)) {
          const style = (partObj["style"] ?? undefined) as unknown;
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
      if (ref) rootExtras["ref"] = ref;

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
): React.ForwardRefExoticComponent<React.PropsWithoutRef<BassbookComponentProps> & React.RefAttributes<unknown>> {
  return createReactRenderer(options).createComponent(name);
}
