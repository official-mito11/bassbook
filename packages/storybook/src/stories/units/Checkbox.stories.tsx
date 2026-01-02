import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox, VStack, HStack, Box, Text, Label, Button } from "../../renderer";

const meta: Meta<typeof Checkbox> = {
  title: "Units/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "체크박스 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    checked: {
      control: "boolean",
      description: "체크 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// 기본 사용법
// ============================================

export const Default: Story = {
  args: {
    children: "Accept terms and conditions",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    children: "I agree",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Checkbox checked={true} size="sm">Small checkbox</Checkbox>
      <Checkbox checked={true} size="md">Medium checkbox</Checkbox>
      <Checkbox checked={true} size="lg">Large checkbox</Checkbox>
    </VStack>
  ),
};

export const States: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Checkbox checked={false}>Unchecked</Checkbox>
      <Checkbox checked={true}>Checked</Checkbox>
      <Checkbox disabled={true}>Disabled unchecked</Checkbox>
      <Checkbox checked={true} disabled={true}>Disabled checked</Checkbox>
    </VStack>
  ),
};

// ============================================
// 커스터마이징 예시
// ============================================

export const WithDescription: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start" w={350}>
      <Checkbox checked={true}>
        <VStack alignItems="flex-start" gap={0}>
          <Text fontWeight="medium">Subscribe to newsletter</Text>
          <Text fontSize="sm" color="gray.500">
            Get the latest updates and news delivered to your inbox.
          </Text>
        </VStack>
      </Checkbox>
      
      <Checkbox checked={false}>
        <VStack alignItems="flex-start" gap={0}>
          <Text fontWeight="medium">Enable notifications</Text>
          <Text fontSize="sm" color="gray.500">
            Receive push notifications for important alerts.
          </Text>
        </VStack>
      </Checkbox>
      
      <Checkbox checked={true}>
        <VStack alignItems="flex-start" gap={0}>
          <Text fontWeight="medium">Auto-renewal</Text>
          <Text fontSize="sm" color="gray.500">
            Automatically renew your subscription when it expires.
          </Text>
        </VStack>
      </Checkbox>
    </VStack>
  ),
};

export const CheckboxGroup: Story = {
  render: () => <CheckboxGroupExample />,
};

const CheckboxGroupExample = () => {
  const [selected, setSelected] = useState<string[]>([]);
  
  const options = [
    { id: "react", label: "React", description: "Frontend framework" },
    { id: "vue", label: "Vue", description: "Progressive framework" },
    { id: "angular", label: "Angular", description: "Platform for building mobile and desktop web applications" },
    { id: "svelte", label: "Svelte", description: "Cybernetically enhanced web apps" },
  ];
  
  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  
  return (
    <VStack gap={16} alignItems="flex-start" w={350}>
      <Text fontWeight="medium" fontSize="lg">Select your frameworks</Text>
      
      {options.map((option) => (
        <Checkbox
          key={option.id}
          checked={selected.includes(option.id)}
          onChange={() => toggleOption(option.id)}
        >
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">{option.label}</Text>
            <Text fontSize="sm" color="gray.500">{option.description}</Text>
          </VStack>
        </Checkbox>
      ))}
      
      <Box p={12} bg="gray.50" rounded="md" w="full">
        <Text fontSize="sm">
          <strong>Selected:</strong> {selected.length > 0 ? selected.join(", ") : "None"}
        </Text>
      </Box>
    </VStack>
  );
};

export const HorizontalGroup: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Box>
        <Text fontWeight="medium" mb={8}>Days of week</Text>
        <HStack gap={16}>
          <Checkbox checked={true}>Mon</Checkbox>
          <Checkbox checked={true}>Tue</Checkbox>
          <Checkbox checked={false}>Wed</Checkbox>
          <Checkbox checked={false}>Thu</Checkbox>
          <Checkbox checked={true}>Fri</Checkbox>
        </HStack>
      </Box>
      
      <Box>
        <Text fontWeight="medium" mb={8}>Time preferences</Text>
        <HStack gap={16}>
          <Checkbox checked={true}>Morning</Checkbox>
          <Checkbox checked={false}>Afternoon</Checkbox>
          <Checkbox checked={true}>Evening</Checkbox>
        </HStack>
      </Box>
    </VStack>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Checkbox checked={true} colorScheme="blue">
        Blue theme
      </Checkbox>
      <Checkbox checked={true} colorScheme="green">
        Green theme
      </Checkbox>
      <Checkbox checked={true} colorScheme="purple">
        Purple theme
      </Checkbox>
      <Checkbox checked={true} colorScheme="orange">
        Orange theme
      </Checkbox>
      <Checkbox checked={true} colorScheme="pink">
        Pink theme
      </Checkbox>
    </VStack>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <VStack gap={12} alignItems="flex-start" w={300}>
      <Checkbox checked={true}>
        <HStack gap={8}>
          <Text>Email notifications</Text>
          <Box bg="blue.100" color="blue.700" px={6} py={2} rounded="full" fontSize="xs" fontWeight="bold">
            3 new
          </Box>
        </HStack>
      </Checkbox>
      
      <Checkbox checked={false}>
        <HStack gap={8}>
          <Text>Push notifications</Text>
          <Box bg="gray.100" color="gray.600" px={6} py={2} rounded="full" fontSize="xs">
            Off
          </Box>
        </HStack>
      </Checkbox>
      
      <Checkbox checked={true}>
        <HStack gap={8}>
          <Text>SMS notifications</Text>
          <Box bg="green.100" color="green.700" px={6} py={2} rounded="full" fontSize="xs" fontWeight="bold">
            On
          </Box>
        </HStack>
      </Checkbox>
    </VStack>
  ),
};

