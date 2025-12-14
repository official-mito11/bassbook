import { definePartComponent, el, slot } from "../spec";

export const View = definePartComponent({
  name: "View",
  tree: el("div", {
    part: "root",
    children: [slot("children")],
  }),
});
