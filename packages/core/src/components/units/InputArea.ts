import { defineUnitComponent, comp, slot } from "../spec";

export const InputArea = defineUnitComponent({
  name: "InputArea",
  dataProps: ["size"] as const,
  tree: comp("TextArea", {
    part: "root",
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        w: "full",
        px: 12,
        py: 8,
        fontSize: "0.875rem",
        lineHeight: 1.5,
        color: "foreground",
        bg: "transparent",
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
            px: 10,
            py: 6,
            fontSize: "0.8125rem",
          },
        },
        md: {
          root: {
            px: 12,
            py: 8,
            fontSize: "0.875rem",
          },
        },
        lg: {
          root: {
            px: 14,
            py: 10,
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
