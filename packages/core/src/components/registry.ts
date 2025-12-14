import type { AnyComponentSpec, ComponentLayer } from "./spec";
import type { SpecResolver, ValidationResult } from "./validate";
import { validateComponentSpecs } from "./validate";

export interface ComponentRegistry extends SpecResolver {
  register(spec: AnyComponentSpec): void;
  registerAll(specs: AnyComponentSpec[]): void;
  all(): AnyComponentSpec[];
  byLayer(layer: ComponentLayer): AnyComponentSpec[];
  validate(): ValidationResult;
}

export function createComponentRegistry(): ComponentRegistry {
  const map = new Map<string, AnyComponentSpec>();

  const registry: ComponentRegistry = {
    get(name: string) {
      return map.get(name);
    },

    register(spec: AnyComponentSpec) {
      if (map.has(spec.name)) {
        throw new Error(`Component already registered: ${spec.name}`);
      }
      map.set(spec.name, spec);
    },

    registerAll(specs: AnyComponentSpec[]) {
      for (const spec of specs) {
        this.register(spec);
      }
    },

    all() {
      return Array.from(map.values());
    },

    byLayer(layer: ComponentLayer) {
      return this.all().filter((spec) => spec.layer === layer);
    },

    validate() {
      return validateComponentSpecs(this.all(), this);
    },
  };

  return registry;
}
