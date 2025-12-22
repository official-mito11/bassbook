import type { Meta, StoryObj } from "@storybook/react";
import { Radio, VStack } from "../../renderer";

const meta: Meta<typeof Radio> = {
  title: "Units/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Option",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    children: "Selected option",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Radio checked={true} size="sm">Small radio</Radio>
      <Radio checked={true} size="md">Medium radio</Radio>
      <Radio checked={true} size="lg">Large radio</Radio>
    </VStack>
  ),
};

export const Group: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Radio checked={true}>Option 1 (selected)</Radio>
      <Radio checked={false}>Option 2</Radio>
      <Radio checked={false}>Option 3</Radio>
      <Radio disabled={true}>Option 4 (disabled)</Radio>
    </VStack>
  ),
};
