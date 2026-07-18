"use client";

import { ReactNode, useState } from "react";
import Header from "./Header";
import SidebarItems from "../../../components/layouts/sideber-items";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";


interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {


  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

   const handleLogout = () => {
  logout();
  router.replace("/admin/login");
};


    return (
  <div className="flex min-h-screen bg-[#F8FAFC]">

    {/* Mobile Overlay */}

    {sidebarOpen && (
      <div
        className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    {/* Sidebar */}

    <aside
      className={`
      fixed top-0 left-0 z-40
      h-screen w-72
      bg-[#0B6B3A]
      text-white
      shadow-xl
      transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0
      lg:flex
      flex flex-col
      `}
    >

      <div className="border-b border-green-700 p-8">

        <h1 className="text-2xl font-bold">
          CYON
        </h1>

        <p className="text-sm text-green-200">
          Event Management
        </p>

      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">

        <SidebarItems title="Dashboard" href="/admin/dashboard" />
        <SidebarItems title="Events" href="/admin/events" />
        <SidebarItems title="Committee Member" href="/admin/committee-members" />
        <SidebarItems title="Parishes" href="/admin/parishes" />
        <SidebarItems title="Delegates" href="/admin/delegates" />
        <SidebarItems title="Committees" href="/admin/committee" />
        <SidebarItems title="Accommodation" href="/admin/accommodation/hostels" />
        <SidebarItems title="Settings" href="/admin/settings" />

      </nav>

      <div className="border-t border-green-700 p-4">

        <button
          onClick={handleLogout}
          className="w-full rounded-xl bg-red-500 py-3 font-semibold hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </aside>

    {/* Main */}

    <main className="flex min-h-screen flex-1 flex-col lg:ml-72">

      {/* Mobile Top Bar */}

      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg border p-2"
        >
          ☰
        </button>

        <h1 className="font-bold text-[#0B6B3A]">
          CYON
        </h1>

      </div>

      <div className="hidden lg:block">
    <Header />
</div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        {children}
      </div>

    </main>

  </div>
);}