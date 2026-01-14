import { defineUnitComponent, comp, slot } from "../spec";

export const SelectHeader = defineUnitComponent({
  name: "SelectHeader",
  dataProps: ["variant", "centered"] as const,
  tree: comp("Box", {
    part: "root",
    children: [
      comp("Divider", {
        part: "lineLeft",
      }),
      comp("Text", {
        part: "label",
        children: [slot("children")],
      }),
      comp("Divider", {
        part: "lineRight",
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        px: 12,
        py: 4,
      },
      label: {
        fontSize: "0.65rem",
        fontWeight: 600,
        color: "muted-foreground",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        display: "block",
      },
      lineLeft: {
        display: "none",
        my: 2,
        flex: 1,
      },
      lineRight: {
        display: "none",
        my: 2,
        flex: 1,
      },
    },
    variants: {
      variant: {
        default: {},
        line: {
          lineLeft: {
            display: "block",
          },
          lineRight: {
            display: "block",
          },
        },
        dotted: {
          lineLeft: {
            display: "block",
            borderTopStyle: "dotted",
          },
          lineRight: {
            display: "block",
            borderTopStyle: "dotted",
          },
        },
      },
      centered: {
        true: {
          root: {
            justifyContent: "center",
          },
          label: {
            textAlign: "center",
            flex: 0,
          },
        },
        false: {
          root: {
            justifyContent: "flex-start",
          },
          label: {
            textAlign: "left",
            flex: 1,
          },
          lineLeft: {
            display: "none",
          },
        },
      },
    },
    defaultVariants: {
      variant: "default",
      centered: "false",
    },
  },
});
