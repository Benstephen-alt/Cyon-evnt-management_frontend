import SummaryCard from "./SummaryCard";

interface Props {
  totalReleased: number;
  totalExpenses: number;
  availableBalance: number;
  deficit: number;
}

export default function SummaryCards({
  totalReleased,
  totalExpenses,
  availableBalance,
  deficit,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <SummaryCard
        title="Received Funds"
        value={totalReleased}
        color="green"
      />

      <SummaryCard
        title="Expenses"
        value={totalExpenses}
        color="red"
      />

      <SummaryCard
        title="Balance"
        value={availableBalance}
        color="blue"
      />

      <SummaryCard
        title="Deficit"
        value={deficit}
        color="orange"
      />

    </div>
  );
}