import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public pages allowed without login
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/verify",
  "/forgot-password",
  "/_next", // static files
  "/api", // API routes
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for token in cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
