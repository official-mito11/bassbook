import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Divider = defineCoreComponent({
  name: "Divider",
  tree: el<CoreNodeSpec>("hr", {
    part: "root",
  }),
});
