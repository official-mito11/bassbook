import * as React from "react";

import {
  // Cores
  Box,
  HStack,
  VStack,
  Text,
  Label,
  Link,
  Divider,
  // Units
  Avatar,
  Badge,
  Button,
  Checkbox,
  Icon,
  Input,
  InputArea,
  Placeholder,
  Progressbar,
  Radio,
  Select,
  Skeleton,
  Slider,
  Switch,
  // Parts
  Alert,
  ContextMenu,
  Dialog,
  Dropdown,
  Form,
  Modal,
  Navigator,
  Sheet,
  View,
} from "@bassbook/react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box mb={32}>
      <Text fontWeight="bold" fontSize="1.25rem" mb={12} display="block">
        {title}
      </Text>
      <Box p={16} bg="#f9fafb" r={8}>
        {children}
      </Box>
    </Box>
  );
}

export function App() {
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("option1");
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState<string>("opt2");
  const [sliderValue, setSliderValue] = React.useState<number>(50);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dropdown1Open, setDropdown1Open] = React.useState(false);
  const [dropdown2Open, setDropdown2Open] = React.useState(false);
  const [dropdown3Open, setDropdown3Open] = React.useState(false);
  const [contextMenu1Open, setContextMenu1Open] = React.useState(false);
  const [contextMenu2Open, setContextMenu2Open] = React.useState(false);

  return (
    <Box p={24} fontFamily="ui-sans-serif, system-ui">
      {/* Header */}
      <Navigator variant="default" mb={24}>
        <Text __slots={{ brand: true }} fontWeight="bold" fontSize="1.25rem">
          🎸 Bassbook
        </Text>
        <HStack gap={16}>
          <Link href="#">Home</Link>
          <Link href="#">Components</Link>
          <Link href="#">Docs</Link>
        </HStack>
        <Button size="sm" variant="default">
          Get Started
        </Button>
      </Navigator>

      <Text fontSize="2rem" fontWeight="bold" mb={8} display="block">
        Component Showcase
      </Text>
      <Text color="#6b7280" mb={24} display="block">
        All built-in components from @bassbook/core
      </Text>

      {/* ===== CORES ===== */}
      <Text fontSize="1.5rem" fontWeight="bold" mb={16} display="block" color="#3b82f6">
        Cores
      </Text>

      <Section title="Box">
        <Text mb={8} display="block">
          Using rounded token (rounded="md"):
        </Text>
        <HStack gap={8} mb={16}>
          <Box p={16} bg="#e0f2fe" rounded="md">
            Box 1
          </Box>
          <Box p={16} bg="#fce7f3" rounded="md">
            Box 2
          </Box>
          <Box p={16} bg="#dcfce7" rounded="md">
            Box 3
          </Box>
        </HStack>
        <Text mb={8} display="block">
          Using r alias with number (r={"{8}"}→8px):
        </Text>
        <HStack gap={8}>
          <Box p={16} bg="#e0f2fe" r={4}>
            r=4
          </Box>
          <Box p={16} bg="#fce7f3" r={8}>
            r=8
          </Box>
          <Box p={16} bg="#dcfce7" r={12}>
            r=12
          </Box>
          <Box p={16} bg="#dbeafe" r={16}>
            r=16
          </Box>
          <Box p={16} bg="#f3e8ff" r="full">
            r="full"
          </Box>
        </HStack>
      </Section>

      <Section title="HStack & VStack">
        <Text mb={8} display="block">
          HStack (horizontal):
        </Text>
        <HStack gap={8} mb={16}>
          <Box p={8} bg="#dbeafe" rounded="sm">
            Item 1
          </Box>
          <Box p={8} bg="#dbeafe" rounded="sm">
            Item 2
          </Box>
          <Box p={8} bg="#dbeafe" rounded="sm">
            Item 3
          </Box>
        </HStack>
        <Text mb={8} display="block">
          VStack (vertical):
        </Text>
        <VStack gap={8}>
          <Box p={8} bg="#fef3c7" rounded="sm" w="fit-content">
            Item A
          </Box>
          <Box p={8} bg="#fef3c7" rounded="sm" w="fit-content">
            Item B
          </Box>
          <Box p={8} bg="#fef3c7" rounded="sm" w="fit-content">
            Item C
          </Box>
        </VStack>
      </Section>

      <Section title="Text">
        <VStack gap={4} alignItems="flex-start">
          <Text fontSize="0.75rem">Extra Small Text (0.75rem)</Text>
          <Text fontSize="0.875rem">Small Text (0.875rem)</Text>
          <Text fontSize="1rem">Normal Text (1rem)</Text>
          <Text fontSize="1.25rem">Large Text (1.25rem)</Text>
          <Text fontSize="1.5rem" fontWeight="bold">
            Bold Large Text
          </Text>
          <Text color="#3b82f6">Colored Text (primary)</Text>
          <Text color="#ef4444">Colored Text (danger)</Text>
        </VStack>
      </Section>

      <Section title="Label & Link">
        <HStack gap={16}>
          <Label>This is a label</Label>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            External Link →
          </Link>
        </HStack>
      </Section>

      <Section title="Divider">
        <Box>
          <Text>Content above divider</Text>
          <Divider my={16} />
          <Text>Content below divider</Text>
        </Box>
      </Section>

      {/* ===== UNITS ===== */}
      <Text fontSize="1.5rem" fontWeight="bold" mb={16} mt={32} display="block" color="#10b981">
        Units
      </Text>

      <Section title="Button">
        <VStack gap={12} alignItems="flex-start">
          <Text mb={4}>Variants:</Text>
          <HStack gap={8}>
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </HStack>
          <Text mb={4} mt={8}>
            Sizes:
          </Text>
          <HStack gap={8} alignItems="center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </HStack>
        </VStack>
      </Section>

      <Section title="Input & InputArea">
        <VStack gap={12}>
          <Input placeholder="Text input..." />
          <InputArea placeholder="Textarea input..." />
        </VStack>
      </Section>

      <Section title="Checkbox">
        <VStack gap={8} alignItems="flex-start">
          <Checkbox checked={checkboxChecked} onCheckedChange={setCheckboxChecked}>
            Check me ({checkboxChecked ? "checked" : "unchecked"})
          </Checkbox>
          <Checkbox checked={true}>Checked</Checkbox>
          <Checkbox checked={false}>Unchecked</Checkbox>
          <Checkbox checked={true} size="lg">
            Large checked
          </Checkbox>
          <Checkbox disabled={true}>Disabled checkbox</Checkbox>
        </VStack>
      </Section>

      <Section title="Radio">
        <VStack gap={8} alignItems="flex-start">
          <Radio checked={radioValue === "option1"} onCheckedChange={(checked: boolean) => checked && setRadioValue("option1")}>
            Option 1
          </Radio>
          <Radio checked={radioValue === "option2"} onCheckedChange={(checked: boolean) => checked && setRadioValue("option2")}>
            Option 2
          </Radio>
          <Radio checked={radioValue === "option3"} onCheckedChange={(checked: boolean) => checked && setRadioValue("option3")}>
            Option 3
          </Radio>
          <Radio disabled={true}>Disabled option</Radio>
        </VStack>
      </Section>

      <Section title="Switch">
        <VStack gap={8} alignItems="flex-start">
          <Switch checked={switchChecked} onCheckedChange={setSwitchChecked}>
            Toggle me ({switchChecked ? "ON" : "OFF"})
          </Switch>
          <Switch checked={true} size="sm">
            Small ON
          </Switch>
          <Switch checked={false} size="md">
            Medium OFF
          </Switch>
          <Switch checked={true} size="lg">
            Large ON
          </Switch>
          <Switch disabled={true}>Disabled switch</Switch>
        </VStack>
      </Section>

      <Section title="Select">
        <Select value={selectValue} onValueChange={setSelectValue} placeholder="Select an option...">
          <Select.Header centered>Fruits</Select.Header>
          <Select.Option value="opt1" disabled>
            Option 1
          </Select.Option>
          <Select.Option value="opt2">Option 2</Select.Option>
          <Select.Option value="opt3">Option 3</Select.Option>
        </Select>
      </Section>

      <Section title="Slider">
        <VStack gap={12}>
          <HStack gap={8} alignItems="center" w="100%">
            <Slider value={sliderValue} onValueChange={setSliderValue} size="sm" />
            <Text w={40}>{Math.round(sliderValue)}%</Text>
          </HStack>
          <Slider defaultValue={30} size="md" />
          <Slider defaultValue={70} size="lg" />
        </VStack>
      </Section>

      <Section title="Avatar">
        <Text mb={8} display="block">
          With fallback (no image):
        </Text>
        <HStack gap={12} alignItems="center" mb={16}>
          <Avatar size="xs" hasImage={false}>
            <Text __slots={{ fallback: true }}>XS</Text>
          </Avatar>
          <Avatar size="sm" hasImage={false}>
            <Text __slots={{ fallback: true }}>SM</Text>
          </Avatar>
          <Avatar size="md" hasImage={false}>
            <Text __slots={{ fallback: true }}>MD</Text>
          </Avatar>
          <Avatar size="lg" hasImage={false}>
            <Text __slots={{ fallback: true }}>LG</Text>
          </Avatar>
          <Avatar size="xl" hasImage={false}>
            <Text __slots={{ fallback: true }}>XL</Text>
          </Avatar>
        </HStack>
        <Text mb={8} display="block">
          With image:
        </Text>
        <HStack gap={12} alignItems="center">
          <Avatar size="sm" hasImage={true} src="https://i.pravatar.cc/100?img=1" />
          <Avatar size="md" hasImage={true} src="https://i.pravatar.cc/100?img=2" />
          <Avatar size="lg" hasImage={true} src="https://i.pravatar.cc/100?img=3" />
        </HStack>
      </Section>

      <Section title="Badge">
        <HStack gap={8} flexWrap="wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </HStack>
        <HStack gap={8} mt={12}>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </HStack>
      </Section>

      <Section title="Icon">
        <HStack gap={12} alignItems="center">
          <Icon size="xs">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </Icon>
          <Icon size="sm">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </Icon>
          <Icon size="md">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </Icon>
          <Icon size="lg">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </Icon>
          <Icon size="xl">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </Icon>
        </HStack>
      </Section>

      <Section title="Progressbar">
        <VStack gap={12}>
          <Progressbar size="sm" style={{ "--progress-width": "25%" } as React.CSSProperties} />
          <Progressbar size="md" style={{ "--progress-width": "50%" } as React.CSSProperties} />
          <Progressbar size="lg" style={{ "--progress-width": "75%" } as React.CSSProperties} />
        </VStack>
      </Section>

      <Section title="Skeleton">
        <VStack gap={12}>
          <Skeleton variant="text" w="60%" />
          <Skeleton variant="text" w="80%" />
          <Skeleton variant="text" w="40%" />
          <HStack gap={12} mt={8}>
            <Skeleton variant="circular" w={48} h={48} />
            <VStack gap={8} flex="1">
              <Skeleton variant="rectangular" h={20} />
              <Skeleton variant="rectangular" h={20} w="70%" />
            </VStack>
          </HStack>
        </VStack>
      </Section>

      <Section title="Placeholder">
        <HStack gap={12}>
          <Placeholder variant="loading" h={120} flex="1">
            Loading...
          </Placeholder>
          <Placeholder variant="empty" h={120} flex="1">
            No data
          </Placeholder>
          <Placeholder variant="error" h={120} flex="1">
            Failed to load
          </Placeholder>
        </HStack>
      </Section>

      {/* ===== PARTS ===== */}
      <Text fontSize="1.5rem" fontWeight="bold" mb={16} mt={32} display="block" color="#8b5cf6">
        Parts
      </Text>

      <Section title="Alert">
        <VStack gap={12}>
          <Alert variant="info">
            <Text __slots={{ title: true }}>Information</Text>
            This is an informational alert message.
          </Alert>
          <Alert variant="success">
            <Text __slots={{ title: true }}>Success</Text>
            Operation completed successfully!
          </Alert>
          <Alert variant="warning">
            <Text __slots={{ title: true }}>Warning</Text>
            Please review before proceeding.
          </Alert>
          <Alert variant="error">
            <Text __slots={{ title: true }}>Error</Text>
            Something went wrong. Please try again.
          </Alert>
        </VStack>
      </Section>

      <Section title="View">
        <HStack gap={12}>
          <View padding="sm" bg="#f0fdf4" rounded="md" w={120} h={80}>
            <Text fontSize="0.75rem">padding: sm</Text>
          </View>
          <View padding="md" bg="#fef3c7" rounded="md" w={120} h={80}>
            <Text fontSize="0.75rem">padding: md</Text>
          </View>
          <View padding="lg" bg="#fce7f3" rounded="md" w={120} h={80}>
            <Text fontSize="0.75rem">padding: lg</Text>
          </View>
          <View padding="md" centered={true} bg="#e0e7ff" rounded="md" w={120} h={80}>
            <Text fontSize="0.75rem">centered</Text>
          </View>
        </HStack>
      </Section>

      <Section title="Form">
        <Form layout="vertical">
          <VStack gap={4}>
            <Label>Username</Label>
            <Input placeholder="Enter username" />
          </VStack>
          <VStack gap={4}>
            <Label>Email</Label>
            <Input placeholder="Enter email" type="email" />
          </VStack>
          <VStack gap={4}>
            <Label>Message</Label>
            <InputArea placeholder="Enter message" />
          </VStack>
          <Button variant="default">Submit</Button>
        </Form>
      </Section>

      <Section title="Modal & Dialog">
        <HStack gap={12}>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            Open Dialog
          </Button>
        </HStack>

        {/* NEW API: Using compound components - no more __slots! */}
        <Modal open={modalOpen}>
          <Modal.Backdrop onPointerDown={() => setModalOpen(false)} />
          <Dialog open={true}>
            <Dialog.Title>Modal Title</Dialog.Title>
            <Dialog.CloseIcon onClick={() => setModalOpen(false)} cursor="pointer">
              ✕
            </Dialog.CloseIcon>
            <Dialog.Body>
              <Text>This is the modal content. You can put anything here.</Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="default" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
            </Dialog.Footer>
          </Dialog>
        </Modal>

        {dialogOpen && (
          <Box
            position="fixed"
            inset={0}
            bg="rgba(0,0,0,0.5)"
            display="flex"
            alignCenter={true}
            justifyCenter={true}
            zIndex={50}
            onPointerDown={() => setDialogOpen(false)}
          >
            <Dialog open={true} onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.CloseIcon onClick={() => setDialogOpen(false)} cursor="pointer">
                ✕
              </Dialog.CloseIcon>
              <Dialog.Body>
                <Text>This is a standalone dialog without Modal wrapper.</Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Close
                </Button>
              </Dialog.Footer>
            </Dialog>
          </Box>
        )}
      </Section>

      <Section title="Sheet">
        <Button onClick={() => setSheetOpen(true)}>Open Sheet (Right)</Button>
        <Sheet open={sheetOpen} side="right">
          <Sheet.Backdrop onPointerDown={() => setSheetOpen(false)} />
          <Box p={24} onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}>
            <Text fontWeight="bold" fontSize="1.25rem" mb={16} display="block">
              Sheet Panel
            </Text>
            <Text mb={16} display="block">
              This is a slide-out sheet panel.
            </Text>
            <Button onClick={() => setSheetOpen(false)}>Close Sheet</Button>
          </Box>
        </Sheet>
      </Section>

      <Section title="Dropdown">
        <VStack gap={16} alignStart={true}>
          <Text display="block" mb={8}>
            Basic Dropdown (bottom):
          </Text>
          <Dropdown open={dropdown1Open} onOpenChange={setDropdown1Open} placement="bottom">
            <Dropdown.Trigger>
              <Button variant="outline">Open Menu</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <VStack gap={4} alignStart={true}>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown1Open(false)}
                >
                  Profile
                </Box>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown1Open(false)}
                >
                  Settings
                </Box>
                <Divider my={4} />
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  color="destructive"
                  onClick={() => setDropdown1Open(false)}
                >
                  Logout
                </Box>
              </VStack>
            </Dropdown.Content>
          </Dropdown>

          <Text display="block" mb={8} mt={16}>
            Dropdown with Icons:
          </Text>
          <Dropdown open={dropdown2Open} onOpenChange={setDropdown2Open} placement="bottom-end">
            <Dropdown.Trigger>
              <Button>Actions ▼</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <VStack gap={4} alignStart={true}>
                <HStack
                  gap={8}
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown2Open(false)}
                >
                  <Text>📝</Text>
                  <Text>Edit</Text>
                </HStack>
                <HStack
                  gap={8}
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown2Open(false)}
                >
                  <Text>📋</Text>
                  <Text>Copy</Text>
                </HStack>
                <HStack
                  gap={8}
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown2Open(false)}
                >
                  <Text>🗑️</Text>
                  <Text>Delete</Text>
                </HStack>
              </VStack>
            </Dropdown.Content>
          </Dropdown>

          <Text display="block" mb={8} mt={16}>
            Nested Dropdown:
          </Text>
          <Dropdown open={dropdown3Open} onOpenChange={setDropdown3Open}>
            <Dropdown.Trigger>
              <Button variant="secondary">More Options</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <VStack gap={4} alignStart={true}>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown3Open(false)}
                >
                  New File
                </Box>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown3Open(false)}
                >
                  New Folder
                </Box>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown3Open(false)}
                >
                  Import →
                </Box>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setDropdown3Open(false)}
                >
                  Export →
                </Box>
              </VStack>
            </Dropdown.Content>
          </Dropdown>
        </VStack>
      </Section>

      <Section title="ContextMenu">
        <Text display="block" mb={12}>
          Click on the boxes below to see context menus:
        </Text>
        <HStack gap={16}>
          <ContextMenu open={contextMenu1Open}>
            <ContextMenu.Trigger>
              <Box
                p={24}
                bg="primary"
                color="primary-foreground"
                rounded="lg"
                cursor="pointer"
                textAlign="center"
                onClick={() => setContextMenu1Open(!contextMenu1Open)}
              >
                Click me
              </Box>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <VStack gap={4} alignStart={true}>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setContextMenu1Open(false)}
                >
                  Cut
                </Box>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setContextMenu1Open(false)}
                >
                  Copy
                </Box>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setContextMenu1Open(false)}
                >
                  Paste
                </Box>
                <Divider my={4} />
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setContextMenu1Open(false)}
                >
                  Delete
                </Box>
              </VStack>
            </ContextMenu.Content>
          </ContextMenu>

          <ContextMenu open={contextMenu2Open}>
            <ContextMenu.Trigger>
              <Box
                p={24}
                bg="success-bg"
                color="success-text"
                rounded="lg"
                cursor="pointer"
                textAlign="center"
                borderWidth={1}
                borderStyle="solid"
                borderColor="success-border"
                onClick={() => setContextMenu2Open(!contextMenu2Open)}
              >
                Context Menu 2
              </Box>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <VStack gap={4} alignStart={true}>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setContextMenu2Open(false)}
                >
                  Open
                </Box>
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setContextMenu2Open(false)}
                >
                  Open in New Tab
                </Box>
                <Divider my={4} />
                <Box
                  p={8}
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: "muted" }}
                  w="100%"
                  onClick={() => setContextMenu2Open(false)}
                >
                  Inspect
                </Box>
              </VStack>
            </ContextMenu.Content>
          </ContextMenu>
        </HStack>
      </Section>

      <Section title="Typography (Font Tokens)">
        <VStack gap={16} alignStart={true}>
          <Text fontFamily="display" fontSize="3xl" fontWeight="bold" lineHeight="tight">
            Display Font - Extra Large
          </Text>
          <Text fontFamily="body" fontSize="2xl" fontWeight="semibold" lineHeight="snug">
            Body Font - 2XL Semibold
          </Text>
          <Text fontFamily="sans" fontSize="xl" fontWeight="medium" lineHeight="normal">
            Sans Font - XL Medium
          </Text>
          <Text fontFamily="sans" fontSize="lg" fontWeight="normal" lineHeight="relaxed">
            Regular text with relaxed line height for better readability in paragraphs.
          </Text>
          <Text fontFamily="mono" fontSize="sm" fontWeight="normal" lineHeight="normal" bg="muted" p={8} rounded="md">
            Monospace font for code: const hello = "world";
          </Text>
          <HStack gap={8}>
            <Text fontSize="xs" fontWeight="light">
              XS Light
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              SM Normal
            </Text>
            <Text fontSize="base" fontWeight="medium">
              Base Medium
            </Text>
            <Text fontSize="lg" fontWeight="semibold">
              LG Semibold
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              XL Bold
            </Text>
          </HStack>
        </VStack>
      </Section>

      {/* Footer */}
      <Divider my={32} />
      <Box textAlign="center" color="#9ca3af">
        <Text>Built with Bassbook Component System</Text>
      </Box>
    </Box>
  );
}
