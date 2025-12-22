import type { Meta, StoryObj } from "@storybook/react";
import { Form, VStack, HStack, Label, Input, InputArea, Button } from "../../renderer";

const meta: Meta<typeof Form> = {
  title: "Parts/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form layout="vertical" w={300}>
      <VStack gap={4}>
        <Label>Name</Label>
        <Input placeholder="Enter your name" />
      </VStack>
      <VStack gap={4}>
        <Label>Email</Label>
        <Input placeholder="Enter your email" type="email" />
      </VStack>
      <Button variant="primary">Submit</Button>
    </Form>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Form layout="vertical" w={300}>
      <VStack gap={4}>
        <Label>Username</Label>
        <Input placeholder="Enter username" />
      </VStack>
      <VStack gap={4}>
        <Label>Password</Label>
        <Input placeholder="Enter password" type="password" />
      </VStack>
      <VStack gap={4}>
        <Label>Bio</Label>
        <InputArea placeholder="Tell us about yourself" />
      </VStack>
      <HStack gap={8}>
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Save</Button>
      </HStack>
    </Form>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <Form layout="vertical" w={400}>
      <HStack gap={12}>
        <VStack gap={4} flex="1">
          <Label>First Name</Label>
          <Input placeholder="John" />
        </VStack>
        <VStack gap={4} flex="1">
          <Label>Last Name</Label>
          <Input placeholder="Doe" />
        </VStack>
      </HStack>
      <VStack gap={4}>
        <Label>Email</Label>
        <Input placeholder="john@example.com" type="email" />
      </VStack>
      <VStack gap={4}>
        <Label>Message</Label>
        <InputArea placeholder="Your message..." />
      </VStack>
      <Button variant="primary">Send Message</Button>
    </Form>
  ),
};
