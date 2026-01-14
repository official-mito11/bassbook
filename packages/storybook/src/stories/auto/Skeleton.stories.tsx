import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Skeleton", { registry });

export default {
  title: "Unit/Skeleton",
  component: Component,
  args: {
    variant: "rectangular",
  },
  argTypes: {
    variant: { control: "select", options: ["text", "circular", "rectangular"] },
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
