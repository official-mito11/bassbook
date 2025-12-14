import { definePartComponent, el, slot } from "../spec";

export const Navigator = definePartComponent({
  name: "Navigator",
  tree: el("nav", {
    part: "root",
    children: [slot("children")],
  }),
});
