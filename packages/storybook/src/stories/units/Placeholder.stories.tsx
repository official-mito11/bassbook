import type { Meta, StoryObj } from "@storybook/react";
import { Placeholder, VStack } from "../../renderer";

const meta: Meta<typeof Placeholder> = {
  title: "Units/Placeholder",
  component: Placeholder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Placeholder w={300} h={150}>
      Drop content here
    </Placeholder>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={16}>
      <Placeholder w={200} h={80}>
        Small
      </Placeholder>
      <Placeholder w={300} h={120}>
        Medium
      </Placeholder>
      <Placeholder w={400} h={160}>
        Large
      </Placeholder>
    </VStack>
  ),
};

export const Empty: Story = {
  render: () => (
    <Placeholder w={300} h={200} />
  ),
};
