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
        w: 180,
        py: 8,
        px: 12,
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "foreground",
        bg: "surface",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
        rounded: "md",
        outline: "none",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        _placeholder: {
          color: "muted-foreground",
        },
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            py: 6,
            px: 10,
            fontSize: "0.8125rem",
          },
        },
        md: {
          root: {
            py: 8,
            px: 12,
            fontSize: "0.875rem",
          },
        },
        lg: {
          root: {
            py: 10,
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
