import { defineUnitComponent, comp, slot } from "../spec";

export const SelectHeader = defineUnitComponent({
  name: "SelectHeader",
  tree: comp("Box", {
    part: "root",
    children: [
      comp("Text", {
        part: "label",
        children: [slot("children")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        px: 12,
        py: 4,
      },
      label: {
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "muted-foreground",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        display: "block",
      },
    },
  },
});