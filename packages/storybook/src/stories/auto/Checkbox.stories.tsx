import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Checkbox", { registry });

export default {
  title: "Unit/Checkbox",
  component: Component,
  args: {
    "checked": false,
    "disabled": false,
    "size": "md",
    children: "Checkbox",
  },
  argTypes: {
    "checked": { control: "boolean" },
    "disabled": { control: "boolean" },
    "size": { control: "select", options: ["sm","md","lg"] },
  },
};

export function Playground(args: any) {
  return React.createElement(
    "div",
    { style: { padding: 24, display: "grid", gap: 12 } },
    React.createElement(Component as any, args as any),
    null
  );
}
