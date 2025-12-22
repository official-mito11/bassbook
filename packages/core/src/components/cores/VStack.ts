import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const VStack = defineCoreComponent({
  name: "VStack",
  tree: el<CoreNodeSpec>("div", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
      },
    },
  },
});
