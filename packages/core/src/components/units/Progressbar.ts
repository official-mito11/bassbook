import { defineUnitComponent, el } from "../spec";

export const Progressbar = defineUnitComponent({
  name: "Progressbar",
  tree: el("progress", {
    part: "root",
  }),
});
