interface SummaryCardProps {
  title: string;
  value: number;
  color:
    | "green"
    | "red"
    | "blue"
    | "orange";
}

const colors = {
  green: "text-green-600",
  red: "text-red-600",
  blue: "text-blue-600",
  orange: "text-orange-600",
};

export default function SummaryCard({
  title,
  value,
  color,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold ${colors[color]}`}
      >
        ₦
        {value.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h2>

    </div>
  );
}