import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("SelectHeader", { registry });

export default {
  title: "Unit/SelectHeader",
  component: Component,
  args: {
    "variant": "default",
    "centered": false,
    children: "SelectHeader",
  },
  argTypes: {
    "variant": { control: "select", options: ["default","line","dotted"] },
    "centered": { control: "boolean" },
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
