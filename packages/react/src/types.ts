import type * as React from "react";
import type { StyleProps } from "@bassbook/core";

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

/**
 * Common variant props that many components use
 */
export interface CommonVariantProps {
  variant?: string;
  size?: string;
  checked?: boolean;
  selected?: boolean;
  active?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  onValueChange?: (value: number) => void;
  side?: string;
  hasImage?: boolean;
  layout?: string;
  padding?: string;
  centered?: boolean;
}

type DataAttributes = {
  [K in `data-${string}`]?: string | number | boolean | undefined;
};

/**
 * Combined props for Bassbook components
 * Includes style props, native element props, and internal props
 */
export type BassbookComponentProps = Partial<StyleProps> & NativeElementProps & CommonVariantProps & {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  __slots?: SlotValues;
  __partProps?: Record<string, Record<string, unknown>>;
  ref?: React.Ref<unknown>;
} & DataAttributes;

export interface ReactRenderer {
  render(name: string, props?: BassbookComponentProps, slots?: SlotValues): React.ReactElement | null;
  createComponent<P extends BassbookComponentProps = BassbookComponentProps>(
    name: string
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<unknown>>;
}

export interface CreateReactRendererOptions {
  registry: import("@bassbook/core").ComponentRegistry;
  context?: import("@bassbook/core").StyleContext;
  validate?: boolean;
}

export type PartStyleMap = Record<string, Partial<StyleProps>>;
export type UnknownProps = Record<string, unknown>;
