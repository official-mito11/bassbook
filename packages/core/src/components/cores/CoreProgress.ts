import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const CoreProgress = defineCoreComponent({
  name: "CoreProgress",
  tree: el<CoreNodeSpec>("progress", {
    part: "root",
    children: [slot("children")],
  }),
});
