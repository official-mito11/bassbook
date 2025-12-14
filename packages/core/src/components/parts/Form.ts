import { definePartComponent, el, slot } from "../spec";

export const Form = definePartComponent({
  name: "Form",
  tree: el("form", {
    part: "root",
    children: [slot("children")],
  }),
});
