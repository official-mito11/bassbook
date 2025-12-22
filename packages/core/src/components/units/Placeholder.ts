import { defineUnitComponent, comp, slot } from "../spec";

export const Placeholder = defineUnitComponent({
  name: "Placeholder",
  dataProps: ["variant"] as const,
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
        bg: "#fafafa",
        rounded: "lg",
        color: "#71717a",
        fontSize: "0.875rem",
      },
      spinner: {
        w: 24,
        h: 24,
        border: "2px solid #e4e4e7",
        borderTopColor: "#18181b",
        rounded: "full",
        animation: "bb-spin 0.8s linear infinite",
      },
      text: {
        color: "#71717a",
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
            border: "2px dashed #e4e4e7",
            bg: "transparent",
          },
        },
        error: {
          spinner: {
            display: "none",
          },
          root: {
            bg: "rgba(239,68,68,0.05)",
            border: "1px solid rgba(239,68,68,0.2)",
          },
          text: {
            color: "#dc2626",
          },
        },
      },
    },
    defaultVariants: {
      variant: "loading",
    },
  },
});
