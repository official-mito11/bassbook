import * as React from "react";
import { configure } from "@bassbook/core";
import type { ThemeTokens } from "@bassbook/core";

export interface ThemeProviderProps {
  theme?: Partial<ThemeTokens>;
  prefix?: string;
  children?: React.ReactNode;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { theme, prefix, children } = props;

  React.useEffect(() => {
    if (!theme && !prefix) return;
    configure({ theme, prefix });
  }, [theme, prefix]);

  return React.createElement(React.Fragment, null, children);
}
