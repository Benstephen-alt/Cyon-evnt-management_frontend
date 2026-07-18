import {
  Pencil,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";

import { ExpenseRecord } from "@/types/committeeDashboard";

import { getFileUrl } from "@/lib/fileurl";

interface ExpenseTableProps {
  expenses: ExpenseRecord[];

  onEdit(
    expense: ExpenseRecord
  ): void;

  onDelete(
    expenseId: string
  ): void;
}



export default function ExpenseTable({
  expenses,
  onEdit,
  onDelete,
}: ExpenseTableProps) {
  return (
    <div className="mt-10">

      {/* Header */}

      <div className="mb-5">

        <h2 className="text-2xl font-bold">
          Expense Records
        </h2>

        <p className="text-gray-500">
          Every expense recorded by this committee.
        </p>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Date
              </th>

              <th className="px-4 py-3 text-left">
                Expense
              </th>

              <th className="px-4 py-3 text-left">
                Category
              </th>

              <th className="px-4 py-3 text-left">
                Recorded By
              </th>

              <th className="px-4 py-3 text-right">
                Amount
              </th>

              <th className="px-4 py-3 text-center">
                Receipt
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {expenses.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-10 text-center text-gray-500"
                >
                  No expenses recorded.
                </td>

              </tr>

            ) : (

              expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-4 py-3">

                    {new Date(
                      expense.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td className="px-4 py-3 font-medium">

                    {expense.expenseName}

                  </td>

                  <td className="px-4 py-3">

                    {expense.category}

                  </td>

                  <td className="px-4 py-3">

                    {
                      expense.committeeMember
                        .user.admin.fullName
                    }

                  </td>

                  <td className="px-4 py-3 text-right font-semibold text-red-600">

                    ₦
                    {expense.amount.toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}

                  </td>

                  <td className="px-4 py-3 text-center">

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

                      <span className="inline-flex items-center gap-2 text-gray-400">

                        <FileText size={16} />

                        None

                      </span>

                    )}

                  </td>

                  <td className="px-4 py-3">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          onEdit(expense)
                        }
                        className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(expense.id)
                        }
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}