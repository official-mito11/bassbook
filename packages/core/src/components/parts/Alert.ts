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
            bg: "info-bg",
            borderColor: "info-border",
            color: "info-text",
          },
        },
        success: {
          root: {
            bg: "success-bg",
            borderColor: "success-border",
            color: "success-text",
          },
        },
        warning: {
          root: {
            bg: "warning-bg",
            borderColor: "warning-border",
            color: "warning-text",
          },
        },
        error: {
          root: {
            bg: "error-bg",
            borderColor: "error-border",
            color: "error-text",
          },
        },
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
});
