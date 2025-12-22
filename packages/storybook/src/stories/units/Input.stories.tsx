import type { Meta, StoryObj } from "@storybook/react";
import { Input, InputArea, VStack, Label } from "../../renderer";

const meta: Meta<typeof Input> = {
  title: "Units/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <VStack gap={4} w={300}>
      <Label>Email</Label>
      <Input placeholder="Enter your email" type="email" />
    </VStack>
  ),
};

export const Types: Story = {
  render: () => (
    <VStack gap={12} w={300}>
      <VStack gap={4}>
        <Label>Text</Label>
        <Input placeholder="Text input" type="text" />
      </VStack>
      <VStack gap={4}>
        <Label>Email</Label>
        <Input placeholder="email@example.com" type="email" />
      </VStack>
      <VStack gap={4}>
        <Label>Password</Label>
        <Input placeholder="••••••••" type="password" />
      </VStack>
      <VStack gap={4}>
        <Label>Number</Label>
        <Input placeholder="0" type="number" />
      </VStack>
    </VStack>
  ),
};

export const TextArea: Story = {
  render: () => (
    <VStack gap={4} w={300}>
      <Label>Message</Label>
      <InputArea placeholder="Enter your message..." />
    </VStack>
  ),
};
