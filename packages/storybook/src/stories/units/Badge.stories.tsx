import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge, HStack, VStack, Box, Text } from "../../renderer";

const meta: Meta<typeof Badge> = {
  title: "Units/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
      description: "배지의 시각적 스타일 변형",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "배지 크기",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <HStack gap={8} flexWrap="wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={8} alignItems="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </HStack>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Box>
        <Text fontWeight="medium" mb={8}>
          Status Indicators
        </Text>
        <HStack gap={8}>
          <Badge variant="default">
            <span
              style={{
                display: "inline-flex",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "currentColor",
                marginRight: 4,
              }}
            />
            Active
          </Badge>
          <Badge variant="destructive">
            <span
              style={{
                display: "inline-flex",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "currentColor",
                marginRight: 4,
              }}
            />
            Inactive
          </Badge>
          <Badge variant="secondary">
            <span
              style={{
                display: "inline-flex",
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "currentColor",
                marginRight: 4,
              }}
            />
            Pending
          </Badge>
        </HStack>
      </Box>

      <Box>
        <Text fontWeight="medium" mb={8}>
          With Dot
        </Text>
        <HStack gap={8}>
          <Badge variant="default">
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 2,
                borderRadius: "50%",
                backgroundColor: "currentColor",
                marginRight: 4,
              }}
            />
            Online
          </Badge>
          <Badge variant="secondary">
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 2,
                borderRadius: "50%",
                backgroundColor: "currentColor",
                marginRight: 4,
              }}
            />
            Away
          </Badge>
          <Badge variant="destructive">
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 2,
                borderRadius: "50%",
                backgroundColor: "currentColor",
                marginRight: 4,
              }}
            />
            Busy
          </Badge>
        </HStack>
      </Box>
    </VStack>
  ),
};

export const CountBadges: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <HStack gap={8}>
        <Box
          display="inline-flex"
          alignItems="center"
          gap={4}
          p={8}
          border="1px solid"
          borderColor="gray.200"
          rounded="md"
        >
          <Text>Notifications</Text>
          <Badge variant="destructive" size="sm">
            3
          </Badge>
        </Box>
        <Box
          display="inline-flex"
          alignItems="center"
          gap={4}
          p={8}
          border="1px solid"
          borderColor="gray.200"
          rounded="md"
        >
          <Text>Messages</Text>
          <Badge variant="default" size="sm">
            12
          </Badge>
        </Box>
        <Box
          display="inline-flex"
          alignItems="center"
          gap={4}
          p={8}
          border="1px solid"
          borderColor="gray.200"
          rounded="md"
        >
          <Text>Updates</Text>
          <Badge variant="secondary" size="sm">
            5
          </Badge>
        </Box>
      </HStack>
    </VStack>
  ),
};

export const VersionTags: Story = {
  render: () => (
    <VStack gap={12} alignItems="flex-start">
      <HStack gap={8} alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          Product Name
        </Text>
        <Badge variant="default">v2.0.0</Badge>
        <Badge variant="outline">Beta</Badge>
      </HStack>

      <HStack gap={8}>
        <Badge variant="secondary">Stable</Badge>
        <Badge variant="outline">RC</Badge>
        <Badge variant="destructive">Deprecated</Badge>
      </HStack>
    </VStack>
  ),
};

export const BadgesInText: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start" w={400}>
      <Text>
        Your subscription is{" "}
        <Badge variant="default" size="sm">
          Active
        </Badge>
      </Text>
      <Text>
        Payment status:{" "}
        <Badge variant="destructive" size="sm">
          Overdue
        </Badge>
      </Text>
      <Text>
        Account type:{" "}
        <Badge variant="secondary" size="sm">
          Premium
        </Badge>
      </Text>
      <Text>
        Verification:{" "}
        <Badge variant="outline" size="sm">
          Pending
        </Badge>
      </Text>
    </VStack>
  ),
};

