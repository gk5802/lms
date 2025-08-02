// /app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleVisibility = () => setPasswordVisible((prev) => !prev);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      // Call login endpoint (we'll implement this in Step 4 with Go backend)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
      <div className="max-w-md mx-auto mt-10 bg-card rounded-xl shadow-lg p-6 space-y-6 ">
          <div className="w-full h-full justify-center items-center flex ">
              
        <Image src="/bowler.jpg" alt="logo" height={100} width={100}/>
          </div>
      <h2 className="text-xl font-bold text-center text-primary">
        Welcome Back
          </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label className="mb-2" htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-2 top-2 text-muted-foreground"
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="underline text-primary hover:text-primary/80"
        >
          Register
        </Link>
      </p>

      <p className="text-xs text-center text-muted-foreground">
        By logging in, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-primary">
          Terms & Conditions
        </Link>
        .
      </p>

      <div className="text-center mt-2">
        <Link
          href="/forgot-password"
          className="text-xs text-blue-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
