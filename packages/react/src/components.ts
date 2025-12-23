/**
 * Pre-built React components from @bassbook/react
 * These can be imported directly without creating a renderer
 * 
 * @example
 * import { VStack, Button, Text } from "@bassbook/react";
 * 
 * const App = () => (
 *   <VStack>
 *     <Text>Hello</Text>
 *     <Button>Click me</Button>
 *   </VStack>
 * );
 */

import * as React from "react";
import { createComponentRegistry } from "@bassbook/core";
import * as CoreComponents from "@bassbook/core";
import type { AnyComponentSpec } from "@bassbook/core";
import { createReactRenderer } from "./renderer";
import { createCompoundComponent, createSlottedComponent } from "./compound";
import type { BassbookComponentProps } from "./types";

function mergeRefs(a: unknown, b: unknown) {
  if (!a) return b;
  if (!b) return a;
  return (node: unknown) => {
    if (typeof a === "function") a(node);
    else if (typeof a === "object" && a && "current" in (a as Record<string, unknown>)) {
      (a as { current?: unknown }).current = node;
    }
    if (typeof b === "function") b(node);
    else if (typeof b === "object" && b && "current" in (b as Record<string, unknown>)) {
      (b as { current?: unknown }).current = node;
    }
  };
}

// Helper to check if a value is a component spec
function isComponentSpec(value: unknown): value is AnyComponentSpec {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    (v.layer === "core" || v.layer === "unit" || v.layer === "part") &&
    typeof v.name === "string" &&
    typeof v.tree === "object" &&
    v.tree !== null
  );
}

// Collect all built-in specs from @bassbook/core
const builtInSpecs: AnyComponentSpec[] = (Object.values(CoreComponents) as unknown[]).filter(isComponentSpec);

// Create registry and renderer
const registry = createComponentRegistry();
registry.registerAll(builtInSpecs);

const renderer = createReactRenderer({ registry });

// ============================================
// Core Components
// ============================================
export const Box = renderer.createComponent<typeof CoreComponents.Box>("Box");
export const CoreButton = renderer.createComponent<typeof CoreComponents.CoreButton>("CoreButton");
export const CoreInput = renderer.createComponent<typeof CoreComponents.CoreInput>("CoreInput");
export const CoreForm = renderer.createComponent<typeof CoreComponents.CoreForm>("CoreForm");
export const HStack = renderer.createComponent<typeof CoreComponents.HStack>("HStack");
export const VStack = renderer.createComponent<typeof CoreComponents.VStack>("VStack");
export const Text = renderer.createComponent<typeof CoreComponents.Text>("Text");
export const Label = renderer.createComponent<typeof CoreComponents.Label>("Label");
export const Link = renderer.createComponent<typeof CoreComponents.Link>("Link");
export const Image = renderer.createComponent<typeof CoreComponents.Image>("Image");
export const Divider = renderer.createComponent<typeof CoreComponents.Divider>("Divider");
export const Svg = renderer.createComponent<typeof CoreComponents.Svg>("Svg");

// ============================================
// Unit Components
// ============================================
export const Avatar = renderer.createComponent<typeof CoreComponents.Avatar>("Avatar");
export const Badge = renderer.createComponent<typeof CoreComponents.Badge>("Badge");
export const Button = renderer.createComponent<typeof CoreComponents.Button>("Button");
export const Checkbox = renderer.createComponent<typeof CoreComponents.Checkbox>("Checkbox");
export const Icon = renderer.createComponent<typeof CoreComponents.Icon>("Icon");
export const Input = renderer.createComponent<typeof CoreComponents.Input>("Input");
export const InputArea = renderer.createComponent<typeof CoreComponents.InputArea>("InputArea");
export const Placeholder = renderer.createComponent<typeof CoreComponents.Placeholder>("Placeholder");
export const Progressbar = renderer.createComponent<typeof CoreComponents.Progressbar>("Progressbar");
export const Radio = renderer.createComponent<typeof CoreComponents.Radio>("Radio");
const BaseSelect = renderer.createComponent<typeof CoreComponents.Select>("Select");
const BaseSelectHeader = renderer.createComponent<typeof CoreComponents.SelectHeader>("SelectHeader");
const BaseSelectOption = renderer.createComponent<typeof CoreComponents.SelectOption>("SelectOption");
export const Skeleton = renderer.createComponent<typeof CoreComponents.Skeleton>("Skeleton");
const BaseSlider = renderer.createComponent<typeof CoreComponents.Slider>("Slider");
const BaseSwitch = renderer.createComponent<typeof CoreComponents.Switch>("Switch");

