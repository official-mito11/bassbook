import { defineUnitComponent, comp } from "../spec";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function clampAndStep(value: number, min: number, max: number, step: number): number {
  const clamped = clamp(value, min, max);
  if (!(step > 0) || !Number.isFinite(step)) return clamped;
  const stepped = Math.round((clamped - min) / step) * step + min;
  return clamp(stepped, min, max);
}

export const Slider = defineUnitComponent({
  name: "Slider",
  dataProps: ["size", "value", "disabled", "min", "max", "step"] as const,
  behavior: {
    state: {
      value: { type: "number", default: 50 as number, controlled: true },
      min: { type: "number", default: 0 as number, controlled: true },
      max: { type: "number", default: 100 as number, controlled: true },
      step: { type: "number", default: 1 as number, controlled: true },
      disabled: { type: "boolean", default: false as boolean, controlled: true },
    },
    actions: {
      set: (s: Record<string, string | number | boolean | undefined>, payload?: unknown) => {
        const disabled = typeof (s as { disabled?: unknown }).disabled === "boolean" ? (s as { disabled: boolean }).disabled : false;
        if (disabled) return {};

        const min = typeof (s as { min?: unknown }).min === "number" ? (s as { min: number }).min : 0;
        const max = typeof (s as { max?: unknown }).max === "number" ? (s as { max: number }).max : 100;
        const step = typeof (s as { step?: unknown }).step === "number" ? (s as { step: number }).step : 1;

        const raw = typeof payload === "number" && Number.isFinite(payload) ? payload : min;
        return { value: clampAndStep(raw, min, max, step) };
      },
      setFromPosition: (s: Record<string, string | number | boolean | undefined>, payload?: unknown) => {
        const disabled = typeof (s as { disabled?: unknown }).disabled === "boolean" ? (s as { disabled: boolean }).disabled : false;
        if (disabled) return {};

        const min = typeof (s as { min?: unknown }).min === "number" ? (s as { min: number }).min : 0;
        const max = typeof (s as { max?: unknown }).max === "number" ? (s as { max: number }).max : 100;
        const step = typeof (s as { step?: unknown }).step === "number" ? (s as { step: number }).step : 1;

        const p = payload as { clientX?: unknown; left?: unknown; width?: unknown } | undefined;
        const clientX = typeof p?.clientX === "number" ? p.clientX : undefined;
        const left = typeof p?.left === "number" ? p.left : undefined;
        const width = typeof p?.width === "number" ? p.width : undefined;
        if (clientX === undefined || left === undefined || width === undefined) return {};
        const t = width > 0 ? (clientX - left) / width : 0;
        const clampedT = Math.max(0, Math.min(1, t));
        const raw = min + clampedT * (max - min);
        return { value: clampAndStep(raw, min, max, step) };
      },
      step: (s: Record<string, string | number | boolean | undefined>, payload?: unknown) => {
        const disabled = typeof (s as { disabled?: unknown }).disabled === "boolean" ? (s as { disabled: boolean }).disabled : false;
        if (disabled) return {};

        const current = typeof (s as { value?: unknown }).value === "number" ? (s as { value: number }).value : 0;
        const deltaSteps = typeof payload === "number" && Number.isFinite(payload) ? payload : 0;
        const step = typeof (s as { step?: unknown }).step === "number" ? (s as { step: number }).step : 1;
        const min = typeof (s as { min?: unknown }).min === "number" ? (s as { min: number }).min : 0;
        const max = typeof (s as { max?: unknown }).max === "number" ? (s as { max: number }).max : 100;

        const raw = current + deltaSteps * step;
        return { value: clampAndStep(raw, min, max, step) };
      },
    },
    bindings: {
      root: {
        onPointerDown: {
          action: "setFromPosition" as const,
          preventDefault: true,
          payload: (ev: unknown) => {
            const e = ev as { clientX?: number; currentTarget?: unknown };
            const ct = e.currentTarget as Element | null;
            if (!ct || typeof (ct as any).getBoundingClientRect !== "function") return undefined;
            const rect = (ct as any).getBoundingClientRect() as { left: number; width: number };
            return { clientX: e.clientX, left: rect.left, width: rect.width };
          },
        },
        onPointerMove: {
          action: "setFromPosition" as const,
          payload: (ev: unknown) => {
            const e = ev as { buttons?: number; clientX?: number; currentTarget?: unknown };
            if (typeof e.buttons === "number" && e.buttons === 0) return undefined;
            const ct = e.currentTarget as Element | null;
            if (!ct || typeof (ct as any).getBoundingClientRect !== "function") return undefined;
            const rect = (ct as any).getBoundingClientRect() as { left: number; width: number };
            return { clientX: e.clientX, left: rect.left, width: rect.width };
          },
        },
        onKeyDown: {
          action: "step" as const,
          keys: ["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"] as const,
          preventDefault: true,
          payload: (ev: unknown) => {
            const e = ev as { key?: string };
            return e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 1;
          },
        },
      },
    },
    controlledProps: {
      value: { prop: "value" as const, onChange: "onValueChange" as const },
    },
    context: {
      consume: (_ctx, props) => {
        const value = typeof props["value"] === "number" && Number.isFinite(props["value"]) ? (props["value"] as number) : 0;
        const min = typeof props["min"] === "number" && Number.isFinite(props["min"]) ? (props["min"] as number) : 0;
        const max = typeof props["max"] === "number" && Number.isFinite(props["max"]) ? (props["max"] as number) : 100;
        const disabled = Boolean(props["disabled"]);

        const denom = max - min;
        const t = denom !== 0 ? (value - min) / denom : 0;
        const pctNum = Math.min(1, Math.max(0, t)) * 100;

        return {
          __partProps: {
            root: {
              tabIndex: disabled ? -1 : 0,
              "aria-valuenow": value,
              "aria-valuemin": min,
              "aria-valuemax": max,
              "aria-disabled": disabled,
            },
            range: {
              style: {
                width: `${pctNum}%`,
              },
            },
            thumb: {
              style: {
                left: `${pctNum}%`,
              },
            },
          },
        };
      },
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
        h: 5,
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
      },
      thumb: {
        position: "absolute",
        top: "50%",
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
          track: { h: 5 },
          thumb: { w: 18, h: 12 },
        },
        md: {
          root: { h: 20 },
          track: { h: 6 },
          thumb: { w: 24, h: 16 },
        },
        lg: {
          root: { h: 24 },
          track: { h: 8 },
          thumb: { w: 30, h: 20 },
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
});
