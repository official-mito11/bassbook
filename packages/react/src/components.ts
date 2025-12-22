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

import { createComponentRegistry } from "@bassbook/core";
import * as CoreComponents from "@bassbook/core";
import type { AnyComponentSpec } from "@bassbook/core";
import { createReactRenderer } from "./renderer";
import { createCompoundComponent } from "./compound";

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
const builtInSpecs: AnyComponentSpec[] = Object.values(CoreComponents).filter(isComponentSpec);

// Create registry and renderer
const registry = createComponentRegistry();
registry.registerAll(builtInSpecs);

const renderer = createReactRenderer({ registry });

// ============================================
// Core Components
// ============================================
export const Box = renderer.createComponent("Box");
export const CoreButton = renderer.createComponent("CoreButton");
export const CoreInput = renderer.createComponent("CoreInput");
export const CoreForm = renderer.createComponent("CoreForm");
export const HStack = renderer.createComponent("HStack");
export const VStack = renderer.createComponent("VStack");
export const Text = renderer.createComponent("Text");
export const Label = renderer.createComponent("Label");
export const Link = renderer.createComponent("Link");
export const Image = renderer.createComponent("Image");
export const Divider = renderer.createComponent("Divider");
export const Svg = renderer.createComponent("Svg");

// ============================================
// Unit Components
// ============================================
export const Avatar = renderer.createComponent("Avatar");
export const Badge = renderer.createComponent("Badge");
export const Button = renderer.createComponent("Button");
export const Checkbox = renderer.createComponent("Checkbox");
export const Icon = renderer.createComponent("Icon");
export const Input = renderer.createComponent("Input");
export const InputArea = renderer.createComponent("InputArea");
export const Placeholder = renderer.createComponent("Placeholder");
export const Progressbar = renderer.createComponent("Progressbar");
export const Radio = renderer.createComponent("Radio");
export const Select = renderer.createComponent("Select");
export const SelectOption = renderer.createComponent("SelectOption");
export const Skeleton = renderer.createComponent("Skeleton");
export const Slider = renderer.createComponent("Slider");
export const Switch = renderer.createComponent("Switch");

// ============================================
// Part Components
// ============================================
export const Alert = renderer.createComponent("Alert");
export const Form = renderer.createComponent("Form");
export const Navigator = renderer.createComponent("Navigator");
export const View = renderer.createComponent("View");

// ============================================
// Compound Components
// ============================================
export const Dialog = createCompoundComponent(renderer, "Dialog", {
  Title: "title",
  Description: "description",
  Footer: "footer",
  CloseIcon: "closeIcon",
});

export const Modal = createCompoundComponent(renderer, "Modal", {
  Backdrop: "backdrop",
});

export const Sheet = createCompoundComponent(renderer, "Sheet", {
  Backdrop: "backdrop",
});

// Export the renderer for advanced use cases
export { renderer };
