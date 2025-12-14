import { definePartComponent, el, slot } from "../spec";

export const Dialog = definePartComponent({
  name: "Dialog",
  tree: el("div", {
    part: "root",
    children: [slot("children")],
  }),
});
