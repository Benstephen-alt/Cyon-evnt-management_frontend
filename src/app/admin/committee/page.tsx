"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminLayout from "../dashboard/AdminLayout";
import { getCommittees } from "@/services/committee";

interface Committee {
  id: string;
  committeeName: string;
  description: string | null;
  permissions: string[];
  totalMembers: number;
}

export default function CommitteesPage() {
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommittees();
  }, []);

  async function loadCommittees() {
    try {
      const response = await getCommittees();

      setCommittees(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load committees.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Committee Management
            </h1>

            <p className="mt-2 text-gray-500">
              Total Committees: {committees.length}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white shadow">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Committee
                </th>

                <th className="p-4 text-center">
                  Members
                </th>

                <th className="p-4 text-center">
                  Permissions
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : committees.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="p-10 text-center"
                  >
                    No committees found.
                  </td>

                </tr>

              ) : (

                committees.map((committee) => (

                  <tr
                    key={committee.id}
                    className="border-t"
                  >
                    <td className="p-4 font-medium">
                      {committee.committeeName}
                    </td>

                    <td className="p-4 text-center">
                      {committee.totalMembers}
                    </td>

                    <td className="p-4 text-center">
                      {committee.permissions.length}
                    </td>

                    <td className="p-4 text-center">

                      {committee.totalMembers > 0 ? (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          Active
                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                          No Members
                        </span>

                      )}

                    </td>

                    <td className="p-4 text-center">

                      <Link
                        href={`/admin/committee/${committee.id}`}
                        className="rounded-lg bg-[#0B6B3A] px-4 py-2 text-white hover:bg-green-700"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </AdminLayout>
  );
}