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
        borderTop: "1px solid currentColor",
        opacity: 0.2,
        margin: 0,
        width: "100%",
      },
    },
  },
});
