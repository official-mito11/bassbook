import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

// SVG <circle> wrapper (no default styles)
export const CoreCircle = defineCoreComponent({
  name: "CoreCircle",
  tree: el<CoreNodeSpec>("circle", {
    part: "root",
    namespace: "svg",
  }),
});
