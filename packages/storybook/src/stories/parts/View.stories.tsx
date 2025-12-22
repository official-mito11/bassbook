import type { Meta, StoryObj } from "@storybook/react";
import { View, Text, HStack } from "../../renderer";

const meta: Meta<typeof View> = {
  title: "Parts/View",
  component: View,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <View padding="md" bg="#f3f4f6" rounded="md" w={200} h={100}>
      <Text>Default View</Text>
    </View>
  ),
};

export const Padding: Story = {
  render: () => (
    <HStack gap={12}>
      <View padding="none" bg="#fee2e2" rounded="md" w={100} h={80}>
        <Text fontSize="0.75rem">none</Text>
      </View>
      <View padding="sm" bg="#fef3c7" rounded="md" w={100} h={80}>
        <Text fontSize="0.75rem">sm</Text>
      </View>
      <View padding="md" bg="#dcfce7" rounded="md" w={100} h={80}>
        <Text fontSize="0.75rem">md</Text>
      </View>
      <View padding="lg" bg="#dbeafe" rounded="md" w={100} h={80}>
        <Text fontSize="0.75rem">lg</Text>
      </View>
      <View padding="xl" bg="#f3e8ff" rounded="md" w={100} h={80}>
        <Text fontSize="0.75rem">xl</Text>
      </View>
    </HStack>
  ),
};

export const Centered: Story = {
  render: () => (
    <HStack gap={12}>
      <View padding="md" bg="#f3f4f6" rounded="md" w={150} h={100}>
        <Text fontSize="0.75rem">Not centered</Text>
      </View>
      <View padding="md" centered={true} bg="#dbeafe" rounded="md" w={150} h={100}>
        <Text fontSize="0.75rem">Centered</Text>
      </View>
    </HStack>
  ),
};
