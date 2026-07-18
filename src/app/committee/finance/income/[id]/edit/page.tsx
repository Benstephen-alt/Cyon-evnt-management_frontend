"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AdminHeader from "../../../../../admin/dashboard/Header";

import {
  getIncomeRecord,
  updateIncome,
  UpdateIncomeDto,
} from "@/services/finance";

export default function EditIncomePage() {
  const router = useRouter();

  const params = useParams();

  const incomeId = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] =
    useState({
      payerName: "",
      amount: "",
    });

  const [form, setForm] =
    useState<UpdateIncomeDto>({
      source: "DONATION",
      payerName: "",
      amount: 0,
      receiptUrl: "",
      remarks: "",
    });

  useEffect(() => {
    loadIncome();
  }, []);

  async function loadIncome() {

  try {

    const response =
      await getIncomeRecord(
        incomeId
      );

    const income =
      response.data;

    setForm({
      source: income.source,
      payerName: income.payerName,
      amount: income.amount,
      receiptUrl:
        income.receiptUrl ?? "",
      remarks:
        income.remarks ?? "",
    });

  } catch (error) {

    console.error(error);

    alert(
      "Unable to load income record."
    );

    router.back();

  } finally {

    setLoading(false);

  }

}

function validateForm() {

  const newErrors = {
    payerName: "",
    amount: "",
  };

  let valid = true;

  if (!form.payerName.trim()) {

    newErrors.payerName =
      "Payer name is required.";

    valid = false;

  }

  if (
    !form.amount ||
    form.amount <= 0
  ) {

    newErrors.amount =
      "Amount must be greater than zero.";

    valid = false;

  }

  setErrors(newErrors);

  return valid;

}

async function handleSubmit(
  e: React.FormEvent
) {

  e.preventDefault();

  if (!validateForm()) return;

  try {

    setSaving(true);

    await updateIncome(
      incomeId,
      form
    );

    alert(
      "Income updated successfully."
    );

    router.push(
      "/finance/income"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Unable to update income."
    );

  } finally {

    setSaving(false);

  }

}

if (loading) {

  return (

    <div className="flex h-[70vh] items-center justify-center">

      Loading...

    </div>

  );

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
            .value as UpdateIncomeDto["source"],
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
    Payer Name
  </label>

  <input
    type="text"
    value={form.payerName}
    onChange={(e) =>
      setForm({
        ...form,
        payerName: e.target.value,
      })
    }
    className="w-full rounded-lg border p-3"
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
        amount: Number(e.target.value),
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
        remarks: e.target.value,
      })
    }
    className="w-full rounded-lg border p-3"
  />

</div>


<div className="flex justify-end gap-4">

  <button
    type="button"
    onClick={() => router.back()}
    className="rounded-lg border px-6 py-3 font-semibold"
  >
    Cancel
  </button>

  <button
    type="submit"
    disabled={
      saving ||
      !form.payerName.trim() ||
      form.amount <= 0
    }
    className="rounded-lg bg-[#0B6B3A] px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
  >

    {saving
      ? "Updating..."
      : "Update Income"}

  </button>

</div>

</form>

</div>

</div>
);
}