import { definePartComponent, comp, slot } from "../spec";

export const Modal = definePartComponent({
  name: "Modal",
  dataProps: ["open"] as const,
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    modalIn: {
      "0%": { opacity: 0, transform: "scale(0.96) translateY(-8px)" },
      "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
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
        p: 20,
      },
      backdrop: {
        position: "absolute",
        inset: 0,
        bg: "overlay",
        animation: "fadeIn 250ms ease-out",
      },
      container: {
        position: "relative",
        zIndex: 1,
        maxW: "100%",
        maxH: "100%",
        animation: "modalIn 300ms cubic-bezier(0.16, 1, 0.3, 1)",
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
