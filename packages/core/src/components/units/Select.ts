import { defineUnitComponent, el, slot } from "../spec";

export const Select = defineUnitComponent({
  name: "Select",
  tree: el("select", {
    part: "root",
    children: [slot("children")],
  }),
});
