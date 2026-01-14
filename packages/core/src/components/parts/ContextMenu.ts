import { definePartComponent, comp, slot } from "../spec";

export const ContextMenu = definePartComponent({
  name: "ContextMenu",
  dataProps: ["open", "x", "y"] as const,
  slots: {
    trigger: { default: false },
    content: { default: true },
  },
  keyframes: {
    contextMenuIn: {
      "0%": { opacity: 0, transform: "scale(0.95)" },
      "100%": { opacity: 1, transform: "scale(1)" },
    },
  },
  behavior: {
    state: {
      open: { type: "boolean", default: false, controlled: true },
      x: { type: "number", default: 0 },
      y: { type: "number", default: 0 },
    },
    actions: {
      openAt: (_s: Record<string, unknown>, payload?: unknown) => {
        if (typeof payload === "object" && payload !== null) {
          const { x, y } = payload as { x: number; y: number };
          return { open: true, x, y };
        }
        return {};
      },
      close: () => ({ open: false }),
    },
    bindings: {
      content: {
        onClickOutside: "close",
      },
    },
    controlledProps: {
      open: { prop: "open", onChange: "onOpenChange" },
    },
  },
  tree: comp("Box", {
    part: "root",
    children: [
      comp("Box", {
        part: "trigger",
        children: [slot("trigger")],
      }),
      comp("Box", {
        part: "content",
        children: [slot("content")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        position: "relative",
      },
      trigger: {
        cursor: "context-menu",
      },
      content: {
        position: "fixed",
        zIndex: 50,
        minW: 200,
        p: 8,
        bg: "background",
        rounded: "lg",
        shadow: "xl",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
        animation: "contextMenuIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        overflowAuto: true,
        maxH: 400,
      },
    },
    variants: {
      open: {
        true: {
          content: {
            display: "block",
          },
        },
        false: {
          content: {
            display: "none",
          },
        },
      },
    },
    defaultVariants: {
      open: "false",
    },
  },
});