// ============================================
// Interactive Examples
// ============================================

export const InteractiveToggle: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <VStack gap={16} alignItems="flex-start">
        <Checkbox checked={checked} onChange={(e: any) => setChecked(e.target.checked)}>
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Enable feature</Text>
            <Text fontSize="sm" color="gray.500">
              Toggle to enable or disable this feature.
            </Text>
          </VStack>
        </Checkbox>
        
        <Box 
          p={16} 
          rounded="md" 
          bg={checked ? "green.50" : "gray.50"}
          border="1px solid"
          borderColor={checked ? "green.200" : "gray.200"}
        >
          <Text color={checked ? "green.700" : "gray.600"}>
            {checked ? "✓ Feature is enabled" : "○ Feature is disabled"}
          </Text>
        </Box>
      </VStack>
    );
  },
};

export const TermsAndConditions: Story = {
  render: () => {
    const [agreed, setAgreed] = useState(false);
    const [readMore, setReadMore] = useState(false);
    
    return (
      <VStack gap={16} alignItems="flex-start" w={400}>
        <Box 
          p={16} 
          bg="gray.50" 
          rounded="md" 
          maxH={readMore ? 200 : 60} 
          overflow="hidden"
          transition="max-height 0.3s"
          w="full"
        >
          <Text fontSize="sm" color="gray.600">
            {readMore 
              ? `By using this service, you agree to our Terms of Service, Privacy Policy, and Cookie Policy. 
                 You acknowledge that you have read and understood all terms and conditions.
                 
                 1. Account Responsibilities: You are responsible for maintaining the confidentiality of your account.
                 2. Content: You retain ownership of content you post but grant us a license to use it.
                 3. Termination: We may terminate or suspend your account for violations of these terms.
                 4. Disclaimer: The service is provided "as is" without warranties.
                 5. Limitation of Liability: We shall not be liable for any indirect damages.`
              : "By using this service, you agree to our Terms of Service, Privacy Policy, and Cookie Policy..."
            }
          </Text>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setReadMore(!readMore)}
            mt={4}
          >
            {readMore ? "Show less" : "Read more"}
          </Button>
        </Box>
        
        <Checkbox 
          checked={agreed} 
          onChange={(e: any) => setAgreed(e.target.checked)}
        >
          <Text fontWeight="medium">
            I agree to the terms and conditions
          </Text>
        </Checkbox>
        
        <Button 
          variant="default" 
          w="full"
          disabled={!agreed}
        >
          Continue
        </Button>
      </VStack>
    );
  },
};

export const TodoList: Story = {
  render: () => <TodoListExample />,
};

const TodoListExample = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Review project requirements", completed: true },
    { id: 2, text: "Design system architecture", completed: true },
    { id: 3, text: "Implement core components", completed: false },
    { id: 4, text: "Write unit tests", completed: false },
    { id: 5, text: "Deploy to production", completed: false },
  ]);
  
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const completedCount = todos.filter((t) => t.completed).length;
  
  return (
    <VStack gap={16} alignItems="flex-start" w={350}>
      <HStack justifyContent="space-between" w="full">
        <Text fontWeight="bold" fontSize="lg">Todo List</Text>
        <Text fontSize="sm" color="gray.500">
          {completedCount} / {todos.length} completed
        </Text>
      </HStack>
      
      <VStack gap={8} alignItems="flex-start" w="full">
        {todos.map((todo) => (
          <Checkbox
            key={todo.id}
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          >
            <Text 
              textDecoration={todo.completed ? "line-through" : "none"}
              color={todo.completed ? "gray.400" : "gray.700"}
            >
              {todo.text}
            </Text>
          </Checkbox>
        ))}
      </VStack>
      
      <Box 
        w="full" 
        h={2} 
        bg="gray.200" 
        rounded="full" 
        overflow="hidden"
      >
        <Box 
          h="full" 
          bg="green.500" 
          w={`${(completedCount / todos.length) * 100}%`}
          transition="width 0.3s"
        />
      </Box>
    </VStack>
  );
};

