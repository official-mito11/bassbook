import type { Meta, StoryObj } from "@storybook/react";
import { Divider, Box, Text, VStack } from "../../renderer";

const meta: Meta<typeof Divider> = {
  title: "Cores/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box w={300}>
      <Text>Content above</Text>
      <Divider my={16} />
      <Text>Content below</Text>
    </Box>
  ),
};

export const InList: Story = {
  render: () => (
    <VStack w={300} gap={0}>
      <Box p={12}>List item 1</Box>
      <Divider />
      <Box p={12}>List item 2</Box>
      <Divider />
      <Box p={12}>List item 3</Box>
      <Divider />
      <Box p={12}>List item 4</Box>
    </VStack>
  ),
};

export const WithSpacing: Story = {
  render: () => (
    <Box w={300}>
      <Text>Section 1</Text>
      <Divider my={8} />
      <Text>Small spacing (my=8)</Text>
      
      <Divider my={24} />
      
      <Text>Section 2</Text>
      <Divider my={32} />
      <Text>Large spacing (my=32)</Text>
    </Box>
  ),
};
