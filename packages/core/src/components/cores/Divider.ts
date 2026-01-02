import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Divider = defineCoreComponent({
  name: "Divider",
  dataProps: ["orientation", "thickness", "length", "color", "style"] as const,
  tree: el<CoreNodeSpec>("hr", {
    part: "root",
  }),
  styles: {
    base: {
      root: {
        border: "none",
        margin: 0,
        boxSizing: "border-box",
        overflow: "hidden",
        borderTopStyle: "solid",
        borderTopColor: "border",
      },
    },
    variants: {
      orientation: {
        horizontal: {
          root: {
            width: "100%",
            borderTopWidth: "1px",
            borderLeftWidth: "0px",
            height: "auto",
            minHeight: "1px",
          },
        },
        vertical: {
          root: {
            width: "1px",
            height: "100%",
            minHeight: "1rem",
            borderTopWidth: "0px",
            borderLeftWidth: "1px",
            borderLeftStyle: "solid",
            display: "inline-block",
            verticalAlign: "middle",
          },
        },
      },
      thickness: {
        thin: {
          root: { borderTopWidth: "1px", borderLeftWidth: "1px" },
        },
        medium: {
          root: { borderTopWidth: "2px", borderLeftWidth: "2px" },
        },
        thick: {
          root: { borderTopWidth: "4px", borderLeftWidth: "4px" },
        },
      },
      style: {
        solid: {
          root: { borderTopStyle: "solid", borderLeftStyle: "solid" },
        },
        dashed: {
          root: { borderTopStyle: "dashed", borderLeftStyle: "dashed" },
        },
        dotted: {
          root: { borderTopStyle: "dotted", borderLeftStyle: "dotted" },
        },
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      thickness: "thin",
      style: "solid",
    },
  },
});
