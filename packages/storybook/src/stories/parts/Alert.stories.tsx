import type { Meta, StoryObj } from "@storybook/react";
import { Alert, VStack, Text } from "../../renderer";

const meta: Meta<typeof Alert> = {
  title: "Parts/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert variant="info" w={400}>
      <Text __slots={{ title: true }}>Information</Text>
      This is an informational message.
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack gap={12} w={400}>
      <Alert variant="info">
        <Text __slots={{ title: true }}>Info</Text>
        This is an informational alert.
      </Alert>
      <Alert variant="success">
        <Text __slots={{ title: true }}>Success</Text>
        Operation completed successfully!
      </Alert>
      <Alert variant="warning">
        <Text __slots={{ title: true }}>Warning</Text>
        Please review before proceeding.
      </Alert>
      <Alert variant="error">
        <Text __slots={{ title: true }}>Error</Text>
        Something went wrong.
      </Alert>
    </VStack>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <VStack gap={12} w={400}>
      <Alert variant="info">
        A simple informational message without a title.
      </Alert>
      <Alert variant="success">
        Your changes have been saved.
      </Alert>
    </VStack>
  ),
};
