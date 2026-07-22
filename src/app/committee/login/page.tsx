"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { committeeLogin } from "@/services/committee";

export default function CommitteeLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await committeeLogin({
        email,
        password,
      });

      localStorage.setItem(
        "committeeToken",
        response.token
      );

      localStorage.setItem(
        "committeeUser",
        JSON.stringify(response.committee)
      );

      const committees =
        response.committee.committees;

      if (!committees || committees.length === 0) {
        setError(
          "No committee assignment found for this account."
        );
        return;
      }

      if (committees.length === 1) {
        localStorage.setItem(
          "activeCommittee",
          JSON.stringify(committees[0])
        );

        const committee = committees[0];

const slug = committee.committeeName
  .toLowerCase()
  .replace(/\s+/g, "-");

localStorage.setItem(
  "activeCommittee",
  JSON.stringify(committee)
);

router.push(`/committee/${slug}`);
        return;
      }

      router.push("/committee/select");

    } catch (err: any) {

      setError(
        err?.response?.data?.message ??
          "unstable network."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">

          <img
            src="/images/cyon-logo.png"
            alt="CYON"
            className="mx-auto mb-4 h-20 w-20"
          />

          <h1 className="text-3xl font-bold">
            Committee Portal
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">

              Email Address

            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
              placeholder="Enter email"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
              placeholder="Enter password"
            />

          </div>

          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#0B6B3A] py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "LOGIN"}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-gray-500">

          Return to{" "}

          <Link
            href="/"
            className="font-semibold text-[#0B6B3A]"
          >
            Home
          </Link>

        </div>

      </div>

    </div>
  );
}