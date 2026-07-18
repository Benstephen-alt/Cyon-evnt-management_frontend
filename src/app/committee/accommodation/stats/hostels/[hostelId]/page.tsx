"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CommitteeHeader from "@/components/committee/CommitteeHeader";

import {
  getAccommodationHostelById,
  AccommodationHostelDetails,
} from "@/services/committee";

export default function AccommodationHostelPage() {

  const params = useParams();

  const hostelId =
    params.hostelId as string;

  const [hostel, setHostel] =
    useState<AccommodationHostelDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadHostel();
  }, []);

  async function loadHostel() {

    try {

      setLoading(true);

      const response =
        await getAccommodationHostelById(
          hostelId
        );

      setHostel(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load hostel."
      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading hostel...
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Hostel not found.
      </div>
    );
  }

  return (
    <div>

      <CommitteeHeader
        title={hostel.hostelName}
        subtitle="Live hostel occupancy."
      />

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Halls
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {hostel.totalHalls}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Total Beds
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {hostel.totalBeds}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Occupied
          </p>

          <h2 className="mt-3 text-3xl font-bold text-red-600">
            {hostel.occupiedBeds}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Available
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {hostel.availableBeds}
          </h2>

        </div>

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Hall
              </th>

              <th className="p-4 text-center">
                Total Beds
              </th>

              <th className="p-4 text-center">
                Occupied
              </th>

              <th className="p-4 text-center">
                Available
              </th>

            </tr>

          </thead>

          <tbody>


                        {hostel.halls.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="p-10 text-center text-gray-500"
                >
                  No halls have been configured for this hostel.
                </td>

              </tr>

            ) : (

              hostel.halls.map((hall) => (

                <tr
                  key={hall.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {hall.hallName}
                  </td>

                  <td className="p-4 text-center">
                    {hall.totalBeds}
                  </td>

                  <td className="p-4 text-center">

                    <span className="font-semibold text-red-600">
                      {hall.occupiedBeds}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <span className="font-semibold text-green-600">
                      {hall.availableBeds}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}