import { defineUnitComponent, comp, slot } from "../spec";

export const Placeholder = defineUnitComponent({
  name: "Placeholder",
  tree: comp("Box", {
    part: "root",
    children: [slot("children")],
  }),
});
