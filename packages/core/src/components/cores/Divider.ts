import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Divider = defineCoreComponent({
  name: "Divider",
  tree: el<CoreNodeSpec>("hr", {
    part: "root",
  }),
  styles: {
    base: {
      root: {
        border: "none",
        margin: 0,
        width: "100%",
        boxSizing: "content-box",
        overflow: "hidden",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "border",
      },
    },
  },
});
