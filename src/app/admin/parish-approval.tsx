"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./dashboard/AdminLayout";
import {
  getPendingParishes,
  approveParish,
} from "@/services/parishApproval";

export default function ParishApprovalPage() {
  const [parishes, setParishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParishes();
  }, []);

  async function loadParishes() {
    try {
      const response = await getPendingParishes();

      if (response.success) {
        setParishes(response.parishes);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    if (!confirm("Approve this parish?")) return;

    const response = await approveParish(id);

    if (response.success) {
      loadParishes();
    } else {
      alert(response.message);
    }
  }

  return (
    <AdminLayout>
      <div className="p-8">

        <h1 className="text-3xl font-bold text-[#0B6B3A]">
          Parish Approvals
        </h1>

        <div className="mt-8 rounded-xl bg-white shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">Parish</th>

                <th className="p-4 text-left">Deanery</th>

                <th className="p-4 text-left">President</th>

                <th className="p-4 text-left">Receipt</th>

                <th className="p-4 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>

              ) : parishes.length === 0 ? (

                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    No pending approvals.
                  </td>
                </tr>

              ) : (

                parishes.map((parish) => (

                  <tr key={parish.id} className="border-b">

                    <td className="p-4">
                      {parish.parishName}
                    </td>

                    <td className="p-4">
                      {parish.deanery}
                    </td>

                    <td className="p-4">
                      {parish.presidentName}
                    </td>

                    <td className="p-4">
                      <a
                        href={parish.paymentReceipt}
                        target="_blank"
                        className="text-blue-600"
                      >
                        View Receipt
                      </a>
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() => handleApprove(parish.id)}
                        className="rounded-lg bg-[#0B6B3A] px-4 py-2 text-white"
                      >
                        Approve
                      </button>

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