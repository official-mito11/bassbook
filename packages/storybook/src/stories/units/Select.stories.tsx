import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select, VStack, HStack, Box, Text, Label } from "../../renderer";

const meta: Meta<typeof Select> = {
  title: "Units/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "셀렉트 크기",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// 기본 사용법
// ============================================

export const Default: Story = {
  render: () => (
    <Box w={200}>
      <Select placeholder="Select an option">
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={16} w={200}>
      <VStack gap={4}>
        <Label fontSize="sm">Small</Label>
        <Select placeholder="Small" size="sm">
          <Select.Option value="sm1">Small Option 1</Select.Option>
          <Select.Option value="sm2">Small Option 2</Select.Option>
        </Select>
      </VStack>
      
      <VStack gap={4}>
        <Label>Medium (Default)</Label>
        <Select placeholder="Medium" size="md">
          <Select.Option value="md1">Medium Option 1</Select.Option>
          <Select.Option value="md2">Medium Option 2</Select.Option>
        </Select>
      </VStack>
      
      <VStack gap={4}>
        <Label>Large</Label>
        <Select placeholder="Large" size="lg">
          <Select.Option value="lg1">Large Option 1</Select.Option>
          <Select.Option value="lg2">Large Option 2</Select.Option>
        </Select>
      </VStack>
    </VStack>
  ),
};

// ============================================
// Interactive Examples
// ============================================

export const ControlledSelect: Story = {
  render: () => <ControlledSelectExample />,
};

const ControlledSelectExample = () => {
  const [value, setValue] = useState("");
  
  const options = [
    { value: "react", label: "React", description: "A JavaScript library for building user interfaces" },
    { value: "vue", label: "Vue.js", description: "The Progressive JavaScript Framework" },
    { value: "angular", label: "Angular", description: "A platform for building mobile and desktop web applications" },
    { value: "svelte", label: "Svelte", description: "Cybernetically enhanced web apps" },
  ];
  
  const selectedOption = options.find((opt) => opt.value === value);
  
  return (
    <VStack gap={16} w={300}>
      <Select 
        value={value} 
        onChange={(e: any) => setValue(e.target.value)}
        placeholder="Choose a framework"
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
      
      {selectedOption && (
        <Box p={12} bg="blue.50" rounded="md" w="full">
          <Text fontWeight="medium" color="blue.700">
            Selected: {selectedOption.label}
          </Text>
          <Text fontSize="sm" color="blue.600">
            {selectedOption.description}
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export const WithSearch: Story = {
  render: () => <SearchableSelectExample />,
};

const SearchableSelectExample = () => {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  
  const allOptions = [
    { value: "us", label: "United States", code: "+1" },
    { value: "uk", label: "United Kingdom", code: "+44" },
    { value: "ca", label: "Canada", code: "+1" },
    { value: "au", label: "Australia", code: "+61" },
    { value: "de", label: "Germany", code: "+49" },
    { value: "fr", label: "France", code: "+33" },
    { value: "jp", label: "Japan", code: "+81" },
    { value: "kr", label: "South Korea", code: "+82" },
    { value: "cn", label: "China", code: "+86" },
    { value: "in", label: "India", code: "+91" },
  ];
  
  const filteredOptions = allOptions.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      opt.code.includes(search)
  );
  
  return (
    <VStack gap={16} w={280}>
      <Text fontWeight="medium">Country Code Selector</Text>
      
      <Box position="relative">
        <Box position="absolute" left={12} top="50%" transform="translateY(-50%)" color="gray.400">
          🔍
        </Box>
        <Select
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          placeholder="Search countries..."
          pl={40}
        >
          {filteredOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <HStack gap={8}>
                <Text>{option.code}</Text>
                <Text>{option.label}</Text>
              </HStack>
            </Select.Option>
          ))}
        </Select>
      </Box>
      
      {value && (
        <Text fontSize="sm" color="gray.500">
          Selected: {allOptions.find((o) => o.value === value)?.label} ({allOptions.find((o) => o.value === value)?.code})
        </Text>
      )}
    </VStack>
  );
};

export const WithGroups: Story = {
  render: () => (
    <VStack gap={16} w={300}>
      <Text fontWeight="medium">Payment Method</Text>
      
      <Select placeholder="Select payment method">
        <optgroup label="Credit Cards">
          <Select.Option value="visa">💳 Visa</Select.Option>
          <Select.Option value="mastercard">💳 Mastercard</Select.Option>
          <Select.Option value="amex">💳 American Express</Select.Option>
        </optgroup>
        <optgroup label="Digital Payments">
          <Select.Option value="paypal">🅿️ PayPal</Select.Option>
          <Select.Option value="applepay">🍎 Apple Pay</Select.Option>
          <Select.Option value="googlepay">🔵 Google Pay</Select.Option>
        </optgroup>
        <optgroup label="Other">
          <Select.Option value="bank">🏦 Bank Transfer</Select.Option>
          <Select.Option value="crypto">₿ Cryptocurrency</Select.Option>
        </optgroup>
      </Select>
    </VStack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <VStack gap={16} w={280}>
      <Text fontWeight="medium">Select with Icons</Text>
      
      <Select placeholder="Choose your avatar">
        <Select.Option value="👨‍💻">👨‍💻 Developer</Select.Option>
        <Select.Option value="👩‍🎨">👩‍🎨 Designer</Select.Option>
        <Select.Option value="👨‍💼">👨‍💼 Manager</Select.Option>
        <Select.Option value="👩‍🔬">👩‍🔬 Scientist</Select.Option>
        <Select.Option value="👨‍🎓">👨‍🎓 Student</Select.Option>
      </Select>
    </VStack>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <VStack gap={16} w={200}>
      <VStack gap={4}>
        <Label>Disabled Select</Label>
        <Select placeholder="Cannot select" disabled>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </VStack>
      
      <VStack gap={4}>
        <Label>Disabled with Value</Label>
        <Select value="selected" disabled>
          <Select.Option value="selected">Pre-selected Value</Select.Option>
        </Select>
      </VStack>
    </VStack>
  ),
};

// ============================================
// 커스터마이징 예시
// ============================================

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={16} w={280}>
      {/* 커스텀 배경색 */}
      <VStack gap={4}>
        <Label>Custom Background</Label>
        <Select 
          placeholder="Custom styled" 
          bg="purple.50"
          borderColor="purple.300"
          _hover={{ borderColor: "purple.400" }}
          _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 3px rgba(147, 51, 234, 0.1)" }}
        >
          <Select.Option value="1">Purple Option 1</Select.Option>
          <Select.Option value="2">Purple Option 2</Select.Option>
        </Select>
      </VStack>
      
      {/* 둥근 모서리 */}
      <VStack gap={4}>
        <Label>Rounded Style</Label>
        <Select 
          placeholder="Rounded" 
          rounded="lg"
          borderWidth={2}
        >
          <Select.Option value="1">Rounded Option 1</Select.Option>
          <Select.Option value="2">Rounded Option 2</Select.Option>
        </Select>
      </VStack>
      
      {/* 그림자 */}
      <VStack gap={4}>
        <Label>With Shadow</Label>
        <Select 
          placeholder="With shadow" 
          shadow="md"
          _focus={{ shadow: "lg" }}
        >
          <Select.Option value="1">Shadow Option 1</Select.Option>
          <Select.Option value="2">Shadow Option 2</Select.Option>
        </Select>
      </VStack>
    </VStack>
  ),
};

