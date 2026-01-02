import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, Text, HStack, Button } from "../../renderer";

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
      {/* @ts-ignore */}
      <Dialog.Title>Dialog Title</Dialog.Title>
      {/* @ts-ignore */}
      <Dialog.CloseIcon>✕</Dialog.CloseIcon>
      <Text>This is the dialog content.</Text>
      {/* @ts-ignore */}
      <Dialog.Footer>
        <HStack gap={8}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="default">Confirm</Button>
        </HStack>
      </Dialog.Footer>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Dialog open={true}>
      {/* @ts-ignore */}
      <Dialog.Title>Confirm Action</Dialog.Title>
      {/* @ts-ignore */}
      <Dialog.CloseIcon>✕</Dialog.CloseIcon>
      <Text>Are you sure you want to delete this item? This action cannot be undone.</Text>
      {/* @ts-ignore */}
      <Dialog.Footer>
        <HStack gap={8}>
          <Button variant="secondary">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </HStack>
      </Dialog.Footer>
    </Dialog>
  ),
};

export const Information: Story = {
  render: () => (
    <Dialog open={true}>
      {/* @ts-ignore */}
      <Dialog.Title>Information</Dialog.Title>
      {/* @ts-ignore */}
      <Dialog.CloseIcon>✕</Dialog.CloseIcon>
      <Text>Your changes have been saved successfully.</Text>
      {/* @ts-ignore */}
      <Dialog.Footer>
        <HStack gap={8}>
          <Button variant="default">OK</Button>
        </HStack>
      </Dialog.Footer>
    </Dialog>
  ),
};
