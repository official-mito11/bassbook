import { definePartComponent, comp, slot } from "../spec";
import type { ComponentBehavior, PartComponentSpec } from "../spec";

const selectSpec = {
  name: "Select",
  dataProps: ["open", "disabled", "size"] as const,
  keyframes: {
    menuOpen: {
      "0%": { opacity: 0, transform: "translateY(-8px) scale(0.95)" },
      "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
    },
    menuClose: {
      "0%": { opacity: 1, transform: "translateY(0) scale(1)" },
      "100%": { opacity: 0, transform: "translateY(-8px) scale(0.95)" },
    },
  },
  slots: {
    header: {},
    value: { defaultFromState: "label" },
    options: { default: true },
  },
  // Custom select UI (no native <select>)
  // Slots:
  // - value: content shown in trigger
  // - options: dropdown option list (usually SelectOption components)
  behavior: {
    state: {
      value: { type: "string", default: "", controlled: true },
      label: { type: "string", default: "", controlled: false },
      open: { type: "boolean", default: false, controlled: true },
    } as const,
    actions: {
      toggle: (s: Record<string, unknown>) => {
        const current = (s as { open?: boolean }).open;
        return { open: !current };
      },
      select: (s: Record<string, unknown>, payload?: unknown) => {
        const open = (s as { open?: boolean }).open;
        if (open === false) return {};

        let value: string | undefined;
        let label: string | undefined;
        if (typeof payload === "string") {
          value = payload;
          label = payload;
        } else if (
          payload &&
          typeof payload === "object" &&
          typeof (payload as { value?: unknown }).value === "string"
        ) {
          value = (payload as { value: string }).value;
          const maybeLabel = (payload as { label?: unknown }).label;
          label = typeof maybeLabel === "string" ? maybeLabel : value;
        }
        if (typeof value !== "string") return {};

        return { value, label, open: false };
      },
      setValue: (_s: Record<string, unknown>, payload?: unknown) => {
        if (typeof payload !== "string") return {};
        return { value: payload, label: payload };
      },
      open: () => ({ open: true }),
      close: () => ({ open: false }),
    },
    bindings: {
      trigger: {
        onClick: "toggle",
      },
      menu: {
        onClick: {
          action: "select",
          payload: (ev: unknown) => {
            const target = (ev as { target?: unknown } | null)?.target;
            if (!target || typeof target !== "object") return undefined;
            const node = target as Element;
            if (typeof node.closest !== "function") return undefined;
            const btn = node.closest('button[role="option"]') as HTMLButtonElement | null;
            if (!btn) return undefined;
            if (btn.disabled === true) return undefined;
            const v = btn.value;
            const lbl = btn.dataset?.["label"];
            const label = typeof lbl === "string" ? lbl : undefined;
            return typeof v === "string" ? { value: v, label: label ?? v } : undefined;
          },
        },
        onClickOutside: "close",
      },
    },
    controlledProps: {
      open: { prop: "open", onChange: "onOpenChange" },
      value: { prop: "value", onChange: "onValueChange" },
    } as const,
    context: {
      provide: {
        "Select.value": ({ state }) => (state as { value?: unknown }).value,
      },
    },
  } satisfies ComponentBehavior,
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
        children: [slot("header"), slot("options")],
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
        w: "full",
        h: 36,
        px: 12,
        rounded: "md",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
        bg: "background",
        color: "foreground",
        fontSize: "0.875rem",
        cursor: "pointer",
        transition: "border-color 150ms ease",
        outline: "none",
      },
      value: {
        flex: "1",
        textAlign: "left",
      },
      icon: {
        w: 16,
        h: 16,
        color: "muted-foreground",
        transition: "transform 150ms ease",
      },
      menu: {
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        w: "100%",
        bg: "background",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
        rounded: "md",
        py: 4,
        zIndex: 50,
        maxH: 240,
        overflowX: "hidden",
        overflowY: "auto",
        flexColumn: true,
        display: "none",
        shadow: "sm",
      },
    },
    variants: {
      open: {
        true: {
          menu: {
            display: "flex",
            animation: "menuOpen 150ms ease-out",
          },
          icon: {
            rotate: 180,
          },
        },
        false: {
          menu: {
            display: "none",
            animation: "menuClose 150ms ease-in",
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
} as const satisfies Omit<PartComponentSpec, "layer">;

export const Select = definePartComponent(selectSpec);
