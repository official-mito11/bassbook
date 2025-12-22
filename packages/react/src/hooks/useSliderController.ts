import * as React from "react";
import type { BassbookComponentProps } from "../types";

export type UseSliderControllerOptions = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

export function useSliderController(options: UseSliderControllerOptions) {
  const {
    value: controlledValue,
    defaultValue = 50,
    min = 0,
    max = 100,
    step = 1,
    onValueChange,
    disabled,
    size = "md",
  } = options;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isDragging = React.useRef(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

  const setValue = React.useCallback(
    (newValue: number) => {
      const clamped = Math.min(max, Math.max(min, newValue));
      const stepped = Math.round(clamped / step) * step;
      if (controlledValue === undefined) {
        setInternalValue(stepped);
      }
      onValueChange?.(stepped);
    },
    [controlledValue, max, min, onValueChange, step]
  );

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

  const handlePointerDown = React.useCallback(
    (ev: React.PointerEvent) => {
      if (disabled) return;
      ev.preventDefault();
      isDragging.current = true;
      const newValue = getValueFromPosition(ev.clientX);
      setValue(newValue);

      const doc = document;
      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging.current) return;
        const newVal = getValueFromPosition(e.clientX);
        setValue(newVal);
      };
      const onPointerUp = () => {
        isDragging.current = false;
        doc.removeEventListener("pointermove", onPointerMove);
        doc.removeEventListener("pointerup", onPointerUp);
      };
      doc.addEventListener("pointermove", onPointerMove);
      doc.addEventListener("pointerup", onPointerUp);
    },
    [disabled, getValueFromPosition, setValue]
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      if (disabled) return;
      let newValue = value;
      switch (ev.key) {
        case "ArrowRight":
        case "ArrowUp":
          ev.preventDefault();
          newValue = value + step;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          ev.preventDefault();
          newValue = value - step;
          break;
        case "Home":
          ev.preventDefault();
          newValue = min;
          break;
        case "End":
          ev.preventDefault();
          newValue = max;
          break;
        default:
          return;
      }
      setValue(newValue);
    },
    [disabled, max, min, setValue, step, value]
  );

  const props: BassbookComponentProps = {
    size,
    style: { "--slider-value": `${percentage}%` } as React.CSSProperties,
    __partProps: {
      root: {
        ref: rootRef,
        tabIndex: disabled ? -1 : 0,
        "aria-valuenow": value,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-disabled": disabled,
        onPointerDown: handlePointerDown,
        onKeyDown,
      },
    },
  };

  return { value, percentage, props };
}
