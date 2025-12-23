import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Link = defineCoreComponent({
  name: "Link",
  tree: el<CoreNodeSpec>("a", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});
