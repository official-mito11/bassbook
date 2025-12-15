import type { Preview } from "@storybook/react";

import { configure } from "@bassbook/core";

// Provide minimal theme tokens used by unit components (primary/secondary, etc.)
configure({
  theme: {
    colors: {
      primary: "#2563eb",
      secondary: "#e2e8f0",
      muted: "#f1f5f9",
      fg: "#0f172a",
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
  },
};

export default preview;
