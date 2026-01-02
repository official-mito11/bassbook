import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, HStack, VStack, Box, Text } from "../../renderer";

const meta: Meta<typeof Button> = {
  title: "Units/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive"],
      description: "버튼의 시각적 스타일 변형",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "버튼의 크기",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// 기본 변형
// ============================================

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <HStack gap={8}>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={8} alignItems="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </HStack>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <VStack gap={16}>
      <HStack gap={8} alignItems="center">
        <Button variant="default" size="sm">Default SM</Button>
        <Button variant="default" size="md">Default MD</Button>
        <Button variant="default" size="lg">Default LG</Button>
      </HStack>
      <HStack gap={8} alignItems="center">
        <Button variant="secondary" size="sm">Secondary SM</Button>
        <Button variant="secondary" size="md">Secondary MD</Button>
        <Button variant="secondary" size="lg">Secondary LG</Button>
      </HStack>
      <HStack gap={8} alignItems="center">
        <Button variant="outline" size="sm">Outline SM</Button>
        <Button variant="outline" size="md">Outline MD</Button>
        <Button variant="outline" size="lg">Outline LG</Button>
      </HStack>
      <HStack gap={8} alignItems="center">
        <Button variant="ghost" size="sm">Ghost SM</Button>
        <Button variant="ghost" size="md">Ghost MD</Button>
        <Button variant="ghost" size="lg">Ghost LG</Button>
      </HStack>
    </VStack>
  ),
};

// ============================================
// 아이콘 & 로딩 상태
// ============================================

export const WithIcon: Story = {
  render: () => (
    <HStack gap={12}>
      <Button variant="default">
        <span style={{ marginRight: 4 }}>🚀</span>
        Launch
      </Button>
      <Button variant="secondary">
        <span style={{ marginRight: 4 }}>⬇️</span>
        Download
      </Button>
      <Button variant="outline">
        <span style={{ marginRight: 4 }}>🔗</span>
        Share
      </Button>
    </HStack>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <HStack gap={8} alignItems="center">
      <Button variant="default" size="sm" aria-label="Search">
        <span>🔍</span>
      </Button>
      <Button variant="secondary" size="md" aria-label="Settings">
        <span>⚙️</span>
      </Button>
      <Button variant="outline" size="lg" aria-label="Close">
        <span>✕</span>
      </Button>
    </HStack>
  ),
};

export const LoadingState: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };
    
    return (
      <VStack gap={16} alignItems="flex-start">
        <HStack gap={8}>
          <Button loading={loading} onClick={handleClick}>
            {loading ? "Loading..." : "Click to Load"}
          </Button>
          <Button variant="secondary" loading={loading} onClick={handleClick}>
            {loading ? "Processing" : "Process"}
          </Button>
        </HStack>
        <Text fontSize="sm" color="gray.500">
          클릭하면 2초간 로딩 상태가 표시됩니다.
        </Text>
      </VStack>
    );
  },
};

// ============================================
// 커스터마이징 & 스타일
// ============================================

export const FullWidth: Story = {
  render: () => (
    <Box w={320}>
      <VStack gap={8}>
        <Button variant="default" w="full">
          Full Width Default
        </Button>
        <Button variant="outline" w="full">
          Full Width Outline
        </Button>
        <Button variant="secondary" w="full">
          Full Width Secondary
        </Button>
      </VStack>
    </Box>
  ),
};

export const ButtonGroup: Story = {
  render: () => (
    <VStack gap={24}>
      {/* 수평 버튼 그룹 */}
      <Box>
        <Text fontWeight="medium" mb={8}>Horizontal Group</Text>
        <HStack gap={0}>
          <Button variant="outline" rounded="none" borderRight="none">
            Left
          </Button>
          <Button variant="outline" rounded="none" borderRight="none">
            Center
          </Button>
          <Button variant="outline" rounded="none">
            Right
          </Button>
        </HStack>
      </Box>
      
      {/* 선택된 상태가 있는 버튼 그룹 */}
      <Box>
        <Text fontWeight="medium" mb={8}>Toggle Group (Interactive)</Text>
        <ButtonToggleGroup />
      </Box>
    </VStack>
  ),
};

