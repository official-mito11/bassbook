import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Box = defineCoreComponent({
  name: "Box",
  tree: el<CoreNodeSpec>("div", {
    part: "root",
    children: [slot("children")],
  }),
});
