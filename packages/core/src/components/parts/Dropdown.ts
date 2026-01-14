import { definePartComponent, comp, slot } from "../spec";

export const Dropdown = definePartComponent({
  name: "Dropdown",
  dataProps: ["open", "placement"] as const,
  slots: {
    trigger: { default: false },
    content: { default: true },
  },
  keyframes: {
    dropdownIn: {
      "0%": { opacity: 0, transform: "scale(0.95) translateY(-4px)" },
      "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
    },
  },
  behavior: {
    state: {
      open: { type: "boolean", default: false, controlled: true },
    },
    actions: {
      toggle: (s: Record<string, unknown>) => {
        const current = (s as { open?: boolean }).open;
        return { open: !current };
      },
      close: () => ({ open: false }),
      open: () => ({ open: true }),
    },
    bindings: {
      trigger: {
        onClick: "toggle",
      },
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
        display: "inline-flex",
      },
      trigger: {
        cursor: "pointer",
      },
      content: {
        position: "absolute",
        zIndex: 50,
        minW: 200,
        p: 8,
        mt: 8,
        bg: "background",
        rounded: "lg",
        shadow: "xl",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
        animation: "dropdownIn 200ms cubic-bezier(0.16, 1, 0.3, 1)",
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
      placement: {
        bottom: {
          content: {
            top: "100%",
            left: 0,
          },
        },
        "bottom-end": {
          content: {
            top: "100%",
            right: 0,
          },
        },
        top: {
          content: {
            bottom: "100%",
            left: 0,
            mb: 8,
            mt: 0,
          },
        },
        "top-end": {
          content: {
            bottom: "100%",
            right: 0,
            mb: 8,
            mt: 0,
          },
        },
      },
    },
    defaultVariants: {
      open: "false",
      placement: "bottom",
    },
  },
});
