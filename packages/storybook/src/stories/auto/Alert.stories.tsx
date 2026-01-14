import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Alert", { registry });

export default {
  title: "Part/Alert",
  component: Component,
  args: {
    variant: "info",
    children: "Alert",
  },
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
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
