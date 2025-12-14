import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Image = defineCoreComponent({
  name: "Image",
  tree: el<CoreNodeSpec>("img", {
    part: "root",
  }),
});
