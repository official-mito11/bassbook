import { defineUnitComponent, comp } from "../spec";

export const Radio = defineUnitComponent({
  name: "Radio",
  tree: comp("CoreInput", {
    part: "root",
    props: {
      type: "radio",
    },
  }),
});
