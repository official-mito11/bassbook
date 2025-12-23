import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Form", { registry });

export default {
  title: "Part/Form",
  component: Component,
  args: {
    "layout": "vertical",
    children: "Form",
  },
  argTypes: {
    "layout": { control: "select", options: ["vertical","horizontal"] },
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
