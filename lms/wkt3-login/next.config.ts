import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {},
  },
  // Enable middleware
  matcher: ["/((?!.*\\.).*)"],
};

export default nextConfig;
