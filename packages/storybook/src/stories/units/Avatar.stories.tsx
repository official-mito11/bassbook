import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Avatar, HStack, VStack, Box, Text, Badge } from "../../renderer";

const meta: Meta<typeof Avatar> = {
  title: "Units/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "아바타 크기",
    },
    hasImage: {
      control: "boolean",
      description: "이미지 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    hasImage: false,
  },
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={12} alignItems="center">
      <Avatar size="xs">
        <Text fontSize="0.625rem">XS</Text>
      </Avatar>
      <Avatar size="sm">
        <Text fontSize="0.75rem">SM</Text>
      </Avatar>
      <Avatar size="md">
        <Text fontSize="0.875rem">MD</Text>
      </Avatar>
      <Avatar size="lg">
        <Text fontSize="1rem">LG</Text>
      </Avatar>
      <Avatar size="xl">
        <Text fontSize="1.25rem">XL</Text>
      </Avatar>
    </HStack>
  ),
};

export const Initials: Story = {
  render: () => (
    <HStack gap={12}>
      <Avatar size="md">
        <Text>AB</Text>
      </Avatar>
      <Avatar size="md">
        <Text>CD</Text>
      </Avatar>
      <Avatar size="md">
        <Text>EF</Text>
      </Avatar>
      <Avatar size="md">
        <Text>GH</Text>
      </Avatar>
    </HStack>
  ),
};

export const WithImage: Story = {
  render: () => (
    <HStack gap={16}>
      <Avatar size="lg" hasImage={true}>
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
          alt="User avatar"
        />
      </Avatar>
      <VStack gap={8} alignItems="flex-start">
        <Text fontWeight="medium">Jane Doe</Text>
        <Text fontSize="sm" color="gray.500">
          Frontend Developer
        </Text>
      </VStack>
    </HStack>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <Box>
      <Text fontWeight="medium" mb={8}>
        Team Members
      </Text>
      <HStack gap={-8}>
        <Avatar size="md" style={{ border: "2px solid white" }}>
          <Text>JD</Text>
        </Avatar>
        <Avatar size="md" style={{ border: "2px solid white" }}>
          <Text>AS</Text>
        </Avatar>
        <Avatar size="md" style={{ border: "2px solid white" }}>
          <Text>MK</Text>
        </Avatar>
        <Avatar size="md" style={{ border: "2px solid white" }}>
          <Text>LP</Text>
        </Avatar>
        <Box
          w={32}
          h={32}
          bg="gray.100"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ border: "2px solid white" }}
        >
          <Text fontSize="xs" color="gray.600">
            +5
          </Text>
        </Box>
      </HStack>
    </Box>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <HStack gap={12}>
        <Box position="relative">
          <Avatar size="md">
            <Text>JD</Text>
          </Avatar>
          <Box
            position="absolute"
            bottom={0}
            right={0}
            w={12}
            h={12}
            bg="green.500"
            rounded="full"
            border="2px solid white"
          />
        </Box>

        <Box position="relative">
          <Avatar size="md">
            <Text>AS</Text>
          </Avatar>
          <Box
            position="absolute"
            bottom={0}
            right={0}
            w={12}
            h={12}
            bg="yellow.500"
            rounded="full"
            border="2px solid white"
          />
        </Box>

        <Box position="relative">
          <Avatar size="md">
            <Text>MK</Text>
          </Avatar>
          <Box
            position="absolute"
            bottom={0}
            right={0}
            w={12}
            h={12}
            bg="red.500"
            rounded="full"
            border="2px solid white"
          />
        </Box>

        <Box position="relative">
          <Avatar size="md">
            <Text>LP</Text>
          </Avatar>
          <Box
            position="absolute"
            bottom={0}
            right={0}
            w={12}
            h={12}
            bg="gray.400"
            rounded="full"
            border="2px solid white"
          />
        </Box>
      </HStack>

      <HStack gap={8}>
        <Badge variant="default" size="sm">
          Online
        </Badge>
        <Badge variant="secondary" size="sm">
          Away
        </Badge>
        <Badge variant="destructive" size="sm">
          Busy
        </Badge>
        <Badge variant="outline" size="sm">
          Offline
        </Badge>
      </HStack>
    </VStack>
  ),
};

export const InteractiveAvatar: Story = {
  render: () => <InteractiveAvatarExample />,
};

const InteractiveAvatarExample = () => {
  const [selected, setSelected] = useState<number | null>(0);
  const users = [
    { name: "Jane", initials: "JD" },
    { name: "Alex", initials: "AS" },
    { name: "Mike", initials: "MK" },
  ];

  return (
    <HStack gap={12}>
      {users.map((user, index) => (
        <Box
          key={index}
          onClick={() => setSelected(index)}
          style={{
            cursor: "pointer",
            opacity: selected === index ? 1 : 0.5,
            transform: selected === index ? "scale(1.1)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          <Avatar size="lg">
            <Text>{user.initials}</Text>
          </Avatar>
        </Box>
      ))}
    </HStack>
  );
};

export const AvatarWithBadge: Story = {
  render: () => (
    <Box position="relative" display="inline-block">
      <Avatar size="xl">
        <Text>JD</Text>
      </Avatar>
      <Badge variant="destructive" size="sm" position="absolute" bottom={-4} right={-4}>
        99+
      </Badge>
    </Box>
  ),
};

export const AllSizesWithImage: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Text fontWeight="medium">All Sizes with Image</Text>
      <HStack gap={12} alignItems="flex-end">
        <VStack gap={4}>
          <Avatar size="xs" hasImage={true}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" />
          </Avatar>
          <Text fontSize="xs" color="gray.500">
            xs
          </Text>
        </VStack>
        <VStack gap={4}>
          <Avatar size="sm" hasImage={true}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" />
          </Avatar>
          <Text fontSize="xs" color="gray.500">
            sm
          </Text>
        </VStack>
        <VStack gap={4}>
          <Avatar size="md" hasImage={true}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" />
          </Avatar>
          <Text fontSize="xs" color="gray.500">
            md
          </Text>
        </VStack>
        <VStack gap={4}>
          <Avatar size="lg" hasImage={true}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" />
          </Avatar>
          <Text fontSize="xs" color="gray.500">
            lg
          </Text>
        </VStack>
        <VStack gap={4}>
          <Avatar size="xl" hasImage={true}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" />
          </Avatar>
          <Text fontSize="xs" color="gray.500">
            xl
          </Text>
        </VStack>
      </HStack>
    </VStack>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={16}>
      <HStack gap={12}>
        <Avatar size="lg" bg="purple.100">
          <Text color="purple.700">JD</Text>
        </Avatar>
        <Avatar size="lg" bg="blue.100">
          <Text color="blue.700">AS</Text>
        </Avatar>
        <Avatar size="lg" bg="green.100">
          <Text color="green.700">MK</Text>
        </Avatar>
      </HStack>

      <HStack gap={12}>
        <Avatar size="lg" shadow="md">
          <Text>LP</Text>
        </Avatar>
        <Avatar size="lg" shadow="lg" border="2px solid" borderColor="primary">
          <Text>TW</Text>
        </Avatar>
        <Avatar size="lg" rounded="none">
          <Text>RZ</Text>
        </Avatar>
      </HStack>
    </VStack>
  ),
};
