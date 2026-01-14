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
        h: 40,
        px: 14,
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "foreground",
        bg: "background",
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: "border",
        rounded: "lg",
        outline: "none",
        transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        shadow: "sm",
        _placeholder: {
          color: "muted-foreground",
        },
        _focus: {
          borderColor: "primary",
          shadow: "md",
        },
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            h: 36,
            px: 12,
            fontSize: "0.8125rem",
          },
        },
        md: {
          root: {
            h: 40,
            px: 14,
            fontSize: "0.875rem",
          },
        },
        lg: {
          root: {
            h: 44,
            px: 16,
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
