// theme-provider.tsx

"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type Attribute,
} from "next-themes";

interface Props {
  children: React.ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
}

// Wrap children with next-themes provider
export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