// 버튼 그룹 상태 관리 컴포넌트
const ButtonToggleGroup = () => {
  const [selected, setSelected] = useState<string>("day");
  
  return (
    <HStack gap={0}>
      <Button 
        variant={selected === "day" ? "default" : "outline"} 
        rounded="none"
        borderRight="none"
        onClick={() => setSelected("day")}
      >
        Day
      </Button>
      <Button 
        variant={selected === "week" ? "default" : "outline"} 
        rounded="none"
        borderRight="none"
        onClick={() => setSelected("week")}
      >
        Week
      </Button>
      <Button 
        variant={selected === "month" ? "default" : "outline"} 
        rounded="none"
        onClick={() => setSelected("month")}
      >
        Month
      </Button>
    </HStack>
  );
};

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={16}>
      {/* 인라인 스타일로 커스터마이징 */}
      <HStack gap={8}>
        <Button 
          variant="default" 
          bg="purple.600" 
          _hover={{ bg: "purple.700" }}
        >
          Purple Button
        </Button>
        <Button 
          variant="secondary" 
          bg="orange.400" 
          color="white"
          _hover={{ bg: "orange.500" }}
        >
          Orange Secondary
        </Button>
      </HStack>
      
      {/* 둥근 모서리 커스터마이징 */}
      <HStack gap={8}>
        <Button variant="default" rounded="full">
          Pill Shape
        </Button>
        <Button variant="outline" rounded="full">
          Pill Outline
        </Button>
        <Button variant="default" rounded="none">
          Square
        </Button>
      </HStack>
      
      {/* 그림자 커스터마이징 */}
      <HStack gap={8}>
        <Button variant="default" shadow="lg">
          Large Shadow
        </Button>
        <Button variant="secondary" shadow="md">
          Medium Shadow
        </Button>
        <Button variant="outline" shadow="sm">
          Small Shadow
        </Button>
      </HStack>
    </VStack>
  ),
};

export const AsTextLink: Story = {
  render: () => (
    <HStack gap={16}>
      <Button variant="ghost">
        <a href="#" onClick={(e) => e.preventDefault()}>Link Style Button</a>
      </Button>
      <Button variant="ghost" color="blue.500">
        <a href="#" onClick={(e) => e.preventDefault()}>Colored Link</a>
      </Button>
    </HStack>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <HStack gap={8}>
      <Button variant="default" disabled>
        Disabled Default
      </Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button variant="ghost" disabled>
        Disabled Ghost
      </Button>
    </HStack>
  ),
};

export const ActiveState: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    
    return (
      <HStack gap={8}>
        <Button 
          variant={active ? "default" : "outline"}
          onClick={() => setActive(!active)}
        >
          {active ? "Active ✨" : "Click to Activate"}
        </Button>
      </HStack>
    );
  },
};

export const Destructive: Story = {
  render: () => (
    <VStack gap={12} alignItems="flex-start">
      <HStack gap={8}>
        <Button variant="destructive" size="sm">Delete Small</Button>
        <Button variant="destructive" size="md">Delete Medium</Button>
        <Button variant="destructive" size="lg">Delete Large</Button>
      </HStack>
      <Text fontSize="sm" color="gray.500">
        삭제, 취소, 경고 등 위험한 작업에 사용하세요.
      </Text>
    </VStack>
  ),
};

export const GhostVariant: Story = {
  render: () => (
    <Box bg="gray.100" p={16} rounded="md">
      <HStack gap={8}>
        <Button variant="ghost">Ghost on Light</Button>
        <Button variant="ghost" _hover={{ bg: "gray.200" }}>
          Ghost Hover
        </Button>
      </HStack>
    </Box>
  ),
};

// ============================================
// 실전 사용 예시
// ============================================

