"use client";

import { useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import AdminHeader from "../../../../../dashboard/Header";

import {
  createHall,
} from "@/services/accomodation";

export default function CreateHallPage() {

  const router = useRouter();

  const params = useParams();

  const hostelId =
    params.hostelId as string;

  const [hallName, setHallName] =
    useState("");

  const [capacity, setCapacity] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!hallName.trim()) {
      alert("Hall name is required.");
      return;
    }

    if (
      !capacity ||
      Number(capacity) <= 0
    ) {
      alert("Enter a valid capacity.");
      return;
    }

    try {

      setSaving(true);

      await createHall({
  hostelId,
  hallName,
  totalBeds: Number(capacity),
});

      alert(
        "Hall created successfully."
      );

      router.push(
        `/admin/accommodation/hostels/${hostelId}`
      );

    } catch (error: any) {

      alert(
        error?.response?.data?.message ??
        "Unable to create hall."
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
              Hall Name
            </label>

            <input
              type="text"
              value={hallName}
              onChange={(e)=>
                setHallName(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
              placeholder="Hall A"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Capacity
            </label>

            <input
              type="number"
              value={capacity}
              onChange={(e)=>
                setCapacity(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
              placeholder="120"
            />

            <p className="mt-2 text-sm text-gray-500">
              This determines how many beds
              will automatically be created.
            </p>

          </div>


                    <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/admin/accommodation/hostels/${hostelId}`
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
                : "Create Hall"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}