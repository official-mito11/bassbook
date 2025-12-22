import { describe, expect, test } from "bun:test";

import { defineCoreComponent, defineUnitComponent, el, comp, slot } from "../src/components/spec";
import { createComponentRegistry } from "../src/components/registry";
import { validateComponentSpecs } from "../src/components/validate";
import { createSSRCollector } from "../src/engine";

import { renderFromSpecs } from "./component-runtime";

describe("component spec runtime", () => {
  test("validateComponentSpecs: valid spec set passes", () => {
    const CoreBox = defineCoreComponent({
      name: "CoreBox",
      tree: el("div", {
        part: "root",
        children: [slot("children")],
      }),
      styles: {
        base: {
          root: {
            p: 8,
            bg: "white",
          },
        },
      },
    });

    const CoreContent = defineCoreComponent({
      name: "CoreContent",
      tree: el("div", {
        part: "root",
        children: [slot("children")],
      }),
      styles: {
        base: {
          root: {
            p: 16,
          },
        },
      },
    });

    const Card = defineUnitComponent({
      name: "Card",
      tree: comp("CoreBox", {
        part: "container",
        children: [
          comp("CoreContent", {
            part: "content",
            children: [slot("children")],
          }),
        ],
      }),
      styles: {
        base: {
          container: { shadow: "md" },
          content: { p: 16 },
        },
        variants: {
          tone: {
            neutral: { container: { bg: "white", color: "black" } },
            inverted: { container: { bg: "black", color: "white" } },
          },
        },
        defaultVariants: { tone: "neutral" },
      },
    });

    const registry = createComponentRegistry();
    registry.registerAll([CoreBox, CoreContent, Card]);

    const result = validateComponentSpecs([CoreBox, CoreContent, Card], registry);
    expect(result.valid).toBe(true);
    expect(result.issues.length).toBe(0);
  });

  test("renderFromSpecs: renders html and returns collected css", () => {
    const CoreBox = defineCoreComponent({
      name: "CoreBox",
      tree: el("div", {
        part: "root",
        attrs: { id: "core-box" },
        children: [slot("children")],
      }),
      styles: {
        base: {
          root: { p: 8, bg: "white" },
        },
      },
    });

    const CoreText = defineCoreComponent({
      name: "CoreText",
      tree: el("span", {
        part: "root",
        attrs: { "data-role": "content" },
        children: [slot("children")],
      }),
      styles: {
        base: {
          root: { p: 4 },
        },
      },
    });

    const Card = defineUnitComponent({
      name: "Card",
      tree: comp("CoreBox", {
        part: "container",
        props: { "data-card": "true" },
        children: [
          comp("CoreText", {
            part: "content",
            children: [slot("children")],
          }),
        ],
      }),
      styles: {
        base: {
          container: { shadow: "md" },
          content: {},
        },
      },
    });

    const out = renderFromSpecs(
      [CoreBox, CoreText, Card],
      "Card",
      {},
      { theme: { colors: { black: "#000", white: "#fff" } } }
    );

    expect(out.html).toContain("core-box");
    expect(out.html).toContain("data-role=\"content\"");
    expect(out.css.length).toBeGreaterThan(0);
    expect(out.css).toContain("{");
    expect(out.css).toContain("}");
  });

  test("SSR collector is isolated between instances", () => {
    const ssr1 = createSSRCollector();
    const ssr2 = createSSRCollector();

    const r1 = ssr1.css({ p: 12, bg: "white" });
    expect(r1.className.length).toBeGreaterThan(0);

    const css1 = ssr1.getCSS();
    const css2 = ssr2.getCSS();

    expect(css1.length).toBeGreaterThan(0);
    expect(css2.length).toBe(0);
  });
});
