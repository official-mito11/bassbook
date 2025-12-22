import { defineUnitComponent, comp, slot } from "../spec";

export const Avatar = defineUnitComponent({
  name: "Avatar",
  dataProps: ["size", "hasImage"] as const,
  tree: comp("Box", {
    part: "root",
    children: [
      comp("Image", {
        part: "image",
      }),
      comp("Box", {
        part: "fallback",
        children: [
          comp("Text", {
            part: "fallbackText",
            children: [slot("fallback")],
          }),
        ],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        position: "relative",
        display: "inline-flex",
        alignCenter: true,
        justifyCenter: true,
        flexShrink: 0,
        rounded: "full",
        overflow: "hidden",
        bg: "secondary",
      },
      image: {
        position: "absolute",
        w: "100%",
        h: "100%",
        objectFit: "cover",
      },
      fallback: {
        display: "flex",
        alignCenter: true,
        justifyCenter: true,
        w: "100%",
        h: "100%",
        bg: "border",
      },
      fallbackText: {
        fontWeight: 500,
        color: "muted-foreground",
        selectNone: true,
        textTransform: "uppercase",
      },
    },
    variants: {
      size: {
        xs: {
          root: { w: 24, h: 24 },
          fallbackText: { fontSize: "0.625rem" },
        },
        sm: {
          root: { w: 32, h: 32 },
          fallbackText: { fontSize: "0.75rem" },
        },
        md: {
          root: { w: 40, h: 40 },
          fallbackText: { fontSize: "0.875rem" },
        },
        lg: {
          root: { w: 48, h: 48 },
          fallbackText: { fontSize: "1rem" },
        },
        xl: {
          root: { w: 64, h: 64 },
          fallbackText: { fontSize: "1.25rem" },
        },
      },
      hasImage: {
        true: {
          fallback: {
            display: "none",
          },
        },
        false: {
          image: {
            display: "none",
          },
        },
      },
    },
    defaultVariants: {
      size: "md",
      hasImage: "false",
    },
  },
});
