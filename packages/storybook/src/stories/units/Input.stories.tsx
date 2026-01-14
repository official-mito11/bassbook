import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input, InputArea, VStack, HStack, Box, Text, Label, Button } from "../../renderer";

const meta: Meta<typeof Input> = {
  title: "Units/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "입력 필드 타입",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "입력 필드 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
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
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <VStack gap={4} w={300}>
      <Label>Email</Label>
      <Input placeholder="Enter your email" type="email" />
    </VStack>
  ),
};

export const Types: Story = {
  render: () => (
    <VStack gap={12} w={300}>
      <VStack gap={4}>
        <Label>Text</Label>
        <Input placeholder="Text input" type="text" />
      </VStack>
      <VStack gap={4}>
        <Label>Email</Label>
        <Input placeholder="email@example.com" type="email" />
      </VStack>
      <VStack gap={4}>
        <Label>Password</Label>
        <Input placeholder="••••••••" type="password" />
      </VStack>
      <VStack gap={4}>
        <Label>Number</Label>
        <Input placeholder="0" type="number" />
      </VStack>
      <VStack gap={4}>
        <Label>Tel</Label>
        <Input placeholder="010-0000-0000" type="tel" />
      </VStack>
      <VStack gap={4}>
        <Label>URL</Label>
        <Input placeholder="https://example.com" type="url" />
      </VStack>
    </VStack>
  ),
};

export const TextArea: Story = {
  render: () => (
    <VStack gap={4} w={300}>
      <Label>Message</Label>
      <InputArea placeholder="Enter your message..." />
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={12} w={300}>
      <VStack gap={4}>
        <Label>Small</Label>
        <Input placeholder="Small input" size="sm" />
      </VStack>
      <VStack gap={4}>
        <Label>Medium (Default)</Label>
        <Input placeholder="Medium input" size="md" />
      </VStack>
      <VStack gap={4}>
        <Label>Large</Label>
        <Input placeholder="Large input" size="lg" />
      </VStack>
    </VStack>
  ),
};

// ============================================
// 상태 및 검증
// ============================================

export const WithHelperText: Story = {
  render: () => (
    <VStack gap={12} w={320}>
      <VStack gap={4}>
        <Label>Username</Label>
        <Input placeholder="Enter username" />
        <Text fontSize="sm" color="gray.500">
          4-20자의 영문, 숫자만 사용 가능합니다.
        </Text>
      </VStack>
      <VStack gap={4}>
        <Label>Website</Label>
        <Input placeholder="https://" />
        <Text fontSize="sm" color="gray.500">
          https://로 시작하는 완전한 URL을 입력하세요.
        </Text>
      </VStack>
    </VStack>
  ),
};

export const WithError: Story = {
  render: () => (
    <VStack gap={12} w={320}>
      <VStack gap={4}>
        <Label>Email</Label>
        <Input
          placeholder="Enter email"
          value="invalid-email"
          color="red.500"
          borderColor="red.500"
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px var(--color-red-500)" }}
        />
        <Text fontSize="sm" color="red.500">
          유효한 이메일 주소를 입력해주세요.
        </Text>
      </VStack>

      <VStack gap={4}>
        <Label>Password</Label>
        <Input
          type="password"
          value="123"
          borderColor="red.500"
          _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px var(--color-red-500)" }}
        />
        <Text fontSize="sm" color="red.500">
          비밀번호는 8자 이상이어야 합니다.
        </Text>
      </VStack>
    </VStack>
  ),
};

export const SuccessState: Story = {
  render: () => (
    <VStack gap={4} w={300}>
      <Label>Username</Label>
      <Input
        placeholder="Enter username"
        value="john_doe"
        borderColor="green.500"
        _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px var(--color-green-500)" }}
      />
      <Text fontSize="sm" color="green.600">
        ✓ 사용 가능한 아이디입니다.
      </Text>
    </VStack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <VStack gap={12} w={300}>
      <VStack gap={4}>
        <Label>Disabled Input</Label>
        <Input placeholder="Disabled input" disabled />
      </VStack>
      <VStack gap={4}>
        <Label>Disabled with Value</Label>
        <Input value="Cannot edit" disabled />
      </VStack>
    </VStack>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <VStack gap={4} w={300}>
      <Label>Read Only</Label>
      <Input value="This is read-only" readOnly bg="gray.50" />
    </VStack>
  ),
};

// ============================================
// 아이콘 & 어도른먼트
// ============================================

export const WithPrefixIcon: Story = {
  render: () => (
    <VStack gap={12} w={320}>
      <Box position="relative">
        <Box position="absolute" left={12} top="50%" transform="translateY(-50%)" color="gray.400">
          🔍
        </Box>
        <Input pl={40} placeholder="Search..." />
      </Box>

      <Box position="relative">
        <Box position="absolute" left={12} top="50%" transform="translateY(-50%)" color="gray.400">
          📧
        </Box>
        <Input pl={40} placeholder="email@example.com" type="email" />
      </Box>

      <Box position="relative">
        <Box position="absolute" left={12} top="50%" transform="translateY(-50%)" color="gray.400">
          🔒
        </Box>
        <Input pl={40} placeholder="Password" type="password" />
      </Box>
    </VStack>
  ),
};

