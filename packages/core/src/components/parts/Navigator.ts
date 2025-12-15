import { definePartComponent, comp, slot } from "../spec";

export const Navigator = definePartComponent({
  name: "Navigator",
  tree: comp("CoreNav", {
    part: "root",
    children: [slot("children")],
  }),
});
