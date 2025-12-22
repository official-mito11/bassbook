import type { Meta, StoryObj } from "@storybook/react";
import { HStack, Box } from "../../renderer";

const meta: Meta<typeof HStack> = {
  title: "Cores/HStack",
  component: HStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HStack gap={8}>
      <Box p={12} bg="#dbeafe" rounded="sm">Item 1</Box>
      <Box p={12} bg="#dbeafe" rounded="sm">Item 2</Box>
      <Box p={12} bg="#dbeafe" rounded="sm">Item 3</Box>
    </HStack>
  ),
};

export const WithGap: Story = {
  render: () => (
    <Box>
      <HStack gap={4} mb={8}>
        <Box p={8} bg="#fee2e2" rounded="sm">gap=4</Box>
        <Box p={8} bg="#fee2e2" rounded="sm">gap=4</Box>
        <Box p={8} bg="#fee2e2" rounded="sm">gap=4</Box>
      </HStack>
      <HStack gap={16} mb={8}>
        <Box p={8} bg="#dcfce7" rounded="sm">gap=16</Box>
        <Box p={8} bg="#dcfce7" rounded="sm">gap=16</Box>
        <Box p={8} bg="#dcfce7" rounded="sm">gap=16</Box>
      </HStack>
      <HStack gap={32}>
        <Box p={8} bg="#dbeafe" rounded="sm">gap=32</Box>
        <Box p={8} bg="#dbeafe" rounded="sm">gap=32</Box>
        <Box p={8} bg="#dbeafe" rounded="sm">gap=32</Box>
      </HStack>
    </Box>
  ),
};

export const Centered: Story = {
  render: () => (
    <HStack gap={8} justifyCenter={true} w={400} p={16} bg="#f3f4f6" rounded="md">
      <Box p={12} bg="#dbeafe" rounded="sm">Centered</Box>
      <Box p={12} bg="#dbeafe" rounded="sm">Items</Box>
    </HStack>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <HStack gap={8} justifyBetween={true} w={400} p={16} bg="#f3f4f6" rounded="md">
      <Box p={12} bg="#dbeafe" rounded="sm">Left</Box>
      <Box p={12} bg="#dbeafe" rounded="sm">Right</Box>
    </HStack>
  ),
};
