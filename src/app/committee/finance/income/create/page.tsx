"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadDelegatePhoto } from "@/services/upload";
import AdminHeader from "../../../../admin/dashboard/Header";

import {
  createIncome,
  CreateIncomeDto,
} from "@/services/finance";

export default function CreateIncomePage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

    const [uploading, setUploading] =
  useState(false);

  const [errors, setErrors] = useState({
  payerName: "",
  amount: "",
});

  const [form, setForm] =
    useState<CreateIncomeDto>({
      source: "DONATION",
      payerName: "",
      amount: 0,
      receiptUrl: "",
      remarks: "",
    });


    

function validateForm() {
  const newErrors = {
    payerName: "",
    amount: "",
  };

  let isValid = true;

  if (!form.payerName.trim()) {
    newErrors.payerName =
      "Payer name is required.";
    isValid = false;
  }

  if (
    !form.amount ||
    form.amount <= 0
  ) {
    newErrors.amount =
      "Enter a valid amount.";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
}


  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!validateForm()) {
  return;
}

    try {
      setLoading(true);

      await createIncome(form);

      alert(
        "Income recorded successfully."
      );

      router.push(
        "/committee/finance/income"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Unable to record income."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      <AdminHeader
      />

      <div className="rounded-2xl bg-white p-8 shadow">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

                  <div>

            <label className="mb-2 block font-medium">
              Income Source
            </label>

            <select
              value={form.source}
              onChange={(e) =>
                setForm({
                  ...form,
                  source:
                    e.target
                      .value as CreateIncomeDto["source"],
                })
              }
              className="w-full rounded-lg border p-3"
            >

              <option value="DONATION">
                ❤️ Donation
              </option>

              <option value="SPONSORSHIP">
                🤝 Sponsorship
              </option>

              <option value="OTHER">
                📄 Other
              </option>

            </select>

          </div>


                    <div>

            <label className="mb-2 block font-medium">
              Payer
            </label>

            <input
              type="text"
              value={form.payerName}
              onChange={(e) =>
                setForm({
                  ...form,
                  payerName:
                    e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
              placeholder="Who made the payment?"
            />

            {errors.payerName && (
  <p className="mt-2 text-sm text-red-600">
    {errors.payerName}
  </p>
)}

          </div>


                    <div>

            <label className="mb-2 block font-medium">
              Amount (₦)
            </label>

            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount:
                    Number(
                      e.target.value
                    ),
                })
              }
              className="w-full rounded-lg border p-3"
            />

            {errors.amount && (
  <p className="mt-2 text-sm text-red-600">
    {errors.amount}
  </p>
)}

          </div>


                   



                    <div>

            <label className="mb-2 block font-medium">
              Remarks
            </label>

            <textarea
              rows={4}
              value={form.remarks}
              onChange={(e) =>
                setForm({
                  ...form,
                  remarks:
                    e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
              placeholder="Additional information..."
            />

          </div>


                    <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="rounded-lg border px-6 py-3 font-semibold"
            >
              Cancel
            </button>

            <button
  type="submit"
  disabled={
    loading ||
    !form.payerName.trim() ||
    form.amount <= 0
  }
  className="rounded-lg bg-[#0B6B3A] px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading
    ? "Saving..."
    : "Record Income"}
</button>

          </div>

        </form>

      </div>
  </div>
    
  );
}