import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Placeholder, VStack, HStack, Box, Text, Button } from "../../renderer";

const meta: Meta<typeof Placeholder> = {
  title: "Units/Placeholder",
  component: Placeholder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["loading", "empty", "error"],
      description: "플레이스홀더 변형",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Placeholder w={300} h={150}>
      Drop content here
    </Placeholder>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={16}>
      <Placeholder w={200} h={80}>
        Small
      </Placeholder>
      <Placeholder w={300} h={120}>
        Medium
      </Placeholder>
      <Placeholder w={400} h={160}>
        Large
      </Placeholder>
    </VStack>
  ),
};

export const Variants: Story = {
  render: () => (
    <VStack gap={16}>
      <Box w={300}>
        <Text fontWeight="medium" mb={8}>Loading</Text>
        <Placeholder variant="loading" h={150}>
          Loading content...
        </Placeholder>
      </Box>
      
      <Box w={300}>
        <Text fontWeight="medium" mb={8}>Empty</Text>
        <Placeholder variant="empty" h={150}>
          No data available
        </Placeholder>
      </Box>
      
      <Box w={300}>
        <Text fontWeight="medium" mb={8}>Error</Text>
        <Placeholder variant="error" h={150}>
          Failed to load
        </Placeholder>
      </Box>
    </VStack>
  ),
};

export const LoadingState: Story = {
  render: () => <LoadingStateExample />,
};

const LoadingStateExample = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string[] | null>(null);
  
  const loadData = () => {
    setLoading(true);
    setData(null);
    
    setTimeout(() => {
      setData(["Item 1", "Item 2", "Item 3"]);
      setLoading(false);
    }, 2000);
  };
  
  return (
    <VStack gap={16} w={350}>
      {loading ? (
        <Placeholder variant="loading" h={200}>
          Loading data...
        </Placeholder>
      ) : data ? (
        <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg" w="full">
          <VStack gap={8} alignItems="flex-start">
            <Text fontWeight="bold">Data Loaded</Text>
            {data.map((item, i) => (
              <Text key={i}>{item}</Text>
            ))}
          </VStack>
        </Box>
      ) : null}
      
      <Button onClick={loadData} w="full">
        {loading ? "Loading..." : "Reload Data"}
      </Button>
    </VStack>
  );
};

export const EmptyState: Story = {
  render: () => <EmptyStateExample />,
};

const EmptyStateExample = () => {
  const [items, setItems] = useState<string[]>([]);
  
  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };
  
  return (
    <VStack gap={16} w={350}>
      {items.length === 0 ? (
        <Placeholder variant="empty" h={200}>
          <VStack gap={8}>
            <Text fontSize="xl">📭</Text>
            <Text fontWeight="medium">No items yet</Text>
            <Text fontSize="sm" color="gray.500">
              Click the button below to add your first item
            </Text>
          </VStack>
        </Placeholder>
      ) : (
        <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg" w="full">
          <VStack gap={8} alignItems="flex-start">
            <Text fontWeight="bold">Items ({items.length})</Text>
            {items.map((item, i) => (
              <Text key={i}>{item}</Text>
            ))}
          </VStack>
        </Box>
      )}
      
      <Button onClick={addItem} variant={items.length === 0 ? "default" : "outline"} w="full">
        {items.length === 0 ? "Add First Item" : "Add Item"}
      </Button>
    </VStack>
  );
};

export const ErrorState: Story = {
  render: () => <ErrorStateExample />,
};

const ErrorStateExample = () => {
  const [error, setError] = useState(true);
  const [retrying, setRetrying] = useState(false);
  
  const retry = () => {
    setRetrying(true);
    setTimeout(() => {
      setError(false);
      setRetrying(false);
    }, 2000);
  };
  
  return (
    <VStack gap={16} w={350}>
      {error ? (
        <Placeholder variant="error" h={200}>
          <VStack gap={8}>
            <Text fontSize="xl">⚠️</Text>
            <Text fontWeight="medium">Connection Failed</Text>
            <Text fontSize="sm" color="gray.500">
              Unable to connect to the server
            </Text>
          </VStack>
        </Placeholder>
      ) : (
        <Box p={16} border="1px solid" borderColor="green.200" bg="green.50" rounded="lg" w="full">
          <VStack gap={8}>
            <Text fontWeight="bold" color="green.700">✓ Connected</Text>
            <Text fontSize="sm" color="green.600">
              Successfully connected to the server
            </Text>
          </VStack>
        </Box>
      )}
      
      {error && (
        <Button onClick={retry} variant="destructive" w="full" loading={retrying}>
          {retrying ? "Retrying..." : "Retry Connection"}
        </Button>
      )}
    </VStack>
  );
};

