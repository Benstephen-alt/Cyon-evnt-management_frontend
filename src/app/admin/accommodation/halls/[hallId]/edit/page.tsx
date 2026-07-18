"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";

import AdminHeader from "../../../../dashboard/Header";

import {
  getHallById,
  updateHall,
} from "@/services/accomodation";

export default function EditHallPage() {
  const router = useRouter();

  const params = useParams();

  const hallId = params.hallId as string;

  const [hostelId, setHostelId] =
    useState("");

  const [hallName, setHallName] =
    useState("");

  const [capacity, setCapacity] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadHall();
  }, []);

  async function loadHall() {
    try {
      setLoading(true);

      const response =
        await getHallById(hallId);

      const hall = response.data;

      setHostelId(hall.hostelId);

      setHallName(hall.hallName);

      setCapacity(
  hall.totalBeds.toString()
);

    } catch (error: any) {

      alert(
        error?.response?.data?.message ??
        "Unable to load hall."
      );

      router.back();

    } finally {

      setLoading(false);

    }
  }

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

      await updateHall(
  hallId,
  {
    hallName,
    totalBeds: Number(capacity),
  }
);

      alert(
        "Hall updated successfully."
      );

      router.push(
        `/admin/accommodation/hostels/${hostelId}`
      );

    } catch (error: any) {

      alert(
        error?.response?.data?.message ??
        "Unable to update hall."
      );

    } finally {

      setSaving(false);

    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading hall...
      </div>
    );
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
              onChange={(e) =>
                setHallName(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Capacity
            </label>

            <input
              type="number"
              value={capacity}
              onChange={(e) =>
                setCapacity(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3 outline-none focus:border-[#0B6B3A]"
            />

            <p className="mt-2 text-sm text-gray-500">
              Updating the capacity will
              automatically adjust the total
              number of beds.
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
                ? "Updating..."
                : "Update Hall"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}