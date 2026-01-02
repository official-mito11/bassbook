/**
 * CSSRegistry Unit Tests
 */

import { describe, it, expect, beforeEach } from "bun:test";
import { CSSRegistry } from "./registry";

describe("CSSRegistry", () => {
  let registry: CSSRegistry;

  beforeEach(() => {
    registry = new CSSRegistry("test");
  });

  describe("register", () => {
    it("should generate consistent class names for same CSS", () => {
      const class1 = registry.register("display", "flex");
      const class2 = registry.register("display", "flex");
      expect(class1).toBe(class2);
    });

    it("should deduplicate CSS properties", () => {
      registry.register("margin", "10px");
      registry.register("margin", "10px");
      expect(registry.getStats().totalRules).toBe(1);
    });

    it("should generate unique classes for different values", () => {
      const class1 = registry.register("margin", "10px");
      const class2 = registry.register("margin", "20px");
      expect(class1).not.toBe(class2);
    });

    it("should handle media queries", () => {
      const className = registry.register("display", "flex", { media: "(min-width: 768px)" });
      expect(className).toContain("-");
      const css = registry.getCSS();
      expect(css).toContain("@media (min-width: 768px)");
    });

    it("should handle selectors", () => {
      registry.register("color", "red", { selector: ":hover" });
      const css = registry.getCSS();
      expect(css).toContain(":hover");
    });

    it("should collect server-side CSS correctly", () => {
      const serverRegistry = new CSSRegistry("srv");
      serverRegistry.register("padding", "16px");
      serverRegistry.register("margin", "8px");

      const css = serverRegistry.getCSS();
      expect(css).toContain("padding:16px");
      expect(css).toContain("margin:8px");
    });
  });

  describe("registerMultiple", () => {
    it("should register multiple declarations at once", () => {
      const classes = registry.registerMultiple({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      });

      expect(classes).toHaveLength(3);
      expect(registry.getStats().totalRules).toBe(3);
    });

    it("should skip undefined/null/empty values", () => {
      const classes = registry.registerMultiple({
        display: "flex",
        margin: undefined as any,
        padding: "" as any,
        color: null as any,
      });

      expect(classes).toHaveLength(1);
    });
  });

  describe("getCSSForClasses", () => {
    it("should return CSS for specific class names", () => {
      const class1 = registry.register("display", "flex");
      registry.register("margin", "10px");
      const class3 = registry.register("color", "red");

      const css = registry.getCSSForClasses([class1, class3]);
      expect(css).toContain("display:flex");
      expect(css).toContain("color:red");
      expect(css).not.toContain("margin:10px");
    });
  });

  describe("reset", () => {
    it("should clear all rules", () => {
      registry.register("display", "flex");
      registry.register("margin", "10px");
      expect(registry.getStats().totalRules).toBe(2);

      registry.reset();
      expect(registry.getStats().totalRules).toBe(0);
    });
  });

  describe("stats", () => {
    it("should track unique properties count", () => {
      registry.register("display", "flex");
      registry.register("display", "block");
      registry.register("margin", "10px");

      const stats = registry.getStats();
      expect(stats.totalRules).toBe(3);
      expect(stats.uniqueProperties).toBe(2); // display, margin
    });
  });
});
