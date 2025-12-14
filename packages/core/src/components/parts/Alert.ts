import { definePartComponent, el, slot } from "../spec";

export const Alert = definePartComponent({
  name: "Alert",
  tree: el("div", {
    part: "root",
    children: [slot("children")],
  }),
});
