interface FinancialStatusProps {
  financialStatus: "BALANCE" | "DEFICIT";

  availableBalance: number;

  deficit: number;
}

export default function FinancialStatus({
  financialStatus,
  availableBalance,
  deficit,
}: FinancialStatusProps) {
  const balanced =
    financialStatus === "BALANCE";

  return (
    <div
      className={`rounded-xl border p-6 ${
        balanced
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      <h2
        className={`text-lg font-semibold ${
          balanced
            ? "text-green-700"
            : "text-red-700"
        }`}
      >
        Financial Status
      </h2>

      <p
        className={`mt-2 ${
          balanced
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {balanced
          ? "Committee is operating within available funds."
          : "Committee has exceeded available funds."}
      </p>

      <h3
        className={`mt-5 text-3xl font-bold ${
          balanced
            ? "text-green-700"
            : "text-red-700"
        }`}
      >
        ₦
        {(
          balanced
            ? availableBalance
            : deficit
        ).toLocaleString("en-NG")}
      </h3>

      <p className="mt-1 text-sm text-gray-600">
        {balanced
          ? "Available Balance"
          : "Current Deficit"}
      </p>
    </div>
  );
}