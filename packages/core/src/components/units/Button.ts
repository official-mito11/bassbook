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
        gap: 8,
        rounded: "md",
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: 1,
        transition: "all 150ms ease",
        cursor: "pointer",
        selectNone: true,
        border: "none",
        outline: "none",
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            h: 32,
            px: 12,
            fontSize: "0.8125rem",
          },
        },
        md: {
          root: {
            h: 36,
            px: 16,
            fontSize: "0.875rem",
          },
        },
        lg: {
          root: {
            h: 40,
            px: 20,
            fontSize: "0.9375rem",
          },
        },
      },
      variant: {
        default: {
          root: {
            bg: "primary",
            color: "primary-foreground",
          },
        },
        secondary: {
          root: {
            bg: "secondary",
            color: "secondary-foreground",
          },
        },
        outline: {
          root: {
            bg: "transparent",
            color: "foreground",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "border",
          },
        },
        ghost: {
          root: {
            bg: "transparent",
            color: "foreground",
          },
        },
        destructive: {
          root: {
            bg: "destructive",
            color: "destructive-foreground",
          },
        },
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
});
