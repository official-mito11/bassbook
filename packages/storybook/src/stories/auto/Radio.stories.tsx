import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Radio", { registry });

export default {
  title: "Unit/Radio",
  component: Component,
  args: {
    checked: false,
    disabled: false,
    size: "md",
    children: "Radio",
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
      '{\n  "root": {\n    "onClick": "select",\n    "onKeyDown": {\n      "action": "select",\n      "keys": [\n        "Enter",\n        " "\n      ],\n      "preventDefault": true\n    }\n  }\n}'
    )
  );
}
