import { definePartComponent, comp, slot } from "../spec";

export const View = definePartComponent({
  name: "View",
  dataProps: ["padding", "centered", "scrollable"] as const,
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
        minH: "100%",
      },
    },
    variants: {
      padding: {
        none: {
          root: { p: 0 },
        },
        sm: {
          root: { p: 8 },
        },
        md: {
          root: { p: 16 },
        },
        lg: {
          root: { p: 24 },
        },
        xl: {
          root: { p: 32 },
        },
      },
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
      padding: "md",
      centered: "false",
      scrollable: "false",
    },
  },
});
