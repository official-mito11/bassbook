import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Switch", { registry });

export default {
  title: "Unit/Switch",
  component: Component,
  args: {
    checked: false,
    disabled: false,
    size: "md",
    children: "Switch",
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export function Playground(args: any) {
  return React.createElement(
    "div",
    { style: { padding: 24, display: "grid", gap: 12 } },
    React.createElement(Component as any, args as any),
    React.createElement(
      "pre",
      {
        style: {
          fontSize: 12,
          background: "#0b1020",
          color: "#e2e8f0",
          padding: 12,
          borderRadius: 8,
          overflow: "auto",
        },
      },
      '{\n  "root": {\n    "onClick": "toggle",\n    "onKeyDown": {\n      "action": "toggle",\n      "keys": [\n        "Enter",\n        " "\n      ],\n      "preventDefault": true\n    }\n  }\n}'
    )
  );
}
