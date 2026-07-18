"use client";

import { useEffect, useState } from "react";

import AdminLayout from "@/app/admin/dashboard/AdminLayout";
import StatsCard from "@/app/admin/dashboard/StartsCard";

import {
  approveParishRegistration,
  getPendingRegistrations,
   getDashboardSummary
} from "@/services/parish";

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    totalDelegates: 0,
    registeredParishes: 0,
    deaneries: 13,
    committeeMembers: 0,
  });

  const [pendingRegistrations, setPendingRegistrations] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
    loadPendingRegistrations();
  }, []);

  const [selectedRegistration, setSelectedRegistration] =
  useState<any>(null);

const [showReceiptModal, setShowReceiptModal] =
  useState(false);

  const [search, setSearch] = useState("");

const filteredRegistrations = pendingRegistrations.filter((registration) =>
  registration.parishName
    .toLowerCase()
    .includes(search.toLowerCase())
);

  async function loadDashboard() {
  try {
    const response = await getDashboardSummary();

    if (!response.success) {
      alert("Unable to load dashboard.");
      return;
    }

    setSummary({
      totalDelegates: response.data.delegates.total,
      registeredParishes: response.data.parishes.approved,
      deaneries: 13,
      committeeMembers: 0,
    });

  } catch (error) {
    console.error(error);
  }
}

  async function loadPendingRegistrations() {
    try {
      const response = await getPendingRegistrations();

      if (response.success) {
        setPendingRegistrations(response.registrations);
      }
    } catch (error) {
      console.error(error);
    }
  }


  async function approve(id: string) {
    if (!confirm("Approve this parish registration?")) {
      return;
    }

    const response = await approveParishRegistration(id);

    if (response.success) {
      alert(response.message);

      loadDashboard();
      loadPendingRegistrations();
    } else {
      alert(response.message);
    }
  }


  return (
    <AdminLayout>
      <div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <StatsCard
            title="Total Delegates"
            value={summary.totalDelegates}
          />

          <StatsCard
            title="Registered Parishes"
            value={summary.registeredParishes}
          />

          <StatsCard
            title="Deaneries"
            value={summary.deaneries}
          />

          <StatsCard
            title="Committee Members"
            value={summary.committeeMembers}
          />

        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">

    <h2 className="text-2xl font-bold text-[#0B6B3A]">
        Parish Registration Requests
    </h2>

    <p className="text-gray-500 mt-1">
        Review parish payments and approve dashboard access.
    </p>

    <input
        type="text"
        placeholder="Search parish..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-5 w-full rounded-lg border border-gray-300 p-3 focus:border-[#0B6B3A] outline-none"
    />

</div>

<div className="overflow-x-auto">



          <div className="max-h-[550px] overflow-y-auto">

            <table className="min-w-[900px] w-full">

              <thead className="sticky top-0 bg-gray-100 z-10">

  <tr>

    <th className="p-4 text-left">
      Registration Date
    </th>

    <th className="p-4 text-left">
      Parish
    </th>

    <th className="p-4 text-left">
      Deanery
    </th>

    <th className="p-4 text-left">
      President
    </th>

    <th className="p-4 text-left">
      Phone
    </th>

    <th className="p-4 text-left">
      Receipt
    </th>

    <th className="p-4 text-left">
      Status
    </th>

    <th className="p-4 text-left">
      Action
    </th>

  </tr>

</thead>
              <tbody>

                {filteredRegistrations.length === 0 ? (

                  <tr>

                    <td
                      colSpan={8}
                      className="p-10 text-center text-gray-500"
                    >
                      No pending registrations.
                    </td>

                  </tr>

                ) : (

                  filteredRegistrations.map((registration: any) => (

                    <tr
  key={registration.id}
  className="border-b"
>

  <td className="p-4">
    {new Date(
      registration.createdAt
    ).toLocaleDateString()}
  </td>

  <td className="p-4">
    {registration.parishName}
  </td>

  <td className="p-4">
    {registration.deanery}
  </td>

  <td className="p-4">
    {registration.presidentName}
  </td>

  <td className="p-4">
    {registration.phoneNumber}
  </td>

  <td className="p-4">

    <button
      onClick={() => {
        setSelectedRegistration(registration);
        setShowReceiptModal(true);
      }}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
    >
      View Receipt
    </button>

  </td>

  <td className="p-4">

    <span
    className={`rounded-full px-3 py-1 text-sm font-semibold

        ${
            registration.status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
        }

    `}
>
    {registration.status}
</span>

  </td>

  <td className="p-4">

    {registration.status === "APPROVED" ? (

<button
disabled
className="rounded-lg bg-gray-300 px-4 py-2 text-gray-600 cursor-not-allowed"
>
Approved
</button>

) : (

<button
onClick={() => approve(registration.id)}
className="rounded-lg bg-[#0B6B3A] px-4 py-2 text-white hover:bg-green-800"
>
Approve
</button>

)}
  </td>

</tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
</div>

{showReceiptModal && selectedRegistration && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    <div className="w-[95vw] max-w-3xl rounded-xl bg-white p-6 shadow-2xl">

      <div className="mb-5 flex items-center justify-between">


        <h2 className="text-2xl font-bold">
          Payment Receipt
        </h2>

        <button
          onClick={() => setShowReceiptModal(false)}
          className="text-2xl font-bold text-gray-500 hover:text-red-600"
        >
          ×
        </button>

      </div>

      <div className="space-y-3">

        <p>
          <strong>Parish:</strong>{" "}
          {selectedRegistration.parishName}
        </p>

        <p>
          <strong>President:</strong>{" "}
          {selectedRegistration.presidentName}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {selectedRegistration.phoneNumber}
        </p>

      </div>

      <div className="mt-6">
         

        <img
          src={`https://cyon-evnt-management.onrender.com${selectedRegistration.receiptUrl}`}
          alt="Receipt"
          className="max-h-[70vh] w-full rounded-lg border object-contain"
        />

      </div>

    </div>

  </div>
)}



    </AdminLayout>
  );
}