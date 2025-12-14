import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const CoreInput = defineCoreComponent({
  name: "CoreInput",
  tree: el<CoreNodeSpec>("input", {
    part: "root",
  }),
});
