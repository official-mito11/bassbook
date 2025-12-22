import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, Box, Text, Button, VStack } from "../../renderer";

const meta: Meta<typeof Sheet> = {
  title: "Parts/Sheet",
  component: Sheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Box h={400} position="relative">
      <Sheet open={true} side="right">
        <Box p={24}>
          <Text fontWeight="bold" fontSize="1.25rem" mb={16} display="block">
            Right Sheet
          </Text>
          <Text mb={16} display="block">
            This sheet slides in from the right side.
          </Text>
          <Button>Close</Button>
        </Box>
      </Sheet>
    </Box>
  ),
};

export const Left: Story = {
  render: () => (
    <Box h={400} position="relative">
      <Sheet open={true} side="left">
        <Box p={24}>
          <Text fontWeight="bold" fontSize="1.25rem" mb={16} display="block">
            Left Sheet
          </Text>
          <Text mb={16} display="block">
            This sheet slides in from the left side.
          </Text>
          <Button>Close</Button>
        </Box>
      </Sheet>
    </Box>
  ),
};

export const Navigation: Story = {
  render: () => (
    <Box h={400} position="relative">
      <Sheet open={true} side="left">
        <VStack p={24} gap={16} alignItems="flex-start">
          <Text fontWeight="bold" fontSize="1.25rem">Menu</Text>
          <VStack gap={8} alignItems="flex-start" w="100%">
            <Button variant="outline" w="100%">Home</Button>
            <Button variant="outline" w="100%">Products</Button>
            <Button variant="outline" w="100%">About</Button>
            <Button variant="outline" w="100%">Contact</Button>
          </VStack>
        </VStack>
      </Sheet>
    </Box>
  ),
};
