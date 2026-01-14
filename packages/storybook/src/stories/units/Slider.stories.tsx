import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider, VStack, HStack, Box, Text, Label } from "../../renderer";

const meta: Meta<typeof Slider> = {
  title: "Units/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "슬라이더 크기",
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
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={24} w={300}>
      <Box w="full">
        <Label fontSize="sm" mb={4}>
          Small
        </Label>
        <Slider size="sm" defaultValue={25} min={0} max={100} />
      </Box>
      <Box w="full">
        <Label>Medium (Default)</Label>
        <Slider size="md" defaultValue={50} min={0} max={100} />
      </Box>
      <Box w="full">
        <Label>Large</Label>
        <Slider size="lg" defaultValue={75} min={0} max={100} />
      </Box>
    </VStack>
  ),
};

export const States: Story = {
  render: () => (
    <VStack gap={24} w={300}>
      <Box w="full">
        <Label>Default</Label>
        <Slider defaultValue={50} min={0} max={100} />
      </Box>
      <Box w="full">
        <Label>Disabled</Label>
        <Slider defaultValue={50} min={0} max={100} disabled />
      </Box>
      <Box w="full">
        <Label>With Value</Label>
        <SliderWithValueDisplay />
      </Box>
    </VStack>
  ),
};

const SliderWithValueDisplay = () => {
  const [value, setValue] = useState(50);

  return (
    <Box w="full">
      <Slider value={value} onChange={(e: any) => setValue(Number(e.target.value))} min={0} max={100} />
      <Text fontSize="sm" color="gray.500" mt={4} textAlign="center">
        Value: {value}
      </Text>
    </Box>
  );
};

// ============================================
// Interactive Examples
// ============================================

export const VolumeControl: Story = {
  render: () => <VolumeControlExample />,
};

