import * as React from "react";
import type {
  ComponentBehavior,
  StateSchema,
  PartBindings,
  EventBinding,
} from "@bassbook/core";
import { createBehaviorRuntime } from "@bassbook/core";

type StateValues<S extends StateSchema> = {
  [K in keyof S]: S[K]["default"] extends boolean
    ? boolean
    : S[K]["default"] extends string
    ? string
    : S[K]["default"] extends number
    ? number
    : unknown;
};

// Centralized click-outside delegation system to avoid multiple document listeners
interface ClickOutsideHandler {
  element: HTMLElement | null;
  binding: EventBinding;
  dispatch: (action: string, payload?: unknown) => void;
}

// Use array to preserve insertion order (Set does not guarantee order)
const clickOutsideHandlers: ClickOutsideHandler[] = [];
let globalListenerInstalled = false;
let globalListenerCleanup: (() => void) | null = null;

function installGlobalListener() {
  if (globalListenerInstalled) return;

  function onPointerDownCapture(ev: PointerEvent) {
    const target = ev.target as Node | null;
    if (!target) return;

    for (const handler of clickOutsideHandlers) {
      const el = handler.element;
      if (!el) continue;
      if (typeof el.contains === "function" && el.contains(target)) continue;

      if (handler.binding.preventDefault) {
        ev.preventDefault();
      }
      if (handler.binding.stopPropagation) {
        ev.stopPropagation();
      }

      const maybeFn = handler.binding.payload as unknown;
      const payload = typeof maybeFn === "function" ? (maybeFn as (e: unknown) => unknown)(ev) : handler.binding.payload;
      handler.dispatch(handler.binding.action, payload ?? ev);
    }
  }

  const doc = (globalThis as { document?: Document }).document;
  if (doc) {
    doc.addEventListener("pointerdown", onPointerDownCapture, true);
    globalListenerCleanup = () => {
      doc.removeEventListener("pointerdown", onPointerDownCapture, true);
    };
    globalListenerInstalled = true;
  }
}

function uninstallGlobalListener() {
  if (!globalListenerInstalled) return;
  globalListenerCleanup?.();
  globalListenerCleanup = null;
  globalListenerInstalled = false;
}

/**
 * Hook that implements component behavior from spec
 * Handles internal state, actions, and event bindings
 */
export function useBehavior<S extends StateSchema>(
  behavior: ComponentBehavior<S> | undefined,
  externalProps: Record<string, unknown>
): {
  state: Partial<StateValues<S>>;
  partProps: Record<string, Record<string, unknown>>;
  dispatch: (actionName: string, payload?: unknown) => void;
} {
  // No behavior defined - return empty
  if (!behavior) {
    return { state: {}, partProps: {}, dispatch: () => {} };
  }

  const externalPropsRef = React.useRef<Record<string, unknown>>(externalProps);
  externalPropsRef.current = externalProps;

  const [, forceRender] = React.useState(0);

  const runtime = React.useMemo(() => {
    return createBehaviorRuntime(behavior, {
      getExternalProps: () => externalPropsRef.current,
      onStateChange: () => forceRender((v) => v + 1),
    });
  }, [behavior]);

  const effectiveState = runtime.getState() as Partial<StateValues<S>>;

  const outsideTargetsRef = React.useRef<Record<string, HTMLElement | null>>({});
  const outsideBindingsRef = React.useRef<Record<string, EventBinding>>({});

  const handlerRef = React.useRef<ClickOutsideHandler | null>(null);

  // Create event handlers from bindings
  const partProps = React.useMemo(() => {
    const result: Record<string, Record<string, unknown>> = {};

    const bindings = behavior.bindings;
    if (!bindings) return result;

    outsideBindingsRef.current = {};

    for (const [partName, partBindings] of Object.entries(bindings)) {
      result[partName] = {};

      for (const [eventName, binding] of Object.entries(partBindings as PartBindings)) {
        if (!binding) continue;

        const eventBinding: EventBinding =
          typeof binding === "string" ? { action: binding } : binding;

        if (eventName === "onClickOutside") {
          outsideBindingsRef.current[partName] = eventBinding;
          result[partName]["ref"] = (node: unknown) => {
            outsideTargetsRef.current[partName] = (node as HTMLElement | null) ?? null;
          };
          continue;
        }

        result[partName][eventName] = (ev: React.SyntheticEvent) => {
          if (eventBinding.preventDefault) {
            ev.preventDefault();
          }
          if (eventBinding.stopPropagation) {
            ev.stopPropagation();
          }

          // For keyboard events, check if key matches
          if (eventName === "onKeyDown" && eventBinding.keys) {
            const keyEvent = ev as React.KeyboardEvent;
            if (!eventBinding.keys.includes(keyEvent.key)) {
              return;
            }
          }

          const maybeFn = eventBinding.payload as unknown;
          const payload = typeof maybeFn === "function" ? (maybeFn as (e: unknown) => unknown)(ev) : eventBinding.payload;
          runtime.dispatch(eventBinding.action, payload ?? ev);
        };
      }
    }

    return result;
  }, [behavior.bindings, runtime]);

  React.useEffect(() => {
    const hasOutsideBindings = Object.keys(outsideBindingsRef.current).length > 0;
    if (!hasOutsideBindings) return;

    // Create handler for this component
    const handler: ClickOutsideHandler = {
      get element() {
        // Dynamically get the latest element for each part
        const elements: Record<string, HTMLElement | null> = {};
        for (const partName of Object.keys(outsideBindingsRef.current)) {
          elements[partName] = outsideTargetsRef.current[partName] ?? null;
        }
        // Return the first element that contains the target (for click-outside detection)
        return Object.values(elements)[0] ?? null;
      },
      get binding() {
        const values = Object.values(outsideBindingsRef.current);
        return values[0] as EventBinding;
      },
      dispatch: runtime.dispatch.bind(runtime),
    };

    handlerRef.current = handler;
    clickOutsideHandlers.push(handler);
    installGlobalListener();

    return () => {
      const index = clickOutsideHandlers.indexOf(handler);
      if (index > -1) clickOutsideHandlers.splice(index, 1);
      if (clickOutsideHandlers.length === 0) {
        uninstallGlobalListener();
      }
    };
  }, [runtime]);

  return { state: effectiveState, partProps, dispatch: runtime.dispatch };
}
