import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Link = defineCoreComponent({
  name: "Link",
  tree: el<CoreNodeSpec>("a", {
    part: "root",
    children: [slot("children")],
  }),
});
