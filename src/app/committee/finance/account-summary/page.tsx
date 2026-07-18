"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminHeader from "../../../admin/dashboard/Header";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getAccountSummary } from "@/services/finance";
import { getFileUrl } from "@/lib/fileurl";
import { Eye } from "lucide-react";

export default function AccountSummaryPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [summary, setSummary] =
    useState<any>(null);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      setLoading(true);

      const response =
        await getAccountSummary();

      setSummary(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function exportCsv() {
    if (!summary) return;

    const rows = [
      [
        "Date",
        "Committee",
        "Recorded By",
        "Expense",
        "Category",
        "Amount",
      ],

      ...summary.expenses.map(
        (expense: any) => [
          new Date(
            expense.date
          ).toLocaleDateString(),

          expense.committee,

          expense.recordedBy,

          expense.expenseName,

          expense.category,

          expense.amount,
        ]
      ),
    ];

    const csvContent = rows
      .map((row: any[]) =>
        row.join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(
        blob
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "Account-Summary.csv";

    link.click();

    window.URL.revokeObjectURL(
      url
    );
  }

  function exportPdf() {
    if (!summary) return;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "CATHOLIC YOUTHS ORGANIZATION OF NIGERIA",
      14,
      18
    );

    doc.setFontSize(14);

    doc.text(
      "NSUKKA DIOCESE",
      14,
      26
    );

    doc.setFontSize(16);

    doc.text(
      "ACCOUNT SUMMARY",
      14,
      38
    );

    doc.setFontSize(11);

    doc.text(
      `Event: ${summary.event.eventName}`,
      14,
      48
    );

    doc.text(
      `Year: ${summary.event.year}`,
      14,
      55
    );

    doc.text(
      `Generated: ${new Date(
        summary.event.generatedAt
      ).toLocaleString()}`,
      14,
      62
    );

    autoTable(doc, {
      startY: 72,

      head: [["Item", "Amount"]],

      body: [
        [
          "Total Income",
          `₦${summary.totalIncome.toLocaleString(
            "en-NG"
          )}`,
        ],

        [
          "Parish Registration",
          `₦${summary.parishIncome.toLocaleString(
            "en-NG"
          )}`,
        ],

        [
          "Vendor Registration",
          `₦${summary.vendorIncome.toLocaleString(
            "en-NG"
          )}`,
        ],

        [
          "Donation",
          `₦${summary.donationIncome.toLocaleString(
            "en-NG"
          )}`,
        ],

        [
          "Total Expenses",
          `₦${summary.totalExpenses.toLocaleString(
            "en-NG"
          )}`,
        ],

        [
          summary.financialStatus,
          `₦${summary.balance.toLocaleString(
            "en-NG"
          )}`,
        ],
      ],
    });

    autoTable(doc, {
      startY:
        (doc as any)
          .lastAutoTable.finalY +
        10,

      head: [[
        "Date",
        "Committee",
        "Recorded By",
        "Expense",
        "Category",
        "Amount",
      ]],

      body:
        summary.expenses.map(
          (expense: any) => [
            new Date(
              expense.date
            ).toLocaleDateString(),

            expense.committee,

            expense.recordedBy,

            expense.expenseName,

            expense.category,

            `₦${Number(
              expense.amount
            ).toLocaleString(
              "en-NG"
            )}`,
          ]
        ),
    });

    doc.save(
      `Account-Summary-${summary.event.year}.pdf`
    );
  }

  if (loading) {
    return (
      <>
        <AdminHeader />

        <div className="p-10">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader />

      <div className="space-y-8 p-8">

       




       {/* ============================================
    Page Header
============================================ */}

<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

  <div>

    <h1 className="text-3xl font-bold text-gray-900">
      Account Summary
    </h1>

    <p className="mt-2 text-gray-600">
      Financial report for the active event.
    </p>

    {summary?.event && (

      <div className="mt-4 space-y-1 text-sm text-gray-500">

        <p>
          <span className="font-semibold">
            Event:
          </span>{" "}
          {summary.event.eventName}
        </p>

        <p>
          <span className="font-semibold">
            Year:
          </span>{" "}
          {summary.event.year}
        </p>

        <p>
          <span className="font-semibold">
            Generated:
          </span>{" "}
          {new Date(
            summary.event.generatedAt
          ).toLocaleString()}
        </p>

      </div>

    )}

  </div>

  <div className="flex gap-3">

    <button
      onClick={() => router.back()}
      className="rounded-lg border border-gray-300 px-5 py-3 font-medium hover:bg-gray-100"
    >
      Back
    </button>

  </div>

</div>



{/* ============================================
    Financial Summary Cards
============================================ */}

<div className="grid gap-6 md:grid-cols-3">

  {/* Total Income */}

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-sm font-medium text-gray-500">

      Total Income

    </p>

    <h2 className="mt-3 text-3xl font-bold text-green-600">

      ₦{summary.totalIncome.toLocaleString("en-NG")}

    </h2>

  </div>

  {/* Total Expenses */}

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-sm font-medium text-gray-500">

      Total Expenses

    </p>

    <h2 className="mt-3 text-3xl font-bold text-red-600">

      ₦{summary.totalExpenses.toLocaleString("en-NG")}

    </h2>

  </div>

  {/* Balance / Deficit */}

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-sm font-medium text-gray-500">

      {summary.financialStatus === "BALANCE"
        ? "Available Balance"
        : "Deficit"}

    </p>

    <h2
      className={`mt-3 text-3xl font-bold ${
        summary.financialStatus === "BALANCE"
          ? "text-blue-600"
          : "text-red-600"
      }`}
    >
      ₦
      {(
        summary.financialStatus === "BALANCE"
          ? summary.balance
          : summary.deficit
      ).toLocaleString("en-NG")}
    </h2>

  </div>

</div>



{/* ============================================
    Income Breakdown
============================================ */}

<div>

  <div className="mb-4">

    <h2 className="text-2xl font-bold text-gray-900">

      Income Breakdown

    </h2>

    <p className="text-gray-500">

      Breakdown of all income received for the active event.

    </p>

  </div>

  <div className="grid gap-6 md:grid-cols-3">

    {/* Parish Registration */}

    <div className="rounded-2xl bg-white p-6 shadow">

      <p className="text-sm font-medium text-gray-500">

        Parish Registration

      </p>

      <h2 className="mt-3 text-2xl font-bold text-green-700">

        ₦
        {summary.parishIncome.toLocaleString(
          "en-NG"
        )}

      </h2>

    </div>

    {/* Vendor Registration */}

    <div className="rounded-2xl bg-white p-6 shadow">

      <p className="text-sm font-medium text-gray-500">

        Vendor Registration

      </p>

      <h2 className="mt-3 text-2xl font-bold text-blue-700">

        ₦
        {summary.vendorIncome.toLocaleString(
          "en-NG"
        )}

      </h2>

    </div>

    {/* Donations */}

    <div className="rounded-2xl bg-white p-6 shadow">

      <p className="text-sm font-medium text-gray-500">

        Donations

      </p>

      <h2 className="mt-3 text-2xl font-bold text-purple-700">

        ₦
        {summary.donationIncome.toLocaleString(
          "en-NG"
        )}

      </h2>

    </div>

  </div>

</div>



{/* ============================================
    Expense Records
============================================ */}

<div className="rounded-2xl bg-white shadow">

  {/* Card Header */}

  <div className="flex flex-col gap-5 border-b p-6 md:flex-row md:items-center md:justify-between">

    <div>

      <h2 className="text-2xl font-bold text-gray-900">

        Expense Records

      </h2>

      <p className="mt-1 text-sm text-gray-500">

        All committee expenses recorded for the active event.

      </p>

      <p className="mt-3 text-sm font-medium text-gray-600">

        Total Records:

        <span className="ml-2 rounded-full bg-gray-100 px-3 py-1 font-bold">

          {summary.expenses.length}

        </span>

      </p>

    </div>

    <div className="flex flex-wrap gap-3">

      <button
        onClick={exportCsv}
        className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        Export CSV
      </button>

      <button
        onClick={exportPdf}
        className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
      >
        Export PDF
      </button>

    </div>

  </div>

  {/* Table */}

  <div className="overflow-x-auto">

    <table className="min-w-full">

      <thead className="bg-gray-100">

  <tr>

    <th className="p-4 text-left text-sm font-semibold text-gray-700">
      Date
    </th>

    <th className="p-4 text-left text-sm font-semibold text-gray-700">
      Committee
    </th>

    <th className="p-4 text-left text-sm font-semibold text-gray-700">
      Recorded By
    </th>

    <th className="p-4 text-left text-sm font-semibold text-gray-700">
      Expense
    </th>

    <th className="p-4 text-left text-sm font-semibold text-gray-700">
      Category
    </th>

    <th className="p-4 text-right text-sm font-semibold text-gray-700">
      Amount
    </th>

    <th className="p-4 text-center text-sm font-semibold text-gray-700">
      Receipt
    </th>

  </tr>

</thead>

<tbody>

  {summary.expenses.length === 0 ? (

    <tr>

      <td
        colSpan={7}
        className="p-10 text-center text-gray-500"
      >
        No expense records found.
      </td>

    </tr>

  ) : (

    summary.expenses.map((expense: any) => (

      <tr
        key={expense.id}
        className="border-b transition hover:bg-gray-50"
      >

        {/* Date */}

        <td className="p-4">

          {new Date(
            expense.date
          ).toLocaleDateString("en-GB")}

        </td>

        {/* Committee */}

        <td className="p-4 font-medium">

          {expense.committee}

        </td>

        {/* Recorded By */}

        <td className="p-4">

          {expense.recordedBy}

        </td>

        {/* Expense */}

        <td className="p-4">

          <div>

            <p className="font-medium">

              {expense.expenseName}

            </p>

            {expense.description && (

              <p className="mt-1 text-sm text-gray-500">

                {expense.description}

              </p>

            )}

          </div>

        </td>

        {/* Category */}

        <td className="p-4">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

            {expense.category
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char: string) =>
                char.toUpperCase()
              )}

          </span>

        </td>

        {/* Amount */}

        <td className="p-4 text-right font-bold">

          ₦
          {Number(
            expense.amount
          ).toLocaleString("en-NG")}

        </td>

        {/* Receipt */}

        <td className="p-4 text-center">

          {expense.receiptUrl ? (

            <a
                        href={getFileUrl(expense.receiptUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <Eye size={16} />

                        View

                      </a>

          ) : (

            <span className="text-sm text-gray-400">

              No Receipt

            </span>

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
    </>
  );
}