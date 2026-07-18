"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AdminHeader from "../../dashboard/Header";

import {
  getHostels,
} from "@/services/accomodation";

interface Hostel {
  id: string;
  hostelName: string;
  gender: "MALE" | "FEMALE";
  totalHalls: number;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
}

export default function HostelsPage() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHostels();
  }, []);

  async function loadHostels() {
    try {
      setLoading(true);

      const response = await getHostels();

      setHostels(response.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load hostels.");

    } finally {

      setLoading(false);

    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading hostels...
      </div>
    );
  }

  return (
    <div>

      <AdminHeader/>

      <div className="mb-6 flex justify-end">

        <Link
          href="/admin/accommodation/hostels/create"
          className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Create Hostel
        </Link>

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Hostel
              </th>

              <th className="p-4 text-left">
                Gender
              </th>

              <th className="p-4 text-center">
                Halls
              </th>

              <th className="p-4 text-center">
                Beds
              </th>

              <th className="p-4 text-center">
                Occupied
              </th>

              <th className="p-4 text-center">
                Available
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>


                        {hostels.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="p-10 text-center text-gray-500"
                >
                  No hostels found.
                </td>

              </tr>

            ) : (

              hostels.map((hostel) => (

                <tr
                  key={hostel.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {hostel.hostelName}
                  </td>

                  <td className="p-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        hostel.gender === "MALE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {hostel.gender}
                    </span>

                  </td>

                  <td className="p-4 text-center">
                    {hostel.totalHalls}
                  </td>

                  <td className="p-4 text-center">
                    {hostel.totalBeds}
                  </td>

                  <td className="p-4 text-center">

                    <span className="font-semibold text-red-600">
                      {hostel.occupiedBeds}
                    </span>

                  </td>

                  <td className="p-4 text-center">

                    <span className="font-semibold text-green-600">
                      {hostel.availableBeds}
                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        href={`/admin/accommodation/hostels/${hostel.id}`}
                        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/accommodation/hostels/${hostel.id}/edit`}
                        className="rounded bg-[#0B6B3A] px-4 py-2 text-sm text-white hover:bg-green-700"
                      >
                        Edit
                      </Link>

                    </div>

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