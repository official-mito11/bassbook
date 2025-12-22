import type { Meta, StoryObj } from "@storybook/react";
import { VStack, Box } from "../../renderer";

const meta: Meta<typeof VStack> = {
  title: "Cores/VStack",
  component: VStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <VStack gap={8}>
      <Box p={12} bg="#fef3c7" rounded="sm">Item A</Box>
      <Box p={12} bg="#fef3c7" rounded="sm">Item B</Box>
      <Box p={12} bg="#fef3c7" rounded="sm">Item C</Box>
    </VStack>
  ),
};

export const WithGap: Story = {
  render: () => (
    <Box display="flex" gap={32}>
      <VStack gap={4}>
        <Box p={8} bg="#fee2e2" rounded="sm">gap=4</Box>
        <Box p={8} bg="#fee2e2" rounded="sm">gap=4</Box>
        <Box p={8} bg="#fee2e2" rounded="sm">gap=4</Box>
      </VStack>
      <VStack gap={16}>
        <Box p={8} bg="#dcfce7" rounded="sm">gap=16</Box>
        <Box p={8} bg="#dcfce7" rounded="sm">gap=16</Box>
        <Box p={8} bg="#dcfce7" rounded="sm">gap=16</Box>
      </VStack>
      <VStack gap={32}>
        <Box p={8} bg="#dbeafe" rounded="sm">gap=32</Box>
        <Box p={8} bg="#dbeafe" rounded="sm">gap=32</Box>
        <Box p={8} bg="#dbeafe" rounded="sm">gap=32</Box>
      </VStack>
    </Box>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start" w={200} p={16} bg="#f3f4f6" rounded="md">
      <Box p={8} bg="#dbeafe" rounded="sm">Short</Box>
      <Box p={8} bg="#dbeafe" rounded="sm">Medium text</Box>
      <Box p={8} bg="#dbeafe" rounded="sm">Longer text here</Box>
    </VStack>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <VStack gap={8} alignCenter={true} w={200} p={16} bg="#f3f4f6" rounded="md">
      <Box p={8} bg="#dbeafe" rounded="sm">Short</Box>
      <Box p={8} bg="#dbeafe" rounded="sm">Medium text</Box>
      <Box p={8} bg="#dbeafe" rounded="sm">Longer text here</Box>
    </VStack>
  ),
};
