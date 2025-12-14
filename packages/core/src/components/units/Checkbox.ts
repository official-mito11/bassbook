import { defineUnitComponent, comp } from "../spec";

export const Checkbox = defineUnitComponent({
  name: "Checkbox",
  tree: comp("CoreInput", {
    part: "root",
    props: {
      type: "checkbox",
    },
  }),
});
