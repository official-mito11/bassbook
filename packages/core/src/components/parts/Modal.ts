import { definePartComponent, el, slot } from "../spec";

export const Modal = definePartComponent({
  name: "Modal",
  tree: el("div", {
    part: "root",
    children: [slot("children")],
  }),
});
