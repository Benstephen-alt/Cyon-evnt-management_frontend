"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { registerParish } from "@/services/parish";
import { getActiveEvent } from "@/services/event.service";
import { logout } from "@/lib/auth";

export default function ParishRegistrationPage() {
  const router = useRouter();

  const [parish, setParish] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [presidentName, setPresidentName] = useState("");

  const [registrationFee, setRegistrationFee] =
  useState(0);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [receipt, setReceipt] = useState<File | null>(null);

  useEffect(() => {
    loadActiveEvent();
    const stored = localStorage.getItem("parish");

    if (!stored) {
      router.push("/parish/login");
      return;
    }

    setParish(JSON.parse(stored));
  }, []);


   async function loadActiveEvent() {
  try {
    const response =
      await getActiveEvent();

    setRegistrationFee(
      Number(
        response.data.registrationFee
      )
    );

  } catch (error) {
    console.error(error);
  }
}


  async function submit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!receipt) {
      alert("Please upload your payment receipt.");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();

      form.append("presidentName", presidentName);
      form.append(
        "presidentPhoneNumber",
        phoneNumber
      );
      form.append("receipt", receipt);

      const response =
        await registerParish(form);

      if (!response.success) {
        alert(response.message);
        return;
      }

      alert("Registration submitted successfully.");

      router.push("/parish/pending");

    } catch (error) {
      console.error(error);
      alert("Unable to submit registration.");
    } finally {
      setLoading(false);
    }
  }

  if (!parish) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <form
        onSubmit={submit}
        className="mx-auto max-w-4xl rounded-2xl bg-white shadow-xl"
      >

        <div className="border-b p-8">

          <h1 className="text-3xl font-bold text-[#0B6B3A]">
            Parish Registration
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your parish registration before accessing the dashboard.
          </p>

        </div>



           <div className="flex items-center justify-between border-b p-8">
  <div>
    <h1 className="text-3xl font-bold text-[#0B6B3A]">
      Parish Registration
    </h1>

    <p className="mt-2 text-gray-500">
      Complete your parish registration before accessing the dashboard.
    </p>
  </div>

  <button
    type="button"
    onClick={logout}
    className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
  >
    Logout
  </button>
</div>





        <div className="space-y-8 p-8">

          {/* Parish */}

          <div className="rounded-xl border p-6">

            <h2 className="mb-5 text-xl font-semibold text-[#0B6B3A]">
              Parish Information
            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div>

                <label className="block text-sm font-medium">
                  Parish
                </label>

                <input
                  value={parish.parishName}
                  readOnly
                  className="mt-2 w-full rounded-lg border bg-gray-100 p-3"
                />

              </div>

              <div>

                <label className="block text-sm font-medium">
                  Deanery
                </label>

                <input
                  value={parish.deaneryName}
                  readOnly
                  className="mt-2 w-full rounded-lg border bg-gray-100 p-3"
                />

              </div>

            </div>

          </div>

          {/* Payment */}

          <div className="rounded-xl border border-green-200 bg-green-50 p-6">

            <h2 className="mb-5 text-xl font-semibold text-[#0B6B3A]">
              Registration Payment
            </h2>

            <div className="space-y-2">

              <p>
                <strong>Registration Fee:</strong>
                {" "}
                ₦{registrationFee.toLocaleString()}
              </p>

              <p>
                <strong>Bank:</strong>
                {" "}
                Kenechukwu Microfinance Bank
              </p>

              <p>
                <strong>Account Name:</strong>
                {" "}
                CYON Nsukka Diocese
              </p>

              <p>
                <strong>Account Number:</strong>
                {" "}
                0000115758
              </p>

            </div>

          </div>

          {/* President */}

          <div className="rounded-xl border p-6">

            <h2 className="mb-5 text-xl font-semibold text-[#0B6B3A]">
              Parish President
            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div>

                <label>Name</label>

                <input
                  value={presidentName}
                  onChange={(e) =>
                    setPresidentName(e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                />

              </div>

              <div>

                <label>Phone Number</label>

                <input
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                />

              </div>

            </div>

          </div>

          {/* Receipt */}

          <div className="rounded-xl border p-6">

            <h2 className="mb-5 text-xl font-semibold text-[#0B6B3A]">
              Payment Receipt
            </h2>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) =>
                setReceipt(
                  e.target.files?.[0] || null
                )
              }
            />

            {receipt && (
              <p className="mt-3 text-green-600">
                Selected:
                {" "}
                {receipt.name}
              </p>
            )}

          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#0B6B3A] py-4 text-xl font-semibold text-white hover:bg-green-800"
          >
            {loading
              ? "Submitting..."
              : "Submit Registration"}
          </button>

        </div>

      </form>

    </div>
  );
}