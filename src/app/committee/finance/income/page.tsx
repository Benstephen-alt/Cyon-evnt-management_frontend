"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminHeader from "../../../admin/dashboard/Header";

import {
  getIncomeStatistics,
  getIncomeRecords,
  IncomeRecord,
  IncomeStatistics,
  deleteIncome,
} from "@/services/finance";

export default function IncomeManagementPage() {
  const [statistics, setStatistics] =
    useState<IncomeStatistics | null>(null);

  const [records, setRecords] =
    useState<IncomeRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

    const [deletingId, setDeletingId] =
  useState<string | null>(null);

  useEffect(() => {
    loadIncome();
  }, []);

  async function loadIncome() {
    try {
      setLoading(true);

      const [
        statisticsResponse,
        recordsResponse,
      ] = await Promise.all([
        getIncomeStatistics(),
        getIncomeRecords(),
      ]);

      setStatistics(
        statisticsResponse.data
      );

      setRecords(
        recordsResponse.data
      );

    } catch (error) {
      console.error(error);

      alert(
        "Unable to load income records."
      );

    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(
  id: string
) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this income record?"
  );

  if (!confirmed) return;

  try {
    setDeletingId(id);

    await deleteIncome(id);

    setRecords((previous) =>
      previous.filter(
        (record) => record.id !== id
      )
    );

    const statistics =
      await getIncomeStatistics();

    setStatistics(statistics.data);

    alert(
      "Income record deleted successfully."
    );

  } catch (error) {
    console.error(error);

    alert(
      "Unable to delete income record."
    );

  } finally {
    setDeletingId(null);
  }
}

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading income records...
      </div>
    );
  }

  return (
    <div>

      <AdminHeader
      />

      <div className="mb-8 flex justify-end">

        <Link
          href="/committee/finance/income/create"
          className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Record Income
        </Link>

      </div>


       



      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-6">

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">
      Total Income
    </p>

    <h2 className="mt-3 text-3xl font-bold text-green-700">

      ₦{statistics?.totalIncome.toLocaleString()}

    </h2>

  </div>

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">
      Parish Registration
    </p>

    <h2 className="mt-3 text-3xl font-bold text-blue-700">

      ₦{statistics?.parishIncome.toLocaleString()}

    </h2>

  </div>

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">
      Vendor Registration
    </p>

    <h2 className="mt-3 text-3xl font-bold text-purple-700">

      ₦{statistics?.vendorIncome.toLocaleString()}

    </h2>

  </div>

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">
      Donations
    </p>

    <h2 className="mt-3 text-3xl font-bold text-orange-600">

      ₦{statistics?.donationIncome.toLocaleString()}

    </h2>

  </div>

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">
      Sponsorship
    </p>

    <h2 className="mt-3 text-3xl font-bold text-indigo-700">

      ₦{statistics?.sponsorshipIncome.toLocaleString()}

    </h2>

  </div>

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">
      Other Income
    </p>

    <h2 className="mt-3 text-3xl font-bold text-gray-700">

      ₦{statistics?.otherIncome.toLocaleString()}

    </h2>

  </div>

</div>

            <div className="mt-10 rounded-2xl bg-white p-8 shadow">

        <div className="mb-6 flex items-center justify-between">

          
          <h2 className="text-2xl font-bold">
            Income Records
          </h2>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
            {records.length} Record(s)
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Source
                </th>

                <th className="p-4 text-left">
                  Payer
                </th>

                <th className="p-4 text-right">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Recorded By
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {records.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="p-12 text-center text-gray-500"
                  >
                    No income records found.
                  </td>

                </tr>

              ) : (

                records.map((record) => {

                  const systemGenerated =
                    record.source ===
                      "PARISH_REGISTRATION" ||
                    record.source ===
                      "VENDOR_REGISTRATION";

                  return (

                    <tr
                      key={record.id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-4">

                        {new Date(
                          record.createdAt
                        ).toLocaleDateString()}

                      </td>

                      <td className="p-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            record.source ===
                            "DONATION"
                              ? "bg-blue-100 text-blue-700"
                              : record.source ===
                                "SPONSORSHIP"
                              ? "bg-purple-100 text-purple-700"
                              : record.source ===
                                "OTHER"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >

                          {record.source.replaceAll(
                            "_",
                            " "
                          )}

                        </span>

                      </td>

                      <td className="p-4">

                        {record.payerName}

                      </td>

                      <td className="p-4 text-right font-semibold">

                        ₦{record.amount.toLocaleString()}

                      </td>

                      <td className="p-4">

                        {record.recordedBy}

                      </td>

                      <td className="p-4">

                        <div className="flex justify-center gap-3">

                          {systemGenerated ? (

                            <span
                              className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-500"
                              title="Automatically generated by the system"
                            >
                              🔒 System
                            </span>

                          ) : (

                            <>

                              <Link
                                href={`/committee/finance/income/${record.id}/edit`}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                              >
                                Edit
                              </Link>
<button
  onClick={() =>
    handleDelete(record.id)
  }
  disabled={
    deletingId === record.id
  }
  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
>
  {deletingId === record.id
    ? "Deleting..."
    : "Delete"}
</button>

                            </>

                          )}

                        </div>

                      </td>

                    </tr>

                  );

                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}