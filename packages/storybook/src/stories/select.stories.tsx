import * as React from "react";

import { createComponentRegistry } from "@bassbook/core";
import type { AnyComponentSpec } from "@bassbook/core";
import * as core from "@bassbook/core";

import { createReactComponent, useSelectController } from "@bassbook/react";

function isComponentSpec(value: unknown): value is AnyComponentSpec {
  return Boolean(
    value &&
      typeof value === "object" &&
      "layer" in (value as any) &&
      "name" in (value as any) &&
      "tree" in (value as any)
  );
}

// Build registry from all exported specs in @bassbook/core.
const registry = createComponentRegistry();
registry.registerAll(Object.values(core).filter(isComponentSpec));

const Select = createReactComponent("Select", { registry });
const SelectOption = createReactComponent("SelectOption", { registry });

export default {
  title: "Unit/Select",
};

export function Basic() {
  const items = React.useMemo(
    () => [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "grape", label: "Grape" },
      { value: "disabled", label: "Disabled option", disabled: true },
    ],
    []
  );

  const [value, setValue] = React.useState<string | undefined>("apple");

  const controller = useSelectController({
    items,
    value,
    onValueChange: setValue,
    placeholder: "Select a fruit",
    components: { SelectOption },
  });

  return React.createElement(
    "div",
    { style: { padding: 24, display: "grid", gap: 12 } },
    React.createElement(Select as any, controller.props as any),
    React.createElement("div", null, `value: ${value ?? "(none)"}`)
  );
}
