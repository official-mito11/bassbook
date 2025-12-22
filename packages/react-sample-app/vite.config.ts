import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@bassbook/core": path.resolve(__dirname, "../core/src/index.ts"),
      "@bassbook/react": path.resolve(__dirname, "../react/src/index.ts"),
    },
  },
  server: {
    port: 5173,
  },
});
