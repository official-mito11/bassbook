import * as React from "react";

import { css, cx, splitProps } from "@bassbook/core";
import type {
  AnyComponentSpec,
  ComponentRegistry,
  NodeSpec,
  SlotStyles,
  StyleContext,
  StyleOptions,
  StyleProps,
} from "@bassbook/core";

// React adapter for Bassbook component specs.

export type SlotValues = Record<string, React.ReactNode>;

export type BassbookComponentProps = Partial<StyleProps> & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  __slots?: SlotValues;
  __partProps?: Record<string, Record<string, unknown>>;
  [key: string]: unknown;
};

export interface ReactRenderer {
  render(name: string, props?: BassbookComponentProps, slots?: SlotValues): React.ReactElement | null;
  createComponent(name: string): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<BassbookComponentProps> & React.RefAttributes<unknown>
  >;
}

export interface CreateReactRendererOptions {
  registry: ComponentRegistry;
  context?: StyleContext;
}

type PartStyleMap = Record<string, Partial<StyleProps>>;
type UnknownProps = Record<string, unknown>;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Merge per-part style objects, keeping later assignments as overrides.
function mergePartStyles(target: PartStyleMap, incoming?: SlotStyles): void {
  if (!incoming) return;
  for (const [part, styles] of Object.entries(incoming)) {
    const prev = target[part] ?? {};
    target[part] = { ...prev, ...(styles ?? {}) };
  }
}

function getVariantKeys(spec: AnyComponentSpec): string[] {
  const styles = spec.styles as any;
  if (!styles || !isObject(styles)) return [];
  const variants = (styles as any).variants as Record<string, unknown> | undefined;
  if (!variants || !isObject(variants)) return [];
  return Object.keys(variants);
}

function coerceVariantSelection(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  return undefined;
}

// Resolve (base + variants + compound) styles for every part of a component spec.
function resolvePartStyles(
  spec: AnyComponentSpec,
  props: UnknownProps,
  userStyleProps: Partial<StyleProps>
): PartStyleMap {
  const result: PartStyleMap = {};

  const styles = spec.styles as any;
  if (!styles || !isObject(styles)) {
    if (Object.keys(userStyleProps).length > 0) {
      result.root = { ...(result.root ?? {}), ...userStyleProps };
    }
    return result;
  }

  mergePartStyles(result, (styles as any).base as SlotStyles | undefined);

  const variants = (styles as any).variants as
    | Record<string, Record<string, SlotStyles>>
    | undefined;
  const defaultVariants = (styles as any).defaultVariants as Record<string, string> | undefined;

  if (variants && isObject(variants)) {
    for (const [variantKey, variantMap] of Object.entries(variants)) {
      const selected = coerceVariantSelection(props[variantKey] ?? defaultVariants?.[variantKey]);
      if (!selected) continue;
      const slotStyles = (variantMap as Record<string, SlotStyles>)[selected];
      if (!slotStyles) continue;
      mergePartStyles(result, slotStyles);
    }
  }

  const compoundVariants = (styles as any).compoundVariants as
    | Array<{ conditions: Record<string, string>; styles: SlotStyles }>
    | undefined;
  if (compoundVariants) {
    for (const compound of compoundVariants) {
      const matches = Object.entries(compound.conditions).every(([key, value]) => {
        const actual = (props[key] ?? defaultVariants?.[key]) as unknown;
        return actual === value;
      });
      if (!matches) continue;
      mergePartStyles(result, compound.styles);
    }
  }

  if (Object.keys(userStyleProps).length > 0) {
    result.root = { ...(result.root ?? {}), ...userStyleProps };
  }

  return result;
}

function filterDomProps(domProps: UnknownProps, keysToRemove: readonly string[]): UnknownProps {
  if (keysToRemove.length === 0) return domProps;
  const next: UnknownProps = { ...domProps };
  for (const key of keysToRemove) {
    if (key in next) delete next[key];
  }
  return next;
}

function normalizeSlots(slots: SlotValues | undefined, children: React.ReactNode): SlotValues {
  return { ...(slots ?? {}), children };
}

function extractClassName(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function extractStyle(value: unknown): React.CSSProperties | undefined {
  if (!isObject(value)) return undefined;
  return value as React.CSSProperties;
}

function mergeReactStyles(
  base: React.CSSProperties | undefined,
  next: React.CSSProperties | undefined
): React.CSSProperties | undefined {
  if (!base && !next) return undefined;
  return { ...(base ?? {}), ...(next ?? {}) };
}

function mergeRefs(...refs: unknown[]) {
  return (value: unknown) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        (ref as (val: unknown) => void)(value);
        continue;
      }
      if (typeof ref === "object" && ref !== null && "current" in (ref as any)) {
        (ref as any).current = value;
      }
    }
  };
}

