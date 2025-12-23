import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Placeholder", { registry });

export default {
  title: "Unit/Placeholder",
  component: Component,
  args: {
    "variant": "loading",
    children: "Placeholder",
  },
  argTypes: {
    "variant": { control: "select", options: ["loading","empty","error"] },
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
