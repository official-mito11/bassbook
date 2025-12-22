import { defineUnitComponent, comp } from "../spec";
import { slot } from "../spec";

export const Radio = defineUnitComponent({
  name: "Radio",
  dataProps: ["checked", "disabled", "size"] as const,
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
          comp("Box", {
            part: "dot",
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
        flexShrink: 0,
        w: 16,
        h: 16,
        rounded: "full",
        border: "1px solid #d4d4d8",
        bg: "transparent",
        transition: "all 150ms ease",
      },
      dot: {
        w: 8,
        h: 8,
        rounded: "full",
        bg: "white",
        opacity: 0,
        transform: "scale(0)",
        transition: "all 150ms ease",
      },
      label: {
        fontSize: "0.875rem",
        color: "#18181b",
        lineHeight: 1.5,
      },
    },
    variants: {
      checked: {
        true: {
          indicator: {
            bg: "#18181b",
            borderColor: "#18181b",
          },
          dot: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        false: {
          indicator: {
            bg: "transparent",
            borderColor: "#d4d4d8",
          },
          dot: {
            opacity: 0,
            transform: "scale(0)",
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