export type SliderProps = Omit<BassbookComponentProps<typeof CoreComponents.Slider>, "value"> & {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
};

export type SwitchProps = Omit<BassbookComponentProps<typeof CoreComponents.Switch>, "checked"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const Switch = React.forwardRef<unknown, SwitchProps>(function Switch(props, ref) {
  const { checked: checkedProp, defaultChecked, onCheckedChange, ...rest } = props;
  const isControlled = typeof checkedProp === "boolean";
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean>(() => defaultChecked ?? false);
  const checked = isControlled ? (checkedProp as boolean) : uncontrolledChecked;

  const handleCheckedChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledChecked(next);
      onCheckedChange?.(next);
    },
    [isControlled, onCheckedChange]
  );

  const existingPartProps = (rest.__partProps ?? {}) as Record<string, Record<string, unknown>>;
  const existingRoot = (existingPartProps.root ?? {}) as Record<string, unknown>;
  const mergedRootRef = mergeRefs(existingRoot.ref, ref);

  const mergedProps: SwitchProps = {
    ...(rest as Omit<SwitchProps, "checked" | "onCheckedChange">),
    checked,
    onCheckedChange: handleCheckedChange,
    __partProps: {
      ...existingPartProps,
      root: { ...existingRoot, ref: mergedRootRef },
    },
  };

  return React.createElement(BaseSwitch, mergedProps as unknown as BassbookComponentProps<typeof CoreComponents.Switch>);
});

export const Select = Object.assign(BaseSelect, {
  Header: createSlottedComponent(BaseSelectHeader, "header"),
  Option: createSlottedComponent(BaseSelectOption, "options"),
});

