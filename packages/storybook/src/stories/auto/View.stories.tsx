import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("View", { registry });

export default {
  title: "Part/View",
  component: Component,
  args: {
    centered: false,
    scrollable: false,
    children: "View",
  },
  argTypes: {
    centered: { control: "boolean" },
    scrollable: { control: "boolean" },
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
