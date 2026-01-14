import { definePartComponent, comp, slot } from "../spec";

export const Alert = definePartComponent({
  name: "Alert",
  dataProps: ["variant"] as const,
  tree: comp("Box", {
    part: "root",
    props: {
      role: "alert",
    },
    children: [
      comp("Box", {
        part: "icon",
        children: [slot("icon")],
      }),
      comp("Box", {
        part: "content",
        children: [
          comp("Text", {
            part: "title",
            children: [slot("title")],
          }),
          comp("Text", {
            part: "description",
            children: [slot("children")],
          }),
        ],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        alignStart: true,
        gap: 14,
        p: 18,
        rounded: "lg",
        borderWidth: 1,
        borderStyle: "solid",
        shadow: "sm",
      },
      icon: {
        flexShrink: 0,
        w: 20,
        h: 20,
        mt: 2,
      },
      content: {
        flex: "1",
        minW: 0,
      },
      title: {
        fontWeight: 600,
        fontSize: "0.9375rem",
        mb: 6,
        letterSpacing: "-0.01em",
      },
      description: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        opacity: 0.95,
      },
    },
    variants: {
      variant: {
        info: {
          root: {
            bg: "#eff6ff",
            borderColor: "#3b82f6",
            color: "#1e40af",
          },
          icon: {
            color: "#3b82f6",
          },
        },
        success: {
          root: {
            bg: "#f0fdf4",
            borderColor: "#22c55e",
            color: "#15803d",
          },
          icon: {
            color: "#22c55e",
          },
        },
        warning: {
          root: {
            bg: "#fffbeb",
            borderColor: "#f59e0b",
            color: "#b45309",
          },
          icon: {
            color: "#f59e0b",
          },
        },
        error: {
          root: {
            bg: "#fef2f2",
            borderColor: "#ef4444",
            color: "#b91c1c",
          },
          icon: {
            color: "#ef4444",
          },
        },
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
});