export const FormPlaceholder: Story = {
  render: () => (
    <VStack gap={16} w={350}>
      <Placeholder variant="loading" h={200}>
        <VStack gap={8}>
          <Text fontWeight="medium">Loading form...</Text>
          <Text fontSize="sm" color="gray.500">
            Please wait while we prepare your form
          </Text>
        </VStack>
      </Placeholder>
    </VStack>
  ),
};

export const FileUploadPlaceholder: Story = {
  render: () => (
    <VStack gap={16} w={350}>
      <Placeholder variant="empty" h={200}>
        <VStack gap={8}>
          <Text fontSize="xl">📤</Text>
          <Text fontWeight="medium">Drop files here</Text>
          <Text fontSize="sm" color="gray.500">
            or click to browse
          </Text>
        </VStack>
      </Placeholder>
    </VStack>
  ),
};

export const SearchPlaceholder: Story = {
  render: () => (
    <VStack gap={16} w={350}>
      <Placeholder variant="empty" h={100}>
        <VStack gap={4}>
          <Text fontSize="xl">🔍</Text>
          <Text fontWeight="medium">No results found</Text>
        </VStack>
      </Placeholder>
    </VStack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <VStack gap={24}>
      <Box w={300}>
        <Text fontWeight="medium" mb={8} fontSize="sm" color="gray.600">
          Loading - 데이터 로딩 중
        </Text>
        <Placeholder variant="loading" h={100}>
          Loading...
        </Placeholder>
      </Box>
      
      <Box w={300}>
        <Text fontWeight="medium" mb={8} fontSize="sm" color="gray.600">
          Empty - 데이터 없음
        </Text>
        <Placeholder variant="empty" h={100}>
          No data
        </Placeholder>
      </Box>
      
      <Box w={300}>
        <Text fontWeight="medium" mb={8} fontSize="sm" color="gray.600">
          Error - 에러 상태
        </Text>
        <Placeholder variant="error" h={100}>
          Error occurred
        </Placeholder>
      </Box>
    </VStack>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <VStack gap={16} w={350}>
      <Placeholder variant="loading" h={200}>
        <VStack gap={12}>
          <Text fontSize="2xl">⏳</Text>
          <Text fontWeight="medium">Processing your request</Text>
          <Text fontSize="sm" color="gray.500">
            This may take a few moments...
          </Text>
          <Box w={100} h={4} bg="gray.200" rounded="full" mt={8}>
            <Box w={50} h={4} bg="primary" rounded="full" />
          </Box>
        </VStack>
      </Placeholder>
    </VStack>
  ),
};

export const InCard: Story = {
  render: () => (
    <Box w={350} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box bg="gray.50" p={12} borderBottom="1px solid" borderColor="gray.200">
        <Text fontWeight="medium">Dashboard</Text>
      </Box>
      <Placeholder variant="loading" h={300}>
        <VStack gap={8}>
          <Text fontWeight="medium">Loading dashboard...</Text>
        </VStack>
      </Placeholder>
    </Box>
  ),
};

export const WithAction: Story = {
  render: () => <WithActionExample />,
};

const WithActionExample = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  return (
    <VStack gap={16} w={350}>
      {showPlaceholder ? (
        <Placeholder variant="empty" h={150}>
          <VStack gap={8}>
            <Text fontSize="xl">🎯</Text>
            <Text fontWeight="medium">No goals set</Text>
          </VStack>
        </Placeholder>
      ) : (
        <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg" w="full">
          <Text fontWeight="medium">Goal added!</Text>
        </Box>
      )}
      
      <HStack gap={8}>
        <Button 
          variant="default" 
          flex={1}
          onClick={() => setShowPlaceholder(false)}
        >
          Add Goal
        </Button>
        <Button 
          variant="outline" 
          flex={1}
          onClick={() => setShowPlaceholder(true)}
        >
          Reset
        </Button>
      </HStack>
    </VStack>
  );
};
