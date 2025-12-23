import * as React from "react";

import { createReactComponent } from "@bassbook/react";
import { registry } from "./_registry";

const Component = createReactComponent("TextArea", { registry });

export default {
  title: "Core/TextArea",
  component: Component,
  args: {

    children: "TextArea",
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
