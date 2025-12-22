import { definePartComponent, comp, slot } from "../spec";

export const Form = definePartComponent({
  name: "Form",
  dataProps: ["layout"] as const,
  tree: comp("CoreForm", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        flexColumn: true,
        gap: 16,
        w: "100%",
      },
    },
    variants: {
      layout: {
        vertical: {
          root: {
            flexColumn: true,
          },
        },
        horizontal: {
          root: {
            flexRow: true,
            flexWrap: "wrap",
            alignEnd: true,
          },
        },
      },
    },
    defaultVariants: {
      layout: "vertical",
    },
  },
});
