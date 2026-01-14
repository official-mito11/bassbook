import { definePartComponent, comp, slot } from "../spec";

export const Dialog = definePartComponent({
  name: "Dialog",
  dataProps: ["open"] as const,
  keyframes: {
    dialogIn: {
      "0%": { opacity: 0, transform: "scale(0.96) translateY(-20px)" },
      "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
    },
  },
  slots: {
    title: { default: false },
    closeIcon: { default: false },
    children: { default: true },
    footer: { default: false },
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
        rounded: "xl",
        shadow: "2xl",
        maxW: 520,
        w: "100%",
        overflow: "hidden",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
        animation: "dialogIn 250ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      header: {
        display: "flex",
        alignCenter: true,
        justifyBetween: true,
        px: 28,
        py: 20,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "border",
      },
      title: {
        fontWeight: 600,
        fontSize: "1.25rem",
        color: "foreground",
        letterSpacing: "-0.01em",
      },
      close: {
        display: "flex",
        alignCenter: true,
        justifyCenter: true,
        w: 32,
        h: 32,
        p: 0,
        rounded: "md",
        bg: "transparent",
        border: "none",
        color: "muted-foreground",
        cursor: "pointer",
        transition: "all 200ms ease",
        _hover: {
          bg: "muted",
          color: "foreground",
        },
      },
      body: {
        flex: "1",
        px: 28,
        py: 24,
        overflowAuto: true,
        color: "muted-foreground",
        fontSize: "0.9375rem",
        lineHeight: 1.7,
      },
      footer: {
        display: "flex",
        alignCenter: true,
        justifyEnd: true,
        gap: 12,
        px: 28,
        py: 20,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: "border",
        bg: "muted",
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
