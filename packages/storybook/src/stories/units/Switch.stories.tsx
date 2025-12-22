import type { Meta, StoryObj } from "@storybook/react";
import { Switch, VStack } from "../../renderer";

const meta: Meta<typeof Switch> = {
  title: "Units/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Toggle switch",
    checked: false,
  },
};

export const On: Story = {
  args: {
    children: "Enabled",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Switch checked={true} size="sm">Small switch</Switch>
      <Switch checked={true} size="md">Medium switch</Switch>
      <Switch checked={true} size="lg">Large switch</Switch>
    </VStack>
  ),
};

export const States: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Switch checked={false}>Off</Switch>
      <Switch checked={true}>On</Switch>
      <Switch disabled={true}>Disabled off</Switch>
      <Switch checked={true} disabled={true}>Disabled on</Switch>
    </VStack>
  ),
};
