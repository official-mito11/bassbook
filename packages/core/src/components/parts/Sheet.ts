import { definePartComponent, comp, slot } from "../spec";

export const Sheet = definePartComponent({
  name: "Sheet",
  dataProps: ["open", "side"] as const,
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    sheetInFromRight: {
      "0%": { transform: "translateX(100%)" },
      "100%": { transform: "translateX(0)" },
    },
    sheetInFromLeft: {
      "0%": { transform: "translateX(-100%)" },
      "100%": { transform: "translateX(0)" },
    },
    sheetInFromTop: {
      "0%": { transform: "translateY(-100%)" },
      "100%": { transform: "translateY(0)" },
    },
    sheetInFromBottom: {
      "0%": { transform: "translateY(100%)" },
      "100%": { transform: "translateY(0)" },
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
      },
      backdrop: {
        position: "absolute",
        inset: 0,
        bg: "overlay",
        animation: "fadeIn 250ms ease-out",
      },
      container: {
        position: "absolute",
        bg: "background",
        shadow: "2xl",
        overflow: "auto",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "border",
      },
    },
    variants: {
      open: {
        true: {
          root: {
            display: "block",
          },
        },
        false: {
          root: {
            display: "none",
          },
        },
      },
      side: {
        left: {
          container: {
            top: 0,
            left: 0,
            bottom: 0,
            w: 420,
            maxW: "85%",
            animation: "sheetInFromLeft 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            borderRight: "none",
          },
        },
        right: {
          container: {
            top: 0,
            right: 0,
            bottom: 0,
            w: 420,
            maxW: "85%",
            animation: "sheetInFromRight 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            borderLeft: "none",
          },
        },
        top: {
          container: {
            top: 0,
            left: 0,
            right: 0,
            h: 420,
            maxH: "85%",
            animation: "sheetInFromTop 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            borderBottom: "none",
          },
        },
        bottom: {
          container: {
            bottom: 0,
            left: 0,
            right: 0,
            h: 420,
            maxH: "85%",
            animation: "sheetInFromBottom 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            borderTop: "none",
          },
        },
      },
    },
    defaultVariants: {
      open: "false",
      side: "right",
    },
  },
});
