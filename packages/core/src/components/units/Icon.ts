import { defineUnitComponent, comp, slot } from "../spec";

export const Icon = defineUnitComponent({
  name: "Icon",
  dataProps: ["size"] as const,
  tree: comp("Svg", {
    part: "root",
    props: {
      "aria-hidden": true,
      viewBox: "0 0 24 24",
    },
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "inline-block",
        flexShrink: 0,
        color: "currentColor",
      },
    },
    variants: {
      size: {
        xs: {
          root: { w: 12, h: 12 },
        },
        sm: {
          root: { w: 16, h: 16 },
        },
        md: {
          root: { w: 20, h: 20 },
        },
        lg: {
          root: { w: 24, h: 24 },
        },
        xl: {
          root: { w: 32, h: 32 },
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
});
