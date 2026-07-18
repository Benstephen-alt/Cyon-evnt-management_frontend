"use client";

import { useEffect, useState } from "react";

interface Admin {
  fullName?: string;
  role?: string;
}

export default function Header() {
  const [admin, setAdmin] = useState<Admin>({});

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return (
    <header className="flex items-center justify-between bg-white border-b px-8 py-5">

      <button
  onClick={() => history.back()}
  className="mb-5 rounded-lg border px-4 py-2 hover:bg-gray-100"
>
  ← Back
</button>

      <div>
        <h1 className="text-3xl font-bold text-[#0B6B3A]">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, {admin.fullName || "Administrator"}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="font-semibold">
            {admin.fullName || "Administrator"}
          </p>

          <p className="text-sm text-gray-500">
            {admin.role || "SUPER_ADMIN"}
          </p>
        </div>

        <div className="h-12 w-12 rounded-full bg-[#0B6B3A] flex items-center justify-center text-white text-lg font-bold">
          {admin.fullName?.charAt(0) || "A"}
        </div>

      </div>

    </header>
  );
}