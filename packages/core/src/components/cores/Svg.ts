import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Svg = defineCoreComponent({
  name: "Svg",
  tree: el<CoreNodeSpec>("svg", {
    part: "root",
    namespace: "svg",
    children: [slot("children")],
  }),
});
