import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("IconChevronRight", { registry });

export default {
  title: "Unit/IconChevronRight",
  component: Component,
  args: {
    "size": "md",
    "strokeWidth": "medium",
  },
  argTypes: {
    "size": { control: "select", options: ["xs","sm","md","lg","xl","2xl","3xl"] },
    "strokeWidth": { control: "select", options: ["thin","medium","bold"] },
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
