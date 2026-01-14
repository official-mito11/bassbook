import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Divider", { registry });

export default {
  title: "Core/Divider",
  component: Component,
  args: {
    orientation: "horizontal",
    thickness: "thin",
    style: "solid",
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    thickness: { control: "select", options: ["thin", "medium", "thick"] },
    style: { control: "select", options: ["solid", "dashed", "dotted"] },
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
