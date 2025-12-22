import type { Meta, StoryObj } from "@storybook/react";
import { Modal, Dialog, Text, Box, HStack, Button } from "../../renderer";

const meta: Meta<typeof Modal> = {
  title: "Parts/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box h={400} position="relative">
      <Modal open={true}>
        <Dialog open={true}>
          <Dialog.Title>Modal with Dialog</Dialog.Title>
          <Dialog.CloseIcon>✕</Dialog.CloseIcon>
          <Text>This modal contains a dialog component.</Text>
          <Dialog.Footer>
            <HStack gap={8}>
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Confirm</Button>
            </HStack>
          </Dialog.Footer>
        </Dialog>
      </Modal>
    </Box>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Box h={400} position="relative">
      <Modal open={true}>
        <Box bg="white" p={24} rounded="lg" shadow="lg" maxW={400}>
          <Text fontWeight="bold" fontSize="1.25rem" mb={12}>
            Custom Modal Content
          </Text>
          <Text mb={16}>
            You can put any content inside the modal container.
          </Text>
          <Button variant="primary">Got it</Button>
        </Box>
      </Modal>
    </Box>
  ),
};
