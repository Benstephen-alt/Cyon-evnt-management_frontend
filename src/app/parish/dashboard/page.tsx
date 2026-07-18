"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";


export default function ParishDashboard() {
  const router = useRouter();

  const [parish, setParish] = useState<any>(null);

const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});



useEffect(() => {
  const stored = localStorage.getItem("parish");

  if (!stored) {
    router.push("/parish/login");
    return;
  }

  setParish(JSON.parse(stored));
}, [router]);



const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {


  async function loadDashboard() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/parish/parish-dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
console.log(data);
    setDashboard(data);
  }

  loadDashboard();
}, []);


  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("account");
    localStorage.removeItem("parish");

    router.push("/parish/login");
  }


const downloadAllBadges = async () => {
  try {
    const response = await api.get(
      "/badge/parish-badge/download",
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data])
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "CYON-Badges.zip";

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert("Unable to download badges.");
  }
};


   
  useEffect(() => {
  const targetDate = new Date("2026-08-10T00:00:00");

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(timer);

      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      return;
    }

    setTimeLeft({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      ),
      minutes: Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      ),
      seconds: Math.floor(
        (distance % (1000 * 60)) / 1000
      ),
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);
 









  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-[#0B6B3A] text-white">

        <div className="mx-auto max-w-7xl px-8 py-10 flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Parish Dashboard
            </h1>

            <p className="mt-2 text-green-100">
              {parish?.parishName}
            </p>

            <p className="text-green-200">
              {parish?.deaneryName}
            </p>

          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </div>





          <div className="mx-auto max-w-7xl px-8 mt-8">

  <div className="rounded-3xl bg-gradient-to-r from-[#0B6B3A] to-green-700 p-8 text-white shadow-xl">

    <p className="text-green-100 uppercase tracking-widest text-sm">
      Countdown to
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Registration Deadline
    </h2>

    <p className="mt-2 text-green-100">
      August 10, 2026
    </p>

    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

      <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

        <h3 className="text-5xl font-bold">
          {timeLeft.days}
        </h3>

        <p className="mt-2 text-green-100">
          Days
        </p>

      </div>

      <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

        <h3 className="text-5xl font-bold">
          {timeLeft.hours}
        </h3>

        <p className="mt-2 text-green-100">
          Hours
        </p>

      </div>

      <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

        <h3 className="text-5xl font-bold">
          {timeLeft.minutes}
        </h3>

        <p className="mt-2 text-green-100">
          Minutes
        </p>

      </div>

      <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

        <h3 className="text-5xl font-bold">
          {timeLeft.seconds}
        </h3>

        <p className="mt-2 text-green-100">
          Seconds
        </p>

      </div>

    </div>

  </div>

</div>








      <div className="mx-auto max-w-7xl px-8 py-10 space-y-10">

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-8 shadow">

            <p className="text-gray-500">
              Total Delegates
            </p>

           <h2 className="mt-3 text-5xl font-bold text-[#0B6B3A]">
  {dashboard?.data?.statistics?.registeredDelegates ?? 0}
</h2>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">

            <p className="text-gray-500">
              Badges Generated
            </p>

            <h2 className="mt-3 text-5xl font-bold text-[#0B6B3A]">
  {dashboard?.data?.statistics?.registeredDelegates ?? 0}
</h2>

          </div>

        </div>

        {/* Actions */}

        <div>

          <h2 className="mb-6 text-2xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <Link
              href="/parish/delegates/register"
              className="rounded-2xl bg-[#0B6B3A] p-10 text-white transition hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="text-5xl">
                👥
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Register Delegate
              </h3>

              <p className="mt-2 text-green-100">
                Register a new delegate for your parish.
              </p>

            </Link>

            <Link
              href="/parish/delegates"
              className="rounded-2xl bg-blue-600 p-10 text-white transition hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="text-5xl">
                📋
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                View Delegates
              </h3>

              <p className="mt-2 text-blue-100">
                View all delegates already registered.
              </p>

            </Link>

            <div
  onClick={downloadAllBadges}
  className="rounded-2xl bg-yellow-500 p-10 text-white cursor-pointer transition hover:scale-[1.02]"
>
  <div className="text-5xl">🪪</div>

  <h3 className="mt-6 text-2xl font-bold">
    Download Badges
  </h3>

  <p className="mt-2 text-yellow-100">
    Download badges for all registered delegates.
  </p>
</div>

            <Link
              href="/parish/qr"
              className="rounded-2xl bg-purple-600 p-10 text-white transition hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="text-5xl">
                📱
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Parish QR Code
              </h3>

              <p className="mt-2 text-purple-100">
                View and download your parish QR code.
              </p>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}