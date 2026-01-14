/**
 * DOM Utilities Unit Tests
 */

import { describe, it, expect } from "bun:test";
import { hasBoundingRect, isHTMLElement, setStyleProperty } from "./dom";

describe("DOM Utilities", () => {
  describe("hasBoundingRect", () => {
    it("should return true for elements with getBoundingClientRect", () => {
      const mockElement = {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 }),
      };
      expect(hasBoundingRect(mockElement)).toBe(true);
    });

    it("should return false for objects without getBoundingClientRect", () => {
      expect(hasBoundingRect({})).toBe(false);
      expect(hasBoundingRect(null)).toBe(false);
      expect(hasBoundingRect(undefined)).toBe(false);
    });
  });

  describe("isHTMLElement", () => {
    it("should return false in non-browser environment", () => {
      expect(isHTMLElement({})).toBe(false);
    });
  });

  describe("setStyleProperty", () => {
    it("should handle elements without style property", () => {
      const mockElement = {};
      expect(() => setStyleProperty(mockElement, "color", "red")).not.toThrow();
    });

    it("should set style property on valid elements", () => {
      const mockElement = {
        style: {
          setProperty: (prop: string, value: string) => {
            (mockElement.style as any)[prop] = value;
          },
        },
      };
      setStyleProperty(mockElement, "--custom-var", "10px");
      expect((mockElement.style as any)["--custom-var"]).toBe("10px");
    });
  });
});
