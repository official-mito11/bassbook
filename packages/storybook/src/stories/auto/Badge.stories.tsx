import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Badge", { registry });

export default {
  title: "Unit/Badge",
  component: Component,
  args: {
    variant: "default",
    size: "md",
    children: "Badge",
  },
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "outline", "destructive"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
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
