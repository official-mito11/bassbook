import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Modal", { registry });

export default {
  title: "Part/Modal",
  component: Component,
  args: {
    "open": false,
    children: "Modal",
  },
  argTypes: {
    "open": { control: "boolean" },
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
