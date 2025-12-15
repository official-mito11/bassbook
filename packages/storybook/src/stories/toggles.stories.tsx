import * as React from "react";

import { createComponentRegistry } from "@bassbook/core";
import type { AnyComponentSpec } from "@bassbook/core";
import * as core from "@bassbook/core";

import { createReactComponent, useToggleController } from "@bassbook/react";

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

const Checkbox = createReactComponent("Checkbox", { registry });
const Radio = createReactComponent("Radio", { registry });
const Switch = createReactComponent("Switch", { registry });

export default {
  title: "Unit/Toggles",
};

export function CheckboxBasic() {
  const [checked, setChecked] = React.useState(false);
  const toggle = useToggleController({ checked, onCheckedChange: setChecked });

  return React.createElement(
    "div",
    { style: { padding: 24, display: "grid", gap: 12 } },
    React.createElement(Checkbox as any, { ...toggle.props, children: "Checkbox" } as any),
    React.createElement("div", null, `checked: ${String(checked)}`)
  );
}

export function RadioBasic() {
  const [checked, setChecked] = React.useState(false);
  const toggle = useToggleController({ checked, onCheckedChange: setChecked });

  return React.createElement(
    "div",
    { style: { padding: 24, display: "grid", gap: 12 } },
    React.createElement(Radio as any, { ...toggle.props, children: "Radio" } as any),
    React.createElement("div", null, `checked: ${String(checked)}`)
  );
}

export function SwitchBasic() {
  const [checked, setChecked] = React.useState(false);
  const toggle = useToggleController({ checked, onCheckedChange: setChecked });

  return React.createElement(
    "div",
    { style: { padding: 24, display: "grid", gap: 12 } },
    React.createElement(Switch as any, { ...toggle.props, children: "Switch" } as any),
    React.createElement("div", null, `checked: ${String(checked)}`)
  );
}
