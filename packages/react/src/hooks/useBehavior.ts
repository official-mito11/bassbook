import * as React from "react";
import type { ComponentBehavior, StateSchema, EventBinding, PartBindings } from "@bassbook/core";

type StateValues<S extends StateSchema> = {
  [K in keyof S]: S[K]["default"] extends boolean
    ? boolean
    : S[K]["default"] extends string
    ? string
    : S[K]["default"] extends number
    ? number
    : unknown;
};

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
} {
  // No behavior defined - return empty
  if (!behavior) {
    return { state: {}, partProps: {} };
  }

  const { state: stateSchema, actions, bindings, controlledProps } = behavior;

  // Initialize internal state from schema defaults
  const initialState = React.useMemo(() => {
    const init: Record<string, unknown> = {};
    if (stateSchema) {
      for (const [key, def] of Object.entries(stateSchema)) {
        init[key] = def.default;
      }
    }
    return init;
  }, []);

  const [internalState, setInternalState] = React.useState(initialState);

  // Compute effective state (controlled props override internal state)
  const effectiveState = React.useMemo(() => {
    const result = { ...internalState };
    if (controlledProps && stateSchema) {
      for (const [stateKey, propDef] of Object.entries(controlledProps)) {
        if (propDef.prop in externalProps) {
          result[stateKey] = externalProps[propDef.prop];
        }
      }
    }
    return result as Partial<StateValues<S>>;
  }, [internalState, externalProps, controlledProps, stateSchema]);

  // Create action dispatcher
  const dispatch = React.useCallback(
    (actionName: string, payload?: unknown) => {
      if (!actions || !(actionName in actions)) {
        console.warn(`Action "${actionName}" not found`);
        return;
      }

      const actionFn = actions[actionName];
      if (!actionFn) {
        console.warn(`Action "${actionName}" not found`);
        return;
      }
      const updates = actionFn(effectiveState as unknown as { [K in keyof S]: S[K]["default"] }, payload) as Record<string, unknown>;

      // Check if any updated state is controlled
      if (controlledProps) {
        for (const [stateKey, newValue] of Object.entries(updates)) {
          const propDef = controlledProps[stateKey];
          if (propDef && propDef.prop in externalProps) {
            // Call the onChange handler for controlled props
            const onChange = externalProps[propDef.onChange];
            if (typeof onChange === "function") {
              onChange(newValue);
            }
          } else {
            // Update internal state for uncontrolled
            setInternalState((prev) => ({ ...prev, [stateKey]: newValue }));
          }
        }
      } else {
        setInternalState((prev) => ({ ...prev, ...updates }));
      }
    },
    [actions, effectiveState, controlledProps, externalProps]
  );

  // Create event handlers from bindings
  const partProps = React.useMemo(() => {
    const result: Record<string, Record<string, unknown>> = {};

    if (!bindings) return result;

    for (const [partName, partBindings] of Object.entries(bindings)) {
      result[partName] = {};

      for (const [eventName, binding] of Object.entries(partBindings as PartBindings)) {
        if (!binding) continue;

        const eventBinding: EventBinding =
          typeof binding === "string" ? { action: binding } : binding;

        if (eventName === "onClickOutside") {
          // Special handling for click outside - needs ref setup
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

          dispatch(eventBinding.action, eventBinding.payload);
        };
      }
    }

    return result;
  }, [bindings, dispatch]);

  return { state: effectiveState, partProps };
}