export const Slider = React.forwardRef<unknown, SliderProps>(
  function Slider(props, ref) {
    const {
      value: valueProp,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled,
      size,
      __partProps,
      ...rest
    } = props as SliderProps & { __partProps?: Record<string, Record<string, unknown>> };

    const rootRef = React.useRef<HTMLDivElement>(null);
    const isValueControlled = typeof valueProp === "number" && Number.isFinite(valueProp);
    const [uncontrolledValue, setUncontrolledValue] = React.useState<number>(defaultValue);
    const value = isValueControlled ? (valueProp as number) : uncontrolledValue;

    const clampAndStep = React.useCallback(
      (v: number) => {
        const clamped = Math.min(max, Math.max(min, v));
        const stepped = Math.round(clamped / step) * step;
        return stepped;
      },
      [max, min, step]
    );

    const setValue = React.useCallback(
      (v: number) => {
        const next = clampAndStep(v);
        if (!isValueControlled) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [clampAndStep, isValueControlled, onValueChange]
    );

    const percentage = ((value - min) / (max - min)) * 100;

    const getValueFromPosition = React.useCallback(
      (clientX: number) => {
        const root = rootRef.current;
        if (!root) return value;
        const rect = root.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        return min + percent * (max - min);
      },
      [max, min, value]
    );

    const isDragging = React.useRef(false);
    const startDragAtClientX = React.useCallback(
      (clientX: number) => {
        if (disabled) return;
        isDragging.current = true;
        setValue(getValueFromPosition(clientX));
      },
      [disabled, getValueFromPosition, setValue]
    );

    const stopDrag = React.useCallback(() => {
      isDragging.current = false;
    }, []);

    const onPointerDown = React.useCallback(
      (ev: React.PointerEvent) => {
        if (disabled) return;
        ev.preventDefault();
        startDragAtClientX(ev.clientX);
        const doc = document;
        const onMove = (e: PointerEvent) => {
          if (!isDragging.current) return;
          setValue(getValueFromPosition(e.clientX));
        };
        const onUp = () => {
          stopDrag();
          doc.removeEventListener("pointermove", onMove);
          doc.removeEventListener("pointerup", onUp);
        };
        doc.addEventListener("pointermove", onMove);
        doc.addEventListener("pointerup", onUp);
      },
      [disabled, getValueFromPosition, setValue, startDragAtClientX, stopDrag]
    );

    const onMouseDown = React.useCallback(
      (ev: React.MouseEvent) => {
        if (disabled) return;
        ev.preventDefault();
        startDragAtClientX(ev.clientX);
        const doc = document;
        const onMove = (e: MouseEvent) => {
          if (!isDragging.current) return;
          setValue(getValueFromPosition(e.clientX));
        };
        const onUp = () => {
          stopDrag();
          doc.removeEventListener("mousemove", onMove);
          doc.removeEventListener("mouseup", onUp);
        };
        doc.addEventListener("mousemove", onMove);
        doc.addEventListener("mouseup", onUp);
      },
      [disabled, getValueFromPosition, setValue, startDragAtClientX, stopDrag]
    );

    const onTouchStart = React.useCallback(
      (ev: React.TouchEvent) => {
        if (disabled) return;
        const t = ev.touches[0];
        if (!t) return;
        ev.preventDefault();
        startDragAtClientX(t.clientX);
        const doc = document;
        const onMove = (e: TouchEvent) => {
          if (!isDragging.current) return;
          const touch = e.touches[0];
          if (!touch) return;
          setValue(getValueFromPosition(touch.clientX));
        };
        const onEnd = () => {
          stopDrag();
          doc.removeEventListener("touchmove", onMove);
          doc.removeEventListener("touchend", onEnd);
          doc.removeEventListener("touchcancel", onEnd);
        };
        doc.addEventListener("touchmove", onMove, { passive: false });
        doc.addEventListener("touchend", onEnd);
        doc.addEventListener("touchcancel", onEnd);
      },
      [disabled, getValueFromPosition, setValue, startDragAtClientX, stopDrag]
    );

    const onKeyDown = React.useCallback(
      (ev: React.KeyboardEvent) => {
        if (disabled) return;
        let next = value;
        switch (ev.key) {
          case "ArrowRight":
          case "ArrowUp":
            ev.preventDefault();
            next = value + step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            ev.preventDefault();
            next = value - step;
            break;
          case "Home":
            ev.preventDefault();
            next = min;
            break;
          case "End":
            ev.preventDefault();
            next = max;
            break;
          default:
            return;
        }
        setValue(next);
      },
      [disabled, max, min, setValue, step, value]
    );

    const existingPartProps = (__partProps ?? {}) as Record<string, Record<string, unknown>>;
    const existingRoot = (existingPartProps.root ?? {}) as Record<string, unknown>;
    const mergedRootRef = mergeRefs(existingRoot.ref, mergeRefs(rootRef, ref));

    const mergedProps: BassbookComponentProps<typeof CoreComponents.Slider> = {
      ...(rest as unknown as BassbookComponentProps<typeof CoreComponents.Slider>),
      size,
      __partProps: {
        ...existingPartProps,
        root: {
          ...existingRoot,
          ref: mergedRootRef,
          tabIndex: disabled ? -1 : 0,
          "aria-valuenow": value,
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-disabled": disabled,
          style: {
            ...(((existingRoot.style ?? undefined) as Record<string, unknown>) ?? {}),
            "--slider-value": `${percentage}%`,
          } as React.CSSProperties,
          onPointerDown,
          onMouseDown,
          onTouchStart,
          onKeyDown,
        },
      },
    };

    return React.createElement(BaseSlider, mergedProps);
  }
);

// ============================================
// Part Components
// ============================================
export const Alert = renderer.createComponent<typeof CoreComponents.Alert>("Alert");
export const Form = renderer.createComponent<typeof CoreComponents.Form>("Form");
export const Navigator = renderer.createComponent<typeof CoreComponents.Navigator>("Navigator");
export const View = renderer.createComponent<typeof CoreComponents.View>("View");

// ============================================
// Compound Components
// ============================================
export const Dialog = createCompoundComponent<typeof CoreComponents.Dialog>(renderer, "Dialog", {
  Title: "title",
  Description: "description",
  Footer: "footer",
  CloseIcon: "closeIcon",
});

export const Modal = createCompoundComponent<typeof CoreComponents.Modal>(renderer, "Modal", {
  Backdrop: "backdrop",
});

export const Sheet = createCompoundComponent<typeof CoreComponents.Sheet>(renderer, "Sheet", {
  Backdrop: "backdrop",
});

// Export the renderer for advanced use cases
export { renderer };
