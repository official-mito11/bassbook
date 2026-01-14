/**
 * Style Engine Unit Tests
 */

import { describe, it, expect, beforeEach } from "bun:test";
import { css, cx, inlineStyle, cssString, createSSRContext } from "./style";
import { resetGlobalRegistry } from "./registry";

describe("Style Engine", () => {
  beforeEach(() => {
    resetGlobalRegistry();
  });

  describe("css", () => {
    it("should generate class names for style props", () => {
      const result = css({ p: 16, m: 8 });
      expect(result.className).toBeTruthy();
      expect(result.classNames.length).toBeGreaterThan(0);
    });

    it("should handle shorthand props", () => {
      const result = css({ px: 16, py: 8 });
      expect(result.classNames.length).toBeGreaterThan(0);
    });

    it("should handle pseudo-class styles", () => {
      const result = css({
        p: 16,
        hover: { bg: "red" },
      });
      expect(result.classNames.length).toBeGreaterThan(0);
    });

    it("should deduplicate identical styles", () => {
      const result1 = css({ p: 16, m: 8 });
      const result2 = css({ p: 16, m: 8 });
      expect(result1.className).toBe(result2.className);
    });

    it("should handle CSS variables in inline styles", () => {
      const result = css({ "--custom-var": "10px" });
      expect(result.style).toBeDefined();
      expect(result.style?.["--custom-var"]).toBe("10px");
    });
  });

  describe("cx", () => {
    it("should join class names", () => {
      const className = cx("foo", "bar");
      expect(className).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
      const className = cx("foo", false && "bar", true && "baz");
      expect(className).toBe("foo baz");
    });

    it("should handle object syntax", () => {
      const className = cx({ foo: true, bar: false, baz: true });
      expect(className).toBe("foo baz");
    });

    it("should filter out undefined and null", () => {
      const className = cx("foo", undefined, null, "bar");
      expect(className).toBe("foo bar");
    });
  });

  describe("inlineStyle", () => {
    it("should return inline style object", () => {
      const style = inlineStyle({ p: 16, color: "red" });
      expect(style.padding).toBe("16px");
      expect(style.color).toBe("red");
    });

    it("should not generate classes", () => {
      const style = inlineStyle({ p: 16 });
      expect(style).not.toHaveProperty("className");
    });
  });

  describe("cssString", () => {
    it("should return CSS declarations", () => {
      const cssStr = cssString({ p: 16, m: 8 });
      expect(cssStr).toContain("padding:16px");
      expect(cssStr).toContain("margin:8px");
    });

    it("should wrap with selector", () => {
      const cssStr = cssString({ p: 16 }, ".my-class");
      expect(cssStr).toContain(".my-class");
      expect(cssStr).toContain("padding:16px");
    });
  });

  describe("createSSRContext", () => {
    it("should create isolated context", () => {
      const ssr = createSSRContext();
      const result = ssr.css({ p: 16 });
      expect(result.className).toBeTruthy();
    });

    it("should extract CSS", () => {
      const ssr = createSSRContext();
      ssr.css({ p: 16 });
      ssr.css({ m: 8 });
      const cssStr = ssr.extractCSS();
      expect(cssStr).toContain("padding:16px");
      expect(cssStr).toContain("margin:8px");
    });

    it("should reset context", () => {
      const ssr = createSSRContext();
      ssr.css({ p: 16 });
      ssr.reset();
      const cssStr = ssr.extractCSS();
      expect(cssStr).toBe("");
    });
  });
});
