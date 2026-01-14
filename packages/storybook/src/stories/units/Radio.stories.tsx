import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio, VStack, HStack, Box, Text, Label } from "../../renderer";

const meta: Meta<typeof Radio> = {
  title: "Units/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "라디오 버튼 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    checked: {
      control: "boolean",
      description: "선택 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Option",
    checked: false,
    size: "md",
  },
};

export const Checked: Story = {
  args: {
    children: "Selected option",
    checked: true,
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Radio checked={true} size="sm">
        Small radio
      </Radio>
      <Radio checked={true} size="md">
        Medium radio
      </Radio>
      <Radio checked={true} size="lg">
        Large radio
      </Radio>
    </VStack>
  ),
};

export const States: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Radio checked={false}>Unchecked</Radio>
      <Radio checked={true}>Checked</Radio>
      <Radio checked={false} disabled={true}>
        Disabled unchecked
      </Radio>
      <Radio checked={true} disabled={true}>
        Disabled checked
      </Radio>
    </VStack>
  ),
};

export const Group: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Radio checked={true}>Option 1 (selected)</Radio>
      <Radio checked={false}>Option 2</Radio>
      <Radio checked={false}>Option 3</Radio>
      <Radio checked={false} disabled={true}>
        Option 4 (disabled)
      </Radio>
    </VStack>
  ),
};

export const InteractiveGroup: Story = {
  render: () => <RadioGroupExample />,
};

const RadioGroupExample = () => {
  const [selected, setSelected] = useState<string>("option1");

  return (
    <VStack gap={12} alignItems="flex-start">
      <Label fontWeight="medium">Choose an option:</Label>
      <Radio checked={selected === "option1"} onChange={() => setSelected("option1")}>
        Option 1 - Free
      </Radio>
      <Radio checked={selected === "option2"} onChange={() => setSelected("option2")}>
        Option 2 - Basic ($9.99/mo)
      </Radio>
      <Radio checked={selected === "option3"} onChange={() => setSelected("option3")}>
        Option 3 - Pro ($19.99/mo)
      </Radio>
      <Radio checked={selected === "option4"} onChange={() => setSelected("option4")}>
        Option 4 - Enterprise (Custom)
      </Radio>

      <Box mt={8} p={8} bg="gray.50" rounded="md" w="full">
        <Text fontSize="sm" color="gray.600">
          Selected: <span style={{ fontWeight: 500 }}>{selected}</span>
        </Text>
      </Box>
    </VStack>
  );
};

export const WithDescription: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start" w={350}>
      <Radio checked={true}>
        <VStack alignItems="flex-start" gap={2}>
          <Text fontWeight="medium">Standard Shipping</Text>
          <Text fontSize="sm" color="gray.500">
            Delivery in 5-7 business days
          </Text>
        </VStack>
      </Radio>

      <Radio checked={false}>
        <VStack alignItems="flex-start" gap={2}>
          <Text fontWeight="medium">Express Shipping</Text>
          <Text fontSize="sm" color="gray.500">
            Delivery in 1-2 business days (+$5.00)
          </Text>
        </VStack>
      </Radio>

      <Radio checked={false}>
        <VStack alignItems="flex-start" gap={2}>
          <Text fontWeight="medium">Free Shipping</Text>
          <Text fontSize="sm" color="gray.500">
            Delivery in 10-14 business days (orders over $50)
          </Text>
        </VStack>
      </Radio>
    </VStack>
  ),
};

export const SurveyExample: Story = {
  render: () => <SurveyExampleComponent />,
};

