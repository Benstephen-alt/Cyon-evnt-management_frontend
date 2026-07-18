interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#0B6B3A]">
        {value}
      </h2>

    </div>
  );
}