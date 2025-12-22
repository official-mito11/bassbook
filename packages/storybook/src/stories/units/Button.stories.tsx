import type { Meta, StoryObj } from "@storybook/react";
import { Button, HStack, VStack } from "../../renderer";

const meta: Meta<typeof Button> = {
  title: "Units/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <HStack gap={8}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={8} alignItems="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </HStack>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <VStack gap={16}>
      <HStack gap={8} alignItems="center">
        <Button variant="primary" size="sm">Primary SM</Button>
        <Button variant="primary" size="md">Primary MD</Button>
        <Button variant="primary" size="lg">Primary LG</Button>
      </HStack>
      <HStack gap={8} alignItems="center">
        <Button variant="secondary" size="sm">Secondary SM</Button>
        <Button variant="secondary" size="md">Secondary MD</Button>
        <Button variant="secondary" size="lg">Secondary LG</Button>
      </HStack>
      <HStack gap={8} alignItems="center">
        <Button variant="outline" size="sm">Outline SM</Button>
        <Button variant="outline" size="md">Outline MD</Button>
        <Button variant="outline" size="lg">Outline LG</Button>
      </HStack>
    </VStack>
  ),
};
