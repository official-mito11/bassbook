import { defineCoreComponent, el } from "../spec";
import type { CoreNodeSpec } from "../spec";

export const Image = defineCoreComponent({
  name: "Image",
  dataProps: ["src", "alt", "loading", "decoding", "objectFit", "objectPosition", "width", "height", "fit"] as const,
  tree: el<CoreNodeSpec>("img", {
    part: "root",
    attrs: {
      alt: undefined,
      loading: "lazy",
      decoding: "async",
    },
  }),
  styles: {
    base: {
      root: {
        display: "block",
        maxWidth: "100%",
        height: "auto",
      },
    },
    variants: {
      objectFit: {
        contain: { objectFit: "contain" },
        cover: { objectFit: "cover" },
        fill: { objectFit: "fill" },
        none: { objectFit: "none" },
        "scale-down": { objectFit: "scale-down" },
      },
      loading: {
        eager: { loading: "eager" },
        lazy: { loading: "lazy" },
      },
      decoding: {
        sync: { decoding: "sync" },
        async: { decoding: "async" },
        auto: { decoding: "auto" },
      },
    },
    defaultVariants: {
      loading: "lazy",
      decoding: "async",
    },
  },
});