export function createReactRenderer(options: CreateReactRendererOptions): ReactRenderer {
  const { registry, context } = options;
  const baseStyleOptions: StyleOptions | undefined = context ? { context } : undefined;

  function renderBySpec(
    spec: AnyComponentSpec,
    propsInput: BassbookComponentProps | undefined,
    slotsInput: SlotValues | undefined,
    rootExtras?: UnknownProps,
    parentStack?: readonly string[]
  ): React.ReactElement | null {
    const stack = [...(parentStack ?? []), spec.name];
    if (parentStack?.includes(spec.name)) {
      throw new Error(`Circular component reference detected: ${stack.join(" -> ")}`);
    }

    const rawProps = (propsInput ?? {}) as UnknownProps;
    const slotsFromProps = (rawProps.__slots as SlotValues | undefined) ?? undefined;
    const partPropsFromProps = (rawProps.__partProps as Record<string, UnknownProps> | undefined) ?? undefined;

    const props: UnknownProps = { ...rawProps };
    delete props.__slots;
    delete props.__partProps;

    const { styleProps: userStyleProps, domProps: rawDomProps } = splitProps(props);
    const variantKeys = getVariantKeys(spec);
    const dataPropKeys = spec.dataProps ?? [];

    // children should be consumed via the `children` slot, not forwarded to DOM.
    const domPropsObj = rawDomProps as UnknownProps;
    const { children: _children, ...domPropsWithoutChildren } = domPropsObj as UnknownProps & {
      children?: unknown;
    };

    const domProps = filterDomProps(domPropsWithoutChildren, [...variantKeys, ...dataPropKeys]);

    const rootDomProps = rootExtras ? { ...domProps, ...rootExtras } : domProps;
    const rootPartProps = partPropsFromProps?.root;
    // Let __partProps.root override any forwarded DOM props (including ones from forwardRef).
    const rootDomPropsWithPart = rootPartProps ? { ...rootDomProps, ...rootPartProps } : rootDomProps;

    if (rootPartProps && "ref" in rootPartProps && "ref" in rootDomProps) {
      const partRef = (rootPartProps as any).ref;
      const domRef = (rootDomProps as any).ref;
      if (partRef && domRef) {
        (rootDomPropsWithPart as any).ref = mergeRefs(domRef, partRef);
      }
    }

    const slots = normalizeSlots({ ...(slotsFromProps ?? {}), ...(slotsInput ?? {}) }, propsInput?.children);
    const partStyles = resolvePartStyles(spec, props, userStyleProps);

    // Check if value is a React element (has $$typeof symbol)
    function isReactElement(value: unknown): boolean {
      return (
        typeof value === "object" &&
        value !== null &&
        "$$typeof" in (value as object)
      );
    }

    // Flatten nested arrays in children for React compatibility
    // Skip React elements (they have $$typeof) to avoid treating them as arrays
    function flattenChildren(children: React.ReactNode[]): React.ReactNode[] {
      const result: React.ReactNode[] = [];
      for (const child of children) {
        if (Array.isArray(child) && !isReactElement(child)) {
          result.push(...flattenChildren(child));
        } else {
          result.push(child);
        }
      }
      return result;
    }

    function renderNode(node: NodeSpec, extraForThisNode?: UnknownProps): React.ReactNode {
      if (node.kind === "slot") {
        // Return slot value as-is; flattenChildren will handle arrays
        return slots[node.slot] ?? null;
      }

      const partExtra = partPropsFromProps?.[node.part];
      const mergedExtraForNode = partExtra ? { ...(extraForThisNode ?? {}), ...partExtra } : extraForThisNode;

      if (node.kind === "component") {
        const childSpec = registry.get(node.component);

        if (!childSpec) {
          throw new Error(`Unknown component reference '${node.component}'`);
        }

        if (stack.includes(childSpec.name)) {
          throw new Error(
            `Circular component reference detected: ${[...stack, childSpec.name].join(" -> ")}`
          );
        }

        const renderedChildren = (node.children ?? []).map((child) => renderNode(child as NodeSpec));

        // Styles for a component node are applied to the referenced component root.
        const partStyleProps = partStyles[node.part] ?? {};
        const styleFromSpec = css(partStyleProps as UnknownProps, baseStyleOptions);

        const nodeProps = (node.props ?? {}) as UnknownProps;

        const mergedNodeStyle = mergeReactStyles(
          extractStyle(nodeProps.style),
          mergeReactStyles(
            extractStyle(mergedExtraForNode?.style),
            styleFromSpec.style as React.CSSProperties | undefined
          )
        );

        const mergedNodeClassName = cx(
          extractClassName(nodeProps.className),
          extractClassName(mergedExtraForNode?.className),
          styleFromSpec.className
        );

        const childProps: BassbookComponentProps = {
          ...nodeProps,
          ...(mergedExtraForNode ?? {}),
          className: mergedNodeClassName || undefined,
          style: mergedNodeStyle,
          // children are supplied via slots below.
          children: undefined,
        };

        const element = renderBySpec(childSpec, childProps, { children: renderedChildren }, undefined, stack);

        return element;
      }

      // element node
      const rawChildren = (node.children ?? []).map((child) => renderNode(child as NodeSpec));
      const renderedChildren = flattenChildren(rawChildren);

      const attrs = (node.attrs ?? {}) as UnknownProps;
      const extra = mergedExtraForNode ?? {};

      const partStyleProps = partStyles[node.part] ?? {};

      const mergedStyleOptions: StyleOptions = {
        ...(baseStyleOptions ?? {}),
        className: cx(extractClassName(attrs.className), extractClassName(extra.className)),
        style: mergeReactStyles(extractStyle(attrs.style), extractStyle(extra.style)) as any,
      };

      const styleFromSpec = css(partStyleProps as UnknownProps, mergedStyleOptions);

      const elementProps: UnknownProps = {
        ...attrs,
        ...extra,
      };

      delete elementProps.className;
      delete elementProps.style;
      delete elementProps.children;

      if (styleFromSpec.className) {
        elementProps.className = styleFromSpec.className;
      }
      if (styleFromSpec.style) {
        elementProps.style = styleFromSpec.style as any;
      }

      return React.createElement(node.tag as any, elementProps as any, ...renderedChildren);
    }

    return renderNode(spec.tree as unknown as NodeSpec, rootDomPropsWithPart) as React.ReactElement | null;
  }

  function render(name: string, props?: BassbookComponentProps, slots?: SlotValues): React.ReactElement | null {
    const spec = registry.get(name);
    if (!spec) {
      throw new Error(`Unknown component '${name}'`);
    }
    return renderBySpec(spec, props, slots, undefined, undefined);
  }

  function createComponent(name: string) {
    return React.forwardRef<unknown, BassbookComponentProps>(function BassbookComponent(
      props: BassbookComponentProps,
      ref: React.ForwardedRef<unknown>
    ) {
      const spec = registry.get(name);
      if (!spec) {
        throw new Error(`Unknown component '${name}'`);
      }

      const rootExtras: UnknownProps = {};
      if (ref) rootExtras.ref = ref;

      return renderBySpec(spec, props, undefined, rootExtras, undefined) ?? null;
    });
  }

  return { render, createComponent };
}

