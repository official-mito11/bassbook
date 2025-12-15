import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const CoreNav = defineCoreComponent({
  name: "CoreNav",
  tree: el<CoreNodeSpec>("nav", {
    part: "root",
    children: [slot("children")],
  }),
});
