import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Switch, VStack, HStack, Box, Text, Label } from "../../renderer";

const meta: Meta<typeof Switch> = {
  title: "Units/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "스위치 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    checked: {
      control: "boolean",
      description: "활성화 상태",
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
    children: "Toggle switch",
    checked: false,
  },
};

export const On: Story = {
  args: {
    children: "Enabled",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Switch checked={true} size="sm">Small switch</Switch>
      <Switch checked={true} size="md">Medium switch</Switch>
      <Switch checked={true} size="lg">Large switch</Switch>
    </VStack>
  ),
};

export const States: Story = {
  render: () => (
    <VStack gap={8} alignItems="flex-start">
      <Switch checked={false}>Off</Switch>
      <Switch checked={true}>On</Switch>
      <Switch disabled={true}>Disabled off</Switch>
      <Switch checked={true} disabled={true}>Disabled on</Switch>
    </VStack>
  ),
};

// ============================================
// 커스터마이징 예시
// ============================================

export const WithDescription: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start" w={350}>
      <Switch checked={true}>
        <VStack alignItems="flex-start" gap={0}>
          <Text fontWeight="medium">Dark Mode</Text>
          <Text fontSize="sm" color="gray.500">
            Switch to dark theme for better night viewing
          </Text>
        </VStack>
      </Switch>
      
      <Switch checked={false}>
        <VStack alignItems="flex-start" gap={0}>
          <Text fontWeight="medium">Auto-save</Text>
          <Text fontSize="sm" color="gray.500">
            Automatically save changes as you type
          </Text>
        </VStack>
      </Switch>
    </VStack>
  ),
};

export const ThemeToggle: Story = {
  render: () => <ThemeToggleExample />,
};

const ThemeToggleExample = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <Box 
      p={24} 
      rounded="lg" 
      bg={darkMode ? "gray.800" : "white"}
      border="1px solid"
      borderColor={darkMode ? "gray.600" : "gray.200"}
      w={350}
      transition="all 0.3s"
    >
      <VStack gap={16}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="bold" color={darkMode ? "white" : "gray.900"}>
              Appearance
            </Text>
            <Text fontSize="sm" color={darkMode ? "gray.400" : "gray.500"}>
              Toggle between light and dark mode
            </Text>
          </VStack>
          <Switch 
            checked={darkMode} 
            onChange={(e: any) => setDarkMode(e.target.checked)}
            size="lg"
          />
        </HStack>
        
        {/* Preview */}
        <Box 
          p={12} 
          rounded="md" 
          bg={darkMode ? "gray.700" : "gray.50"}
          border="1px solid"
          borderColor={darkMode ? "gray.600" : "gray.200"}
        >
          <HStack gap={8}>
            <Box 
              w={40} 
              h={40} 
              rounded="full" 
              bg={darkMode ? "yellow.400" : "blue.500"}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="lg">{darkMode ? "☀️" : "🌙"}</Text>
            </Box>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="medium" color={darkMode ? "white" : "gray.900"}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Text>
              <Text fontSize="xs" color={darkMode ? "gray.400" : "gray.500"}>
                {darkMode ? "Ready for day" : "Ready for night"}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export const CustomColors: Story = {
  render: () => (
    <VStack gap={16} alignItems="flex-start">
      <Switch checked={true} colorScheme="blue">Blue theme</Switch>
      <Switch checked={true} colorScheme="green">Green theme</Switch>
      <Switch checked={true} colorScheme="purple">Purple theme</Switch>
      <Switch checked={true} colorScheme="orange">Orange theme</Switch>
      <Switch checked={true} colorScheme="pink">Pink theme</Switch>
    </VStack>
  ),
};

// ============================================
// Interactive Examples
// ============================================

export const InteractiveToggle: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    
    return (
      <VStack gap={16} alignItems="flex-start" w={300}>
        <Switch 
          checked={enabled} 
          onChange={(e: any) => setEnabled(e.target.checked)}
        >
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Feature Toggle</Text>
            <Text fontSize="sm" color="gray.500">
              Current state: {enabled ? "Enabled" : "Disabled"}
            </Text>
          </VStack>
        </Switch>
        
        <Box 
          p={16} 
          rounded="md" 
          bg={enabled ? "green.50" : "gray.50"}
          border="1px solid"
          borderColor={enabled ? "green.200" : "gray.200"}
          w="full"
        >
          <Text color={enabled ? "green.700" : "gray.600"} fontWeight="medium">
            {enabled ? "✓ Feature is active" : "○ Feature is inactive"}
          </Text>
        </Box>
      </VStack>
    );
  },
};

export const SettingsPanel: Story = {
  render: () => <SettingsPanelExample />,
};

