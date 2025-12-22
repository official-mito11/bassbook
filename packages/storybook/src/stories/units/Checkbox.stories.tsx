import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, VStack } from "../../renderer";

const meta: Meta<typeof Checkbox> = {
  title: "Units/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    children: "I agree",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Checkbox checked={true} size="sm">Small checkbox</Checkbox>
      <Checkbox checked={true} size="md">Medium checkbox</Checkbox>
      <Checkbox checked={true} size="lg">Large checkbox</Checkbox>
    </VStack>
  ),
};

export const States: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Checkbox checked={false}>Unchecked</Checkbox>
      <Checkbox checked={true}>Checked</Checkbox>
      <Checkbox disabled={true}>Disabled unchecked</Checkbox>
      <Checkbox checked={true} disabled={true}>Disabled checked</Checkbox>
    </VStack>
  ),
};
