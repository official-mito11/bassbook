import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Navigator", { registry });

export default {
  title: "Part/Navigator",
  component: Component,
  args: {
    "variant": "default",
    children: "Navigator",
  },
  argTypes: {
    "variant": { control: "select", options: ["default","transparent","filled"] },
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
