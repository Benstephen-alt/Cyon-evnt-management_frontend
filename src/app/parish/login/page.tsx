"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parishLogin } from "@/services/parish";
import { ArrowLeft, Link } from "lucide-react";

export default function ParishLoginPage() {
  const router = useRouter();

  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  if (!accessCode.trim()) {
    alert("Access Code is required.");
    return;
  }

  try {
    setLoading(true);

    // Clear any previous session
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("admin");
    localStorage.removeItem("parish");
    localStorage.removeItem("account");

    const response = await parishLogin(accessCode);

    console.log("LOGIN RESPONSE:", response);

    if (!response.success) {
      alert(response.message);
      return;
    }

    // Store parish session
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", "PARISH");

    localStorage.setItem(
      "parish",
      JSON.stringify(response.parish)
    );

    localStorage.setItem(
      "account",
      JSON.stringify(response.account)
    );

    // Navigate according to registration status
    if (response.requiresRegistration) {
      router.push("/parish/register");
      return;
    }

    if (response.awaitingApproval) {
      router.push("/parish/pending");
      return;
    }

    router.push("/parish/dashboard");

  } catch (error) {
    console.error(error);
    alert("Unable to login.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
      >

        <div className="mb-8 text-center">

          <img
            src="/images/cyon-logo.png"
            alt="CYON"
            className="mx-auto h-20 w-20"
          />

          <h1 className="mt-4 text-3xl font-bold text-[#0B6B3A]">
            Parish Login
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your parish access code.
          </p>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Access Code
          </label>

          <input
            type="text"
            value={accessCode}
            onChange={(e) =>
              setAccessCode(e.target.value)
            }
            placeholder="Enter Access Code"
            className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#0B6B3A] py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Login"}
        </button>


      </form>

       

    </div>
  );
}