import { definePartComponent, comp, slot } from "../spec";

export const Dialog = definePartComponent({
  name: "Dialog",
  dataProps: ["open"] as const,
  keyframes: {
    "bb-dialogIn": {
      from: { opacity: 0, transform: "scale(0.95) translateY(-10px)" },
      to: { opacity: 1, transform: "scale(1) translateY(0)" },
    },
  },
  tree: comp("Box", {
    part: "root",
    props: {
      role: "dialog",
      "aria-modal": true,
    },
    children: [
      comp("Box", {
        part: "header",
        children: [
          comp("Text", {
            part: "title",
            children: [slot("title")],
          }),
          comp("CoreButton", {
            part: "close",
            props: {
              type: "button",
              "aria-label": "Close",
            },
            children: [slot("closeIcon")],
          }),
        ],
      }),
      comp("Box", {
        part: "body",
        children: [slot("children")],
      }),
      comp("Box", {
        part: "footer",
        children: [slot("footer")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        display: "flex",
        flexColumn: true,
        bg: "background",
        rounded: "lg",
        shadow: "xl",
        maxW: 480,
        w: "100%",
        maxH: "85vh",
        overflow: "hidden",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
        animation: "bb-dialogIn 200ms ease-out",
      },
      header: {
        display: "flex",
        alignCenter: true,
        justifyBetween: true,
        px: 24,
        py: 16,
      },
      title: {
        fontWeight: 600,
        fontSize: "1.125rem",
        color: "foreground",
      },
      close: {
        display: "flex",
        alignCenter: true,
        justifyCenter: true,
        w: 24,
        h: 24,
        p: 0,
        rounded: "sm",
        bg: "transparent",
        border: "none",
        color: "muted-foreground",
        cursor: "pointer",
        transition: "color 150ms ease",
      },
      body: {
        flex: "1",
        px: 24,
        pb: 24,
        overflowAuto: true,
        color: "neutral-600",
        fontSize: "0.875rem",
        lineHeight: 1.6,
      },
      footer: {
        display: "flex",
        alignCenter: true,
        justifyEnd: true,
        gap: 8,
        px: 24,
        py: 16,
      },
    },
    variants: {
      open: {
        true: {
          root: {
            display: "flex",
          },
        },
        false: {
          root: {
            display: "none",
          },
        },
      },
    },
    defaultVariants: {
      open: "true",
    },
  },
});
