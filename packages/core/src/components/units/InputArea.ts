import { defineUnitComponent, comp, slot } from "../spec";

export const InputArea = defineUnitComponent({
  name: "InputArea",
  tree: comp("TextArea", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        w: "full",
      },
    },
  },
});
