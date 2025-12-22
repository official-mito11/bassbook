import { definePartComponent, comp, slot } from "../spec";

export const Navigator = definePartComponent({
  name: "Navigator",
  dataProps: ["variant"] as const,
  tree: comp("CoreNav", {
    part: "root",
    children: [
      comp("Box", {
        part: "brand",
        children: [slot("brand")],
      }),
      comp("Box", {
        part: "items",
        children: [slot("children")],
      }),
      comp("Box", {
        part: "actions",
        children: [slot("actions")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        alignCenter: true,
        justifyBetween: true,
        w: "100%",
        px: 16,
        py: 12,
      },
      brand: {
        display: "flex",
        alignCenter: true,
        fontWeight: "semibold",
      },
      items: {
        display: "flex",
        alignCenter: true,
        gap: 8,
      },
      actions: {
        display: "flex",
        alignCenter: true,
        gap: 8,
      },
    },
    variants: {
      variant: {
        default: {
          root: {
            bg: "white",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          },
        },
        transparent: {
          root: {
            bg: "transparent",
          },
        },
        filled: {
          root: {
            bg: "primary",
            color: "white",
          },
        },
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
});
