import { defineUnitComponent, el } from "../spec";

export const Skeleton = defineUnitComponent({
  name: "Skeleton",
  tree: el("div", {
    part: "root",
  }),
  styles: {
    base: {
      root: {
        bg: "rgba(0,0,0,0.06)",
      },
    },
  },
});
