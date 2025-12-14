import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Text = defineCoreComponent({
  name: "Text",
  tree: el<CoreNodeSpec>("span", {
    part: "root",
    children: [slot("children")],
  }),
});
