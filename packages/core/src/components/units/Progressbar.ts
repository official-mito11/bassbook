import { defineUnitComponent, comp } from "../spec";

export const Progressbar = defineUnitComponent({
  name: "Progressbar",
  dataProps: ["size"] as const,
  tree: comp("Box", {
    part: "root",
    children: [
      comp("Box", {
        part: "track",
        children: [
          comp("Box", {
            part: "fill",
          }),
        ],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        w: "100%",
      },
      track: {
        w: "100%",
        bg: "border",
        rounded: "full",
        overflow: "hidden",
      },
      fill: {
        h: "100%",
        bg: "primary",
        rounded: "full",
        transition: "width 300ms ease",
        w: "var(--progress-width, 0%)",
      },
    },
    variants: {
      size: {
        sm: {
          track: { h: 6 },
        },
        md: {
          track: { h: 8 },
        },
        lg: {
          track: { h: 10 },
        },
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
});
