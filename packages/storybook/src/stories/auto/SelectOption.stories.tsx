import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("SelectOption", { registry });

export default {
  title: "Unit/SelectOption",
  component: Component,
  args: {
    "selected": false,
    "disabled": false,
    children: "SelectOption",
  },
  argTypes: {
    "selected": { control: "boolean" },
    "disabled": { control: "boolean" },
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
