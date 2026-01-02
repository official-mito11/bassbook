import type * as React from "react";
import type {
  AnyComponentSpec,
  ComponentBehavior,
  StateSchema,
  StyleProps,
} from "@bassbook/core";

export type SlotValues = Record<string, React.ReactNode>;

/**
 * Native HTML element props that should be available on all components
 */
export interface NativeElementProps {
  // Event handlers
  onClick?: React.MouseEventHandler;
  onDoubleClick?: React.MouseEventHandler;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onMouseMove?: React.MouseEventHandler;
  onPointerDown?: React.PointerEventHandler;
  onPointerUp?: React.PointerEventHandler;
  onPointerEnter?: React.PointerEventHandler;
  onPointerLeave?: React.PointerEventHandler;
  onPointerMove?: React.PointerEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onInput?: React.FormEventHandler;
  onSubmit?: React.FormEventHandler;
  onScroll?: React.UIEventHandler;
  onWheel?: React.WheelEventHandler;
  onDrag?: React.DragEventHandler;
  onDragStart?: React.DragEventHandler;
  onDragEnd?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDrop?: React.DragEventHandler;
  onTouchStart?: React.TouchEventHandler;
  onTouchMove?: React.TouchEventHandler;
  onTouchEnd?: React.TouchEventHandler;
  onAnimationStart?: React.AnimationEventHandler;
  onAnimationEnd?: React.AnimationEventHandler;
  onTransitionEnd?: React.TransitionEventHandler;
  
  // Common HTML attributes
  id?: string;
  role?: string;
  tabIndex?: number;
  title?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-hidden"?: boolean;
  "aria-disabled"?: boolean;
  "aria-expanded"?: boolean;
  "aria-checked"?: boolean | "mixed";
  "aria-selected"?: boolean;
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  "aria-controls"?: string;
  "aria-live"?: "off" | "polite" | "assertive";
  "data-testid"?: string;
  draggable?: boolean;
  hidden?: boolean;
  
  // Form-related
  name?: string;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
  
  // Link-related
  href?: string;
  target?: string;
  rel?: string;
  
  // Image-related
  src?: string;
  alt?: string;
  loading?: "eager" | "lazy";
}

type VariantPropsFromStyles<Cfg> = Cfg extends { variants?: infer V }
  ? V extends Record<string, Record<string, unknown>>
    ? {
        [K in keyof V]?: keyof V[K] extends "true" | "false"
          ? boolean
          : keyof V[K] & string;
      }
    : {}
  : {};

type StateValueFromField<Field> = Field extends { type: infer T }
  ? T extends "boolean"
    ? boolean
    : T extends "string"
      ? string
      : T extends "number"
        ? number
        : unknown
  : unknown;

type StateValuesFromSchema<S extends StateSchema> = {
  [K in keyof S]: StateValueFromField<S[K]>;
};

type LooseStateValuesFromSchema<S extends Record<string, { type?: unknown }>> = {
  [K in keyof S]: S[K] extends { type: infer T }
    ? T extends "boolean"
      ? boolean
      : T extends "number"
        ? number
        : T extends "string"
          ? string
          : unknown
    : unknown;
};

type LooseBehaviorStateProps<B> = B extends { state?: infer S }
  ? S extends Record<string, { type?: unknown }>
    ? Partial<LooseStateValuesFromSchema<S>>
    : {}
  : {};

type BehaviorStateProps<B> = B extends ComponentBehavior<infer S>
  ? S extends StateSchema
    ? Partial<StateValuesFromSchema<S>>
    : {}
  : {};

type ControlledValueProps<B> = B extends ComponentBehavior<infer S>
  ? S extends StateSchema
    ? B extends { controlledProps?: infer C }
      ? C extends object
        ? {
            [StateKey in keyof C as C[StateKey] extends { prop: infer P extends string }
              ? P
              : never]?: StateKey extends keyof S
              ? StateValuesFromSchema<S>[StateKey]
              : unknown;
          }
        : {}
      : {}
    : {}
  : {};

type LooseControlledValueProps<B> = B extends { state?: infer S; controlledProps?: infer C }
  ? S extends Record<string, { type?: unknown }>
    ? C extends object
      ? {
          [StateKey in keyof C as C[StateKey] extends { prop: infer PP extends string }
            ? PP
            : never]?: StateKey extends keyof S
            ? LooseStateValuesFromSchema<S>[StateKey]
            : unknown;
        }
      : {}
    : {}
  : {};

type LooseControlledCallbackProps<B> = B extends { state?: infer S; controlledProps?: infer C }
  ? S extends Record<string, { type?: unknown }>
    ? C extends object
      ? {
          [StateKey in keyof C as C[StateKey] extends { onChange: infer OO extends string }
            ? OO
            : never]?: (
            value: StateKey extends keyof S
              ? LooseStateValuesFromSchema<S>[StateKey]
              : unknown
          ) => void;
        }
      : {}
    : {}
  : {};

type ControlledCallbackProps<B> = B extends ComponentBehavior<infer S>
  ? S extends StateSchema
    ? B extends { controlledProps?: infer C }
      ? C extends object
        ? {
            [StateKey in keyof C as C[StateKey] extends { onChange: infer O extends string }
              ? O
              : never]?: (
              value: StateKey extends keyof S ? StateValuesFromSchema<S>[StateKey] : unknown
            ) => void;
          }
        : {}
      : {}
    : {}
  : {};

type BehaviorPropsFromSpec<Spec> = Spec extends { behavior?: infer B }
  ? NonNullable<B> extends { state?: unknown; controlledProps?: unknown }
    ? LooseBehaviorStateProps<NonNullable<B>> &
        LooseControlledValueProps<NonNullable<B>> &
        LooseControlledCallbackProps<NonNullable<B>>
    : NonNullable<B> extends ComponentBehavior<any>
      ? BehaviorStateProps<NonNullable<B>> &
          ControlledValueProps<NonNullable<B>> &
          ControlledCallbackProps<NonNullable<B>>
      : {}
  : {};

type VariantPropsFromSpec<Spec> = Spec extends { styles?: infer S }
  ? NonNullable<S> extends Record<string, unknown>
    ? VariantPropsFromStyles<NonNullable<S>>
    : {}
  : {};

type DataAttributes = {
  [K in `data-${string}`]?: string | number | boolean | undefined;
};

/**
 * Combined props for Bassbook components
 * Includes style props, native element props, and internal props
 */
export type BassbookComponentProps<S extends AnyComponentSpec = AnyComponentSpec> = Partial<StyleProps> &
  NativeElementProps &
  VariantPropsFromSpec<S> &
  BehaviorPropsFromSpec<S> & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  __slots?: SlotValues;
  __partProps?: Record<string, Record<string, unknown>>;
} & DataAttributes;

export interface ReactRenderer {
  render(name: string, props?: BassbookComponentProps, slots?: SlotValues): React.ReactElement | null;
  createComponent<S extends AnyComponentSpec = AnyComponentSpec>(
    name: string
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<BassbookComponentProps<S>> & React.RefAttributes<unknown>
  >;
}

export interface CreateReactRendererOptions {
  registry: import("@bassbook/core").ComponentRegistry;
  context?: import("@bassbook/core").StyleContext;
  validate?: boolean;
}

export type PartStyleMap = Record<string, Partial<StyleProps>>;
export type UnknownProps = Record<string, unknown>;
