import * as React from "react";
import type { SlotsMap } from "@bassbook/core";
import type { BassbookComponentProps, ReactRenderer, SlotValues } from "./types";

/**
 * Symbol to mark slot components
 */
const SLOT_SYMBOL = Symbol.for("bassbook.slot");

/**
 * Props for slot components
 */
export interface SlotComponentProps extends BassbookComponentProps {
  /** Internal: slot name this component maps to */
  __slotName?: string;
}

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
        // Collect children of the slot component
        const slotChildren = (child.props as { children?: React.ReactNode }).children;
        if (slots[slotName]) {
          // Append to existing slot
          slots[slotName] = React.createElement(
            React.Fragment,
            null,
            slots[slotName],
            slotChildren
          );
        } else {
          slots[slotName] = slotChildren;
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
  T extends Record<string, string>
>(
  renderer: ReactRenderer,
  componentName: string,
  slotMapping: T
): React.ForwardRefExoticComponent<BassbookComponentProps & React.RefAttributes<unknown>> & {
  [K in keyof T]: React.FC<SlotComponentProps>;
} {
  const BaseComponent = renderer.createComponent(componentName);
  
  // Create slot sub-components
  const subComponents: Record<string, React.FC<SlotComponentProps>> = {};
  for (const [subName, slotName] of Object.entries(slotMapping)) {
    subComponents[subName] = createSlotComponent(slotName);
  }
  
  // Combine base component with sub-components
  return Object.assign(BaseComponent, subComponents) as React.ForwardRefExoticComponent<BassbookComponentProps & React.RefAttributes<unknown>> & {
    [K in keyof T]: React.FC<SlotComponentProps>;
  };
}
