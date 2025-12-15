import { definePartComponent, comp, slot } from "../spec";

export const Modal = definePartComponent({
  name: "Modal",
  tree: comp("Box", {
    part: "root",
    children: [slot("children")],
  }),
});
