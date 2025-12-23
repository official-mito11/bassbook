import { createComponentRegistry } from "@bassbook/core";
import type { AnyComponentSpec } from "@bassbook/core";
import * as core from "@bassbook/core";

function isComponentSpec(value: unknown): value is AnyComponentSpec {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.layer === "core" || v.layer === "unit" || v.layer === "part") &&
    typeof v.name === "string" &&
    typeof v.tree === "object" &&
    v.tree !== null
  );
}

export const registry = createComponentRegistry();
registry.registerAll((Object.values(core) as unknown[]).filter(isComponentSpec));
