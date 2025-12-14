import { defineUnitComponent, comp } from "../spec";

export const Input = defineUnitComponent({
  name: "Input",
  tree: comp("CoreInput", {
    part: "root",
  }),
  styles: {
    base: {
      root: {
        w: "full",
      },
    },
  },
});
