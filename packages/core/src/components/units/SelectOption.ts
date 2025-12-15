import { defineUnitComponent, comp, slot } from "../spec";

export const SelectOption = defineUnitComponent({
  name: "SelectOption",
  dataProps: ["selected", "active", "disabled"] as const,
  tree: comp("CoreButton", {
    part: "root",
    props: {
      type: "button",
      role: "option",
    },
    children: [
      comp("Text", {
        part: "label",
        children: [slot("children")],
      }),
      comp("Svg", {
        part: "check",
        props: {
          "aria-hidden": true,
          viewBox: "0 0 16 16",
        },
        children: [
          comp("CorePath", {
            part: "path",
            props: {
              d: "M3 8.5l3 3 7-7",
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
  styles: {
    base: {
      root: {
        display: "flex",
        alignCenter: true,
        justifyBetween: true,
        w: "100%",
        px: 12,
        py: 8,
        rounded: "sm",
        transition: "all 150ms ease",
        cursor: "pointer",
        selectNone: true,
      },
      label: {
        flex: "1",
      },
      check: {
        w: 16,
        h: 16,
        opacity: 0,
        transition: "all 150ms ease",
      },
    },
    variants: {
      active: {
        true: {
          root: {
            bg: "secondary",
          },
        },
        false: {},
      },
      selected: {
        true: {
          root: {
            bg: "primary",
            color: "white",
          },
          check: {
            opacity: 1,
          },
        },
        false: {
          root: {
            color: "current",
          },
          check: {
            opacity: 0,
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
        false: {
          root: {
            pointerNone: false,
          },
        },
      },
    },
    defaultVariants: {
      selected: "false",
      active: "false",
      disabled: "false",
    },
  },
});
