"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkApprovalStatus } from "@/services/parish";

export default function PendingApprovalPage() {
  const router = useRouter();

  const parish =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("parish") || "{}")
      : null;

  const [loading, setLoading] = useState(false);

  async function checkStatus() {
    if (!parish?.id) {
      alert("Parish information not found.");
      router.push("/parish/login");
      return;
    }

    try {
      setLoading(true);

      const response = await checkApprovalStatus(parish.id);

      if (response.success && response.approved) {
        localStorage.setItem("token", response.token);

        localStorage.setItem(
          "account",
          JSON.stringify(response.account)
        );

        router.push("/parish/dashboard");
        return;
      }

      alert(
        response.message ||
          "Your registration is still awaiting admin approval."
      );
    } catch (error) {
      console.error(error);
      alert("Unable to check approval status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-xl text-center">
        <div className="mb-6 text-7xl">⏳</div>

        <h1 className="text-3xl font-bold text-[#0B6B3A]">
          Registration Submitted
        </h1>

        <p className="mt-4 text-gray-600">
          Your parish registration has been submitted successfully.
        </p>

        <p className="mt-2 text-gray-600">
          Call 07016079910 if your payment isn't approved in 20mins.
        </p>

        <div className="mt-8 rounded-xl bg-yellow-100 p-4 text-lg font-semibold text-yellow-800">
          Status: Pending Approval
        </div>

        <button
          onClick={checkStatus}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-[#0B6B3A] py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
        >
          {loading
            ? "Checking..."
            : "Check Approval Status"}
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("account");
            localStorage.removeItem("parish");
            router.push("/parish/login");
          }}
          className="mt-4 w-full rounded-xl border border-red-500 py-3 font-semibold text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
}