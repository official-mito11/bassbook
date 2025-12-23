import { defineUnitComponent, comp } from "../spec";

export const Skeleton = defineUnitComponent({
  name: "Skeleton",
  dataProps: ["variant"] as const,
  keyframes: {
    "bb-shimmer": {
      "0%": { backgroundPosition: "200% 0" },
      "100%": { backgroundPosition: "-200% 0" },
    },
  },
  tree: comp("Box", {
    part: "root",
  }),
  styles: {
    base: {
      root: {
        display: "block",
        bgGradient: "90deg",
        gradientFrom: "background",
        gradientVia: "border",
        gradientTo: "surface",
        backgroundSize: "200% 100%",
        rounded: "md",
        animation: "bb-shimmer 1.5s ease-in-out infinite",
      },
    },
    variants: {
      variant: {
        text: {
          root: {
            h: 16,
            w: "100%",
            rounded: "sm",
          },
        },
        circular: {
          root: {
            rounded: "full",
          },
        },
        rectangular: {
          root: {
            rounded: "md",
          },
        },
      },
    },
    defaultVariants: {
      variant: "rectangular",
    },
  },
});
