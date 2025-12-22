import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const CoreButton = defineCoreComponent({
  name: "CoreButton",
  tree: el<CoreNodeSpec>("button", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        border: "none",
        outline: "none",
        cursor: "pointer",
      },
    },
  },
});
