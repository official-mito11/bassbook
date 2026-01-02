import { defineCoreComponent, el, slot } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Svg = defineCoreComponent({
  name: "Svg",
  dataProps: ["src", "viewBox", "fill", "stroke", "strokeWidth", "preserveAspectRatio"] as const,
  tree: el<CoreNodeSpec>("svg", {
    part: "root",
    namespace: "svg",
    attrs: {
      role: "img",
      "aria-hidden": undefined,
    },
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "block",
        flexShrink: 0,
        overflow: "visible",
      },
    },
    variants: {
      viewBox: {
        "0-0-24-24": { viewBox: "0 0 24 24" },
        "0-0-20-20": { viewBox: "0 0 20 20" },
        "0-0-16-16": { viewBox: "0 0 16 16" },
        "0-0-12-12": { viewBox: "0 0 12 12" },
        "0-0-32-32": { viewBox: "0 0 32 32" },
        "0-0-48-48": { viewBox: "0 0 48 48" },
      },
    },
  },
});

// SVG Path component for inline icons
export const SvgPath = defineCoreComponent({
  name: "SvgPath",
  tree: el<CoreNodeSpec>("path", {
    part: "root",
    namespace: "svg",
  }),
});
