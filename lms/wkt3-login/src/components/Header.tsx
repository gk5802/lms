// Header.tsx

"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

// Simple header showing app name and motivational quote
export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card rounded-b-xl shadow-md">
      {/* Left: Logo and Quote */}
      <Link href="/" className="text-xl font-bold text-primary">
        WKT3 Platform
      </Link>

      {/* Center: 3-word motivational quote */}
      <div className="text-sm font-semibold italic text-muted-foreground">
        Connect. Secure. Win.
      </div>

      {/* Right: Theme Toggle Button */}
      <ThemeToggle/>
    </header>
  );
}
