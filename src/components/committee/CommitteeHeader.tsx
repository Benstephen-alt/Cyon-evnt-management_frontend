"use client";

import { useRouter } from "next/navigation";

interface CommitteeHeaderProps {
  title: string;
  subtitle?: string;
}

export default function CommitteeHeader({
  title,
  subtitle,
}: CommitteeHeaderProps) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("committeeToken");
    localStorage.removeItem("committeeUser");
    localStorage.removeItem("activeCommittee");

    router.replace("/committee/login");
  }

  return (
    <div className="mb-8 rounded-2xl bg-white shadow">

      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <button
            onClick={() => router.back()}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            ← Back
          </button>

          <div>

            <h1 className="text-3xl font-bold text-[#0B6B3A]">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-1 text-gray-500">
                {subtitle}
              </p>
            )}

          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="text-right">

            <p className="font-semibold">
              Committee Portal
            </p>

            <p className="text-sm text-gray-500">
              Event Operations
            </p>

          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}