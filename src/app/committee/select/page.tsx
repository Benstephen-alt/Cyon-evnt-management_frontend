"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { committeeRoutes } from "../../../../utils/CommitteeRoutes";

interface Committee {
  id: string;
  committeeName: string;
  permissions: string[];
}

interface CommitteeUser {
  id: string;
  loginId: string;
  email: string;
  committees: Committee[];
}

export default function CommitteeSelectPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<CommitteeUser | null>(null);

  useEffect(() => {
    const saved =
      localStorage.getItem("committeeUser");

    if (!saved) {
      router.replace("/committee/login");
      return;
    }

    const parsed: CommitteeUser =
      JSON.parse(saved);

    if (parsed.committees.length === 1) {
      localStorage.setItem(
        "activeCommittee",
        JSON.stringify(parsed.committees[0])
      );

     const committee = parsed.committees[0];



const config =
  committeeRoutes[
    committee.committeeName
  ];

if (!config) {
  throw new Error(
    `No route configured for ${committee.committeeName}`
  );
}

if (config.dashboard) {
  router.push(
    `${config.path}/${committee.id}`
  );
} else {
  router.push(config.path);
}
      return;
    }

    setUser(parsed);
  }, []);

  

function navigateToCommittee(
  committee: Committee
) {
  localStorage.setItem(
    "activeCommittee",
    JSON.stringify(committee)
  );

  const config =
  committeeRoutes[
    committee.committeeName
  ];

if (!config) {
  throw new Error(
    `No route configured for ${committee.committeeName}`
  );
}

if (config.dashboard) {
  router.push(
    `${config.path}/${committee.id}`
  );
} else {
  router.push(config.path);
}
}




  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="mx-auto max-w-5xl px-6 py-14">

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold text-[#0B6B3A]">
            Select Committee
          </h1>

          <p className="mt-3 text-gray-600">
            Welcome, {user.loginId}
          </p>

          <p className="text-gray-500">
            Choose the committee you want to work with.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {user.committees.map((committee) => {
  const config =
    committeeRoutes[
      committee.committeeName
    ];

  return (
    <button
      key={committee.id}
      onClick={() =>
        navigateToCommittee(committee)
      }
      className="rounded-2xl border bg-white p-8 text-left shadow transition hover:scale-[1.02] hover:border-[#0B6B3A]"
    >
      <div className="mb-4 text-5xl">
        {config?.icon ?? "👥"}
      </div>

      <h2 className="text-2xl font-bold">
        {committee.committeeName}
      </h2>

      <p className="mt-3 text-gray-500">
        {config?.description ??
          "Open committee"}
      </p>
    </button>
  );
})}

        </div>

      </div>

    </div>
  );
}