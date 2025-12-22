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
        gap: 12,
        p: 16,
        rounded: "md",
        border: "1px solid currentColor",
      },
      icon: {
        flexShrink: 0,
      },
      content: {
        flex: "1",
      },
      title: {
        fontWeight: "semibold",
        mb: 4,
      },
      description: {
        fontSize: "0.875rem",
        opacity: 0.9,
      },
    },
    variants: {
      variant: {
        info: {
          root: {
            bg: "rgba(59,130,246,0.1)",
            borderColor: "rgba(59,130,246,0.3)",
            color: "#1d4ed8",
          },
        },
        success: {
          root: {
            bg: "rgba(34,197,94,0.1)",
            borderColor: "rgba(34,197,94,0.3)",
            color: "#15803d",
          },
        },
        warning: {
          root: {
            bg: "rgba(245,158,11,0.1)",
            borderColor: "rgba(245,158,11,0.3)",
            color: "#b45309",
          },
        },
        error: {
          root: {
            bg: "rgba(239,68,68,0.1)",
            borderColor: "rgba(239,68,68,0.3)",
            color: "#b91c1c",
          },
        },
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
});
