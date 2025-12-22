import type { Meta, StoryObj } from "@storybook/react";
import { Text, VStack } from "../../renderer";

const meta: Meta<typeof Text> = {
  title: "Cores/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default text content",
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Text fontSize="0.75rem">Extra Small (0.75rem)</Text>
      <Text fontSize="0.875rem">Small (0.875rem)</Text>
      <Text fontSize="1rem">Normal (1rem)</Text>
      <Text fontSize="1.25rem">Large (1.25rem)</Text>
      <Text fontSize="1.5rem">Extra Large (1.5rem)</Text>
      <Text fontSize="2rem">Huge (2rem)</Text>
    </VStack>
  ),
};

export const Weights: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Text fontWeight="normal">Normal weight</Text>
      <Text fontWeight="medium">Medium weight</Text>
      <Text fontWeight="semibold">Semibold weight</Text>
      <Text fontWeight="bold">Bold weight</Text>
    </VStack>
  ),
};

export const Colors: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Text color="#111827">Default (dark)</Text>
      <Text color="#3b82f6">Primary (blue)</Text>
      <Text color="#10b981">Success (green)</Text>
      <Text color="#f59e0b">Warning (amber)</Text>
      <Text color="#ef4444">Danger (red)</Text>
      <Text color="#6b7280">Muted (gray)</Text>
    </VStack>
  ),
};

export const Combined: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Text fontSize="1.5rem" fontWeight="bold" color="#111827">
        Heading Style
      </Text>
      <Text fontSize="1rem" color="#6b7280">
        Subtitle or description text that provides more context.
      </Text>
      <Text fontSize="0.875rem" fontWeight="medium" color="#3b82f6">
        Link-like text
      </Text>
    </VStack>
  ),
};
