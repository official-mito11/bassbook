import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Slider", { registry });

export default {
  title: "Unit/Slider",
  component: Component,
  args: {
    "size": "md",
  },
  argTypes: {
    "size": { control: "select", options: ["sm","md","lg"] },
  },
};

export function Playground(args: any) {
  return React.createElement(
    "div",
    { style: { padding: 24, display: "grid", gap: 12 } },
    React.createElement(Component as any, args as any),
    React.createElement(
      "pre",
      { style: { fontSize: 12, background: "#0b1020", color: "#e2e8f0", padding: 12, borderRadius: 8, overflow: "auto" } },
      "{\n  \"root\": {\n    \"onKeyDown\": {\n      \"action\": \"step\",\n      \"keys\": [\n        \"ArrowLeft\",\n        \"ArrowDown\",\n        \"ArrowRight\",\n        \"ArrowUp\"\n      ],\n      \"preventDefault\": true\n    }\n  }\n}"
    )
  );
}
