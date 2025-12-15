import { defineUnitComponent, comp } from "../spec";
import { slot } from "../spec";

export const Switch = defineUnitComponent({
  name: "Switch",
  dataProps: ["checked", "disabled", "size"] as const,
  // Custom switch UI (no native checkbox UI dependency)
  // - root: interactive container (role=switch)
  // - track: background track
  // - thumb: sliding knob
  // - label: text slot
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
        display: "inline-flex",
        alignCenter: true,
        w: 36,
        h: 20,
        rounded: "full",
        bg: "secondary",
        transition: "all 150ms ease",
      },
      thumb: {
        position: "absolute",
        left: 2,
        top: 2,
        w: 16,
        h: 16,
        rounded: "full",
        bg: "white",
        transition: "all 150ms ease",
      },
      label: {
        fontSize: "0.875rem",
      },
    },
    variants: {
      checked: {
        true: {
          track: {
            bg: "primary",
          },
          thumb: {
            left: 18,
          },
        },
        false: {
          track: {
            bg: "secondary",
          },
          thumb: {
            left: 2,
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
          track: { w: 30, h: 16 },
          thumb: { w: 12, h: 12, top: 2, left: 2 },
          label: { fontSize: "0.8125rem" },
        },
        md: {
          track: { w: 36, h: 20 },
          thumb: { w: 16, h: 16, top: 2, left: 2 },
          label: { fontSize: "0.875rem" },
        },
        lg: {
          track: { w: 44, h: 24 },
          thumb: { w: 20, h: 20, top: 2, left: 2 },
          label: { fontSize: "1rem" },
        },
      },
    },
    defaultVariants: {
      checked: "false",
      disabled: "false",
      size: "md",
    },
    compoundVariants: [
      {
        conditions: { checked: "true", size: "sm" },
        styles: { thumb: { left: 14 } },
      },
      {
        conditions: { checked: "true", size: "md" },
        styles: { thumb: { left: 18 } },
      },
      {
        conditions: { checked: "true", size: "lg" },
        styles: { thumb: { left: 22 } },
      },
    ],
  },
});
