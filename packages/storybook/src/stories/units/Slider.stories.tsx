import type { Meta, StoryObj } from "@storybook/react";
import { Slider, VStack, Text, HStack } from "../../renderer";

const meta: Meta<typeof Slider> = {
  title: "Units/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Slider size="md" defaultValue={50} w={300} />
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={16} w={300}>
      <VStack gap={4}>
        <Text fontSize="0.875rem">Small</Text>
        <Slider size="sm" defaultValue={30} />
      </VStack>
      <VStack gap={4}>
        <Text fontSize="0.875rem">Medium</Text>
        <Slider size="md" defaultValue={50} />
      </VStack>
      <VStack gap={4}>
        <Text fontSize="0.875rem">Large</Text>
        <Slider size="lg" defaultValue={70} />
      </VStack>
    </VStack>
  ),
};

export const WithValue: Story = {
  render: () => (
    <HStack gap={12} alignItems="center" w={300}>
      <Slider size="md" defaultValue={75} />
      <Text>75%</Text>
    </HStack>
  ),
};
