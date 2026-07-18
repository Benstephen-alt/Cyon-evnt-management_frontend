import { Vendor } from "@/services/committee";

interface VendorTagProps {
  vendor: Vendor;
}

export default function VendorTag({
  vendor,
}: VendorTagProps) {
  return (
    <div
      id="vendor-tag"
      className="mx-auto flex h-[340px] w-[220px] flex-col rounded-xl border-2 border-black bg-white p-4"
    >
      {/* Header */}

      <div className="text-center">

        <h2 className="text-sm font-bold uppercase">
          Catholic Youths Organization
        </h2>

        <h3 className="text-xs font-semibold">
          Nsukka Diocese
        </h3>

        <div className="my-2 border-t" />

        <p className="text-[11px]">
          2026 Youth Weekend with Bishop
        </p>

      </div>

      {/* Vendor */}

      <div className="mt-4 text-center">

        <h1 className="text-xl font-extrabold tracking-widest text-blue-700">
          VENDOR
        </h1>

      </div>

      {/* Body */}

      <div className="mt-6 flex-1 space-y-4">

        <div>

          <p className="text-xs text-gray-500">
            Business
          </p>

          <h3 className="text-lg font-bold">
            {vendor.businessName}
          </h3>

        </div>

        <div>

          <p className="text-xs text-gray-500">
            Owner
          </p>

          <h3 className="font-semibold">
            {vendor.ownerName}
          </h3>

        </div>

        <div>

          <p className="text-xs text-gray-500">
            Vendor Code
          </p>

          <h3 className="font-bold tracking-wide">
            {vendor.vendorCode}
          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t pt-2 text-center">

        <p className="text-[10px] text-gray-500">
          Official Event Vendor
        </p>

      </div>

    </div>
  );
}