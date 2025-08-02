"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { debounce } from "@/lib/debounce";
import Image from "next/image";

// Function to check password strength level (returns 0 to 100)
function calculateStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  return strength;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    agreed: false,
  });
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);

  // Debounced password strength checker
  const checkStrength = debounce((value: string) => {
    setStrength(calculateStrength(value));
  }, 300);

  useEffect(() => {
    checkStrength(form.password);
  }, [form.password, checkStrength]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirm, agreed } = form;
    if (!name || !email || !password || !confirm) {
      return setError("All fields are required.");
    }
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }
    if (!agreed) {
      return setError("You must accept the terms.");
    }

    // TODO: Call backend registration API
    console.log("Registering user...", form);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-card rounded-xl shadow-lg p-6 space-y-6">
      <div className="w-full h-full justify-center items-center flex ">
        <Image src="/bowler.jpg" alt="logo" height={100} width={100} />
      </div>
      <h2 className="text-xl font-bold text-center text-primary">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2" htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-2 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Password strength bar */}
        <div className="h-2 w-full bg-muted rounded-full">
          <div
            className="h-full transition-all rounded-full"
            style={{
              width: `${strength}%`,
              backgroundColor:
                strength < 50
                  ? "#DC2626"
                  : strength < 75
                  ? "#F59E0B"
                  : "#22C55E",
            }}
          />
        </div>

        <div>
          <Label className="mb-2" htmlFor="confirm">Confirm Password</Label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="••••••••"
            value={form.confirm}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms and Conditions checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="agreed"
            name="agreed"
            type="checkbox"
            checked={form.agreed}
            onChange={handleChange}
            className="border rounded-sm"
            required
          />
          <label htmlFor="agreed" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="underline text-primary">
              Terms & Conditions
            </Link>
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline text-primary hover:text-primary/80"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
