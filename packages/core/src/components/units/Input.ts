import { defineUnitComponent, comp } from "../spec";

export const Input = defineUnitComponent({
  name: "Input",
  dataProps: ["size"] as const,
  tree: comp("CoreInput", {
    part: "root",
  }),
  styles: {
    base: {
      root: {
        w: "full",
        h: 36,
        px: 12,
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "#09090b",
        bg: "transparent",
        border: "1px solid #e4e4e7",
        rounded: "md",
        outline: "none",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            h: 32,
            px: 10,
            fontSize: "0.8125rem",
          },
        },
        md: {
          root: {
            h: 36,
            px: 12,
            fontSize: "0.875rem",
          },
        },
        lg: {
          root: {
            h: 40,
            px: 14,
            fontSize: "0.9375rem",
          },
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
});
