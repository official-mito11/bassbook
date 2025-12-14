import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const TextArea = defineCoreComponent({
  name: "TextArea",
  tree: el<CoreNodeSpec>("textarea", {
    part: "root",
    children: [slot("children")],
  }),
});
