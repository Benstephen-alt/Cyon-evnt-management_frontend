import Image from "next/image";

interface BrandProps {
  portal: "Admin" | "Parish" | "Committee";
}

export default function Brand({
  portal,
}: BrandProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-14 w-14 overflow-hidden rounded-xl border bg-white shadow-sm">
        <Image
          src="/image/cyon-logo.png"
          alt="CYON Logo"
          fill
          priority
          className="object-contain p-1"
        />
      </div>

      <div className="leading-tight">
        <h1 className="text-base font-bold text-[#0B6B3A]">
          CYON Event
        </h1>

        <p className="text-sm text-gray-500">
          {portal} Portal
        </p>
      </div>
    </div>
  );
}