const SettingsPanelExample = () => {
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    dataSaver: true,
    batterySaver: false,
  });
  
  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  return (
    <Box w={350} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box bg="gray.50" p={16} borderBottom="1px solid" borderColor="gray.200">
        <Text fontWeight="bold" fontSize="lg">Quick Settings</Text>
        <Text fontSize="sm" color="gray.500">Toggle your device settings</Text>
      </Box>
      
      <VStack gap={0}>
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <HStack gap={12}>
            <Box w={40} h={40} rounded="lg" bg="blue.100" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="lg">📶</Text>
            </Box>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="medium">Wi-Fi</Text>
              <Text fontSize="xs" color="gray.500">Connected to Home</Text>
            </VStack>
          </HStack>
          <Switch checked={settings.wifi} onChange={() => toggle("wifi")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <HStack gap={12}>
            <Box w={40} h={40} rounded="lg" bg="blue.100" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="lg">🔵</Text>
            </Box>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="medium">Bluetooth</Text>
              <Text fontSize="xs" color="gray.500">Off</Text>
            </VStack>
          </HStack>
          <Switch checked={settings.bluetooth} onChange={() => toggle("bluetooth")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <HStack gap={12}>
            <Box w={40} h={40} rounded="lg" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="lg">✈️</Text>
            </Box>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="medium">Airplane Mode</Text>
              <Text fontSize="xs" color="gray.500">Off</Text>
            </VStack>
          </HStack>
          <Switch checked={settings.airplane} onChange={() => toggle("airplane")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <HStack gap={12}>
            <Box w={40} h={40} rounded="lg" bg="green.100" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="lg">💾</Text>
            </Box>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="medium">Data Saver</Text>
              <Text fontSize="xs" color="gray.500">On</Text>
            </VStack>
          </HStack>
          <Switch checked={settings.dataSaver} onChange={() => toggle("dataSaver")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between">
          <HStack gap={12}>
            <Box w={40} h={40} rounded="lg" bg="yellow.100" display="flex" alignItems="center" justifyContent="center">
              <Text fontSize="lg">🔋</Text>
            </Box>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="medium">Battery Saver</Text>
              <Text fontSize="xs" color="gray.500">Off</Text>
            </VStack>
          </HStack>
          <Switch checked={settings.batterySaver} onChange={() => toggle("batterySaver")} />
        </HStack>
      </VStack>
    </Box>
  );
};

export const NotificationSettings: Story = {
  render: () => <NotificationSettingsExample />,
};

const NotificationSettingsExample = () => {
  const [notifications, setNotifications] = useState({
    all: true,
    email: true,
    push: false,
    sms: true,
    marketing: false,
  });
  
  const toggleAll = () => {
    const newState = !notifications.all;
    setNotifications({
      all: newState,
      email: newState,
      push: newState,
      sms: newState,
      marketing: newState,
    });
  };
  
  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      newState.all = newState.email && newState.push && newState.sms && newState.marketing;
      return newState;
    });
  };
  
  return (
    <Box w={380} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box bg="primary" p={16}>
        <Text fontWeight="bold" fontSize="lg" color="primary-foreground">
          Notification Preferences
        </Text>
      </Box>
      
      <VStack gap={0}>
        <HStack p={16} justifyContent="space-between" bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="bold">Enable All Notifications</Text>
            <Text fontSize="xs" color="gray.500">Master switch for all notifications</Text>
          </VStack>
          <Switch checked={notifications.all} onChange={toggleAll} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Email Notifications</Text>
            <Text fontSize="xs" color="gray.500">Receive via email</Text>
          </VStack>
          <Switch checked={notifications.email} onChange={() => toggle("email")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Push Notifications</Text>
            <Text fontSize="xs" color="gray.500">Browser notifications</Text>
          </VStack>
          <Switch checked={notifications.push} onChange={() => toggle("push")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">SMS Notifications</Text>
            <Text fontSize="xs" color="gray.500">Text message alerts</Text>
          </VStack>
          <Switch checked={notifications.sms} onChange={() => toggle("sms")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Marketing</Text>
            <Text fontSize="xs" color="gray.500">Promotional content</Text>
          </VStack>
          <Switch checked={notifications.marketing} onChange={() => toggle("marketing")} />
        </HStack>
      </VStack>
    </Box>
  );
};

export const WithLoadingState: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);
    
    const handleToggle = (e: any) => {
      const newValue = e.target.checked;
      setLoading(true);
      setEnabled(newValue);
      
      // Simulate API call
      setTimeout(() => setLoading(false), 1500);
    };
    
    return (
      <VStack gap={16} alignItems="flex-start" w={300}>
        <Switch 
          checked={enabled} 
          onChange={handleToggle}
          disabled={loading}
        >
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Sync Settings</Text>
            <Text fontSize="sm" color="gray.500">
              {loading ? "Syncing..." : enabled ? "Enabled" : "Disabled"}
            </Text>
          </VStack>
        </Switch>
        
        {loading && (
          <Box p={12} bg="blue.50" rounded="md" w="full">
            <Text fontSize="sm" color="blue.600">
              ⚙️ Syncing with server...
            </Text>
          </Box>
        )}
      </VStack>
    );
  },
};

export const SubscriptionPlan: Story = {
  render: () => <SubscriptionPlanExample />,
};

