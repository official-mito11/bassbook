import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("CoreButton", { registry });

export default {
  title: "Core/CoreButton",
  component: Component,
  args: {

    children: "CoreButton",
  },
  argTypes: {

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
