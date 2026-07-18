"use client";

import { Bell, LogOut, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContexts";

export default function AppHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      {/* Search */}
      <div className="relative w-96">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          placeholder="Search..."
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none transition focus:border-[#0B6B3A] focus:bg-white"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <button className="relative rounded-xl p-3 transition hover:bg-slate-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="text-right">
          <p className="font-semibold">
            {user?.fullName}
          </p>

          <p className="text-sm text-slate-500">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}