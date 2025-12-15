import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

// SVG <path> wrapper (no default styles)
export const CorePath = defineCoreComponent({
  name: "CorePath",
  tree: el<CoreNodeSpec>("path", {
    part: "root",
    namespace: "svg",
  }),
});
