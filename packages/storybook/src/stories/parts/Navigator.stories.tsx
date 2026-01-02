import type { Meta, StoryObj } from "@storybook/react";
import { Navigator, Text, HStack, Link, Button, VStack } from "../../renderer";

const meta: Meta<typeof Navigator> = {
  title: "Parts/Navigator",
  component: Navigator,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Navigator variant="default">
      <Text __slots={{ brand: true }} fontWeight="bold" fontSize="1.25rem">
        🎸 Bassbook
      </Text>
      <HStack gap={16}>
        <Link href="#">Home</Link>
        <Link href="#">Products</Link>
        <Link href="#">About</Link>
      </HStack>
      <Button size="sm" variant="default">
        Sign In
      </Button>
    </Navigator>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack gap={0}>
      <Navigator variant="default">
        <Text __slots={{ brand: true }} fontWeight="bold">Default</Text>
        <HStack gap={16}>
          <Link href="#">Link</Link>
        </HStack>
        <Button size="sm">Action</Button>
      </Navigator>
      <Navigator variant="transparent" bg="#f3f4f6">
        <Text __slots={{ brand: true }} fontWeight="bold">Transparent</Text>
        <HStack gap={16}>
          <Link href="#">Link</Link>
        </HStack>
        <Button size="sm">Action</Button>
      </Navigator>
      <Navigator variant="filled">
        <Text __slots={{ brand: true }} fontWeight="bold">Filled</Text>
        <HStack gap={16}>
          <Link href="#" color="white">Link</Link>
        </HStack>
        <Button size="sm" variant="outline" color="white">Action</Button>
      </Navigator>
    </VStack>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <Navigator variant="default">
      <HStack __slots={{ brand: true }} gap={8} alignItems="center">
        <Text fontSize="1.5rem">🎸</Text>
        <Text fontWeight="bold" fontSize="1.25rem">Bassbook</Text>
      </HStack>
      <HStack gap={24}>
        <Link href="#">Features</Link>
        <Link href="#">Pricing</Link>
        <Link href="#">Docs</Link>
        <Link href="#">Blog</Link>
      </HStack>
      <HStack gap={8}>
        <Button size="sm" variant="outline">Log In</Button>
        <Button size="sm" variant="default">Sign Up</Button>
      </HStack>
    </Navigator>
  ),
};
