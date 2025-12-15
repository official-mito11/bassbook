import { defineUnitComponent, comp, slot } from "../spec";

export const Select = defineUnitComponent({
  name: "Select",
  dataProps: ["open", "disabled", "size"] as const,
  // Custom select UI (no native <select>)
  // Slots:
  // - value: content shown in trigger
  // - options: dropdown option list (usually SelectOption components)
  tree: comp("Box", {
    part: "root",
    children: [
      comp("CoreButton", {
        part: "trigger",
        props: {
          type: "button",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-expanded": false,
        },
        children: [
          comp("Text", {
            part: "value",
            children: [slot("value")],
          }),
          comp("Svg", {
            part: "icon",
            props: {
              "aria-hidden": true,
              viewBox: "0 0 16 16",
            },
            children: [
              comp("CorePath", {
                part: "path",
                props: {
                  d: "M4 6l4 4 4-4",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                },
              }),
            ],
          }),
        ],
      }),
      comp("Box", {
        part: "menu",
        props: {
          role: "listbox",
        },
        children: [slot("options")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        position: "relative",
        display: "inline-flex",
        flexColumn: true,
        w: "fit-content",
      },
      trigger: {
        display: "flex",
        alignCenter: true,
        justifyBetween: true,
        gap: 8,
        minW: 160,
        px: 12,
        py: 8,
        rounded: "md",
        border: "1px solid currentColor",
        bg: "white",
        color: "current",
        transition: "all 150ms ease",
      },
      value: {
        flex: "1",
      },
      icon: {
        w: 16,
        h: 16,
        transition: "all 150ms ease",
      },
      menu: {
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        w: "100%",
        bg: "white",
        border: "1px solid currentColor",
        rounded: "md",
        py: 6,
        zIndex: 50,
        maxH: 240,
        overflowAuto: true,
        display: "none",
      },
    },
    variants: {
      open: {
        true: {
          menu: {
            display: "block",
          },
          icon: {
            rotate: 180,
          },
        },
        false: {
          menu: {
            display: "none",
          },
          icon: {
            rotate: 0,
          },
        },
      },
      disabled: {
        true: {
          trigger: {
            opacity: 0.5,
            cursor: "not-allowed",
            pointerNone: true,
          },
        },
        false: {
          trigger: {
            pointerNone: false,
          },
        },
      },
      size: {
        sm: {
          trigger: { px: 10, py: 6 },
          value: { fontSize: "0.8125rem" },
        },
        md: {
          trigger: { px: 12, py: 8 },
          value: { fontSize: "0.875rem" },
        },
        lg: {
          trigger: { px: 14, py: 10 },
          value: { fontSize: "1rem" },
        },
      },
    },
    defaultVariants: {
      open: "false",
      disabled: "false",
      size: "md",
    },
  },
});
