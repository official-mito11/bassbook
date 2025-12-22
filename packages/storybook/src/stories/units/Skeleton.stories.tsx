import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, VStack, HStack, Box } from "../../renderer";

const meta: Meta<typeof Skeleton> = {
  title: "Units/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    w: 200,
    h: 20,
  },
};

export const Variants: Story = {
  render: () => (
    <VStack gap={12} w={300}>
      <Skeleton variant="text" w="100%" />
      <Skeleton variant="text" w="80%" />
      <Skeleton variant="text" w="60%" />
      <Skeleton variant="rectangular" w="100%" h={100} />
      <Skeleton variant="circular" w={48} h={48} />
    </VStack>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <Box p={16} bg="#ffffff" rounded="lg" shadow="md" w={300}>
      <HStack gap={12} mb={12}>
        <Skeleton variant="circular" w={48} h={48} />
        <VStack gap={8} flex="1">
          <Skeleton variant="text" w="60%" />
          <Skeleton variant="text" w="40%" />
        </VStack>
      </HStack>
      <Skeleton variant="rectangular" w="100%" h={120} mb={12} />
      <Skeleton variant="text" w="100%" />
      <Skeleton variant="text" w="80%" />
    </Box>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <VStack gap={16} w={300}>
      {[1, 2, 3].map((i) => (
        <HStack key={i} gap={12}>
          <Skeleton variant="circular" w={40} h={40} />
          <VStack gap={6} flex="1">
            <Skeleton variant="text" w="70%" />
            <Skeleton variant="text" w="50%" />
          </VStack>
        </HStack>
      ))}
    </VStack>
  ),
};
