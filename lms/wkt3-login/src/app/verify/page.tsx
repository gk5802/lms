"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    if (!email || !token) {
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      const res = await fetch(
        `http://localhost:8080/api/verify?email=${email}&token=${token}`
      );
      const data = await res.json();

      if (res.ok) setMessage(data.message);
      else setMessage(data.message || "Verification failed.");
    };

    verify();
  }, [email, token]);

  return (
    <div className="max-w-md mx-auto mt-24 text-center">
      <h1 className="text-xl font-semibold text-primary">{message}</h1>
    </div>
  );
}
