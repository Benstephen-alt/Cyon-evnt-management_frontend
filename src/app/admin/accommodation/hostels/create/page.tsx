"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminHeader from "../../../dashboard/Header";

import { createHostel } from "@/services/accomodation";

export default function CreateHostelPage() {
  const router = useRouter();

  const [hostelName, setHostelName] =
    useState("");

  const [gender, setGender] =
    useState<"MALE" | "FEMALE">("MALE");

  const [saving, setSaving] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!hostelName.trim()) {
      alert("Hostel name is required.");
      return;
    }

    try {
      setSaving(true);

      await createHostel({
        hostelName,
        gender,
      });

      alert(
        "Hostel created successfully."
      );

      router.push(
        "/admin/accommodation/hostels"
      );

    } catch (error: any) {

      alert(
        error?.response?.data?.message ??
        "Unable to create hostel."
      );

    } finally {

      setSaving(false);

    }
  }

  return (
    <div>

      <AdminHeader/>

      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow">

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="mb-2 block font-medium">
              Hostel Name
            </label>

            <input
              type="text"
              value={hostelName}
              onChange={(e) =>
                setHostelName(e.target.value)
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
              placeholder="Enter hostel name"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) =>
                setGender(
                  e.target.value as
                    | "MALE"
                    | "FEMALE"
                )
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
            >

              <option value="MALE">
                Male Hostel
              </option>

              <option value="FEMALE">
                Female Hostel
              </option>

            </select>

          </div>

                    <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/admin/accommodation/hostels"
                )
              }
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {saving
                ? "Creating..."
                : "Create Hostel"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}