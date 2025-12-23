import * as React from "react";
import type { SlotsMap } from "@bassbook/core";
import type { BassbookComponentProps, ReactRenderer, SlotValues } from "./types";

/**
 * Symbol to mark slot components
 */
const SLOT_SYMBOL = Symbol.for("bassbook.slot");

/**
 * Symbol to mark slotted components (real component + slot marker)
 */
const SLOTTED_SYMBOL = Symbol.for("bassbook.slotted");

/**
 * Props for slot components
 */
export type SlotComponentProps = BassbookComponentProps & {
  /** Internal: slot name this component maps to */
  __slotName?: string;
};

/**
 * Create a slot component for compound component pattern
 * Usage: Dialog.Title = createSlotComponent("title")
 */
export function createSlotComponent(slotName: string): React.FC<SlotComponentProps> {
  const SlotComponent: React.FC<SlotComponentProps> = ({ children }) => {
    // Return children with slot marker
    return React.createElement(React.Fragment, null, children);
  };
  
  // Mark as slot component
  (SlotComponent as unknown as Record<symbol, string>)[SLOT_SYMBOL] = slotName;
  SlotComponent.displayName = `Slot(${slotName})`;
  
  return SlotComponent;
}

/**
 * Create a slotted component that renders a real component, but is also treated as
 * a slot component for compound extraction.
 *
 * Example:
 * Select.Option = createSlottedComponent(SelectOption, "options")
 */
export function createSlottedComponent<P extends BassbookComponentProps>(
  Component: React.ComponentType<P>,
  slotName: string
): React.FC<P> {
  const Slotted: React.FC<P> = (props) => {
    return React.createElement(Component, props);
  };
  (Slotted as unknown as Record<symbol, string>)[SLOT_SYMBOL] = slotName;
  (Slotted as unknown as Record<symbol, boolean>)[SLOTTED_SYMBOL] = true;
  Slotted.displayName = `Slotted(${slotName})`;
  return Slotted;
}

/**
 * Check if a React element is a slot component
 */
export function isSlotComponent(element: unknown): element is React.ReactElement {
  if (!React.isValidElement(element)) return false;
  const type = element.type as unknown as Record<symbol, string> | undefined;
  return typeof type === "function" && type !== null && SLOT_SYMBOL in type;
}

/**
 * Get slot name from a slot component element
 */
export function getSlotName(element: React.ReactElement): string | undefined {
  const type = element.type as unknown as Record<symbol, string> | undefined;
  return type?.[SLOT_SYMBOL];
}

/**
 * Check if a React element is a slotted component (keeps the element itself)
 */
export function isSlottedComponent(element: unknown): element is React.ReactElement {
  if (!React.isValidElement(element)) return false;
  const type = element.type as unknown as Record<symbol, unknown> | undefined;
  return typeof type === "function" && type !== null && SLOTTED_SYMBOL in type;
}

/**
 * Extract slots from children based on slot definitions
 */
export function extractSlotsFromChildren(
  children: React.ReactNode,
  slotsMap?: SlotsMap
): SlotValues {
  const slots: SlotValues = {};
  const defaultChildren: React.ReactNode[] = [];
  
  // Find default slot name
  let defaultSlotName = "children";
  if (slotsMap) {
    for (const [name, def] of Object.entries(slotsMap)) {
      if (def.default) {
        defaultSlotName = name;
        break;
      }
    }
  }
  
  React.Children.forEach(children, (child) => {
    if (isSlotComponent(child)) {
      const slotName = getSlotName(child);
      if (slotName) {
        // For slotted components, keep the element itself so props are preserved.
        // For plain slot components, unwrap to its children.
        const slotValue: React.ReactNode = isSlottedComponent(child)
          ? child
          : (child as React.ReactElement<{ children?: React.ReactNode }>).props.children;
        if (slots[slotName]) {
          // Append to existing slot
          slots[slotName] = React.createElement(
            React.Fragment,
            null,
            slots[slotName],
            slotValue
          );
        } else {
          slots[slotName] = slotValue;
        }
        return;
      }
    }
    
    // Not a slot component - add to default slot
    defaultChildren.push(child);
  });
  
  // Set default slot if there are unmatched children
  if (defaultChildren.length > 0) {
    slots[defaultSlotName] = defaultChildren.length === 1 
      ? defaultChildren[0] 
      : React.createElement(React.Fragment, null, ...defaultChildren);
  }
  
  return slots;
}

/**
 * Create compound component with sub-components for slots
 * Usage: const Dialog = createCompoundComponent(renderer, "Dialog", { Title: "title", Footer: "footer" })
 */
export function createCompoundComponent<
  Spec extends import("@bassbook/core").AnyComponentSpec,
  T extends Record<string, string> = Record<string, string>
>(
  renderer: ReactRenderer,
  componentName: string,
  slotMapping: T
): React.ForwardRefExoticComponent<BassbookComponentProps<Spec> & React.RefAttributes<unknown>> & {
  [K in keyof T]: React.FC<SlotComponentProps>;
} {
  const BaseComponent = renderer.createComponent<Spec>(componentName);
  
  // Create slot sub-components
  const subComponents: Record<string, React.FC<SlotComponentProps>> = {};
  for (const [subName, slotName] of Object.entries(slotMapping)) {
    subComponents[subName] = createSlotComponent(slotName);
  }
  
  // Combine base component with sub-components
  return Object.assign(BaseComponent, subComponents) as React.ForwardRefExoticComponent<BassbookComponentProps<Spec> & React.RefAttributes<unknown>> & {
    [K in keyof T]: React.FC<SlotComponentProps>;
  };
}
