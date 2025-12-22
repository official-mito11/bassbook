import type { StyleProps } from "../types";
import type { StyleContext } from "../engine/context";
import { applyStyles, splitProps } from "../engine/adapters";
import type {
  AnyComponentSpec,
  NodeSpec,
  PartBindings,
  SlotNodeSpec,
} from "./spec";
import type { ComponentRegistry } from "./registry";
import { getVariantKeys, resolvePartStyles } from "./styleResolver";
import { createBehaviorRuntime } from "./behaviorRuntime";

type UnknownProps = Record<string, unknown>;

type SlotValue = Node | string | null | undefined | Array<Node | string | null | undefined>;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeSlots(
  slots: Record<string, SlotValue> | undefined,
  children: SlotValue | undefined
): Record<string, SlotValue> {
  const base: Record<string, SlotValue> = { ...(slots ?? {}) };
  if (children !== undefined) base.children = children;
  return base;
}

function flattenSlotValue(value: SlotValue): Array<Node | string> {
  const out: Array<Node | string> = [];
  if (value === null || value === undefined) return out;
  if (Array.isArray(value)) {
    for (const v of value) out.push(...flattenSlotValue(v));
    return out;
  }
  out.push(value);
  return out;
}

function setAttrs(el: Element, attrs: Record<string, unknown> | undefined) {
  if (!attrs) return;
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (key === "className" || key === "style" || key === "children") continue;
    if (key.startsWith("on") && typeof value === "function") continue;

    if (key in el) {
      try {
        (el as any)[key] = value;
        continue;
      } catch {
        // fallthrough
      }
    }
    el.setAttribute(key, String(value));
  }
}

export interface RenderDomOptions {
  registry: ComponentRegistry;
  context?: StyleContext;
}

export interface RenderDomResult {
  root: HTMLElement;
  update(nextProps?: Record<string, unknown>, nextSlots?: Record<string, SlotValue>): void;
  destroy(): void;
}

