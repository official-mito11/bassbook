import { definePartComponent, comp, slot } from "../spec";

export const Sheet = definePartComponent({
  name: "Sheet",
  tree: comp("Box", {
    part: "root",
    children: [slot("children")],
  }),
});
