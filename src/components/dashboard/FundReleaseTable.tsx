interface FundRelease {
  id: string;

  releasedAt: string;

  authority: string;

  amount: number;

  remarks?: string;

  receiptUrl?: string;

  releasedBy: {
    admin: {
      fullName: string;
    };
  };
}

interface FundReleaseTableProps {
  releases: FundRelease[];
}








export default function FundReleaseTable({
  releases,
}: FundReleaseTableProps) {
  return (
    <div className="mt-10">

      {/* Header */}

      <div className="mb-5">

        <h2 className="text-2xl font-bold">
          Fund Release History
        </h2>

        <p className="text-gray-500">
          Record of every fund released to this committee.
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
                Authority
              </th>

              <th className="px-4 py-3 text-left">
                Released By
              </th>

              <th className="px-4 py-3 text-right">
                Amount
              </th>

              <th className="px-4 py-3 text-left">
                Remarks
              </th>

              <th className="px-4 py-3 text-center">
                Receipt
              </th>

            </tr>

          </thead>

          <tbody>

            {releases.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No fund releases found.
                </td>

              </tr>

            ) : (

              releases.map((release) => (

                <tr
                  key={release.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-4 py-3">

                    {new Date(
                      release.releasedAt
                    ).toLocaleDateString()}

                  </td>

                  <td className="px-4 py-3">

                    {release.authority.replaceAll(
                      "_",
                      " "
                    )}

                  </td>

                  <td className="px-4 py-3">

                    {
                      release.releasedBy.admin
                        .fullName
                    }

                  </td>

                  <td className="px-4 py-3 text-right font-semibold text-green-600">

                    ₦
                    {release.amount.toLocaleString(
                      "en-NG",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}

                  </td>

                  <td className="px-4 py-3">

                    {release.remarks || "-"}

                  </td>

                  <td className="px-4 py-3 text-center">

                    {release.receiptUrl ? (

                      <a
                        href={release.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        View
                      </a>

                    ) : (

                      <span className="text-gray-400">
                        —
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
  );
}