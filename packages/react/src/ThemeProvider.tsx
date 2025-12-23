import * as React from "react";
import { createContext } from "@bassbook/core";
import type { ThemeTokens } from "@bassbook/core";
import { BassbookStyleContext } from "./styleContext";

export interface ThemeProviderProps {
  theme?: Partial<ThemeTokens>;
  prefix?: string;
  children?: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { theme, prefix, children } = props;

  const ctx = React.useMemo(() => {
    return createContext({ theme, prefix });
  }, [theme, prefix]);

  return React.createElement(BassbookStyleContext.Provider, { value: ctx }, children);
}
