import { createComponentRegistry, configure } from "@bassbook/core";
import type { AnyComponentSpec, ThemeTokens } from "@bassbook/core";
import { createReactRenderer } from "./renderer";
import { createCompoundComponent } from "./compound";
import type { ReactRenderer, BassbookComponentProps } from "./types";
import type { SlotComponentProps } from "./compound";
import type * as React from "react";

export interface BassbookAppConfig {
  specs: AnyComponentSpec[];
  theme?: Partial<ThemeTokens>;
  validate?: boolean;
}

export interface BassbookApp {
  renderer: ReactRenderer;
  component: <P extends BassbookComponentProps = BassbookComponentProps>(
    name: string
  ) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<unknown>>;
  compoundComponent: <T extends Record<string, string>>(
    name: string,
    slotMapping: T
  ) => React.ForwardRefExoticComponent<BassbookComponentProps & React.RefAttributes<unknown>> & {
    [K in keyof T]: React.FC<SlotComponentProps>;
  };
}

/**
 * Create a Bassbook app with all components pre-configured
 * This eliminates the need for a separate renderer.ts file in consumer apps
 * 
 * @example
 * ```tsx
 * import { createBassbookApp } from "@bassbook/react";
 * import { builtInSpecs } from "./specs";
 * 
 * const app = createBassbookApp({
 *   specs: builtInSpecs,
 *   theme: {
 *     colors: { primary: "#3b82f6" }
 *   }
 * });
 * 
 * export const Box = app.component("Box");
 * export const Button = app.component("Button");
 * export const Dialog = app.compoundComponent("Dialog", {
 *   Title: "title",
 *   Footer: "footer"
 * });
 * ```
 */
export function createBassbookApp(config: BassbookAppConfig): BassbookApp {
  const { specs, theme, validate } = config;

  // Configure theme if provided
  if (theme) {
    configure({ theme });
  }

  // Create and populate registry
  const registry = createComponentRegistry();
  registry.registerAll(specs);

  // Create renderer
  const renderer = createReactRenderer({ registry, validate });

  // Helper to create a component
  function component<P extends BassbookComponentProps = BassbookComponentProps>(name: string) {
    return renderer.createComponent(name) as React.ForwardRefExoticComponent<
      React.PropsWithoutRef<P> & React.RefAttributes<unknown>
    >;
  }

  // Helper to create a compound component
  function compoundComponent<T extends Record<string, string>>(
    name: string,
    slotMapping: T
  ) {
    return createCompoundComponent(renderer, name, slotMapping);
  }

  return {
    renderer,
    component,
    compoundComponent,
  };
}

/**
 * Pre-built component names for type-safe component creation
 */
export const ComponentNames = {
  // Cores
  Box: "Box",
  CoreButton: "CoreButton",
  CoreInput: "CoreInput",
  CoreForm: "CoreForm",
  HStack: "HStack",
  VStack: "VStack",
  Text: "Text",
  Label: "Label",
  Link: "Link",
  Image: "Image",
  Divider: "Divider",
  Svg: "Svg",

  // Units
  Avatar: "Avatar",
  Badge: "Badge",
  Button: "Button",
  Checkbox: "Checkbox",
  Icon: "Icon",
  Input: "Input",
  InputArea: "InputArea",
  Placeholder: "Placeholder",
  Progressbar: "Progressbar",
  Radio: "Radio",
  Select: "Select",
  SelectOption: "SelectOption",
  Skeleton: "Skeleton",
  Slider: "Slider",
  Switch: "Switch",

  // Parts
  Alert: "Alert",
  Dialog: "Dialog",
  Form: "Form",
  Modal: "Modal",
  Navigator: "Navigator",
  Sheet: "Sheet",
  View: "View",
} as const;

export type ComponentName = (typeof ComponentNames)[keyof typeof ComponentNames];
