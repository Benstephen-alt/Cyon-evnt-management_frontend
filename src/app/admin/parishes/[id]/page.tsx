"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "../../dashboard/AdminLayout";
import Link from "next/link";

import {
  getParishDetails,
  getParishDelegates,
  downloadParishBadges,
  exportParishDelegates,
} from "@/services/parish";


export default function ParishDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [parish, setParish] = useState<any>(null);

  const [search, setSearch] =useState("");

  useEffect(() => {
    loadParish();
  }, []);

  async function loadParish() {
  try {
    const response = await getParishDetails(id as string);

    console.log(response);

    setParish(response.data);

  } catch (error) {
    console.error(error);
    alert("Unable to load parish.");
  } finally {
    setLoading(false);
  }
}

  async function handleDownload() {
    const blob = await downloadParishBadges(
      id as string
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${parish.parishName}-badges.zip`;

    link.click();

    window.URL.revokeObjectURL(url);
  }

    if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  async function downloadAllBadges() {
  try {
    const blob = await downloadParishBadges(id as string);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${parish.parishName}-badges.zip`;

    a.click();

    window.URL.revokeObjectURL(url);
  } catch {
    alert("Unable to download badges.");
  }
}

async function exportDelegates() {
  try {
    const blob = await exportParishDelegates(id as string);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${parish.parishName}-delegates.csv`;

    a.click();

    window.URL.revokeObjectURL(url);
  } catch {
    alert("Unable to export delegates.");
  }
}


const filteredDelegates = parish?.delegates?.filter(
  (delegate: any) =>
    delegate.fullName
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    delegate.delegateNumber
      .toLowerCase()
      .includes(search.toLowerCase())
) || [];

    return (
    <AdminLayout>

  <div className="p-8">

    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-[#0B6B3A]">
         {parish.parishName}
        </h1>

        <p className="mt-2 text-gray-500">
          {parish.deanery?.name}
        </p>

      </div>

     
    </div>

    <div className="grid grid-cols-4 gap-6 mt-8">

      <div className="rounded-xl bg-white shadow p-6">

        <p className="text-gray-500">
          Total Delegates
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {parish?.totalDelegates}
        </h2>

      </div>

      <div className="rounded-xl bg-white shadow p-6">

        <p className="text-gray-500">
          Checked In
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {parish?.checkedIn}
        </h2>

      </div>

      <div className="rounded-xl bg-white shadow p-6">

        <p className="text-gray-500">
          Outstanding
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {parish?.outstanding}
        </h2>

      </div>

      <div className="rounded-xl bg-white shadow p-6">

        <p className="text-gray-500">
          Registration
        </p>

        <h2
  className={`text-xl font-bold mt-3 ${
    parish?.registrationPaid
      ? "text-green-600"
      : "text-red-600"
  }`}
>
  {parish?.registrationPaid
    ? "PAID"
    : "NOT PAID"}
</h2>

      </div>

    </div>

    <div className="mt-10 rounded-xl bg-white shadow">

     <div className="border-b px-6 py-4 flex items-center justify-between">

  <h2 className="text-xl font-semibold">
    Delegates
  </h2>

  <div className="flex gap-3">

    <button
      onClick={downloadAllBadges}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Download Badges
    </button>

    <button
      onClick={exportDelegates}
      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
    >
      Export Delegates
    </button>

  </div>

</div>
      <div className="grid grid-cols-2 gap-8 p-6">

        <div>

          <p className="text-gray-500">
            Parish Name
          </p>

          <p className="font-semibold mt-1">
            {parish?.parish?.parishName}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Parish Code
          </p>

          <p className="font-semibold mt-1">
            {parish?.parish?.parishCode}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Deanery
          </p>

          <p className="font-semibold mt-1">
            {parish?.parish?.deanery?.name}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Event
          </p>

          <p className="font-semibold mt-1">
            {parish?.event ?? "-"}
          </p>

        </div>

      </div>

    </div> 

    <div className="mt-10 rounded-xl bg-white shadow overflow-hidden">

      <div className="border-b px-6 py-4 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Delegates
        </h2>

        <span className="text-gray-500">
          {parish?.delegates?.length} Delegates
        </span>

      </div>

        <div className="px-6 pt-6">

  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search by delegate name or ID..."
    className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#0B6B3A] focus:outline-none"
  />

</div>

      <table className="w-full">

       <thead>
  <tr>
    <th className="p-4 text-left">Delegate ID</th>
    <th className="p-4 text-left">Name</th>
    <th className="p-4 text-left">Gender</th>
    <th className="p-4 text-left">Phone</th>
    <th className="p-4 text-left">Checked In</th>
    <th className="p-4 text-left">Actions</th>
  </tr>
</thead>
        <tbody>

        

         {filteredDelegates.length === 0 ? (

  <tr>

    <td
      colSpan={6}
      className="py-10 text-center text-gray-500"
    >
      No delegates found.
    </td>

  </tr>

) : (

  filteredDelegates.map((delegate: any) => (

   <tr
  key={delegate.id}
  className="border-b hover:bg-gray-50"
>
  <td className="p-4">
    {delegate.delegateNumber}
  </td>

  <td className="p-4">
    {delegate.fullName}
  </td>

  <td className="p-4">
    {delegate.gender}
  </td>

  <td className="p-4">
    {delegate.phoneNumber}
  </td>

  <td className="p-4">
    {delegate.isCheckedIn ? (
      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
        YES
      </span>
    ) : (
      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
        NO
      </span>
    )}
  </td>

  <td className="p-4">
    <Link
      href={`/admin/delegates/${delegate.id}`}
      className="rounded-lg bg-[#0B6B3A] px-4 py-2 text-white hover:bg-green-700"
    >
      View Details
    </Link>
  </td>
</tr>

  ))

)}

        </tbody>

      </table>

    </div>

  </div>

</AdminLayout>
    )}