/**
 * Behavior Runtime Unit Tests
 */

import { describe, it, expect } from "bun:test";
import { createBehaviorRuntime } from "./behaviorRuntime";
import type { ComponentBehavior } from "./spec";

describe("BehaviorRuntime", () => {
  describe("state management", () => {
    it("should initialize state with defaults", () => {
      const behavior: ComponentBehavior = {
        state: {
          count: { type: "number", default: 0 },
          enabled: { type: "boolean", default: true },
        },
      };

      const runtime = createBehaviorRuntime(behavior, {
        getExternalProps: () => ({}),
      });

      const state = runtime.getState();
      expect(state.count).toBe(0);
      expect(state.enabled).toBe(true);
    });

    it("should handle controlled props", () => {
      const behavior: ComponentBehavior = {
        state: {
          value: { type: "number", default: 0, controlled: true },
        },
      };

      const runtime = createBehaviorRuntime(behavior, {
        getExternalProps: () => ({ value: 42 }),
      });

      const state = runtime.getState();
      expect(state.value).toBe(42);
    });
  });

  describe("actions", () => {
    it("should dispatch actions and update state", () => {
      let stateChanged = false;
      const behavior: ComponentBehavior = {
        state: {
          count: { type: "number", default: 0 },
        },
        actions: {
          increment: (state) => ({ count: (state.count as number) + 1 }),
        },
      };

      const runtime = createBehaviorRuntime(behavior, {
        getExternalProps: () => ({}),
        onStateChange: () => {
          stateChanged = true;
        },
      });

      runtime.dispatch("increment");
      expect(runtime.getState().count).toBe(1);
      expect(stateChanged).toBe(true);
    });

    it("should handle actions with payload", () => {
      const behavior: ComponentBehavior = {
        state: {
          count: { type: "number", default: 0 },
        },
        actions: {
          add: (state, payload) => ({ count: (state.count as number) + (payload as number) }),
        },
      };

      const runtime = createBehaviorRuntime(behavior, {
        getExternalProps: () => ({}),
      });

      runtime.dispatch("add", 5);
      expect(runtime.getState().count).toBe(5);
    });
  });

  describe("controlled props with onChange", () => {
    it("should call onChange for controlled props", () => {
      let changedValue: number | undefined;
      const behavior: ComponentBehavior = {
        state: {
          value: { type: "number", default: 0, controlled: true },
        },
        actions: {
          setValue: (_state, payload) => ({ value: payload as number }),
        },
        controlledProps: {
          value: { prop: "value", onChange: "onValueChange" },
        },
      };

      const runtime = createBehaviorRuntime(behavior, {
        getExternalProps: () => ({
          value: 10,
          onValueChange: (v: number) => {
            changedValue = v;
          },
        }),
      });

      runtime.dispatch("setValue", 20);
      expect(changedValue).toBe(20);
    });

    it("should update internal state when not controlled", () => {
      const behavior: ComponentBehavior = {
        state: {
          value: { type: "number", default: 0 },
        },
        actions: {
          setValue: (_state, payload) => ({ value: payload as number }),
        },
      };

      const runtime = createBehaviorRuntime(behavior, {
        getExternalProps: () => ({}),
      });

      runtime.dispatch("setValue", 20);
      expect(runtime.getState().value).toBe(20);
    });
  });
});
