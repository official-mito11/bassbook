import * as React from "react";
import type { BassbookComponentProps } from "../types";

export type SelectSize = "sm" | "md" | "lg";

export type SelectItem<TValue extends string = string> = {
  value: TValue;
  label: React.ReactNode;
  disabled?: boolean;
};

export type UseSelectControllerOptions<TValue extends string = string> = {
  items: readonly SelectItem<TValue>[];
  value?: TValue;
  onValueChange?: (value: TValue) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  size?: SelectSize;
  placeholder?: React.ReactNode;
  components: {
    SelectOption: React.ComponentType<BassbookComponentProps>;
  };
};

export type SelectControllerResult = {
  rootRef: React.RefObject<unknown>;
  open: boolean;
  activeIndex: number;
  props: BassbookComponentProps;
};

function clampIndex(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function findSelectedIndex<TValue extends string>(items: readonly SelectItem<TValue>[], value?: TValue): number {
  if (!value) return -1;
  return items.findIndex((it) => it.value === value);
}

function findNextEnabledIndex<TValue extends string>(
  items: readonly SelectItem<TValue>[],
  start: number,
  dir: 1 | -1
): number {
  if (items.length === 0) return -1;
  let i = clampIndex(start, 0, items.length - 1);
  for (let step = 0; step < items.length; step++) {
    const it = items[i];
    if (!it?.disabled) return i;
    i = (i + dir + items.length) % items.length;
  }
  return -1;
}

export function useSelectController<TValue extends string = string>(
  options: UseSelectControllerOptions<TValue>
): SelectControllerResult {
  const {
    items,
    value,
    onValueChange,
    open: openControlled,
    onOpenChange,
    disabled,
    size = "md",
    placeholder,
    components,
  } = options;

  const rootRef = React.useRef<unknown>(null);
  const idBase = React.useId();
  const listboxId = `${idBase}-listbox`;

  const isOpenControlled = typeof openControlled === "boolean";
  const [openUncontrolled, setOpenUncontrolled] = React.useState(false);
  const open = isOpenControlled ? (openControlled as boolean) : openUncontrolled;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setOpenUncontrolled(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange]
  );

  const selectedIndex = React.useMemo(() => findSelectedIndex(items, value), [items, value]);

  const [activeIndex, setActiveIndex] = React.useState<number>(() => {
    const base = selectedIndex >= 0 ? selectedIndex : 0;
    return findNextEnabledIndex(items, base, 1);
  });

  React.useEffect(() => {
    if (!open) return;
    const base = selectedIndex >= 0 ? selectedIndex : activeIndex;
    const next = findNextEnabledIndex(items, base, 1);
    if (next !== -1) setActiveIndex(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const activeOptionId = activeIndex >= 0 ? `${idBase}-opt-${activeIndex}` : undefined;

  React.useEffect(() => {
    if (!open) return;
    if (!activeOptionId) return;
    const doc = (globalThis as { document?: Document }).document;
    if (!doc) return;
    const el = doc.getElementById(activeOptionId);
    if (el && "scrollIntoView" in el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeOptionId]);

  React.useEffect(() => {
    if (!open) return;
    const doc = (globalThis as { document?: Document }).document;
    if (!doc) return;

    function onPointerDown(ev: PointerEvent) {
      const root = rootRef.current as HTMLElement | null;
      const target = ev.target as Node | null;
      if (!root || !target) return;
      if (typeof root.contains === "function" && root.contains(target)) return;
      setOpen(false);
    }

    doc.addEventListener("pointerdown", onPointerDown, true);
    return () => doc.removeEventListener("pointerdown", onPointerDown, true);
  }, [open, setOpen]);

  const selectValueNode = React.useMemo(() => {
    const selected = items.find((it) => it.value === value);
    return selected?.label ?? placeholder ?? null;
  }, [items, placeholder, value]);

  const optionsNode = React.useMemo(() => {
    const Option = components.SelectOption;
    return items.map((it, idx) => {
      const isSelected = it.value === value;

      const onClick = () => {
        if (disabled || it.disabled) return;
        onValueChange?.(it.value);
        setOpen(false);
      };

      const onMouseEnter = () => {
        if (!open) return;
        if (it.disabled) return;
        setActiveIndex(idx);
      };

      return React.createElement(
        Option,
        {
          key: it.value,
          id: `${idBase}-opt-${idx}`,
          selected: isSelected,
          active: idx === activeIndex,
          disabled: Boolean(disabled || it.disabled),
          "aria-selected": isSelected,
          onClick,
          onMouseEnter,
        } as BassbookComponentProps,
        it.label
      );
    });
  }, [activeIndex, components, disabled, idBase, items, onValueChange, open, setOpen, value]);

  const onTriggerKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      if (disabled) return;

      const key = ev.key;

      if (key === "ArrowDown") {
        ev.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex((prev) => findNextEnabledIndex(items, prev + 1, 1));
        return;
      }

      if (key === "ArrowUp") {
        ev.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex((prev) => findNextEnabledIndex(items, prev - 1, -1));
        return;
      }

      if (key === "Home") {
        ev.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex(findNextEnabledIndex(items, 0, 1));
        return;
      }

      if (key === "End") {
        ev.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex(findNextEnabledIndex(items, items.length - 1, -1));
        return;
      }

      if (key === "Escape") {
        if (!open) return;
        ev.preventDefault();
        setOpen(false);
        return;
      }

      if (key === "Enter" || key === " ") {
        ev.preventDefault();
        if (!open) {
          setOpen(true);
          return;
        }
        const it = items[activeIndex];
        if (!it || it.disabled) return;
        onValueChange?.(it.value);
        setOpen(false);
      }
    },
    [activeIndex, disabled, items, onValueChange, open, setOpen]
  );

  const props: BassbookComponentProps = {
    open,
    disabled,
    size,
    __slots: {
      value: selectValueNode,
      options: optionsNode,
    },
    __partProps: {
      root: { ref: rootRef },
      trigger: {
        disabled: Boolean(disabled),
        "aria-controls": listboxId,
        "aria-expanded": open,
        "aria-activedescendant": open ? activeOptionId : undefined,
        onClick: () => {
          if (disabled) return;
          setOpen(!open);
        },
        onKeyDown: onTriggerKeyDown,
      },
      menu: {
        id: listboxId,
        "aria-hidden": !open,
      },
    },
  };

  return { rootRef, open, activeIndex, props };
}
