import { defineUnitComponent, comp, slot } from "../spec";

export const SelectOption = defineUnitComponent({
  name: "SelectOption",
  dataProps: ["selected", "disabled", "label"] as const,
  behavior: {
    context: {
      consume: (ctx, props) => {
        const selectValue = (ctx["Select.value"] ?? undefined) as unknown;
        const optionValue = (props["value"] ?? undefined) as unknown;
        const disabled = Boolean(props["disabled"]);
        const selected = !disabled && typeof selectValue === "string" && selectValue === optionValue;
        const label =
          typeof props["label"] === "string"
            ? props["label"]
            : typeof props["children"] === "string"
              ? props["children"]
              : undefined;
        return {
          selected,
          __partProps: {
            root: {
              "data-label": label,
            },
          },
        };
      },
    },
  },
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
        alignSelf: "stretch",
        px: 8,
        py: 6,
        mx: 4,
        rounded: "sm",
        transition: "background-color 150ms ease",
        cursor: "pointer",
        selectNone: true,
        fontSize: "0.875rem",
        color: "foreground",
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
        color: "foreground",
      },
    },
    variants: {
      selected: {
        true: {
          root: {
            bg: "surface",
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
      disabled: "false",
    },
  },
});
