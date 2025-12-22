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
        px: 8,
        py: 6,
        mx: 4,
        rounded: "sm",
        transition: "background-color 150ms ease",
        cursor: "pointer",
        selectNone: true,
        fontSize: "0.875rem",
        color: "#09090b",
        bg: "transparent",
        border: "none",
        outline: "none",
      },
      label: {
        flex: "1",
        textAlign: "left",
      },
      check: {
        w: 16,
        h: 16,
        opacity: 0,
        color: "#18181b",
      },
    },
    variants: {
      active: {
        true: {
          root: {
            bg: "#f4f4f5",
          },
        },
        false: {},
      },
      selected: {
        true: {
          root: {
            fontWeight: 500,
          },
          check: {
            opacity: 1,
          },
        },
        false: {
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
        false: {},
      },
    },
    defaultVariants: {
      selected: "false",
      active: "false",
      disabled: "false",
    },
  },
});
