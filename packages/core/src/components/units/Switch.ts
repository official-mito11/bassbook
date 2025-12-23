import { defineUnitComponent, comp } from "../spec";
import { slot } from "../spec";

export const Switch = defineUnitComponent({
  name: "Switch",
  dataProps: ["checked", "disabled", "size"] as const,
  tree: comp("Box", {
    part: "root",
    props: {
      role: "switch",
      tabIndex: 0,
    },
    children: [
      comp("Box", {
        part: "track",
        props: {
          "aria-hidden": true,
        },
        children: [
          comp("Box", {
            part: "thumb",
            props: {
              "aria-hidden": true,
            },
          }),
        ],
      }),
      comp("Text", {
        part: "label",
        children: [slot("children")],
      }),
    ],
  }),
  // Built-in behavior: state, actions, bindings
  behavior: {
    state: {
      checked: { type: "boolean", default: false, controlled: true },
    },
    actions: {
      toggle: (s: Record<string, string | number | boolean | undefined>) => {
        const current = (s as { checked?: boolean }).checked;
        return { checked: !current };
      },
    },
    bindings: {
      root: {
        onClick: "toggle",
        onKeyDown: { action: "toggle", keys: ["Enter", " "], preventDefault: true },
      },
    },
    controlledProps: {
      checked: { prop: "checked", onChange: "onCheckedChange" },
    },
  },
  styles: {
    base: {
      root: {
        display: "inline-flex",
        alignCenter: true,
        gap: 8,
        cursor: "pointer",
        selectNone: true,
      },
      track: {
        position: "relative",
        display: "inline-block",
        flexShrink: 0,
        w: 44,
        h: 24,
        rounded: "full",
        bg: "border",
        transition: "background-color 200ms ease",
      },
      thumb: {
        position: "absolute",
        left: 2,
        top: 2,
        w: 20,
        h: 20,
        rounded: "full",
        bg: "background",
        shadow: "sm",
        transition: "transform 200ms ease",
      },
      label: {
        fontSize: "0.875rem",
        color: "foreground",
        lineHeight: 1.5,
      },
    },
    variants: {
      checked: {
        true: {
          track: {
            bg: "primary",
          },
          thumb: {
            transform: "translateX(100%)",
          },
        },
        false: {
          track: {
            bg: "border",
          },
        },
      },
      disabled: {
        true: {
          root: {
            opacity: 0.5,
            cursor: "not-allowed",
            pointerNone: true,
          },
        },
        false: {},
      },
      size: {
        sm: {
          track: { w: 36, h: 20 },
          thumb: { w: 16, h: 16 },
          label: { fontSize: "0.8125rem" },
        },
        md: {
          track: { w: 44, h: 24 },
          thumb: { w: 20, h: 20 },
          label: { fontSize: "0.875rem" },
        },
        lg: {
          track: { w: 52, h: 28 },
          thumb: { w: 24, h: 24 },
          label: { fontSize: "1rem" },
        },
      },
    },
    defaultVariants: {
      checked: "false",
      disabled: "false",
      size: "md",
    },
  },
});
