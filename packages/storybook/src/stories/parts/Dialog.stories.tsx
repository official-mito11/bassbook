import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, Text, Box, HStack, Button } from "../../renderer";

const meta: Meta<typeof Dialog> = {
  title: "Parts/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog open={true}>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.CloseIcon>✕</Dialog.CloseIcon>
      <Text>This is the dialog content.</Text>
      <Dialog.Footer>
        <HStack gap={8}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </HStack>
      </Dialog.Footer>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Dialog open={true}>
      <Dialog.Title>Confirm Action</Dialog.Title>
      <Dialog.CloseIcon>✕</Dialog.CloseIcon>
      <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
      <Dialog.Footer>
        <HStack gap={8}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Delete</Button>
        </HStack>
      </Dialog.Footer>
    </Dialog>
  ),
};

export const Information: Story = {
  render: () => (
    <Dialog open={true}>
      <Dialog.Title>Information</Dialog.Title>
      <Dialog.CloseIcon>✕</Dialog.CloseIcon>
      <Text>Your changes have been saved successfully.</Text>
      <Dialog.Footer>
        <HStack gap={8}>
          <Button variant="primary">OK</Button>
        </HStack>
      </Dialog.Footer>
    </Dialog>
  ),
};
