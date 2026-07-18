"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "https://cyon-evnt-management.onrender.com/api/auth/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.admin.role);
        localStorage.setItem("admin", JSON.stringify(data.admin));

        router.push("/admin/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Unable to connect to server.");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 px-4">

      <div className="w-full max-w-md rounded-3xl border border-[#D4A017]/20 bg-white shadow-2xl p-8">

        {/* Logo */}

        <div className="flex flex-col items-center">

          <Image
            src="/images/cyon-logo.png"
            alt="CYON Logo"
            width={110}
            height={110}
            priority
          />

          <div className="mt-5 rounded-full bg-green-100 p-4">

            <ShieldCheck className="h-8 w-8 text-[#0B6B3A]" />

          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#0B6B3A]">
            Administrator Portal
          </h1>

          <p className="mt-2 text-center text-gray-500">
            Sign in to manage registrations,
            finance and system settings.
          </p>

        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                type="email"
                placeholder="admin@cyonnsukka.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#0B6B3A] focus:ring-4 focus:ring-green-100"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-[#0B6B3A] focus:ring-4 focus:ring-green-100"
              />

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#0B6B3A] py-3 font-semibold text-white shadow-lg transition hover:bg-green-800 hover:shadow-xl disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}

        <div className="mt-8 text-center">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#0B6B3A] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portal
          </Link>

          <p className="mt-6 text-xs text-gray-500">
            Secure Event Management Portal
          </p>

          <p className="mt-1 text-xs text-gray-400">
            2026 Youth Weekend with Bishop
          </p>

        </div>

      </div>

    </div>
  );
}