"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

     

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.admin.role);

       localStorage.setItem("admin", JSON.stringify(data.admin));

       router.push("/admin/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Unable to connect to server.");
      console.error(error);
    }

    

    setLoading(false);
  }

  return (
    <div> 

     <div className="flex flex-col items-center">

  <Image
    src="/images/cyon-logo.png"
    alt="CYON Logo"
    width={110}
    height={110}
    priority
    className="drop-shadow-md"
  />

  <div className="mt-5 rounded-full bg-green-100 p-3">
    <ShieldCheck className="h-8 w-8 text-[#0B6B3A]" />
  </div>

  <h1 className="mt-5 text-3xl font-bold text-[#0B6B3A]">
    Administrator Portal
  </h1>

  <p className="mt-2 text-center text-gray-500">
    Sign in to manage the event,
    registrations and system settings.
  </p>

</div>





    <form onSubmit={handleSubmit} className="space-y-5 mt-8">

      <div>
        <label className="block mb-2 font-medium">
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@cyonnsukka.org"
          className="w-full rounded-xl border p-3 focus:border-[#0B6B3A] outline-none"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="w-full rounded-xl border p-3 focus:border-[#0B6B3A] outline-none"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-[#0B6B3A] py-3 text-white font-semibold hover:bg-green-800 transition"
      >
        {loading ? "Signing In..." : "Login"}
      </button>

    </form>




    </div>
  );
}