const VolumeControlExample = () => {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);

  const displayValue = muted ? 0 : volume;

  return (
    <Box w={280} p={16} border="1px solid" borderColor="gray.200" rounded="lg">
      <VStack gap={12}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack gap={8}>
            <Text fontSize="xl" cursor="pointer" onClick={() => setMuted(!muted)}>
              {muted ? "🔇" : volume === 0 ? "🔊" : volume < 50 ? "🔉" : "🔊"}
            </Text>
            <Text fontWeight="medium">Volume</Text>
          </HStack>
          <Text fontWeight="bold" color="primary">
            {displayValue}%
          </Text>
        </HStack>

        <Slider
          value={muted ? 0 : volume}
          onChange={(e: any) => {
            setVolume(Number(e.target.value));
            if (Number(e.target.value) > 0) setMuted(false);
          }}
          min={0}
          max={100}
        />

        <HStack justifyContent="space-between" fontSize="xs" color="gray.400">
          <Text>0</Text>
          <Text>25</Text>
          <Text>50</Text>
          <Text>75</Text>
          <Text>100</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export const BrightnessControl: Story = {
  render: () => <BrightnessControlExample />,
};

const BrightnessControlExample = () => {
  const [brightness, setBrightness] = useState(80);

  return (
    <Box
      w={280}
      p={16}
      border="1px solid"
      borderColor="gray.200"
      rounded="lg"
      bg={`rgba(255, 255, 200, ${brightness / 100})`}
    >
      <VStack gap={12}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack gap={8}>
            <Text fontSize="xl">☀️</Text>
            <Text fontWeight="medium">Brightness</Text>
          </HStack>
          <Text fontWeight="bold">{brightness}%</Text>
        </HStack>

        <Slider value={brightness} onChange={(e: any) => setBrightness(Number(e.target.value))} min={10} max={100} />

        <Box
          h={60}
          bg="white"
          rounded="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="gray.200"
        >
          <Text color="gray.600">Preview area</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export const TemperatureControl: Story = {
  render: () => <TemperatureControlExample />,
};

const TemperatureControlExample = () => {
  const [temperature, setTemperature] = useState(72);

  const getColor = () => {
    if (temperature < 60) return "blue";
    if (temperature < 70) return "cyan";
    if (temperature < 80) return "orange";
    return "red";
  };

  return (
    <Box w={280} p={16} border="1px solid" borderColor="gray.200" rounded="lg">
      <VStack gap={12}>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack gap={8}>
            <Text fontSize="xl">🌡️</Text>
            <Text fontWeight="medium">Temperature</Text>
          </HStack>
          <Text fontWeight="bold" color={`${getColor()}.500`}>
            {temperature}°F
          </Text>
        </HStack>

        <Slider value={temperature} onChange={(e: any) => setTemperature(Number(e.target.value))} min={32} max={100} />

        <HStack justifyContent="space-between" fontSize="xs" color="gray.400">
          <Text>32°F</Text>
          <Text>66°F</Text>
          <Text>100°F</Text>
        </HStack>

        <Box p={8} bg={`${getColor()}.50`} rounded="md" border="1px solid" borderColor={`${getColor()}.200`}>
          <Text fontSize="sm" color={`${getColor()}.700`}>
            {temperature < 60 ? "❄️ Cool" : temperature < 80 ? "☀️ Warm" : "🔥 Hot"}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export const RangeSlider: Story = {
  render: () => <RangeSliderExample />,
};

const RangeSliderExample = () => {
  const [range, setRange] = useState<[number, number]>([25, 75]);

  return (
    <Box w={320} p={16} border="1px solid" borderColor="gray.200" rounded="lg">
      <VStack gap={12}>
        <Text fontWeight="bold">Price Range</Text>

        <Slider
          value={range[0]}
          onChange={(e: any) => setRange([Number(e.target.value), range[1]])}
          min={0}
          max={100}
          w="full"
        />

        <Slider
          value={range[1]}
          onChange={(e: any) => setRange([range[0], Number(e.target.value)])}
          min={0}
          max={100}
          w="full"
        />

        <HStack justifyContent="space-between" pt={8}>
          <Box p={8} bg="gray.50" rounded="md">
            <Text fontSize="xs" color="gray.500">
              Min
            </Text>
            <Text fontWeight="bold">${range[0]}</Text>
          </Box>
          <Box p={8} bg="gray.50" rounded="md">
            <Text fontSize="xs" color="gray.500">
              Max
            </Text>
            <Text fontWeight="bold">${range[1]}</Text>
          </Box>
        </HStack>

        <Box p={8} bg="blue.50" rounded="md" w="full">
          <Text fontSize="sm" color="blue.700">
            Selected range: ${range[0]} - ${range[1]}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export const WithSteps: Story = {
  render: () => <StepsSliderExample />,
};

const StepsSliderExample = () => {
  const [value, setValue] = useState(3);

  const options = [1, 2, 3, 4, 5];
  const labels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <Box w={300} p={16} border="1px solid" borderColor="gray.200" rounded="lg">
      <VStack gap={16}>
        <Text fontWeight="bold" fontSize="lg" textAlign="center">
          Rate Your Experience
        </Text>

        <Slider value={value} onChange={(e: any) => setValue(Number(e.target.value))} min={1} max={5} step={1} />

        <HStack justifyContent="space-between" px={8}>
          {options.map((num) => (
            <Box key={num} textAlign="center">
              <Text
                fontSize="lg"
                fontWeight={value === num ? "bold" : "normal"}
                color={value === num ? "purple.500" : "gray.400"}
              >
                {num}
              </Text>
            </Box>
          ))}
        </HStack>

        <Box p={12} bg="purple.50" rounded="md" w="full" textAlign="center">
          <Text fontWeight="medium" color="purple.700">
            {labels[value - 1]}
          </Text>
        </Box>

        <HStack gap={4} justifyContent="center" flexWrap="wrap">
          {options.map((num) => (
            <Text key={num} fontSize="xs" color={value === num ? "purple.600" : "gray.400"}>
              {labels[num - 1]}
            </Text>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

// ============================================
// 커스터마이징 예시
// ============================================

export const CustomColors: Story = {
  render: () => (
    <VStack gap={24} w={300}>
      <Box w="full">
        <Label>Blue Theme</Label>
        <Slider defaultValue={30} min={0} max={100} />
      </Box>
      <Box w="full">
        <Label>Green Theme</Label>
        <Slider defaultValue={50} min={0} max={100} />
      </Box>
      <Box w="full">
        <Label>Orange Theme</Label>
        <Slider defaultValue={70} min={0} max={100} />
      </Box>
      <Box w="full">
        <Label>Red Theme</Label>
        <Slider defaultValue={90} min={0} max={100} />
      </Box>
    </VStack>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <VStack gap={24} w={300}>
      <Box w="full">
        <Label>Custom Track Color</Label>
        <Slider defaultValue={50} min={0} max={100} />
      </Box>

      <Box w="full">
        <Label>Custom Thumb</Label>
        <Slider defaultValue={50} min={0} max={100} />
      </Box>

      <Box w="full">
        <Label>With Shadow</Label>
        <Slider defaultValue={50} min={0} max={100} />
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
    brightness: 80,
    contrast: 60,
    saturation: 70,
  });

  return (
    <Box w={320} border="1px solid" borderColor="gray.200" rounded="lg" overflow="hidden">
      <Box bg="gray.50" p={16} borderBottom="1px solid" borderColor="gray.200">
        <Text fontWeight="bold" fontSize="lg">
          Display Settings
        </Text>
      </Box>

      <VStack gap={0}>
        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Brightness</Text>
            <Text fontSize="xs" color="gray.500">
              Screen brightness level
            </Text>
          </VStack>
          <Text fontWeight="bold" color="primary">
            {settings.brightness}%
          </Text>
        </HStack>
        <Slider
          value={settings.brightness}
          onChange={(e: any) => setSettings({ ...settings, brightness: Number(e.target.value) })}
          min={0}
          max={100}
          p={16}
          pt={0}
        />

        <HStack p={16} justifyContent="space-between" borderBottom="1px solid" borderColor="gray.100">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Contrast</Text>
            <Text fontSize="xs" color="gray.500">
              Image contrast level
            </Text>
          </VStack>
          <Text fontWeight="bold" color="primary">
            {settings.contrast}%
          </Text>
        </HStack>
        <Slider
          value={settings.contrast}
          onChange={(e: any) => setSettings({ ...settings, contrast: Number(e.target.value) })}
          min={0}
          max={100}
          p={16}
          pt={0}
        />

        <HStack p={16} justifyContent="space-between">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Saturation</Text>
            <Text fontSize="xs" color="gray.500">
              Color saturation level
            </Text>
          </VStack>
          <Text fontWeight="bold" color="primary">
            {settings.saturation}%
          </Text>
        </HStack>
        <Slider
          value={settings.saturation}
          onChange={(e: any) => setSettings({ ...settings, saturation: Number(e.target.value) })}
          min={0}
          max={100}
          p={16}
          pt={0}
        />
      </VStack>
    </Box>
  );
};

export const AudioMixer: Story = {
  render: () => <AudioMixerExample />,
};

const AudioMixerExample = () => {
  const [channels] = useState([
    { name: "Vocals", value: 75, color: "pink" },
    { name: "Guitar", value: 60, color: "blue" },
    { name: "Bass", value: 80, color: "green" },
    { name: "Drums", value: 65, color: "orange" },
  ]);

  const [volumes, setVolumes] = useState<Record<string, number>>(
    channels.reduce((acc, ch) => ({ ...acc, [ch.name]: ch.value }), {})
  );

  const updateVolume = (name: string, value: number) => {
    setVolumes((prev) => ({ ...prev, [name]: value }));
  };

  const masterVolume = Math.round(Object.values(volumes).reduce((a, b) => a + b, 0) / channels.length);

  return (
    <Box w={350} p={20} border="1px solid" borderColor="gray.200" rounded="lg" bg="gray.900">
      <VStack gap={20}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="lg" color="white">
            🎚️ Audio Mixer
          </Text>
          <Box px={12} py={4} bg="gray.700" rounded="md">
            <Text fontWeight="bold" color="green.400">
              Master: {masterVolume}%
            </Text>
          </Box>
        </HStack>

        <HStack gap={16} alignItems="flex-end" justifyContent="center">
          {channels.map((channel) => (
            <VStack key={channel.name} gap={8}>
              <Box h={120} w={40} bg="gray.800" rounded="md" position="relative" overflow="hidden">
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  bg={`${channel.color}.500`}
                  h={`${volumes[channel.name]}%`}
                  transition="height 0.2s"
                />
              </Box>
              <Slider
                value={volumes[channel.name]}
                onChange={(e: any) => updateVolume(channel.name, Number(e.target.value))}
                min={0}
                max={100}
                size="sm"
                w={40}
                h={100}
                transform="rotate(-90deg)"
              />
              <Text fontSize="xs" color="gray.400">
                {channel.name}
              </Text>
              <Text fontSize="sm" color="white" fontWeight="bold">
                {volumes[channel.name]}
              </Text>
            </VStack>
          ))}
        </HStack>
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
        <Text fontWeight="medium" mb={8}>
          Light Theme (Default)
        </Text>
        <Slider defaultValue={50} min={0} max={100} />
      </Box>

      <Box p={16} border="1px solid" borderColor="gray.600" rounded="lg" w="full" bg="gray.800">
        <Text fontWeight="medium" mb={8} color="gray.200">
          Dark Theme
        </Text>
        <Slider defaultValue={50} min={0} max={100} />
      </Box>

      <Box p={16} border="1px solid" borderColor="purple.200" rounded="lg" w="full" bg="purple.50">
        <Text fontWeight="medium" mb={8} color="purple.700">
          Brand Theme (Purple)
        </Text>
        <Slider defaultValue={50} min={0} max={100} />
      </Box>
    </VStack>
  ),
};
