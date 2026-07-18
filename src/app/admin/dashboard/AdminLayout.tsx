"use client";

import { ReactNode } from "react";
import Header from "./Header";
import SidebarItems from "../../../components/layouts/sideber-items";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";


interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {


  const router = useRouter();

   const handleLogout = () => {
  logout();
  router.replace("/admin/login");
};

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col overflow-y-auto bg-[#0B6B3A] text-white shadow-xl z-40">

        <div className="p-8 border-b border-green-700">

          <h1 className="text-2xl font-bold">
            CYON
          </h1>

          <p className="text-green-200 text-sm">
            Event Management
          </p>

        </div>

        <nav className="flex-1 p-4 space-y-2">

          <SidebarItems title="Dashboard" href="/admin/dashboard" />

<SidebarItems title="Events" href="/admin/events" />

<SidebarItems title="Committee Member" href="/admin/committee-members" />

<SidebarItems title="Parishes" href="/admin/parishes" />

<SidebarItems title="Delegates" href="/admin/delegates" />

<SidebarItems title="Committees" href="/admin/committee" />

<SidebarItems title="Accommodation" href="/admin/accommodation/hostels" />

<SidebarItems title="Finance" href="/admin/finance" />

<SidebarItems title="Announcements" href="/admin/announcements" />

<SidebarItems title="Reports" href="/admin/reports" />

<SidebarItems title="Settings" href="/admin/settings" />

        </nav>

        <div className="p-4 border-t border-green-700">
          <button
  onClick={handleLogout}
  className="w-full rounded-xl bg-red-500 py-3 font-semibold hover:bg-red-600"
>
  Logout
</button>
        </div>

      </aside>

      {/* Main Content */}

      <main className="ml-72 flex-1 flex flex-col min-h-screen">

    <div className="sticky top-0 z-30">
    <Header />
</div>

    <div className="flex-1 overflow-y-auto">
        {children}
    </div>

</main>
    </div>
  );
}

function SidebarItem({ title }: { title: string }) {
  return (
    <button className="w-full rounded-xl px-4 py-3 text-left hover:bg-[#1A8A4A] transition">
      {title}
    </button>
  );
}