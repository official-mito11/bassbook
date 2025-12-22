import { definePartComponent, comp, slot } from "../spec";

export const Sheet = definePartComponent({
  name: "Sheet",
  dataProps: ["open", "side"] as const,
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
