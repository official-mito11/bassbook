import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Label = defineCoreComponent({
  name: "Label",
  tree: el<CoreNodeSpec>("label", {
    part: "root",
    children: [slot("children")],
  }),
});
