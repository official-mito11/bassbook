import type { Preview } from "@storybook/react";

import { configure, defaultTheme } from "@bassbook/core";

configure({ theme: defaultTheme });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
  },
};

export default preview;
