"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  CalendarDays,
  Church,
  Users,
  Building2,
  BedDouble,
  Wallet,
  FileText,
  QrCode,
  BadgeCheck,
  Settings,
} from "lucide-react";

import Brand from "./brand";

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface AppSidebarProps {
  portal: "Admin" | "Parish" | "Committee";
  items: SidebarItem[];
}

export default function AppSidebar({
  portal,
  items,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white shadow-sm">
      <div className="border-b p-6">
        <Brand portal={portal} />
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-[#0B6B3A] text-white shadow-md"
                  : "text-slate-600 hover:bg-green-50 hover:text-[#0B6B3A]"
              }`}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4 text-xs text-slate-500">
        © {new Date().getFullYear()}
        <br />
        CYON Nsukka Diocese
      </div>
    </aside>
  );
}