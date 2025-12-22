import type { Meta, StoryObj } from "@storybook/react";
import { Badge, HStack, VStack } from "../../renderer";

const meta: Meta<typeof Badge> = {
  title: "Units/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Variants: Story = {
  render: () => (
    <HStack gap={8} flexWrap="wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="outline">Outline</Badge>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={8} alignItems="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </HStack>
  ),
};

export const UseCases: Story = {
  render: () => (
    <VStack gap={12} alignItems="flex-start">
      <HStack gap={8}>
        <Badge variant="success">Active</Badge>
        <Badge variant="danger">Inactive</Badge>
        <Badge variant="warning">Pending</Badge>
      </HStack>
      <HStack gap={8}>
        <Badge variant="primary">New</Badge>
        <Badge variant="default">v1.0.0</Badge>
        <Badge variant="outline">Beta</Badge>
      </HStack>
    </VStack>
  ),
};
