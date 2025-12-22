import type { Meta, StoryObj } from "@storybook/react";
import { Progressbar, VStack, Text } from "../../renderer";

const meta: Meta<typeof Progressbar> = {
  title: "Units/Progressbar",
  component: Progressbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Progressbar size="md" w={300} />
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={16} w={300}>
      <VStack gap={4}>
        <Text fontSize="0.875rem">Small</Text>
        <Progressbar size="sm" />
      </VStack>
      <VStack gap={4}>
        <Text fontSize="0.875rem">Medium</Text>
        <Progressbar size="md" />
      </VStack>
      <VStack gap={4}>
        <Text fontSize="0.875rem">Large</Text>
        <Progressbar size="lg" />
      </VStack>
    </VStack>
  ),
};
