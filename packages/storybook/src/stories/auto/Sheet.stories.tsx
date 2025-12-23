import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Sheet", { registry });

export default {
  title: "Part/Sheet",
  component: Component,
  args: {
    "open": false,
    "side": "right",
    children: "Sheet",
  },
  argTypes: {
    "open": { control: "boolean" },
    "side": { control: "select", options: ["left","right","top","bottom"] },
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
