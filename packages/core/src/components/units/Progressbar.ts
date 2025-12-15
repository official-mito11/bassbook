import { defineUnitComponent, comp } from "../spec";

export const Progressbar = defineUnitComponent({
  name: "Progressbar",
  tree: comp("CoreProgress", {
    part: "root",
  }),
});