export const SelectAll: Story = {
  render: () => <SelectAllExample />,
};

const SelectAllExample = () => {
  const items = ["React", "Vue", "Angular", "Svelte", "Solid"];
  const [selected, setSelected] = useState<string[]>([]);
  
  const allSelected = selected.length === items.length;
  const someSelected = selected.length > 0 && !allSelected;
  
  const toggleAll = () => {
    setSelected(allSelected ? [] : [...items]);
  };
  
  const toggleItem = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  
  return (
    <VStack gap={16} alignItems="flex-start" w={300}>
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        onChange={toggleAll}
      >
        <Text fontWeight="bold">Select all frameworks</Text>
      </Checkbox>
      
      <VStack gap={4} pl={16} alignItems="flex-start" w="full">
        {items.map((item) => (
          <Checkbox
            key={item}
            checked={selected.includes(item)}
            onChange={() => toggleItem(item)}
          >
            {item}
          </Checkbox>
        ))}
      </VStack>
      
      <Text fontSize="sm" color="gray.500">
        {selected.length} of {items.length} selected
      </Text>
    </VStack>
  );
};

// ============================================
// Theme Styles
// ============================================

export const ThemeStyles: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg" w="full">
        <Text fontWeight="medium" mb={8}>Light Theme (Default)</Text>
        <VStack gap={8} alignItems="flex-start">
          <Checkbox checked={true}>Checked item</Checkbox>
          <Checkbox checked={false}>Unchecked item</Checkbox>
        </VStack>
      </Box>
      
      <Box p={16} border="1px solid" borderColor="gray.600" rounded="lg" w="full" bg="gray.800">
        <Text fontWeight="medium" mb={8} color="gray.200">Dark Theme</Text>
        <VStack gap={8} alignItems="flex-start">
          <Checkbox checked={true} colorScheme="blue">Checked item</Checkbox>
          <Checkbox checked={false} colorScheme="blue">Unchecked item</Checkbox>
        </VStack>
      </Box>
      
      <Box p={16} border="1px solid" borderColor="blue.200" rounded="lg" w="full" bg="blue.50">
        <Text fontWeight="medium" mb={8} color="blue.700">Brand Theme (Blue)</Text>
        <VStack gap={8} alignItems="flex-start">
          <Checkbox checked={true} colorScheme="blue">Checked item</Checkbox>
          <Checkbox checked={false} colorScheme="blue">Unchecked item</Checkbox>
        </VStack>
      </Box>
    </VStack>
  ),
};

// ============================================
// 실전 사용 예시
// ============================================

export const SettingsPanel: Story = {
  render: () => <SettingsPanelExample />,
};

const SettingsPanelExample = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    pushNotifications: false,
    weeklyDigest: true,
    marketingEmails: false,
  });
  
  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  return (
    <Box w={400} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box bg="gray.50" p={16} borderBottom="1px solid" borderColor="gray.200">
        <Text fontWeight="bold" fontSize="lg">Notification Settings</Text>
        <Text fontSize="sm" color="gray.500">Manage how you receive updates</Text>
      </Box>
      
      <VStack gap={0}>
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Push Notifications</Text>
            <Text fontSize="sm" color="gray.500">Receive notifications on your device</Text>
          </VStack>
          <Checkbox checked={settings.notifications} onChange={() => toggle("notifications")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Email Updates</Text>
            <Text fontSize="sm" color="gray.500">Get updates sent to your email</Text>
          </VStack>
          <Checkbox checked={settings.emailUpdates} onChange={() => toggle("emailUpdates")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Push Notifications (Mobile)</Text>
            <Text fontSize="sm" color="gray.500">Real-time alerts on mobile</Text>
          </VStack>
          <Checkbox checked={settings.pushNotifications} onChange={() => toggle("pushNotifications")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Weekly Digest</Text>
            <Text fontSize="sm" color="gray.500">Summary of your weekly activity</Text>
          </VStack>
          <Checkbox checked={settings.weeklyDigest} onChange={() => toggle("weeklyDigest")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Marketing Emails</Text>
            <Text fontSize="sm" color="gray.500">Receive promotional offers</Text>
          </VStack>
          <Checkbox checked={settings.marketingEmails} onChange={() => toggle("marketingEmails")} />
        </HStack>
      </VStack>
    </Box>
  );
};
