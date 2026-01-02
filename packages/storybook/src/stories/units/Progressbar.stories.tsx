import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Progressbar, VStack, HStack, Box, Text, Button } from "../../renderer";

const meta: Meta<typeof Progressbar> = {
  title: "Units/Progressbar",
  component: Progressbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "프로그레스바 크기",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Progressbar size="md" w={300} />
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={16} w={300}>
      <VStack gap={4}>
        <Text fontSize="sm" color="gray.500">Small</Text>
        <Progressbar size="sm" />
      </VStack>
      <VStack gap={4}>
        <Text fontSize="sm" color="gray.500">Medium</Text>
        <Progressbar size="md" />
      </VStack>
      <VStack gap={4}>
        <Text fontSize="sm" color="gray.500">Large</Text>
        <Progressbar size="lg" />
      </VStack>
    </VStack>
  ),
};

export const WithValue: Story = {
  render: () => <ProgressbarWithValueExample />,
};

const ProgressbarWithValueExample = () => {
  const [progress, setProgress] = useState(33);
  
  return (
    <VStack gap={16} w={350}>
      <Box w="full">
        <HStack justifyContent="space-between" mb={4}>
          <Text fontWeight="medium">Progress</Text>
          <Text fontSize="sm" color="gray.500">{progress}%</Text>
        </HStack>
        <Progressbar 
          size="md" 
          style={{ "--progress-width": `${progress}%` } as any}
        />
      </Box>
      
      <HStack gap={8}>
        <Button variant="outline" size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
          -10%
        </Button>
        <Button variant="outline" size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
          +10%
        </Button>
      </HStack>
    </VStack>
  );
};

export const InteractiveSlider: Story = {
  render: () => <InteractiveProgressSlider />,
};

const InteractiveProgressSlider = () => {
  const [value, setValue] = useState(50);
  
  return (
    <VStack gap={16} w={350}>
      <Box w="full">
        <Text fontWeight="medium" mb={8}>Volume Control</Text>
        <Progressbar 
          size="lg" 
          style={{ "--progress-width": `${value}%` } as any}
        />
        <Text fontSize="sm" color="gray.500" mt={4} textAlign="center">
          {value}%
        </Text>
      </Box>
      
      <input 
        type="range" 
        min={0} 
        max={100} 
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%" }}
      />
      
      <HStack gap={8} justifyContent="center">
        <Button variant="ghost" size="sm" onClick={() => setValue(0)}>Min</Button>
        <Button variant="ghost" size="sm" onClick={() => setValue(50)}>50%</Button>
        <Button variant="ghost" size="sm" onClick={() => setValue(100)}>Max</Button>
      </HStack>
    </VStack>
  );
};

export const UploadProgress: Story = {
  render: () => <UploadProgressExample />,
};

const UploadProgressExample = () => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [complete, setComplete] = useState(false);
  
  const simulateUpload = () => {
    setUploading(true);
    setComplete(false);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  return (
    <VStack gap={16} w={350}>
      <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg">
        <VStack gap={12}>
          <HStack justifyContent="space-between">
            <Text fontWeight="medium">Uploading file.pdf</Text>
            {complete ? (
              <Text color="green.500" fontSize="sm">✓ Complete</Text>
            ) : (
              <Text fontSize="sm" color="gray.500">{progress}%</Text>
            )}
          </HStack>
          
          <Progressbar 
            size="md"
            style={{ "--progress-width": `${complete ? 100 : progress}%` } as any}
          />
          
          <Text fontSize="sm" color="gray.500">
            {complete ? "File uploaded successfully" : "Uploading..."}
          </Text>
        </VStack>
      </Box>
      
      <Button 
        variant={complete ? "secondary" : "default"} 
        onClick={simulateUpload}
        disabled={uploading}
        w="full"
      >
        {uploading ? "Uploading..." : complete ? "Upload Again" : "Start Upload"}
      </Button>
    </VStack>
  );
};

export const DownloadProgress: Story = {
  render: () => <DownloadProgressExample />,
};