export const WithSuffixIcon: Story = {
  render: () => (
    <VStack gap={12} w={320}>
      <Box position="relative">
        <Input pr={40} placeholder="Enter amount" />
        <Box position="absolute" right={12} top="50%" transform="translateY(-50%)" color="gray.500">
          원
        </Box>
      </Box>

      <Box position="relative">
        <Input pr={40} placeholder="0.00" />
        <Box position="absolute" right={12} top="50%" transform="translateY(-50%)" color="gray.500">
          $
        </Box>
      </Box>
    </VStack>
  ),
};

export const SearchInput: Story = {
  render: () => (
    <Box position="relative" w={320}>
      <Box position="absolute" left={12} top="50%" transform="translateY(-50%)" zIndex={1}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </Box>
      <Input
        pl={40}
        placeholder="Search for anything..."
        rounded="full"
        bg="white"
        _focus={{ boxShadow: "md", borderColor: "primary" }}
      />
    </Box>
  ),
};

// ============================================
// 커스터마이징 예시
// ============================================

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={16} w={320}>
      {/* 둥근 모서리 */}
      <VStack gap={4}>
        <Label>Rounded Input</Label>
        <Input placeholder="Rounded input" rounded="lg" />
      </VStack>

      {/* 완전한 둥근 */}
      <VStack gap={4}>
        <Label>Pill Input</Label>
        <Input placeholder="Pill input" rounded="full" />
      </VStack>

      {/* 그림자 효과 */}
      <VStack gap={4}>
        <Label>With Shadow</Label>
        <Input placeholder="With shadow" shadow="md" _focus={{ shadow: "lg" }} />
      </VStack>

      {/* 배경색 변경 */}
      <VStack gap={4}>
        <Label>Custom Background</Label>
        <Input
          placeholder="Custom bg"
          bg="blue.50"
          borderColor="blue.200"
          _focus={{ bg: "white", borderColor: "blue.500" }}
        />
      </VStack>
    </VStack>
  ),
};

// ============================================
// TextArea 예시
// ============================================

export const TextAreaVariants: Story = {
  render: () => (
    <VStack gap={16} w={400}>
      <VStack gap={4}>
        <Label>Default TextArea</Label>
        <InputArea placeholder="Enter your message..." />
      </VStack>

      <VStack gap={4}>
        <Label>With Character Count</Label>
        <TextAreaWithCounter />
      </VStack>

      <VStack gap={4}>
        <Label>Resize Disabled</Label>
        <InputArea placeholder="Cannot resize" />
      </VStack>
    </VStack>
  ),
};

const TextAreaWithCounter = () => {
  const [value, setValue] = useState("");
  const maxLength = 200;

  return (
    <Box w="full">
      <InputArea
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        placeholder="Write something..."
        mb={4}
      />
      <Text fontSize="sm" color={value.length >= maxLength ? "red.500" : "gray.500"}>
        {value.length} / {maxLength}
      </Text>
    </Box>
  );
};

// ============================================
// 폼 예시
// ============================================

export const LoginForm: Story = {
  render: () => (
    <Box w={350} p={24} border="1px solid" borderColor="gray.200" rounded="lg" shadow="sm">
      <VStack gap={20}>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Login
        </Text>

        <VStack gap={16} w="full">
          <VStack gap={6}>
            <Label>Email</Label>
            <HStack gap={0}>
              <Box p={8} bg="gray.100" rounded="md" border="1px solid" borderColor="gray.200">
                <Text color="gray.400">📧</Text>
              </Box>
              <Input placeholder="email@example.com" type="email" />
            </HStack>
          </VStack>

          <VStack gap={6}>
            <Label>Password</Label>
            <HStack gap={0}>
              <Box p={8} bg="gray.100" rounded="md" border="1px solid" borderColor="gray.200">
                <Text color="gray.400">🔒</Text>
              </Box>
              <Input placeholder="••••••••" type="password" />
            </HStack>
          </VStack>
        </VStack>

        <HStack w="full" justifyContent="space-between">
          <Label display="flex" alignItems="center" gap={4} cursor="pointer">
            <Input type="checkbox" w={16} h={16} rounded="sm" />
            <Text fontSize="sm">Remember me</Text>
          </Label>
          <Button variant="ghost" fontSize="sm">
            Forgot password?
          </Button>
        </HStack>

        <Button variant="default" w="full" size="lg">
          Sign In
        </Button>

        <HStack gap={4} justifyContent="center">
          <Text fontSize="sm" color="gray.500">
            Don't have an account?
          </Text>
          <Button variant="ghost" fontSize="sm">
            Sign up
          </Button>
        </HStack>
      </VStack>
    </Box>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <Box w={400} p={24} border="1px solid" borderColor="gray.200" rounded="lg">
      <VStack gap={16}>
        <Text fontWeight="bold" fontSize="xl">
          Contact Us
        </Text>

        <HStack gap={12}>
          <VStack gap={6} flex={1}>
            <Label>First Name</Label>
            <Input placeholder="John" />
          </VStack>
          <VStack gap={6} flex={1}>
            <Label>Last Name</Label>
            <Input placeholder="Doe" />
          </VStack>
        </HStack>

        <VStack gap={6}>
          <Label>Email</Label>
          <Input placeholder="john@example.com" type="email" />
        </VStack>

        <VStack gap={6}>
          <Label>Subject</Label>
          <Input placeholder="What is this about?" />
        </VStack>

        <VStack gap={6}>
          <Label>Message</Label>
          <InputArea placeholder="Your message..." />
        </VStack>

        <HStack gap={8}>
          <Button variant="outline" flex={1}>
            Cancel
          </Button>
          <Button variant="default" flex={1}>
            Send Message
          </Button>
        </HStack>
      </VStack>
    </Box>
  ),
};

