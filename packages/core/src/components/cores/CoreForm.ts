import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const CoreForm = defineCoreComponent({
  name: "CoreForm",
  tree: el<CoreNodeSpec>("form", {
    part: "root",
    children: [slot("children")],
  }),
});
