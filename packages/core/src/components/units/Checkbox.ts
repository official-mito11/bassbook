import { defineUnitComponent, comp } from "../spec";
import { slot } from "../spec";

export const Checkbox = defineUnitComponent({
  name: "Checkbox",
  dataProps: ["checked", "disabled", "size"] as const,
  // Custom checkbox UI (no native checkbox UI dependency)
  // - root: interactive container (role=checkbox)
  // - indicator: visual box
  // - mark: SVG check mark (shown when checked)
  // - label: text slot
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
            part: "mark",
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
        display: "inline-flex",
        alignCenter: true,
        justifyCenter: true,
        w: 16,
        h: 16,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "secondary",
        rounded: "sm",
        transition: "all 150ms ease",
      },
      mark: {
        w: 12,
        h: 12,
        color: "white",
        opacity: 0,
        scale: 0.5,
        transition: "all 150ms ease",
      },
      label: {
        fontSize: "0.875rem",
      },
    },
    variants: {
      checked: {
        true: {
          indicator: {
            bg: "primary",
            borderColor: "primary",
          },
          mark: {
            opacity: 1,
            scale: 1,
          },
        },
        false: {
          indicator: {
            bg: "transparent",
          },
          mark: {
            opacity: 0,
            scale: 0.5,
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
      size: {
        sm: {
          indicator: { w: 14, h: 14 },
          mark: { w: 8, h: 8 },
          label: { fontSize: "0.8125rem" },
        },
        md: {
          indicator: { w: 16, h: 16 },
          mark: { w: 10, h: 10 },
          label: { fontSize: "0.875rem" },
        },
        lg: {
          indicator: { w: 20, h: 20 },
          mark: { w: 12, h: 12 },
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
