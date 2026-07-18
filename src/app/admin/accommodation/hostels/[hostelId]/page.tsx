"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import {
  useParams,
} from "next/navigation";

import AdminHeader from "../../../dashboard/Header";

import {
  getHostelDetails,
} from "@/services/accomodation";

interface Hall {
  id: string;
  hallName: string;
  capacity: number;
  occupiedBeds: number;
  availableBeds: number;
}

interface Hostel {
  id: string;
  hostelName: string;
  gender: "MALE" | "FEMALE";

  totalHalls: number;

  totalBeds: number;

  occupiedBeds: number;

  availableBeds: number;

  halls: Hall[];
}

export default function HostelDetailsPage() {

  const params = useParams();

  const hostelId =
    params.hostelId as string;

  const [hostel, setHostel] =
    useState<Hostel | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadHostel();
  }, []);

  async function loadHostel() {
    try {

      setLoading(true);

      const response =
        await getHostelDetails(
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

      <AdminHeader/>

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Gender
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {hostel.gender}
          </h2>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Total Halls
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {hostel.totalHalls}
          </h2>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Total Beds
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {hostel.totalBeds}
          </h2>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Available Beds
          </p>

          <h2 className="mt-3 text-2xl font-bold text-green-600">
            {hostel.availableBeds}
          </h2>

        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <Link
          href={`/admin/accommodation/hostels/${hostel.id}/halls/create`}
          className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          + Add Hall
        </Link>

      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Hall
              </th>

              <th className="p-4 text-center">
                Capacity
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



                        {hostel.halls.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="p-10 text-center text-gray-500"
                >
                  No halls have been created for this hostel.
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
                    {hall.capacity}
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

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        href={`/admin/accommodation/halls/${hall.id}/edit`}
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