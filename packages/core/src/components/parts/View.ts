import { definePartComponent, comp, slot } from "../spec";

export const View = definePartComponent({
  name: "View",
  dataProps: ["centered", "scrollable"] as const,
  tree: comp("Box", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        flexColumn: true,
        w: "100%",
        h: "100%",
        maxH: "100vh",
      },
    },
    variants: {
      centered: {
        true: {
          root: {
            alignCenter: true,
            justifyCenter: true,
          },
        },
        false: {},
      },
      scrollable: {
        true: {
          root: {
            overflowAuto: true,
          },
        },
        false: {
          root: {
            overflowHidden: true,
          },
        },
      },
    },
    defaultVariants: {
      centered: false,
      scrollable: false,
    },
  },
});
