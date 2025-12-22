import { defineUnitComponent, comp } from "../spec";

export const Skeleton = defineUnitComponent({
  name: "Skeleton",
  dataProps: ["variant"] as const,
  tree: comp("Box", {
    part: "root",
  }),
  styles: {
    base: {
      root: {
        bg: "linear-gradient(90deg, #f4f4f5 25%, #e4e4e7 50%, #f4f4f5 75%)",
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
