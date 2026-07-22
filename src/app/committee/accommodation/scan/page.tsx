"use client";

import { useRef, useState } from "react";
import CommitteeHeader from "@/components/committee/CommitteeHeader";
import ParishQrScanner, {
  ParishQrScannerRef,
} from "@/components/scanner/ParishQrScanner";

import {
  scanParishQr,
  confirmParishArrival,
} from "@/services/committee";

interface ParishSummary {
  parish: {
    id: string;
    parishName: string;
    parishCode: string;
    deanery: string;
  };

  statistics: {
    totalDelegates: number;
    maleDelegates: number;
    femaleDelegates: number;
    accommodatedDelegates: number;
  };

  arrival: {
    hasArrived: boolean;
    arrivedAt?: string | null;
    checkedInBy?: string | null;
  };
}


export default function ScanParishPage() {
  const [token, setToken] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [summary, setSummary] =
    useState<ParishSummary | null>(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

    const [confirming, setConfirming] =
  useState(false);

  const scannerRef =
  useRef<ParishQrScannerRef>(null);

interface ArrivalResult {
  parishName: string;
  totalDelegates: number;
  autoAllocated: number;
  manualAllocation: number;
  manualDelegates: {
    id: string;
    fullName: string;
    gender: string;
  }[];
}

const [arrivalResult, setArrivalResult] =
  useState<ArrivalResult | null>(null);

  const [showCamera, setShowCamera] =
  useState(false);


  async function processQrToken(
  qrToken: string
): Promise<boolean> {
  setError("");
  setSuccess("");
  setArrivalResult(null);
  setSummary(null);

  if (!qrToken.trim()) {
    setError("Enter or scan a QR token.");
    return false;
  }

  try {
    setLoading(true);

    const response =
      await scanParishQr(qrToken);

    setSummary(response.data);

    setSuccess(
      "Parish found successfully."
    );

    return true;
  } catch (err: any) {
    setError(
      err?.response?.data?.message ??
        "Unable to scan QR code."
    );

    return false;
  } finally {
    setLoading(false);
  }
}
  async function handleScan(
  e: React.FormEvent
) {

  e.preventDefault();

  await processQrToken(token);
} 

  async function handleConfirmArrival() {
  if (!summary) return;

  try {
    setConfirming(true);

    const response =
      await confirmParishArrival(token);

    setArrivalResult(response.data);

    window.scrollTo({
  top: 0,
  behavior: "smooth",
});

    setSuccess(
      "Parish arrival confirmed successfully."
    );

    setSummary(null);

    setToken("");

  } catch (err: any) {

    setError(
      err?.response?.data?.message ??
      "Unable to confirm arrival."
    );

  } finally {

    setConfirming(false);

  }
}



const handleCameraToggle = async () => {
  if (!showCamera) {
    setShowCamera(true);

    requestAnimationFrame(() => {
      scannerRef.current?.open();
    });
  } else {
    await scannerRef.current?.close();
    setShowCamera(false);
  }
};





  return (
  <div>
    <CommitteeHeader
      title="Scan Parish QR"
      subtitle="Scan a parish QR code to begin the arrival process."
    />

    {/* Scanner */}

    <div className="rounded-2xl bg-white p-8 shadow">
      <h2 className="text-2xl font-bold">
        Parish QR Scanner
      </h2>



       <div className="mt-6 flex flex-col gap-4">

  <button
    type="button"
    onClick={handleCameraToggle}
    className="self-start rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
  >
    {showCamera
      ? "Close Camera"
      : "📷 Open Camera"}
  </button>

  {showCamera && (
    <ParishQrScanner
      ref={scannerRef}
      onScan={async (value) => {
        setToken(value);
        return await processQrToken(value);
      }}
    />
  )}

</div>






    </div>

    {/* Parish Summary */}

    {summary && (
      <div className="mt-8 rounded-2xl bg-white p-8 shadow">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Parish Summary
          </h2>

          {summary.arrival.hasArrived ? (
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Arrived
            </span>
          ) : (
            <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              Pending
            </span>
          )}

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Parish
            </p>

            <h3 className="text-xl font-bold">
              {summary.parish.parishName}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Parish Code
            </p>

            <h3 className="text-xl font-bold">
              {summary.parish.parishCode}
            </h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Deanery
            </p>

            <h3 className="text-xl font-bold">
              {summary.parish.deanery}
            </h3>
          </div>


        </div>

        <div className="mt-10">

          <h3 className="mb-4 text-xl font-bold">
            Delegates
          </h3>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-gray-500">
                Total
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {summary.statistics.totalDelegates}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-50 p-5">
              <p className="text-gray-500">
                Male
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-700">
                {summary.statistics.maleDelegates}
              </h2>
            </div>

            <div className="rounded-xl bg-pink-50 p-5">
              <p className="text-gray-500">
                Female
              </p>

              <h2 className="mt-2 text-3xl font-bold text-pink-700">
                {summary.statistics.femaleDelegates}
              </h2>
            </div>

          </div>

        </div>

        {summary.arrival.hasArrived ? (

          <div className="mt-8 rounded-xl bg-green-100 p-5">

            <h3 className="font-bold text-green-700">
              This parish has already arrived.
            </h3>

            <p className="mt-2 text-green-600">
              Arrival Time:{" "}
              {summary.arrival.arrivedAt
                ? new Date(
                    summary.arrival.arrivedAt
                  ).toLocaleString()
                : "-"}
            </p>

          </div>

        ) : (

          <div className="mt-10 flex justify-end">

            <button
              onClick={handleConfirmArrival}
              disabled={
  confirming ||
  summary.arrival.hasArrived
}
              
              className="rounded-lg bg-[#0B6B3A] px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {confirming
                ? "Confirming..."
                : "Confirm Arrival"}
            </button>

          </div>

        )}

      </div>
    )}

    {/* Arrival Result */}

    {arrivalResult && (
      <div className="mt-8 rounded-2xl bg-white p-8 shadow">

        <div className="rounded-xl bg-green-100 p-5">

          <h2 className="text-2xl font-bold text-green-700">
            ✅ Parish Arrival Confirmed
          </h2>

          <p className="mt-2 text-green-600">
            Accommodation allocation completed.
          </p>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>
            <h3 className="text-lg font-bold">
              Parish
            </h3>

            <p className="mt-2">
              {arrivalResult.parishName}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Delegates
            </h3>

            <p className="mt-2">
              {arrivalResult.totalDelegates}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Automatically Allocated
            </h3>

            <p className="mt-2 font-semibold text-green-600">
              {arrivalResult.autoAllocated}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold">
              Manual Allocation Required
            </h3>

            <p className="mt-2 font-semibold text-red-600">
              {arrivalResult.manualAllocation}
            </p>
          </div>

        </div>

        {arrivalResult.manualDelegates?.length > 0 && (

          <div className="mt-10">

            <h3 className="mb-4 text-xl font-bold">
              Delegates Requiring Manual Allocation
            </h3>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="p-3 text-left">
                      Delegate
                    </th>

                    <th className="p-3 text-left">
                      Gender
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {arrivalResult.manualDelegates.map(
                    (delegate: any) => (

                      <tr
                        key={delegate.id}
                        className="border-b"
                      >

                        <td className="p-3">
                          {delegate.fullName}
                        </td>

                        <td className="p-3">
                          {delegate.gender}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

        <div className="mt-10 flex justify-end">

          <button
            onClick={() => {
  setArrivalResult(null);
  setSummary(null);
  setToken("");
  setSuccess("");
  setError("");

  scannerRef.current?.resume();
}}
            className="rounded-lg bg-[#0B6B3A] px-8 py-3 text-white hover:bg-green-700"
          >
            Scan Another Parish
          </button>

        </div>

      </div>
    )}

  </div>
);}