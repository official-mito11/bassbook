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
        height: "1px",
        boxSizing: "content-box",
        overflow: "hidden",
        backgroundColor: "border",
      },
    },
  },
});
