import { defineUnitComponent, comp, slot } from "../spec";

export const Button = defineUnitComponent({
  name: "Button",
  tree: comp("CoreButton", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "inline-flex",
        alignCenter: true,
        justifyCenter: true,
        rounded: "md",
        fontWeight: "medium",
        transition: "all 150ms ease",
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            px: 12,
            py: 6,
            fontSize: "0.875rem",
          },
        },
        md: {
          root: {
            px: 16,
            py: 8,
            fontSize: "1rem",
          },
        },
        lg: {
          root: {
            px: 24,
            py: 12,
            fontSize: "1.125rem",
          },
        },
      },
      variant: {
        primary: {
          root: {
            bg: "primary",
            color: "white",
          },
        },
        secondary: {
          root: {
            bg: "secondary",
            color: "white",
          },
        },
        outline: {
          root: {
            border: "1px solid currentColor",
            bg: "transparent",
          },
        },
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  },
});
