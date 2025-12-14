import { defineUnitComponent, comp } from "../spec";

export const Switch = defineUnitComponent({
  name: "Switch",
  tree: comp("CoreInput", {
    part: "root",
    props: {
      type: "checkbox",
      role: "switch",
    },
  }),
});