export function createReactComponent(
  name: string,
  options: CreateReactRendererOptions
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<BassbookComponentProps> & React.RefAttributes<unknown>
> {
  return createReactRenderer(options).createComponent(name);
}

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

// Controller for fully custom Select (keyboard nav, outside click close, aria wiring)
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
    const doc = (globalThis as any).document as any;
    if (!doc) return;
    const el = doc.getElementById(activeOptionId);
    if (el && "scrollIntoView" in el) {
      (el as any).scrollIntoView({ block: "nearest" });
    }
  }, [open, activeOptionId]);

  React.useEffect(() => {
    if (!open) return;
    const doc = (globalThis as any).document as any;
    if (!doc) return;

    function onPointerDown(ev: any) {
      const root = rootRef.current as any;
      const target = (ev as any)?.target as any;
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
        Option as any,
        {
          key: it.value,
          id: `${idBase}-opt-${idx}`,
          selected: isSelected,
          active: idx === activeIndex,
          disabled: Boolean(disabled || it.disabled),
          "aria-selected": isSelected,
          onClick,
          onMouseEnter,
        } as any,
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

export type UseToggleControllerOptions = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

// Controller for custom Checkbox/Radio/Switch (keyboard + aria-checked)
export function useToggleController(options: UseToggleControllerOptions) {
  const { checked = false, onCheckedChange, disabled } = options;

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      if (disabled) return;
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        onCheckedChange?.(!checked);
      }
    },
    [checked, disabled, onCheckedChange]
  );

  const onClick = React.useCallback(() => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  }, [checked, disabled, onCheckedChange]);

  const props: BassbookComponentProps = {
    checked,
    disabled,
    __partProps: {
      root: {
        tabIndex: disabled ? -1 : 0,
        "aria-checked": checked,
        "aria-disabled": disabled,
        onClick,
        onKeyDown,
      },
    },
  };

  return { props };
}