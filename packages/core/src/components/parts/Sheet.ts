import { definePartComponent, el, slot } from "../spec";

export const Sheet = definePartComponent({
  name: "Sheet",
  tree: el("div", {
    part: "root",
    children: [slot("children")],
  }),
});
