import { defineUnitComponent, comp, slot } from "../spec";

export const Placeholder = defineUnitComponent({
  name: "Placeholder",
  dataProps: ["variant"] as const,
  keyframes: {
    spin: {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  },
  tree: comp("Box", {
    part: "root",
    children: [
      comp("Box", {
        part: "spinner",
        props: {
          "aria-hidden": true,
        },
      }),
      comp("Text", {
        part: "text",
        children: [slot("children")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        flexColumn: true,
        alignCenter: true,
        justifyCenter: true,
        gap: 12,
        w: "100%",
        h: "100%",
        minH: 120,
        bg: "neutral-50",
        rounded: "lg",
        color: "muted-foreground",
        fontSize: "0.875rem",
      },
      spinner: {
        w: 24,
        h: 24,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "border",
        borderTopColor: "primary",
        rounded: "full",
        animation: "spin 0.8s linear infinite",
      },
      text: {
        color: "muted-foreground",
        fontSize: "0.875rem",
      },
    },
    variants: {
      variant: {
        loading: {
          spinner: {
            display: "block",
          },
        },
        empty: {
          spinner: {
            display: "none",
          },
          root: {
            borderWidth: 2,
            borderStyle: "dashed",
            borderColor: "border",
            bg: "transparent",
          },
        },
        error: {
          spinner: {
            display: "none",
          },
          root: {
            bg: "destructive-subtle-bg",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "destructive-subtle-border",
          },
          text: {
            color: "destructive",
          },
        },
      },
    },
    defaultVariants: {
      variant: "loading",
    },
  },
});
