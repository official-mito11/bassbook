import { definePartComponent, comp, slot } from "../spec";

export const Sheet = definePartComponent({
  name: "Sheet",
  dataProps: ["open", "side"] as const,
  keyframes: {
    "bb-fadeIn": {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    "bb-slideInRight": {
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(0)" },
    },
    "bb-slideInLeft": {
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0)" },
    },
    "bb-slideInTop": {
      from: { transform: "translateY(-100%)" },
      to: { transform: "translateY(0)" },
    },
    "bb-slideInBottom": {
      from: { transform: "translateY(100%)" },
      to: { transform: "translateY(0)" },
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
        part: "panel",
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
        animation: "bb-fadeIn 200ms ease-out",
      },
      panel: {
        position: "absolute",
        bg: "background",
        shadow: "xl",
        overflowAuto: true,
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
          panel: {
            top: 0,
            left: 0,
            bottom: 0,
            w: 320,
            animation: "bb-slideInLeft 200ms ease-out",
          },
        },
        right: {
          panel: {
            top: 0,
            right: 0,
            bottom: 0,
            w: 320,
            animation: "bb-slideInRight 200ms ease-out",
          },
        },
        top: {
          panel: {
            top: 0,
            left: 0,
            right: 0,
            h: 320,
            animation: "bb-slideInTop 200ms ease-out",
          },
        },
        bottom: {
          panel: {
            bottom: 0,
            left: 0,
            right: 0,
            h: 320,
            animation: "bb-slideInBottom 200ms ease-out",
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
