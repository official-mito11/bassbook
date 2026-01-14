import { defineUnitComponent, comp } from "../spec";
import { slot } from "../spec";

export const Checkbox = defineUnitComponent({
  name: "Checkbox",
  dataProps: ["checked", "disabled", "size", "indeterminate"] as const,
  behavior: {
    state: {
      checked: { type: "boolean", default: false, controlled: true },
      indeterminate: { type: "boolean", default: false, controlled: true },
    },
    actions: {
      toggle: (s: Record<string, unknown>) => {
        const current = (s as { checked?: boolean }).checked;
        return { checked: !current, indeterminate: false };
      },
      setChecked: (_s: Record<string, unknown>, payload?: unknown) => {
        if (typeof payload !== "boolean") return {};
        return { checked: payload, indeterminate: false };
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
  tree: comp("Box", {
    part: "root",
    props: {
      role: "checkbox",
      tabIndex: 0,
    },
    children: [
      comp("Box", {
        part: "indicator",
        props: {
          "aria-hidden": true,
        },
        children: [
          comp("Box", {
            part: "dash",
            props: {
              "aria-hidden": true,
            },
          }),
          comp("Svg", {
            part: "icon",
            props: {
              "aria-hidden": true,
              viewBox: "0 0 24 24",
            },
            children: [
              comp("CorePath", {
                part: "path",
                props: {
                  d: "M20 6L9 17l-5-5",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 3.5,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                },
              }),
            ],
          }),
        ],
      }),
      comp("Text", {
        part: "label",
        children: [slot("children")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        selectNone: true,
      },
      indicator: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        w: 18,
        h: 18,
        rounded: "md",
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: "#d1d5db",
        bg: "background",
        transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        shadow: "sm",
      },
      dash: {
        display: "none",
        w: 8,
        h: 2,
        bg: "currentColor",
        borderRadius: "full",
      },
      icon: {
        display: "block",
        w: 12,
        h: 12,
        color: "white",
        opacity: 0,
        transition: "opacity 150ms ease",
      },
      path: {},
      label: {
        fontSize: "0.875rem",
        color: "foreground",
        lineHeight: 1,
      },
    },
    variants: {
      checked: {
        true: {
          indicator: {
            bg: "#3b82f6",
            borderColor: "#3b82f6",
            shadow: "md",
          },
          icon: {
            opacity: 1,
          },
        },
        false: {
          indicator: {
            bg: "background",
            borderColor: "border",
          },
          icon: {
            opacity: 0,
          },
        },
      },
      indeterminate: {
        true: {
          indicator: {
            bg: "primary",
            borderColor: "primary",
          },
          dash: {
            display: "block",
          },
          icon: {
            opacity: 0,
          },
        },
        false: {},
      },
      disabled: {
        true: {
          root: {
            opacity: 0.6,
            cursor: "not-allowed",
            pointerNone: true,
          },
          indicator: {
            bg: "#f3f4f6",
          },
        },
        false: {},
      },
      size: {
        sm: {
          indicator: { w: 14, h: 14 },
          icon: { w: 10, h: 10 },
          dash: { w: 8, h: 2 },
          label: { fontSize: "0.8125rem" },
        },
        md: {
          indicator: { w: 16, h: 16 },
          icon: { w: 12, h: 12 },
          dash: { w: 10, h: 2 },
          label: { fontSize: "0.875rem" },
        },
        lg: {
          indicator: { w: 20, h: 20 },
          icon: { w: 16, h: 16 },
          dash: { w: 12, h: 2 },
          label: { fontSize: "1rem" },
        },
      },
    },
    defaultVariants: {
      checked: "false",
      disabled: "false",
      size: "md",
      indeterminate: "false",
    },
  },
});