// ============================================
// 실전 사용 예시
// ============================================

export const ProfileForm: Story = {
  render: () => <ProfileFormExample />,
};

const ProfileFormExample = () => {
  const [form, setForm] = useState({
    country: "",
    language: "",
    timezone: "",
  });
  
  return (
    <Box w={350} p={24} border="1px solid" borderColor="gray.200" rounded="lg">
      <VStack gap={16}>
        <Text fontWeight="bold" fontSize="lg">Profile Settings</Text>
        
        <VStack gap={12} w="full">
          <VStack gap={4}>
            <Label>Country</Label>
            <Select
              value={form.country}
              onChange={(e: any) => setForm({ ...form, country: e.target.value })}
              placeholder="Select country"
            >
              <Select.Option value="us">🇺🇸 United States</Select.Option>
              <Select.Option value="uk">🇬🇧 United Kingdom</Select.Option>
              <Select.Option value="ca">🇨🇦 Canada</Select.Option>
              <Select.Option value="au">🇦🇺 Australia</Select.Option>
              <Select.Option value="de">🇩🇪 Germany</Select.Option>
            </Select>
          </VStack>
          
          <VStack gap={4}>
            <Label>Preferred Language</Label>
            <Select
              value={form.language}
              onChange={(e: any) => setForm({ ...form, language: e.target.value })}
              placeholder="Select language"
            >
              <Select.Option value="en">🇺🇸 English</Select.Option>
              <Select.Option value="ko">🇰🇷 한국어</Select.Option>
              <Select.Option value="ja">🇯🇵 日本語</Select.Option>
              <Select.Option value="zh">🇨🇳 中文</Select.Option>
              <Select.Option value="es">🇪🇸 Español</Select.Option>
            </Select>
          </VStack>
          
          <VStack gap={4}>
            <Label>Timezone</Label>
            <Select
              value={form.timezone}
              onChange={(e: any) => setForm({ ...form, timezone: e.target.value })}
              placeholder="Select timezone"
            >
              <Select.Option value="pst">🕐 Pacific Time (PST)</Select.Option>
              <Select.Option value="est">🕐 Eastern Time (EST)</Select.Option>
              <Select.Option value="gmt">🕐 Greenwich Mean Time (GMT)</Select.Option>
              <Select.Option value="cet">🕐 Central European Time (CET)</Select.Option>
              <Select.Option value="jst">🕐 Japan Standard Time (JST)</Select.Option>
            </Select>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export const ProductFilter: Story = {
  render: () => <ProductFilterExample />,
};

const ProductFilterExample = () => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  
  return (
    <Box w={320} p={16} border="1px solid" borderColor="gray.200" rounded="lg">
      <VStack gap={12}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold">Filters</Text>
          {(category || sort) && (
            <Text 
              fontSize="sm" 
              color="blue.500" 
              cursor="pointer"
              onClick={() => { setCategory(""); setSort(""); }}
            >
              Clear all
            </Text>
          )}
        </HStack>
        
        <VStack gap={8}>
          <VStack gap={4}>
            <Label fontSize="sm">Category</Label>
            <Select
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              placeholder="All categories"
              size="sm"
            >
              <Select.Option value="electronics">📱 Electronics</Select.Option>
              <Select.Option value="clothing">👕 Clothing</Select.Option>
              <Select.Option value="books">📚 Books</Select.Option>
              <Select.Option value="home">🏠 Home & Garden</Select.Option>
              <Select.Option value="sports">⚽ Sports</Select.Option>
            </Select>
          </VStack>
          
          <VStack gap={4}>
            <Label fontSize="sm">Sort by</Label>
            <Select
              value={sort}
              onChange={(e: any) => setSort(e.target.value)}
              placeholder="Default"
              size="sm"
            >
              <Select.Option value="price-low">💰 Price: Low to High</Select.Option>
              <Select.Option value="price-high">💰 Price: High to Low</Select.Option>
              <Select.Option value="newest">🆕 Newest First</Select.Option>
              <Select.Option value="rating">⭐ Highest Rated</Select.Option>
              <Select.Option value="popular">🔥 Most Popular</Select.Option>
            </Select>
          </VStack>
        </VStack>
      </VStack>
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
        <Select placeholder="Default select" w={200}>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </Box>
      
      <Box p={16} border="1px solid" borderColor="gray.600" rounded="lg" w="full" bg="gray.800">
        <Text fontWeight="medium" mb={8} color="gray.200">Dark Theme</Text>
        <Select 
          placeholder="Dark select" 
          w={200}
          bg="gray.700"
          borderColor="gray.600"
          color="white"
          _placeholder={{ color: "gray.400" }}
        >
          <Select.Option value="1">Dark Option 1</Select.Option>
          <Select.Option value="2">Dark Option 2</Select.Option>
        </Select>
      </Box>
      
      <Box p={16} border="1px solid" borderColor="blue.200" rounded="lg" w="full" bg="blue.50">
        <Text fontWeight="medium" mb={8} color="blue.700">Brand Theme (Blue)</Text>
        <Select 
          placeholder="Brand select" 
          w={200}
          borderColor="blue.300"
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
        >
          <Select.Option value="1">Brand Option 1</Select.Option>
          <Select.Option value="2">Brand Option 2</Select.Option>
        </Select>
      </Box>
    </VStack>
  ),
};