const SubscriptionPlanExample = () => {
  const [isPro, setIsPro] = useState(false);
  
  return (
    <Box w={350} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box p={16} bg={isPro ? "purple.600" : "gray.100"}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack alignItems="flex-start" gap={0}>
            <Text 
              fontWeight="bold" 
              fontSize="xl" 
              color={isPro ? "white" : "gray.900"}
            >
              {isPro ? "Pro Plan" : "Free Plan"}
            </Text>
            <Text fontSize="sm" color={isPro ? "purple.200" : "gray.500"}>
              {isPro ? "$9.99/month" : "No monthly fee"}
            </Text>
          </VStack>
          <Switch 
            checked={isPro} 
            onChange={(e: any) => setIsPro(e.target.checked)}
            size="lg"
          />
        </HStack>
      </Box>
      
      <Box p={16}>
        <VStack gap={12}>
          <HStack justifyContent="space-between">
            <Text color={isPro ? "gray.600" : "gray.500"}>Basic features</Text>
            <Text color="green.500">✓</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color={isPro ? "gray.600" : "gray.500"}>5 projects</Text>
            <Text color="green.500">✓</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color={isPro ? "gray.600" : "gray.500"}>Unlimited projects</Text>
            <Text color={isPro ? "green.500" : "gray.300"}>
              {isPro ? "✓" : "—"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color={isPro ? "gray.600" : "gray.500"}>Priority support</Text>
            <Text color={isPro ? "green.500" : "gray.300"}>
              {isPro ? "✓" : "—"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color={isPro ? "gray.600" : "gray.500"}>Analytics dashboard</Text>
            <Text color={isPro ? "green.500" : "gray.300"}>
              {isPro ? "✓" : "—"}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
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
          <Switch checked={true}>Switch On</Switch>
          <Switch checked={false}>Switch Off</Switch>
        </VStack>
      </Box>
      
      <Box p={16} border="1px solid" borderColor="gray.600" rounded="lg" w="full" bg="gray.800">
        <Text fontWeight="medium" mb={8} color="gray.200">Dark Theme</Text>
        <VStack gap={8} alignItems="flex-start">
          <Switch checked={true} colorScheme="blue">Switch On</Switch>
          <Switch checked={false} colorScheme="blue">Switch Off</Switch>
        </VStack>
      </Box>
      
      <Box p={16} border="1px solid" borderColor="purple.200" rounded="lg" w="full" bg="purple.50">
        <Text fontWeight="medium" mb={8} color="purple.700">Brand Theme (Purple)</Text>
        <VStack gap={8} alignItems="flex-start">
          <Switch checked={true} colorScheme="purple">Switch On</Switch>
          <Switch checked={false} colorScheme="purple">Switch Off</Switch>
        </VStack>
      </Box>
    </VStack>
  ),
};

// ============================================
// 실전 사용 예시
// ============================================

export const AccountSecurity: Story = {
  render: () => <AccountSecurityExample />,
};

const AccountSecurityExample = () => {
  const [settings, setSettings] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: false,
    apiKeys: true,
  });
  
  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  return (
    <Box w={400} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box bg="red.50" p={16} borderBottom="1px solid" borderColor="red.100">
        <HStack gap={8}>
          <Text fontSize="xl">🔒</Text>
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="bold" color="red.800">Security Settings</Text>
            <Text fontSize="sm" color="red.600">Manage your account security</Text>
          </VStack>
        </HStack>
      </Box>
      
      <VStack gap={0}>
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <HStack gap={8}>
              <Text fontSize="lg">📱</Text>
              <Text fontWeight="medium">Two-Factor Authentication</Text>
            </HStack>
            <Text fontSize="xs" color="gray.500">Extra layer of security</Text>
          </VStack>
          <Switch checked={settings.twoFactor} onChange={() => toggle("twoFactor")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <HStack gap={8}>
              <Text fontSize="lg">🔔</Text>
              <Text fontWeight="medium">Login Alerts</Text>
            </HStack>
            <Text fontSize="xs" color="gray.500">Notify on new logins</Text>
          </VStack>
          <Switch checked={settings.loginAlerts} onChange={() => toggle("loginAlerts")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <HStack gap={8}>
              <Text fontSize="lg">⏰</Text>
              <Text fontWeight="medium">Auto Session Timeout</Text>
            </HStack>
            <Text fontSize="xs" color="gray.500">Logout after 30 min inactivity</Text>
          </VStack>
          <Switch checked={settings.sessionTimeout} onChange={() => toggle("sessionTimeout")} />
        </HStack>
        
        <HStack p={16} justifyContent="space-between">
          <VStack alignItems="flex-start" gap={0}>
            <HStack gap={8}>
              <Text fontSize="lg">🔑</Text>
              <Text fontWeight="medium">API Access</Text>
            </HStack>
            <Text fontSize="xs" color="gray.500">Allow third-party integrations</Text>
          </VStack>
          <Switch checked={settings.apiKeys} onChange={() => toggle("apiKeys")} />
        </HStack>
      </VStack>
    </Box>
  );
};
