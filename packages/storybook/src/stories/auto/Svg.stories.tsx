import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Svg", { registry });

export default {
  title: "Core/Svg",
  component: Component,
  args: {
    children: "Svg",
  },
  argTypes: {
    viewBox: {
      control: "select",
      options: ["0-0-24-24", "0-0-20-20", "0-0-16-16", "0-0-12-12", "0-0-32-32", "0-0-48-48"],
    },
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
