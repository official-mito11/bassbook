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
        rounded: "lg",
        fontWeight: 600,
        fontSize: "0.875rem",
        lineHeight: 1,
        transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        selectNone: true,
        border: "none",
        outline: "none",
        letterSpacing: "-0.01em",
        shadow: "sm",
        _hover: {
          shadow: "md",
          transform: "translateY(-1px)",
        },
        _active: {
          transform: "translateY(0)",
          shadow: "sm",
        },
      },
    },
    variants: {
      size: {
        sm: {
          root: {
            h: 36,
            px: 14,
            fontSize: "0.8125rem",
          },
        },
        md: {
          root: {
            h: 40,
            px: 18,
            fontSize: "0.875rem",
          },
        },
        lg: {
          root: {
            h: 44,
            px: 24,
            fontSize: "0.9375rem",
          },
        },
      },
      variant: {
        default: {
          root: {
            bg: "primary",
            color: "primary-foreground",
            _hover: {
              bg: "#2563eb",
            },
          },
        },
        secondary: {
          root: {
            bg: "muted",
            color: "foreground",
            _hover: {
              bg: "#e5e7eb",
            },
          },
        },
        outline: {
          root: {
            bg: "background",
            color: "foreground",
            borderWidth: 1.5,
            borderStyle: "solid",
            borderColor: "border",
            shadow: "none",
            _hover: {
              bg: "muted",
              borderColor: "#d1d5db",
            },
          },
        },
        ghost: {
          root: {
            bg: "transparent",
            color: "foreground",
            shadow: "none",
            _hover: {
              bg: "muted",
            },
          },
        },
        destructive: {
          root: {
            bg: "#ef4444",
            color: "white",
            _hover: {
              bg: "#dc2626",
            },
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