export const LoginButtons: Story = {
  render: () => (
    <Box w={300} p={24} border="1px solid" borderColor="gray.200" rounded="lg" shadow="sm">
      <VStack gap={16}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">Welcome Back</Text>
        <VStack gap={12}>
          <Button variant="default" w="full" size="lg">
            Sign In
          </Button>
          <Button variant="outline" w="full" size="lg">
            Create Account
          </Button>
        </VStack>
        <HStack gap={8} justifyContent="center">
          <Button variant="ghost" size="sm">Forgot Password?</Button>
          <Text color="gray.400">|</Text>
          <Button variant="ghost" size="sm">Help</Button>
        </HStack>
      </VStack>
    </Box>
  ),
};

export const CardActions: Story = {
  render: () => (
    <Box w={350} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box bg="gray.50" p={16}>
        <Text fontWeight="bold" fontSize="lg">Card Title</Text>
        <Text fontSize="sm" color="gray.500">Card description goes here</Text>
      </Box>
      <Box h={1} bg="gray.200" />
      <HStack p={12} gap={8} justifyContent="flex-end">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="default" size="sm">Save Changes</Button>
      </HStack>
    </Box>
  ),
};

// ============================================
// ThemeProvider를 사용한 커스터마이징 예시
// ============================================

const buttonThemes = [
  { name: "Default", tokens: {} },
  { name: "Brand Blue", tokens: { 
    colorPrimary: "#3b82f6", 
    colorPrimaryForeground: "#ffffff",
    radius: "8px" 
  }},
  { name: "Warm Orange", tokens: { 
    colorPrimary: "#f97316", 
    colorPrimaryForeground: "#ffffff",
    radius: "4px" 
  }},
  { name: "Elegant Purple", tokens: { 
    colorPrimary: "#8b5cf6", 
    colorPrimaryForeground: "#ffffff",
    radius: "12px" 
  }},
  { name: "Dark Mode", tokens: { 
    colorPrimary: "#6366f1", 
    colorPrimaryForeground: "#ffffff",
    colorBackground: "#1f2937",
    radius: "8px" 
  }},
];

export const ThemeCustomization: Story = {
  render: () => <ThemeShowcase />,
};

const ThemeShowcase = () => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  
  return (
    <VStack gap={24}>
      {/* Theme Selector */}
      <HStack gap={8} flexWrap="wrap">
        {buttonThemes.map((theme, index) => (
          <Button
            key={theme.name}
            variant={selectedTheme === index ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTheme(index)}
          >
            {theme.name}
          </Button>
        ))}
      </HStack>
      
      {/* Theme Preview */}
      <Box 
        p={24} 
        rounded="lg" 
        border="1px solid" 
        borderColor="gray.200"
        bg={selectedTheme === 4 ? "gray.800" : "white"}
      >
        <VStack gap={16}>
          <Text 
            fontWeight="bold" 
            fontSize="lg"
            color={selectedTheme === 4 ? "white" : "gray.900"}
          >
            {buttonThemes[selectedTheme]?.name ?? "Default"} Theme
          </Text>
          
          <HStack gap={8} flexWrap="wrap">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </HStack>
          
          <HStack gap={8}>
            <Button variant="default" size="sm">Small</Button>
            <Button variant="default" size="md">Medium</Button>
            <Button variant="default" size="lg">Large</Button>
          </HStack>
        </VStack>
      </Box>
      
      {/* 코드 예시 */}
      <Box 
        p={16} 
        rounded="md" 
        bg="gray.900" 
        fontFamily="mono"
        fontSize="sm"
        w="full"
      >
        <Text color="green.400">// ThemeProvider로 브랜드 컬러 적용</Text>
        <Text color="gray.300">
          {`<ThemeProvider tokens={{ colorPrimary: "${buttonThemes[selectedTheme]?.tokens?.colorPrimary ?? '#3b82f6'}" }}>`}
        </Text>
        <Text color="gray.300">  {`<Button variant="default">Button</Button>`}</Text>
        <Text color="gray.300">{`</ThemeProvider>`}</Text>
      </Box>
    </VStack>
  );
};
