"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

export interface Committee {
  id: string;
  committeeName: string;
  permissions: string[];
}

interface CommitteeContextType {
  committee: Committee | null;
  setCommittee: (
    committee: Committee | null
  ) => void;
}

const CommitteeContext =
  createContext<CommitteeContextType | null>(
    null
  );

export function CommitteeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [committee, setCommittee] =
    useState<Committee | null>(null);

  useEffect(() => {
    const saved =
      localStorage.getItem("activeCommittee");

    if (!saved) {
      router.replace("/committee/select");
      return;
    }

    setCommittee(JSON.parse(saved));
  }, []);

  return (
    <CommitteeContext.Provider
      value={{
        committee,
        setCommittee,
      }}
    >
      {children}
    </CommitteeContext.Provider>
  );
}

export function useCommittee() {
  const context =
    useContext(CommitteeContext);

  if (!context) {
    throw new Error(
      "useCommittee must be used inside CommitteeProvider."
    );
  }

  return context;
}