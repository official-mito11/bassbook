import * as React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { ThemeProvider } from "@bassbook/react";
import { App } from "./App";

const el = document.getElementById("root");
if (!el) throw new Error("Missing #root");

createRoot(el).render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        colors: {
          primary: "#3b82f6",
          ring: "#3b82f6",
        },
      }}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