export const BadgesOnCard: Story = {
  render: () => (
    <VStack gap={16} w={350}>
      <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg">
        <HStack justifyContent="space-between" mb={8}>
          <Text fontWeight="bold">Special Offer</Text>
          <Badge variant="default">20% OFF</Badge>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          Limited time offer. Grab it now!
        </Text>
      </Box>

      <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg">
        <HStack justifyContent="space-between" mb={8}>
          <Text fontWeight="bold">Order #12345</Text>
          <Badge variant="secondary">Shipped</Badge>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          Arriving in 2-3 days
        </Text>
      </Box>

      <Box p={16} border="1px solid" borderColor="red.200" bg="red.50" rounded="lg">
        <HStack justifyContent="space-between" mb={8}>
          <Text fontWeight="bold" color="red.700">
            Security Alert
          </Text>
          <Badge variant="destructive">Action Required</Badge>
        </HStack>
        <Text fontSize="sm" color="red.600">
          Please verify your email address
        </Text>
      </Box>
    </VStack>
  ),
};

export const InteractiveBadges: Story = {
  render: () => <InteractiveBadgeExample />,
};

const InteractiveBadgeExample = () => {
  const [selected, setSelected] = useState<string | null>("option1");
  const options = [
    { id: "option1", label: "Option 1" },
    { id: "option2", label: "Option 2" },
    { id: "option3", label: "Option 3" },
  ];

  return (
    <VStack gap={12} alignItems="flex-start">
      <Text fontWeight="medium" mb={4}>
        Click to select
      </Text>
      <HStack gap={8}>
        {options.map((opt) => (
          <Badge
            key={opt.id}
            variant={selected === opt.id ? "default" : "outline"}
            style={{ cursor: "pointer" }}
            onClick={() => setSelected(selected === opt.id ? null : opt.id)}
          >
            {opt.label}
            {selected === opt.id && <span style={{ marginLeft: 4 }}>✓</span>}
          </Badge>
        ))}
      </HStack>
      <Text fontSize="sm" color="gray.500">
        Selected: {selected || "None"}
      </Text>
    </VStack>
  );
};

export const AllCombinations: Story = {
  render: () => (
    <VStack gap={16}>
      <HStack gap={8}>
        <Text fontWeight="medium" w={80}>
          Default
        </Text>
        <HStack gap={8}>
          <Badge variant="default" size="sm">
            SM
          </Badge>
          <Badge variant="default" size="md">
            MD
          </Badge>
          <Badge variant="default" size="lg">
            LG
          </Badge>
        </HStack>
      </HStack>

      <HStack gap={8}>
        <Text fontWeight="medium" w={80}>
          Secondary
        </Text>
        <HStack gap={8}>
          <Badge variant="secondary" size="sm">
            SM
          </Badge>
          <Badge variant="secondary" size="md">
            MD
          </Badge>
          <Badge variant="secondary" size="lg">
            LG
          </Badge>
        </HStack>
      </HStack>

      <HStack gap={8}>
        <Text fontWeight="medium" w={80}>
          Outline
        </Text>
        <HStack gap={8}>
          <Badge variant="outline" size="sm">
            SM
          </Badge>
          <Badge variant="outline" size="md">
            MD
          </Badge>
          <Badge variant="outline" size="lg">
            LG
          </Badge>
        </HStack>
      </HStack>

      <HStack gap={8}>
        <Text fontWeight="medium" w={80}>
          Destructive
        </Text>
        <HStack gap={8}>
          <Badge variant="destructive" size="sm">
            SM
          </Badge>
          <Badge variant="destructive" size="md">
            MD
          </Badge>
          <Badge variant="destructive" size="lg">
            LG
          </Badge>
        </HStack>
      </HStack>
    </VStack>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={16}>
      <HStack gap={8}>
        <Badge variant="default" size="md" bg="purple.600" _hover={{ bg: "purple.700" }}>
          Purple
        </Badge>
        <Badge variant="default" size="md" bg="teal.500">
          Teal
        </Badge>
        <Badge variant="default" size="md" bg="pink.500">
          Pink
        </Badge>
      </HStack>

      <HStack gap={8}>
        <Badge variant="outline" size="md" rounded="none">
          Square
        </Badge>
        <Badge variant="outline" size="md" rounded="md">
          Rounded
        </Badge>
        <Badge variant="outline" size="md" rounded="full">
          Pill
        </Badge>
      </HStack>
    </VStack>
  ),
};
