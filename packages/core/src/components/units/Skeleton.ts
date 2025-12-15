import { defineUnitComponent, comp } from "../spec";

export const Skeleton = defineUnitComponent({
  name: "Skeleton",
  tree: comp("Box", {
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
