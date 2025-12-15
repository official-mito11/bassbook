import { definePartComponent, comp, slot } from "../spec";

export const View = definePartComponent({
  name: "View",
  tree: comp("Box", {
    part: "root",
    children: [slot("children")],
  }),
});
