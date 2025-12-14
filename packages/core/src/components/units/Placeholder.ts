import { defineUnitComponent, el, slot } from "../spec";

export const Placeholder = defineUnitComponent({
  name: "Placeholder",
  tree: el("div", {
    part: "root",
    children: [slot("children")],
  }),
});
