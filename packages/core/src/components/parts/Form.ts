import { definePartComponent, comp, slot } from "../spec";

export const Form = definePartComponent({
  name: "Form",
  tree: comp("CoreForm", {
    part: "root",
    children: [slot("children")],
  }),
});