// ============================================
// Interactive States
// ============================================

export const InteractiveValidation: Story = {
  render: () => <ValidationForm />,
};

const ValidationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const validateEmail = (value: string) => {
    if (!value) return "이메일은 필수 입력사항입니다.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "유효한 이메일 형식이 아닙니다.";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "비밀번호는 필수 입력사항입니다.";
    if (value.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
    return "";
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched({ ...touched, [field]: true });
    if (field === "email") {
      setErrors({ ...errors, email: validateEmail(email) });
    } else {
      setErrors({ ...errors, password: validatePassword(password) });
    }
  };

  const isValid = !validateEmail(email) && !validatePassword(password) && email && password;

  return (
    <VStack gap={16} w={320}>
      <VStack gap={4}>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          borderColor={touched.email && errors.email ? "red.500" : undefined}
          _focus={{ borderColor: touched.email && errors.email ? "red.500" : "primary" }}
        />
        {touched.email && errors.email && (
          <Text fontSize="sm" color="red.500">
            {errors.email}
          </Text>
        )}
      </VStack>

      <VStack gap={4}>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          onBlur={() => handleBlur("password")}
          borderColor={touched.password && errors.password ? "red.500" : undefined}
          _focus={{ borderColor: touched.password && errors.password ? "red.500" : "primary" }}
        />
        {touched.password && errors.password && (
          <Text fontSize="sm" color="red.500">
            {errors.password}
          </Text>
        )}
      </VStack>

      <Button variant={isValid ? "default" : "secondary"} disabled={!isValid} w="full">
        {isValid ? "Login" : "Please fill all fields"}
      </Button>
    </VStack>
  );
};

export const InputWithCopyButton: Story = {
  render: () => {
    const [value] = useState("https://example.com/very-long-url-to-copy");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <HStack gap={8} w={400}>
        <Input value={value} readOnly flex={1} />
        <Button variant={copied ? "secondary" : "outline"} onClick={handleCopy} minW={80}>
          {copied ? "✓ Copied!" : "Copy"}
        </Button>
      </HStack>
    );
  },
};

// ============================================
// ThemeProvider 커스터마이징 예시
// ============================================

export const ThemeStyles: Story = {
  render: () => (
    <VStack gap={24} w={350}>
      <Text fontWeight="bold">Input Styles by Theme</Text>

      {/* Default Theme */}
      <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg" w="full">
        <Text fontSize="sm" fontWeight="medium" mb={8}>
          Default Theme
        </Text>
        <Input placeholder="Default input" />
      </Box>

      {/* Brand Theme */}
      <Box p={16} border="1px solid" borderColor="blue.200" rounded="lg" w="full" bg="blue.50">
        <Text fontSize="sm" fontWeight="medium" mb={8} color="blue.700">
          Brand Theme (Blue)
        </Text>
        <Input
          placeholder="Brand styled input"
          borderColor="blue.300"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
        />
      </Box>

      {/* Dark Theme */}
      <Box p={16} border="1px solid" borderColor="gray.600" rounded="lg" w="full" bg="gray.800">
        <Text fontSize="sm" fontWeight="medium" mb={8} color="gray.200">
          Dark Theme
        </Text>
        <Input
          placeholder="Dark styled input"
          bg="gray.700"
          borderColor="gray.600"
          color="white"
          _placeholder={{ color: "gray.400" }}
          _focus={{ borderColor: "blue.400", bg: "gray.600" }}
        />
      </Box>

      {/* Custom Border */}
      <Box p={16} border="1px solid" borderColor="purple.200" rounded="lg" w="full" bg="purple.50">
        <Text fontSize="sm" fontWeight="medium" mb={8} color="purple.700">
          Custom Border
        </Text>
        <Input
          placeholder="Custom styled input"
          borderWidth={2}
          borderColor="purple.300"
          rounded="lg"
          _focus={{ borderColor: "purple.500", boxShadow: "none" }}
        />
      </Box>
    </VStack>
  ),
};
