"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CommitteeHeader from "@/components/committee/CommitteeHeader";
import {
  getParishArrivalDashboard,
} from "@/services/committee";

interface DashboardData {
  totalParishes: number;
  arrivedParishes: number;
  pendingParishes: number;
  arrivalPercentage: number;
  totalDelegates: number;
  accommodatedDelegates: number;
  accommodationPercentage: number;
  lastArrival: {
    parishName: string;
    arrivedAt: string;
  } | null;
}

export default function AccommodationDashboardPage() {
  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const response =
        await getParishArrivalDashboard();

      setDashboard(response.data);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to load accommodation dashboard."
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading accommodation dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Unable to load dashboard.
      </div>
    );
  }

  return (
    <div>

      <CommitteeHeader
  title="Accommodation Committee"
  subtitle="Manage parish arrivals and delegate accommodation."
/>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Total Parishes
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#0B6B3A]">
            {dashboard.totalParishes}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Arrived
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {dashboard.arrivedParishes}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="mt-3 text-4xl font-bold text-orange-500">
            {dashboard.pendingParishes}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-gray-500">
            Accommodated
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-600">
            {dashboard.accommodatedDelegates}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            of {dashboard.totalDelegates} delegates
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-10">

        <h2 className="mb-5 text-2xl font-bold">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Link
            href="/committee/accommodation/scan"
            className="rounded-2xl bg-white p-8 shadow transition hover:scale-[1.02] hover:shadow-xl"
          >

            <div className="text-5xl">
              📷
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Scan Parish QR
            </h3>

            <p className="mt-2 text-gray-500">
              Scan parish QR code and confirm
              arrival.
            </p>

          </Link>

          <Link
            href="/committee/accommodation/pending"
            className="rounded-2xl bg-white p-8 shadow transition hover:scale-[1.02] hover:shadow-xl"
          >

            <div className="text-5xl">
              ⏳
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Pending Parishes
            </h3>

            <p className="mt-2 text-gray-500">
              View parishes yet to arrive.
            </p>

          </Link>

                    <Link
            href="/committee/accommodation/arrived"
            className="rounded-2xl bg-white p-8 shadow transition hover:scale-[1.02] hover:shadow-xl"
          >

            <div className="text-5xl">
              ✅
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Arrived Parishes
            </h3>

            <p className="mt-2 text-gray-500">
              View all confirmed parish arrivals.
            </p>

          </Link>

          <Link
            href="/committee/accommodation/stats"
            className="rounded-2xl bg-white p-8 shadow transition hover:scale-[1.02] hover:shadow-xl"
          >

            <div className="text-5xl">
              🛏️
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Accommodation Details
            </h3>

            <p className="mt-2 text-gray-500">
              Allocate beds for delegates that
              could not be assigned automatically.
            </p>

          </Link>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-12 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Arrival Progress
            </h2>

            <span className="font-bold text-[#0B6B3A]">
              {dashboard.arrivalPercentage}%
            </span>

          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-[#0B6B3A]"
              style={{
                width: `${dashboard.arrivalPercentage}%`,
              }}
            />

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold">
              Accommodation Progress
            </h2>

            <span className="font-bold text-blue-600">
              {dashboard.accommodationPercentage}%
            </span>

          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-blue-600"
              style={{
                width: `${dashboard.accommodationPercentage}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Last Arrival */}

      <div className="mt-12 rounded-2xl bg-white p-8 shadow">

        <h2 className="text-2xl font-bold">
          Latest Parish Arrival
        </h2>

        {dashboard.lastArrival ? (

          <div className="mt-6">

            <h3 className="text-2xl font-semibold text-[#0B6B3A]">
              {dashboard.lastArrival.parishName}
            </h3>

            <p className="mt-2 text-gray-500">
              Arrived on{" "}
              {new Date(
                dashboard.lastArrival.arrivedAt
              ).toLocaleString()}
            </p>

          </div>

        ) : (

          <div className="mt-6 text-gray-500">
            No parish has arrived yet.
          </div>

        )}

      </div>

    </div>
  );
}