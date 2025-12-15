import { definePartComponent, comp, slot } from "../spec";

export const Dialog = definePartComponent({
  name: "Dialog",
  tree: comp("Box", {
    part: "root",
    children: [slot("children")],
  }),
});
