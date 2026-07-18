"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../dashboard/AdminLayout";
import Link from "next/link";

import {
  getParishDashboard,
  getParishDashboards,
  downloadParishBadges,
} from "@/services/parish";

export default function ParishPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [parishes, setParishes] = useState<any[]>([]);

  const [summary, setSummary] = useState({
    totalParishes: 0,
    registeredParishes: 0,
  });

  useEffect(() => {
    loadSummary();
    loadParishes();
  }, []);

  async function loadSummary() {
    try {
      const response = await getParishDashboards();

      if (response.success) {
        setSummary(response.summary);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load dashboard summary.");
    }
  }

  async function loadParishes() {
    try {
      setLoading(true);

      const response = await getParishDashboard();

      if (response.success) {
        setParishes(response.parishes);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load parishes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(
    parishId: string,
    parishName: string
  ) {
    try {
      const blob = await downloadParishBadges(parishId);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${parishName}-badges.zip`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Unable to download badges.");
    }
  }

  const filteredParishes = useMemo(() => {
    return parishes.filter((parish: any) =>
      parish.parishName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [parishes, search]);

  return (
    <AdminLayout>

      <div className="p-8">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-[#0B6B3A]">
              Parishes
            </h1>

            <p className="text-gray-500">
              Parish registration dashboard
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-8">

          <div className="rounded-xl bg-white shadow p-6">

            <p className="text-gray-500">
              Total Parishes
            </p>

            <h2 className="text-4xl font-bold mt-3">
             {summary.totalParishes}
            </h2>

          </div>

          <div className="rounded-xl bg-white shadow p-6">

            <p className="text-gray-500">
              Registered Parishes
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {summary.registeredParishes}
            </h2>

          </div>

        </div>

        <input
          className="mt-8 w-full rounded-xl border p-4"
          placeholder="Search parish..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {loading ? (
          <div className="mt-10 text-center">
            Loading...
          </div>
        ) : (
          <div className="mt-8 rounded-xl bg-white shadow overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4 text-left">
                    Parish
                  </th>

                  <th className="p-4 text-left">
                    Deanery
                  </th>

                  <th className="p-4 text-left">
                    Delegates
                  </th>

                  <th className="p-4 text-left">
                    Badges
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredParishes.map((parish) => (

                  <tr
                    key={parish.id}
                    className="border-t"
                  >

                    <td className="p-4">
                      {parish.parishName}
                    </td>

                    <td className="p-4">
                      {parish.deanery}
                    </td>

                    <td className="p-4">
                      {parish.delegates}
                    </td>

                    <td className="p-4">
                      {parish.badges ?? "-"}
                    </td>

                    <td className="p-4 flex gap-2">

                      <Link
  href={`/admin/parishes/${parish.id}`}
  className="rounded-lg bg-[#0B6B3A] px-4 py-2 text-white"
>
  View Delegates
</Link>

                     {parish.registered && (
          <button
            onClick={() =>
              handleDownload(parish.id, parish.parishName)
            }
            className="rounded-lg bg-blue-600 px-3 py-2 text-white"
          >
            Download Badges
          </button>
                     )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </AdminLayout>
  );
}