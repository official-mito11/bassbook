import { defineUnitComponent, comp, slot } from "../spec";

export const Badge = defineUnitComponent({
  name: "Badge",
  dataProps: ["variant", "size"] as const,
  tree: comp("Text", {
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
        fontWeight: 500,
        whiteSpace: "nowrap",
        lineHeight: 1,
      },
    },
    variants: {
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
        destructive: {
          root: {
            bg: "destructive",
            color: "destructive-foreground",
          },
        },
      },
      size: {
        sm: {
          root: {
            h: 18,
            px: 6,
            fontSize: "0.6875rem",
          },
        },
        md: {
          root: {
            h: 20,
            px: 8,
            fontSize: "0.75rem",
          },
        },
        lg: {
          root: {
            h: 24,
            px: 10,
            fontSize: "0.8125rem",
          },
        },
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
});
