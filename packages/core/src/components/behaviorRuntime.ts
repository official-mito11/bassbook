import type {
  ComponentBehavior,
  StateSchema,
  EventBinding,
  PartBindings,
} from "./spec";

type StateValuesFromSchema<S extends StateSchema> = {
  [K in keyof S]: S[K] extends { type: "boolean" }
    ? boolean
    : S[K] extends { type: "number" }
      ? number
      : S[K] extends { type: "string" }
        ? string
        : unknown;
};

export interface BehaviorRuntimeOptions {
  getExternalProps: () => Record<string, unknown>;
  onStateChange?: () => void;
}

export interface BehaviorRuntimeResult<S extends StateSchema> {
  getState(): Partial<StateValuesFromSchema<S>>;
  dispatch(actionName: string, payload?: unknown): void;
  getPartEventBinding(partName: string, eventName: keyof PartBindings): EventBinding | null;
}

function normalizeEventBinding(binding: string | EventBinding): EventBinding {
  return typeof binding === "string" ? { action: binding } : binding;
}

export function createBehaviorRuntime<S extends StateSchema>(
  behavior: ComponentBehavior<S> | undefined,
  options: BehaviorRuntimeOptions
): BehaviorRuntimeResult<S> {
  const stateSchema = behavior?.state;
  const actions = behavior?.actions;
  const bindings = behavior?.bindings;
  const controlledProps = behavior?.controlledProps;

  const internalState: Record<string, unknown> = {};
  if (stateSchema) {
    for (const [key, def] of Object.entries(stateSchema)) {
      internalState[key] = def.default;
    }
  }

  function getState(): Partial<StateValuesFromSchema<S>> {
    const externalProps = options.getExternalProps();
    const result: Record<string, unknown> = { ...internalState };

    if (controlledProps && stateSchema) {
      for (const [stateKey, propDef] of Object.entries(controlledProps)) {
        if (propDef.prop in externalProps) {
          result[stateKey] = externalProps[propDef.prop];
        }
      }
    }

    return result as Partial<StateValuesFromSchema<S>>;
  }

  function dispatch(actionName: string, payload?: unknown): void {
    if (!actions || !(actionName in actions)) {
      return;
    }

    const externalProps = options.getExternalProps();
    const current = getState() as unknown as { [K in keyof S]: S[K]["default"] };

    const actionFn = actions[actionName];
    if (!actionFn) return;

    const updates = actionFn(current, payload) as Record<string, unknown>;

    if (controlledProps) {
      for (const [stateKey, newValue] of Object.entries(updates)) {
        const propDef = controlledProps[stateKey];
        if (propDef && propDef.prop in externalProps) {
          const onChange = externalProps[propDef.onChange];
          if (typeof onChange === "function") {
            onChange(newValue);
          }
        } else {
          internalState[stateKey] = newValue;
        }
      }
    } else {
      for (const [k, v] of Object.entries(updates)) {
        internalState[k] = v;
      }
    }

    options.onStateChange?.();
  }

  function getPartEventBinding(partName: string, eventName: keyof PartBindings): EventBinding | null {
    if (!bindings) return null;
    const part = bindings[partName];
    if (!part) return null;
    const b = (part as PartBindings)[eventName];
    if (!b) return null;
    return normalizeEventBinding(b);
  }

  return {
    getState,
    dispatch,
    getPartEventBinding,
  };
}
