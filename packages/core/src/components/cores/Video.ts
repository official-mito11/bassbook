import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Video = defineCoreComponent({
  name: "Video",
  tree: el<CoreNodeSpec>("video", {
    part: "root",
    children: [slot("children")],
  }),
});
