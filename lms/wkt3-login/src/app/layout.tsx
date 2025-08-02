// layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Link from "next/link";
import AntiInspect from "@/components/DisabledInspect";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WKT3 Platform",
  description: "World-class secure login and trading app",
};

// This layout wraps all pages and handles theming, global styles, and header/footer
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground transition-colors`}
      >
        <AntiInspect />
        {/* ThemeProvider handles light/dark theme using system preference or toggle */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Branded motivational header */}
          <Header />

          {/* Dynamic content rendered here from parallel routes like /login, /dashboard, etc */}
          <main className="min-h-screen px-4 py-6">{children}</main>

          {/* Footer with T&C */}
          <footer className="text-center text-sm mt-10 text-muted-foreground">
            By using this app, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary">
              Terms & Conditions
            </Link>
            .
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