const DownloadProgressExample = () => {
  const [progress] = useState(65);
  const [status, setStatus] = useState<"downloading" | "paused" | "complete">("downloading");
  
  return (
    <VStack gap={16} w={350}>
      <Box p={16} border="1px solid" borderColor="gray.200" rounded="lg" w="full">
        <VStack gap={12} alignItems="flex-start">
          <Text fontWeight="medium">bassbook-ui-2.0.0.tgz</Text>
          
          <Progressbar 
            size="md"
            style={{ "--progress-width": `${progress}%` } as any}
          />
          
          <HStack justifyContent="space-between" w="full">
            <Text fontSize="sm" color="gray.500">
              {progress} MB / 100 MB
            </Text>
            <Text fontSize="sm" color={status === "complete" ? "green.500" : "gray.500"}>
              {status === "downloading" && "↓ Downloading"}
              {status === "paused" && "⏸ Paused"}
              {status === "complete" && "✓ Complete"}
            </Text>
          </HStack>
        </VStack>
      </Box>
      
      <HStack gap={8} w="full">
        <Button 
          variant="outline" 
          flex={1}
          onClick={() => setStatus(status === "downloading" ? "paused" : "downloading")}
        >
          {status === "downloading" ? "Pause" : "Resume"}
        </Button>
        <Button variant="ghost" flex={1}>Cancel</Button>
      </HStack>
    </VStack>
  );
};

export const MultiStepProgress: Story = {
  render: () => <MultiStepProgressExample />,
};

const MultiStepProgressExample = () => {
  const [step, setStep] = useState(2);
  const steps = ["Cart", "Shipping", "Payment", "Confirm", "Complete"];
  
  return (
    <VStack gap={24} w={400}>
      <Box w="full">
        <HStack justifyContent="space-between" mb={8}>
          {steps.map((label, index) => (
            <VStack key={label} gap={4} flex={1} alignItems="center">
              <Box 
                w={8} 
                h={8} 
                rounded="full"
                bg={index < step ? "primary" : index === step ? "primary" : "gray.200"}
              />
              <Text 
                fontSize="xs" 
                color={index <= step ? "foreground" : "gray.400"}
                textAlign="center"
              >
                {label}
              </Text>
            </VStack>
          ))}
        </HStack>
        <Progressbar 
          size="sm"
          style={{ "--progress-width": `${((step - 1) / (steps.length - 1)) * 100}%` } as any}
        />
      </Box>
      
      <Text fontWeight="medium" textAlign="center">
        Step {step}: {steps[step]}
      </Text>
      
      <HStack gap={8} justifyContent="center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};

export const GoalProgress: Story = {
  render: () => <GoalProgressExample />,
};

const GoalProgressExample = () => {
  const [raised, setRaised] = useState(75000);
  const goal = 100000;
  const percentage = Math.min(100, (raised / goal) * 100);
  
  return (
    <VStack gap={16} w={350}>
      <Box w="full">
        <HStack justifyContent="space-between" mb={8}>
          <Text fontWeight="medium">Fundraising Goal</Text>
          <Text fontSize="sm" color="gray.500">
            ${raised.toLocaleString()} / ${goal.toLocaleString()}
          </Text>
        </HStack>
        
        <Progressbar 
          size="lg"
          style={{ "--progress-width": `${percentage}%` } as any}
        />
        
        <Text fontSize="sm" color="gray.500" mt={4}>
          {percentage.toFixed(1)}% funded
        </Text>
      </Box>
      
      <HStack gap={8} justifyContent="center">
        <Button variant="outline" size="sm" onClick={() => setRaised(Math.max(0, raised - 5000))}>
          -$5,000
        </Button>
        <Button variant="outline" size="sm" onClick={() => setRaised(Math.min(goal + 20000, raised + 5000))}>
          +$5,000
        </Button>
      </HStack>
    </VStack>
  );
};

export const ColorVariants: Story = {
  render: () => (
    <VStack gap={16} w={300}>
      <Progressbar 
        size="md"
        style={{ "--progress-width": "75%", "--progress-bg": "#3b82f6" } as any}
      />
      <Progressbar 
        size="md"
        style={{ "--progress-width": "50%", "--progress-bg": "#10b981" } as any}
      />
      <Progressbar 
        size="md"
        style={{ "--progress-width": "90%", "--progress-bg": "#f59e0b" } as any}
      />
      <Progressbar 
        size="md"
        style={{ "--progress-width": "25%", "--progress-bg": "#ef4444" } as any}
      />
    </VStack>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={16} w={300}>
      <Progressbar size="md" shadow="md" />
      <Progressbar size="lg" rounded="full" style={{ "--progress-width": "60%" } as any} />
      <Progressbar size="sm" border="1px solid" borderColor="gray.200" />
    </VStack>
  ),
};
