import { defineUnitComponent, comp } from "../spec";

export const Slider = defineUnitComponent({
  name: "Slider",
  dataProps: ["size", "value"] as const,
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
        bg: "#e4e4e7",
        rounded: "full",
        overflow: "visible",
      },
      range: {
        position: "absolute",
        left: 0,
        top: 0,
        h: "100%",
        bg: "#18181b",
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
        bg: "white",
        // border: "2px solid #18181b",
        rounded: "full",
        shadow: "0 0 4px rgba(0, 0, 0, 0.2)",
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
