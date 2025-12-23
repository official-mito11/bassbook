import { defineUnitComponent, comp } from "../spec";
import { slot } from "../spec";

export const Checkbox = defineUnitComponent({
  name: "Checkbox",
  dataProps: ["checked", "disabled", "size"] as const,
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
                  strokeWidth: 3,
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
        alignCenter: true,
        gap: 8,
        cursor: "pointer",
        selectNone: true,
      },
      indicator: {
        display: "flex",
        alignCenter: true,
        justifyCenter: true,
        flexShrink: 0,
        w: 16,
        h: 16,
        rounded: "sm",
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: "border",
        bg: "background",
        transition: "all 150ms ease",
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
        lineHeight: 1.5,
      },
    },
    variants: {
      checked: {
        true: {
          indicator: {
            bg: "primary",
            borderColor: "primary",
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
          indicator: { w: 14, h: 14 },
          icon: { w: 10, h: 10 },
          label: { fontSize: "0.8125rem" },
        },
        md: {
          indicator: { w: 16, h: 16 },
          icon: { w: 12, h: 12 },
          label: { fontSize: "0.875rem" },
        },
        lg: {
          indicator: { w: 20, h: 20 },
          icon: { w: 16, h: 16 },
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
