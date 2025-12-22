import { defineUnitComponent, comp } from "../spec";

export const Slider = defineUnitComponent({
  name: "Slider",
  dataProps: ["size", "value"] as const,
  behavior: {
    state: {
      value: { type: "number", default: 50, controlled: true },
    },
    actions: {
      set: (_s, payload) => {
        const next = typeof payload === "number" && Number.isFinite(payload) ? payload : 0;
        return { value: next };
      },
      step: (s, payload) => {
        const current = typeof (s as { value?: unknown }).value === "number" ? ((s as { value: number }).value) : 0;
        const delta = typeof payload === "number" && Number.isFinite(payload) ? payload : 0;
        return { value: current + delta };
      },
      min: () => ({ value: 0 }),
      max: () => ({ value: 100 }),
    },
    bindings: {
      root: {
        onKeyDown: {
          action: "step",
          keys: ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"],
          preventDefault: true,
          payload: (ev: unknown) => {
            const e = ev as { key?: string };
            return e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 1;
          },
        },
      },
    },
    controlledProps: {
      value: { prop: "value", onChange: "onValueChange" },
    },
  },
  tree: comp("Box", {
    part: "root",
    props: {
      role: "slider",
      tabIndex: 0,
    },
    children: [
      comp("Box", {
        part: "track",
        children: [
          comp("Box", {
            part: "range",
          }),
          comp("Box", {
            part: "thumb",
          }),
        ],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        position: "relative",
        display: "flex",
        alignCenter: true,
        w: "100%",
        h: 20,
        cursor: "pointer",
        selectNone: true,
      },
      track: {
        position: "relative",
        w: "100%",
        h: 4,
        bg: "border",
        rounded: "full",
        overflow: "visible",
      },
      range: {
        position: "absolute",
        left: 0,
        top: 0,
        h: "100%",
        bg: "primary",
        rounded: "full",
        w: "var(--slider-value, 50%)",
      },
      thumb: {
        position: "absolute",
        top: "50%",
        left: "var(--slider-value, 50%)",
        transform: "translate(-50%, -50%)",
        w: 24,
        h: 16,
        bg: "background",
        rounded: "full",
        shadow: "subtle",
        transition: "transform 100ms ease",
      },
    },
    variants: {
      size: {
        sm: {
          root: { h: 16 },
          track: { h: 3 },
          thumb: { w: 18, h: 12 },
        },
        md: {
          root: { h: 20 },
          track: { h: 4 },
          thumb: { w: 24, h: 16 },
        },
        lg: {
          root: { h: 24 },
          track: { h: 6 },
          thumb: { w: 30, h: 20 },
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
});
