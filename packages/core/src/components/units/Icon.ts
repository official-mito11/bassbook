import { defineUnitComponent, comp, slot } from "../spec";

// Icon provider type - icons from different libraries
export type IconProvider = "lucide" | "mui" | "heroicons" | "feather" | "custom";

// Built-in icon names available in the default set
export type BuiltInIconName = 
  | "home" | "search" | "settings" | "user" | "mail" | "bell" | "heart" | "star"
  | "menu" | "close" | "plus" | "minus" | "check" | "x" | "chevron-right" | "chevron-left"
  | "chevron-down" | "chevron-up" | "arrow-right" | "arrow-left" | "arrow-down" | "arrow-up"
  | "trash" | "edit" | "copy" | "share" | "download" | "upload" | "refresh" | "loading"
  | "eye" | "eye-off" | "lock" | "unlock" | "camera" | "image" | "video" | "audio"
  | "file" | "folder" | "calendar" | "clock" | "map" | "location" | "link" | "external"
  | "facebook" | "twitter" | "instagram" | "github" | "discord" | "youtube";

export const Icon = defineUnitComponent({
  name: "Icon",
  dataProps: ["name", "provider", "size", "viewBox", "color", "strokeWidth"] as const,
  tree: comp("Svg", {
    part: "root",
    props: {
      "aria-hidden": true,
    },
    children: [slot("children")],
  }),
  styles: {
    base: {
      root: {
        display: "inline-flex",
        flexShrink: 0,
        color: "currentColor",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
    },
    variants: {
      size: {
        xs: { root: { w: 12, h: 12 } },
        sm: { root: { w: 16, h: 16 } },
        md: { root: { w: 20, h: 20 } },
        lg: { root: { w: 24, h: 24 } },
        xl: { root: { w: 32, h: 32 } },
        "2xl": { root: { w: 48, h: 48 } },
        "3xl": { root: { w: 64, h: 64 } },
      },
      strokeWidth: {
        thin: { root: { strokeWidth: 1 } },
        medium: { root: { strokeWidth: 2 } },
        bold: { root: { strokeWidth: 3 } },
      },
    },
    compoundVariants: [
      {
        conditions: { size: "xs" },
        styles: { root: { strokeWidth: 1.5 } },
      },
      {
        conditions: { size: "sm" },
        styles: { root: { strokeWidth: 1.5 } },
      },
    ] as const,
    defaultVariants: {
      size: "md",
      strokeWidth: "medium",
    },
  },
});
