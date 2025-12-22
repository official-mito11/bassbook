import { definePartComponent, comp, slot } from "../spec";

export const Dialog = definePartComponent({
  name: "Dialog",
  dataProps: ["open"] as const,
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
        bg: "white",
        rounded: "lg",
        shadow: "xl",
        maxW: 480,
        w: "100%",
        maxH: "85vh",
        overflow: "hidden",
        border: "1px solid #e4e4e7",
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
        color: "#09090b",
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
        color: "#71717a",
        cursor: "pointer",
        transition: "color 150ms ease",
      },
      body: {
        flex: "1",
        px: 24,
        pb: 24,
        overflowAuto: true,
        color: "#52525b",
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