const SurveyExampleComponent = () => {
  const [satisfaction, setSatisfaction] = useState<string>("");
  const [experience, setExperience] = useState<string>("");

  return (
    <VStack gap={24} alignItems="flex-start" w={400}>
      <Box>
        <Text fontWeight="medium" mb={8}>
          How satisfied are you with our service?
        </Text>
        <HStack gap={4}>
          {["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"].map((label, index) => (
            <Radio key={label} checked={satisfaction === String(index)} onChange={() => setSatisfaction(String(index))}>
              <Text fontSize="xs">{index + 1}</Text>
            </Radio>
          ))}
        </HStack>
      </Box>

      <Box>
        <Text fontWeight="medium" mb={8}>
          How did you hear about us?
        </Text>
        <VStack gap={8} alignItems="flex-start">
          <Radio checked={experience === "google"} onChange={() => setExperience("google")}>
            Search Engine (Google, Bing, etc.)
          </Radio>
          <Radio checked={experience === "social"} onChange={() => setExperience("social")}>
            Social Media (Facebook, Twitter, etc.)
          </Radio>
          <Radio checked={experience === "friend"} onChange={() => setExperience("friend")}>
            Friend or Colleague
          </Radio>
          <Radio checked={experience === "other"} onChange={() => setExperience("other")}>
            Other
          </Radio>
        </VStack>
      </Box>
    </VStack>
  );
};

export const SettingsPanel: Story = {
  render: () => <SettingsPanelExample />,
};

const SettingsPanelExample = () => {
  const [privacy, setPrivacy] = useState<string>("friends");

  return (
    <Box w={350} p={16} border="1px solid" borderColor="gray.200" rounded="lg">
      <Text fontWeight="bold" mb={16}>
        Privacy Settings
      </Text>

      <VStack gap={12}>
        <Box>
          <Text fontWeight="medium" mb={8} fontSize="sm" color="gray.600">
            Who can see your profile?
          </Text>
          <VStack gap={8} alignItems="flex-start">
            <Radio checked={privacy === "public"} onChange={() => setPrivacy("public")}>
              <Text>Everyone</Text>
            </Radio>
            <Radio checked={privacy === "friends"} onChange={() => setPrivacy("friends")}>
              <Text>Friends Only</Text>
            </Radio>
            <Radio checked={privacy === "private"} onChange={() => setPrivacy("private")}>
              <Text>Only Me</Text>
            </Radio>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export const AllSizesStates: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Text fontWeight="medium" mb={4}>
        Small
      </Text>
      <HStack gap={16}>
        <Radio size="sm" checked={false}>
          Unchecked
        </Radio>
        <Radio size="sm" checked={true}>
          Checked
        </Radio>
        <Radio size="sm" checked={false} disabled={true}>
          Disabled
        </Radio>
      </HStack>

      <Text fontWeight="medium" mb={4}>
        Medium
      </Text>
      <HStack gap={16}>
        <Radio size="md" checked={false}>
          Unchecked
        </Radio>
        <Radio size="md" checked={true}>
          Checked
        </Radio>
        <Radio size="md" checked={false} disabled={true}>
          Disabled
        </Radio>
      </HStack>

      <Text fontWeight="medium" mb={4}>
        Large
      </Text>
      <HStack gap={16}>
        <Radio size="lg" checked={false}>
          Unchecked
        </Radio>
        <Radio size="lg" checked={true}>
          Checked
        </Radio>
        <Radio size="lg" checked={false} disabled={true}>
          Disabled
        </Radio>
      </HStack>
    </VStack>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Text fontWeight="medium">Custom Colors</Text>
      <HStack gap={16}>
        <Radio checked={true} bg="blue.500" borderColor="blue.500">
          Blue
        </Radio>
        <Radio checked={true} bg="green.500" borderColor="green.500">
          Green
        </Radio>
        <Radio checked={true} bg="purple.500" borderColor="purple.500">
          Purple
        </Radio>
      </HStack>

      <Text fontWeight="medium">Custom Sizes</Text>
      <HStack gap={16} alignItems="center">
        <Radio size="sm" checked={true}>
          Small custom
        </Radio>
        <Radio size="lg" checked={true}>
          Large custom
        </Radio>
      </HStack>
    </VStack>
  ),
};
