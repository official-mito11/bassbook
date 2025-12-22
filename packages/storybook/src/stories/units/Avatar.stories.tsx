import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, HStack, Text } from "../../renderer";

const meta: Meta<typeof Avatar> = {
  title: "Units/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar size="md">
      <Text __slots={{ fallback: true }}>JD</Text>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={12} alignItems="center">
      <Avatar size="sm">
        <Text __slots={{ fallback: true }}>SM</Text>
      </Avatar>
      <Avatar size="md">
        <Text __slots={{ fallback: true }}>MD</Text>
      </Avatar>
      <Avatar size="lg">
        <Text __slots={{ fallback: true }}>LG</Text>
      </Avatar>
      <Avatar size="xl">
        <Text __slots={{ fallback: true }}>XL</Text>
      </Avatar>
    </HStack>
  ),
};

export const Initials: Story = {
  render: () => (
    <HStack gap={12}>
      <Avatar size="md">
        <Text __slots={{ fallback: true }}>AB</Text>
      </Avatar>
      <Avatar size="md">
        <Text __slots={{ fallback: true }}>CD</Text>
      </Avatar>
      <Avatar size="md">
        <Text __slots={{ fallback: true }}>EF</Text>
      </Avatar>
    </HStack>
  ),
};
