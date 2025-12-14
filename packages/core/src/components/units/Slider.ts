import { defineUnitComponent, comp } from "../spec";

export const Slider = defineUnitComponent({
  name: "Slider",
  tree: comp("CoreInput", {
    part: "root",
    props: {
      type: "range",
    },
  }),
});
