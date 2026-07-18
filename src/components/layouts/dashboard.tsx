"use client";

import { ReactNode } from "react";

import AppSidebar, {
  SidebarItem,
} from "./AppSide-bar";

import AppHeader from "./App-header";

interface DashboardLayoutProps {
  portal: "Admin" | "Parish" | "Committee";
  items: SidebarItem[];
  children: ReactNode;
}

export default function DashboardLayout({
  portal,
  items,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AppSidebar
        portal={portal}
        items={items}
      />

      <div className="flex flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}