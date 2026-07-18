"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getParishDelegates } from "@/services/delegate";

interface Delegate {
  id: string;
  delegateNumber: string;
  fullName: string;
  gender: string;
  age: number | null;
  phoneNumber: string;
}

export default function DelegatesPage() {
  const router = useRouter();

  const [delegates, setDelegates] = useState<Delegate[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDelegates();
  }, []);

  async function loadDelegates(searchText = "") {
    try {
      setLoading(true);

      const response =
        await getParishDelegates(searchText);

      setDelegates(response.delegates);

    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="mx-auto max-w-7xl p-6">

      <h1 className="mb-6 text-3xl font-bold">
        Registered Delegates
      </h1>

      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          loadDelegates(e.target.value);
        }}
        placeholder="Search by name or delegate number..."
        className="mb-6 w-full rounded-lg border px-4 py-3"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (

        <table className="w-full border">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3 text-left">
                Delegate No
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Gender
              </th>

              <th className="p-3 text-left">
                Phone
              </th>

              <th className="p-3 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {delegates.map((delegate) => (

              <tr
                key={delegate.id}
                className="border-t"
              >

                <td className="p-3">
                  {delegate.delegateNumber}
                </td>

                <td className="p-3">
                  {delegate.fullName}
                </td>

                <td className="p-3">
                  {delegate.gender}
                </td>

                <td className="p-3">
                  {delegate.phoneNumber}
                </td>

                <td className="p-3 text-center">

                  <button
                    onClick={() =>
                      router.push(
                        `/parish/delegates/register/success/${delegate.id}`
                      )
                    }
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}