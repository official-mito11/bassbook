import type { StorybookConfig } from "@storybook/react-vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/stories/auto/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  viteFinal: async (viteConfig: any) => {
    const plugins = viteConfig.plugins ?? [];
    viteConfig.plugins = [...plugins, tsconfigPaths()];
    return viteConfig;
  },
};

export default config;
