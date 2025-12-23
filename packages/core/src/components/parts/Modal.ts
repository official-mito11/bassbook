import { definePartComponent, comp, slot } from "../spec";

export const Modal = definePartComponent({
  name: "Modal",
  dataProps: ["open"] as const,
  keyframes: {
    "bb-fadeIn": {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    "bb-modalIn": {
      from: { opacity: 0, transform: "scale(0.95)" },
      to: { opacity: 1, transform: "scale(1)" },
    },
  },
  tree: comp("Box", {
    part: "root",
    children: [
      comp("Box", {
        part: "backdrop",
        props: {
          "aria-hidden": true,
        },
      }),
      comp("Box", {
        part: "container",
        children: [slot("children")],
      }),
    ],
  }),
  styles: {
    base: {
      root: {
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignCenter: true,
        justifyCenter: true,
        p: 16,
      },
      backdrop: {
        position: "absolute",
        inset: 0,
        bg: "overlay",
        animation: "bb-fadeIn 200ms ease-out",
      },
      container: {
        position: "relative",
        zIndex: 1,
        maxW: "100%",
        maxH: "100%",
        animation: "bb-modalIn 200ms ease-out",
      },
    },
    variants: {
      open: {
        true: {
          root: {
            display: "flex",
          },
        },
        false: {
          root: {
            display: "none",
          },
        },
      },
    },
    defaultVariants: {
      open: "false",
    },
  },
});
