"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import CommitteeHeader from "@/components/committee/CommitteeHeader";

import {
  GetAccommodationHostels,
} from "@/services/committee";

interface Hostel {
  id: string;

  hostelName: string;

  gender: "MALE" | "FEMALE";

  totalHalls: number;

  totalBeds: number;

  occupiedBeds: number;

  availableBeds: number;
}

export default function AccommodationPage() {

  const [hostels, setHostels] =
    useState<Hostel[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadHostels();
  }, []);

  async function loadHostels() {

    try {

      setLoading(true);

      const response =
        await GetAccommodationHostels();

      setHostels(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load accommodation."
      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading accommodation...
      </div>
    );
  }

  return (
    <div>

      <CommitteeHeader
        title="Accommodation"
        subtitle="Monitor hostel occupancy."
      />

      <div className="grid gap-6 md:grid-cols-2">

        
        {hostels.length === 0 ? (

          <div className="col-span-2 rounded-2xl bg-white p-10 text-center shadow">

            <h2 className="text-xl font-semibold">
              No Hostels Found
            </h2>

            <p className="mt-2 text-gray-500">
              Accommodation has not been configured yet.
            </p>

          </div>

        ) : (

          hostels.map((hostel) => (

            <div
              key={hostel.id}
              className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {hostel.hostelName}
                  </h2>

                  <p
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                      hostel.gender === "MALE"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-pink-100 text-pink-700"
                    }`}
                  >
                    {hostel.gender}
                  </p>

                </div>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-sm text-gray-500">
                    Halls
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {hostel.totalHalls}
                  </h3>

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  <p className="text-sm text-gray-500">
                    Total Beds
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {hostel.totalBeds}
                  </h3>

                </div>

                <div className="rounded-xl bg-red-50 p-4">

                  <p className="text-sm text-gray-500">
                    Occupied
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-red-600">
                    {hostel.occupiedBeds}
                  </h3>

                </div>

                <div className="rounded-xl bg-green-50 p-4">

                  <p className="text-sm text-gray-500">
                    Available
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-green-600">
                    {hostel.availableBeds}
                  </h3>

                </div>

              </div>

              <div className="mt-8 flex justify-end">

                <Link
                  href={`/committee/accommodation/stats/hostels/${hostel.id}`}
                  className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  View Occupancy
                </Link>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}
      