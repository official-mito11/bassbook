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
import {
  createCompoundComponent,
  createSlottedComponent,
  isSlotComponent,
  getSlotName,
  isSlottedComponent,
} from "./compound";
import type { BassbookComponentProps, SlotValues } from "./types";

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
export const Slider = renderer.createComponent<typeof CoreComponents.Slider>("Slider");
export const Switch = renderer.createComponent<typeof CoreComponents.Switch>("Switch");

const SelectHeader = createSlottedComponent(BaseSelectHeader, "header");
const SelectOption = createSlottedComponent(BaseSelectOption, "options");

const SelectWithLabel = React.forwardRef<unknown, BassbookComponentProps<typeof CoreComponents.Select>>(
  function SelectWithLabel(props, ref) {
    const selectedValue = typeof props.value === "string" ? props.value : undefined;

    let selectedLabel: React.ReactNode = undefined;
    if (selectedValue !== undefined) {
      React.Children.forEach(props.children, (child) => {
        if (selectedLabel !== undefined) return;
        if (!isSlotComponent(child)) return;
        if (!isSlottedComponent(child)) return;
        const slotName = getSlotName(child);
        if (slotName !== "options") return;
        const el = child as React.ReactElement<{ value?: unknown; children?: React.ReactNode }>;
        if (el.props.value === selectedValue) {
          selectedLabel = el.props.children;
        }
      });
    }

    const existingSlots = (props.__slots ?? undefined) as SlotValues | undefined;
    const nextSlots: SlotValues | undefined =
      selectedLabel !== undefined && (existingSlots?.value === undefined)
        ? { ...(existingSlots ?? {}), value: selectedLabel }
        : existingSlots;

    return React.createElement(BaseSelect, {
      ...(props as unknown as BassbookComponentProps<typeof CoreComponents.Select>),
      __slots: nextSlots,
      ref,
    });
  }
);

export const Select = Object.assign(SelectWithLabel, {
  Header: SelectHeader,
  Option: SelectOption,
});

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
