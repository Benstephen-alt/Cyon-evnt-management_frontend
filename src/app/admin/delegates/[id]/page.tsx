"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "../../dashboard/AdminLayout";
import {
  getDelegateDetails,
  downloadDelegateBadge,
} from "@/services/delegate";

export default function DelegateProfilePage() {
  const { id } = useParams();
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [delegate, setDelegate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadDelegate();
    }
  }, [id]);
 
  async function loadDelegate() {
    try {
      setLoading(true);

      const response = await getDelegateDetails(
        id as string
      );

      console.log("Delegate Response:", response);

      if (response.success) {
        setDelegate(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load delegate.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadBadge() {
    try {
      const blob = await downloadDelegateBadge(
        id as string
      );

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = `${delegate.fullName}-badge.pdf`;

      a.click();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Unable to download badge.");
    }
  }

  if (loading) {
  return (
    <AdminLayout>
      <div className="p-10 text-center">
        Loading delegate...
      </div>
    </AdminLayout>
  );
}

if (!delegate) {
  return (
    <AdminLayout>
      <div className="p-10 text-center text-red-600">
        Delegate not found.
      </div>
    </AdminLayout>
  );
}
  return (
    <AdminLayout>
    
  <div className="p-8">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h1 className="text-3xl font-bold text-[#0B6B3A]">
          {delegate.fullName}
        </h1>

        <p className="text-gray-500 mt-2">
          {delegate.delegateNumber}
        </p>

      </div>

      <div className="flex gap-3">

        <button
          onClick={downloadBadge}
          className="rounded-lg bg-[#0B6B3A] px-5 py-3 text-white"
        >
          Download Badge
        </button>

        <button
          onClick={() => window.print()}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Print Badge
        </button>

      </div>

    </div>

    <div className="grid grid-cols-3 gap-8">

      <div className="rounded-xl bg-white shadow p-6">

        <div className="flex justify-center">

          <img
  src={`${SERVER_URL}${delegate.photoUrl}`}
  alt={delegate.fullName}
  className="h-56 w-56 rounded-lg object-cover"
/>

        </div>

        <div className="mt-6 space-y-4">

          

          <div>

            <p className="text-gray-500">
              Check-in Status
            </p>

            <p
              className={`font-bold ${
                delegate.isCheckedIn
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {delegate.isCheckedIn
                ? "Checked In"
                : "Not Checked In"}
            </p>

          </div>

        </div>

      </div>

      <div className="col-span-2 rounded-xl bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-xl font-semibold">
            Delegate Information
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-6 p-6">
   
   <div>
  <p className="text-gray-500">Full Name</p>
  <p className="font-semibold">{delegate.fullName}</p>
</div>

<div>
  <p className="text-gray-500">Gender</p>
  <p className="font-semibold">{delegate.gender}</p>
</div>

<div>
  <p className="text-gray-500">Age</p>
  <p className="font-semibold">{delegate.age ?? "-"}</p>
</div>

<div>
  <p className="text-gray-500">Phone Number</p>
  <p className="font-semibold">{delegate.phoneNumber}</p>
</div>

<div>
  <p className="text-gray-500">Parish</p>
  <p className="font-semibold">{delegate.parishName}</p>
</div>

<div>
  <p className="text-gray-500">Deanery</p>
  <p className="font-semibold">{delegate.deaneryName}</p>
</div>

<div>
  <p className="text-gray-500">Parish Code</p>
  <p className="font-semibold">{delegate.parishCode}</p>
</div>

<div>
  <p className="text-gray-500">Event</p>
  <p className="font-semibold">{delegate.eventName}</p>
</div>

<div>
  <p className="text-gray-500">Theme</p>
  <p className="font-semibold">{delegate.eventTheme}</p>
</div>

<div>
  <p className="text-gray-500">Year</p>
  <p className="font-semibold">{delegate.eventYear}</p>
</div>

<div>
  <p className="text-gray-500">Registered</p>
  <p className="font-semibold">
    {new Date(delegate.createdAt).toLocaleDateString()}
  </p>
</div>

        </div>

      </div>

    </div>

  </div>
</AdminLayout>
  );
}