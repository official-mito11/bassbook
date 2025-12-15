import { defineUnitComponent, comp } from "../spec";
import { slot } from "../spec";

export const Radio = defineUnitComponent({
  name: "Radio",
  dataProps: ["checked", "disabled", "size"] as const,
  // Custom radio UI (no native radio UI dependency)
  // - root: interactive container (role=radio)
  // - indicator: outer circle
  // - dot: inner dot (shown when checked)
  // - label: text slot
  tree: comp("Box", {
    part: "root",
    props: {
      role: "radio",
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
            part: "dot",
            props: {
              "aria-hidden": true,
              viewBox: "0 0 16 16",
            },
            children: [
              comp("CoreCircle", {
                part: "circle",
                props: {
                  cx: 8,
                  cy: 8,
                  r: 4,
                  fill: "currentColor",
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
        rounded: "full",
        transition: "all 150ms ease",
      },
      dot: {
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
          dot: {
            opacity: 1,
            scale: 1,
          },
        },
        false: {
          indicator: {
            bg: "transparent",
          },
          dot: {
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
          dot: { w: 6, h: 6 },
          label: { fontSize: "0.8125rem" },
        },
        md: {
          indicator: { w: 16, h: 16 },
          dot: { w: 8, h: 8 },
          label: { fontSize: "0.875rem" },
        },
        lg: {
          indicator: { w: 20, h: 20 },
          dot: { w: 10, h: 10 },
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
