import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("Select", { registry });

export default {
  title: "Unit/Select",
  component: Component,
  args: {
    "open": false,
    "disabled": false,
    "size": "md",
  },
  argTypes: {
    "open": { control: "boolean" },
    "disabled": { control: "boolean" },
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
      "{\n  \"trigger\": {\n    \"onClick\": \"toggle\"\n  },\n  \"menu\": {\n    \"onClickOutside\": \"close\"\n  }\n}"
    )
  );
}
