import type { Meta, StoryObj } from "@storybook/react";
import { Box, HStack } from "../../renderer";

const meta: Meta<typeof Box> = {
  title: "Cores/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Basic Box",
    p: 16,
    bg: "#f3f4f6",
    rounded: "md",
  },
};

export const WithPadding: Story = {
  render: () => (
    <HStack gap={8}>
      <Box p={8} bg="#dbeafe" rounded="sm">p=8</Box>
      <Box p={16} bg="#dbeafe" rounded="sm">p=16</Box>
      <Box p={24} bg="#dbeafe" rounded="sm">p=24</Box>
      <Box p={32} bg="#dbeafe" rounded="sm">p=32</Box>
    </HStack>
  ),
};

export const WithColors: Story = {
  render: () => (
    <HStack gap={8}>
      <Box p={16} bg="#fee2e2" rounded="md">Red</Box>
      <Box p={16} bg="#fef3c7" rounded="md">Yellow</Box>
      <Box p={16} bg="#dcfce7" rounded="md">Green</Box>
      <Box p={16} bg="#dbeafe" rounded="md">Blue</Box>
      <Box p={16} bg="#f3e8ff" rounded="md">Purple</Box>
    </HStack>
  ),
};

export const WithBorder: Story = {
  args: {
    children: "Box with border",
    p: 16,
    border: "2px solid #3b82f6",
    rounded: "lg",
  },
};

export const Nested: Story = {
  render: () => (
    <Box p={16} bg="#f3f4f6" rounded="lg">
      <Box p={12} bg="#ffffff" rounded="md" mb={8}>
        Nested Box 1
      </Box>
      <Box p={12} bg="#ffffff" rounded="md">
        Nested Box 2
      </Box>
    </Box>
  ),
};
