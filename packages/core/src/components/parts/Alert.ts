import { definePartComponent, comp, slot } from "../spec";

export const Alert = definePartComponent({
  name: "Alert",
  tree: comp("Box", {
    part: "root",
    children: [slot("children")],
  }),
});