export function renderDomComponent(
  name: string,
  props: Record<string, unknown> | undefined,
  slots: Record<string, SlotValue> | undefined,
  options: RenderDomOptions
): RenderDomResult {
  const { registry, context } = options;

  const found = registry.get(name);
  if (!found) throw new Error(`Unknown component '${name}'`);
  const rootSpec: AnyComponentSpec = found;

  const partElements = new Map<string, HTMLElement>();

  let currentProps: Record<string, unknown> = { ...(props ?? {}) };
  let currentSlots: Record<string, SlotValue> = { ...(slots ?? {}) };

  // behavior runtime
  const behaviorRuntime = createBehaviorRuntime(
    rootSpec.layer === "core" ? undefined : rootSpec.behavior,
    {
    getExternalProps: () => currentProps,
    onStateChange: () => {
      applyDiff();
    },
    }
  );

  let outsideListenerCleanup: (() => void) | null = null;

  const root = renderBySpec(rootSpec, undefined, undefined);
  if (!(root instanceof HTMLElement)) {
    throw new Error("Root of component must be an HTMLElement");
  }

  bindBehavior();
  applyDiff();

  function renderBySpec(
    componentSpec: AnyComponentSpec,
    rootExtras: UnknownProps | undefined,
    parentStack: readonly string[] | undefined
  ): Node {
    const stack = [...(parentStack ?? []), componentSpec.name];
    if (parentStack?.includes(componentSpec.name)) {
      throw new Error(`Circular component reference detected: ${stack.join(" -> ")}`);
    }

    const rawProps = currentProps as UnknownProps;
    const { styleProps: userStyleProps, domProps: rawDomProps } = splitProps(rawProps);

    const variantKeys = getVariantKeys(componentSpec);
    const dataPropKeys = componentSpec.dataProps ?? [];
    const keysToFilter = [...variantKeys, ...dataPropKeys];

    const domProps = { ...(rawDomProps as UnknownProps) };
    for (const k of keysToFilter) {
      if (k in domProps) delete domProps[k];
    }

    const effectiveState = behaviorRuntime.getState() as Record<string, unknown>;
    const effectiveProps: UnknownProps = { ...rawProps, ...effectiveState };

    // apply component-level vars (e.g. slider)
    if (componentSpec.name === "Slider") {
      const v = effectiveProps.value;
      if (typeof v === "number" && Number.isFinite(v)) {
        effectiveProps.__vars = { "--slider-value": `${Math.min(100, Math.max(0, v))}%` };
      }
    }

    const partStyles = resolvePartStyles(componentSpec, effectiveProps, userStyleProps);

    function renderNode(node: NodeSpec, extraForThisNode?: UnknownProps): Node {
      if (node.kind === "slot") {
        const slotNode = node as SlotNodeSpec;
        const normalized = normalizeSlots(currentSlots, rawProps.children as SlotValue | undefined);
        const value = normalized[slotNode.slot] as SlotValue;
        const children = flattenSlotValue(value);
        if (children.length === 0) return document.createTextNode("");
        if (children.length === 1) {
          const only = children[0]!;
          return typeof only === "string" ? document.createTextNode(only) : only;
        }
        const frag = document.createDocumentFragment();
        for (const c of children) frag.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
        return frag;
      }

      if (node.kind === "component") {
        const childSpec = registry.get(node.component);
        if (!childSpec) throw new Error(`Unknown component reference '${node.component}'`);
        if (stack.includes(childSpec.name)) {
          throw new Error(`Circular component reference detected: ${[...stack, childSpec.name].join(" -> ")}`);
        }

        const nodeProps = (node.props ?? {}) as UnknownProps;

        // Styles for a component node are applied to the referenced component root.
        const partStyleProps = partStyles[node.part] ?? {};

        // Render child component with overridden props/slots
        const prevProps = currentProps;
        const prevSlots = currentSlots;
        currentProps = { ...prevProps, ...nodeProps };
        currentSlots = { ...prevSlots, children: (node.children ?? []).map((c) => renderNode(c as NodeSpec)) };

        const childRootNode = renderBySpec(childSpec, extraForThisNode, stack);

        currentProps = prevProps;
        currentSlots = prevSlots;

        if (childRootNode instanceof HTMLElement) {
          // store per-part element mapping to allow direct style updates on child root
          partElements.set(node.part, childRootNode);
          applyStyles(childRootNode, partStyleProps as Partial<StyleProps>, { context });
        }

        return childRootNode;
      }

      // element
      const el = document.createElement(node.tag as string);
      if (!(el instanceof HTMLElement)) {
        return el;
      }

      partElements.set(node.part, el);

      const attrs = (node.attrs ?? {}) as UnknownProps;
      const merged = { ...(attrs ?? {}), ...(extraForThisNode ?? {}) };

      setAttrs(el, merged);

      const stylePropsForPart = partStyles[node.part] ?? {};
      applyStyles(el, stylePropsForPart as Partial<StyleProps>, { context });

      const renderedChildren = (node.children ?? []).map((c) => renderNode(c as NodeSpec));
      for (const child of renderedChildren) {
        el.appendChild(child);
      }

      return el;
    }

    const rootNode = renderNode(componentSpec.tree as unknown as NodeSpec, rootExtras);

    if (rootNode instanceof HTMLElement) {
      // Apply vars on root if provided
      const vars = effectiveProps.__vars;
      if (isObject(vars)) {
        for (const [k, v] of Object.entries(vars)) {
          if (v === undefined || v === null) continue;
          rootNode.style.setProperty(k, String(v));
        }
      }
    }

    return rootNode;
  }

  function bindBehavior() {
    // Bind part events
    const specBindings: Record<string, PartBindings> | undefined =
      rootSpec.layer === "core" ? undefined : (rootSpec.behavior?.bindings as Record<string, PartBindings> | undefined);

    if (!specBindings) return;

    const cleanups: Array<() => void> = [];

    for (const [partName, bindings] of Object.entries(specBindings)) {
      const el = partElements.get(partName);
      if (!el) continue;

      for (const [eventName, binding] of Object.entries(bindings as PartBindings)) {
        if (!binding) continue;

        if (eventName === "onClickOutside") {
          continue;
        }

        const eventBinding = typeof binding === "string" ? { action: binding } : binding;

        const domEvent = eventName.replace(/^on/, "").toLowerCase();
        const handler = (ev: Event) => {
          if (eventBinding.preventDefault) ev.preventDefault();
          if (eventBinding.stopPropagation) ev.stopPropagation();

          if (eventName === "onKeyDown" && eventBinding.keys) {
            const key = (ev as KeyboardEvent).key;
            if (!eventBinding.keys.includes(key)) return;
          }

          const maybeFn = eventBinding.payload as unknown;
          const payload = typeof maybeFn === "function" ? (maybeFn as (e: unknown) => unknown)(ev) : eventBinding.payload;
          behaviorRuntime.dispatch(eventBinding.action, payload ?? ev);
        };

        el.addEventListener(domEvent, handler as EventListener);
        cleanups.push(() => el.removeEventListener(domEvent, handler as EventListener));
      }
    }

    // onClickOutside (single document listener)
    const partsWithOutside = Object.entries(specBindings)
      .filter(([, b]) => Boolean((b as PartBindings).onClickOutside))
      .map(([partName]) => partName);

    if (partsWithOutside.length > 0) {
      const handler = (ev: PointerEvent) => {
        const target = ev.target as Node | null;
        if (!target) return;
        for (const partName of partsWithOutside) {
          const el = partElements.get(partName);
          if (!el) continue;
          if (el.contains(target)) continue;

          const binding = (specBindings[partName] as PartBindings).onClickOutside;
          if (!binding) continue;
          const eventBinding = typeof binding === "string" ? { action: binding } : binding;

          if (eventBinding.preventDefault) ev.preventDefault();
          if (eventBinding.stopPropagation) ev.stopPropagation();

          const maybeFn = eventBinding.payload as unknown;
          const payload = typeof maybeFn === "function" ? (maybeFn as (e: unknown) => unknown)(ev) : eventBinding.payload;
          behaviorRuntime.dispatch(eventBinding.action, payload ?? ev);
        }
      };

      document.addEventListener("pointerdown", handler, true);
      outsideListenerCleanup = () => document.removeEventListener("pointerdown", handler, true);
    }

    outsideListenerCleanup = outsideListenerCleanup
      ? (() => {
          const prev = outsideListenerCleanup;
          return () => {
            prev?.();
            for (const c of cleanups) c();
          };
        })()
      : () => {
          for (const c of cleanups) c();
        };
  }

  function applyDiff() {
    // Re-resolve styles using current external props + runtime state
    const effectiveState = behaviorRuntime.getState() as Record<string, unknown>;
    const effectiveProps: UnknownProps = { ...currentProps, ...effectiveState };

    const rawProps = currentProps as UnknownProps;
    const { styleProps: userStyleProps } = splitProps(rawProps);

    if (rootSpec.name === "Slider") {
      const v = effectiveProps.value;
      if (typeof v === "number" && Number.isFinite(v)) {
        const rootEl = partElements.get("root");
        if (rootEl) rootEl.style.setProperty("--slider-value", `${Math.min(100, Math.max(0, v))}%`);
      }
    }

    const partStyles = resolvePartStyles(rootSpec, effectiveProps, userStyleProps);

    for (const [part, styleProps] of Object.entries(partStyles)) {
      const el = partElements.get(part);
      if (!el) continue;
      applyStyles(el, styleProps as Partial<StyleProps>, { context });
    }
  }

  function update(nextProps?: Record<string, unknown>, nextSlots?: Record<string, SlotValue>) {
    if (nextProps) currentProps = { ...nextProps };
    if (nextSlots) currentSlots = { ...nextSlots };

    // For now we only diff styles/vars. Slot/structure diffs are not handled here.
    // This is intentional: optimized path focuses on state/variant-driven styling updates.
    applyDiff();
  }

  function destroy() {
    outsideListenerCleanup?.();
    outsideListenerCleanup = null;
  }

  return { root, update, destroy };
}
