"use client";

import Link from "next/link";

interface SidebarItemProps {
  title: string;
  href: string;
}





export default function SidebarItems({
  title,
  href,
}: SidebarItemProps) {

  return (
    <Link
      href={href}
      className="block w-full rounded-xl px-4 py-3 text-left hover:bg-[#1A8A4A] transition"
    >
      {title}
    </Link>
  );
}