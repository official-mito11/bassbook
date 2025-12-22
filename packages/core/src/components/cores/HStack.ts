import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const HStack = defineCoreComponent({
  name: "HStack",
  tree: el<CoreNodeSpec>("div", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
    },
  },
});
