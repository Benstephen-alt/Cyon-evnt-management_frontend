
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  Church,
  Users,
  ArrowRight,
} from "lucide-react";



export default function LoginCard() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-3xl rounded-[32px] border border-[#D4A017]/30 bg-white shadow-2xl overflow-hidden">

      <CardContent className="p-12">

        {/* Logo & Heading */}

        <div className="flex flex-col items-center">

  <Image
    src="/images/cyon-logo.png"
    alt="CYON Logo"
    width={130}
    height={130}
    priority
    className="drop-shadow-lg"
  />

  <h1 className="mt-6 text-4xl font-extrabold text-[#0B6B3A]">
    Event Management
  </h1>

  <p className="mt-2 text-lg text-gray-600">
    Catholic Youth Organisation of Nigeria
  </p>

  <p className="text-gray-500">
    Nsukka Diocese
  </p>

  <p className="mt-8 text-gray-500">
    Select how you want to continue
  </p>

</div>

        {/* Tabs */}

        <div className="mt-10 space-y-5">




        <Card
  onClick={() => router.push("/admin/login")}
  className="cursor-pointer rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6B3A] hover:shadow-xl"
>
  <CardContent className="flex items-center justify-between p-6">

    <div className="flex items-center gap-5">

      <div className="rounded-xl bg-green-50 p-4">
        <ShieldCheck className="h-8 w-8 text-[#0B6B3A]" />
      </div>

      <div>

        <h2 className="text-xl font-bold text-[#0B6B3A]">
          Chaplain
        </h2>

        <p className="mt-1 text-gray-500">
          Chaplain portal.
        </p>

      </div>

    </div>

    <ArrowRight className="text-[#0B6B3A]" />

  </CardContent>
</Card>



 <Card
  onClick={() => router.push("/parish/login")}
  className="cursor-pointer rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6B3A] hover:shadow-xl"
>
  <CardContent className="flex items-center justify-between p-6">

    <div className="flex items-center gap-5">

      <div className="rounded-xl bg-green-50 p-4">
        <Church className="h-8 w-8 text-[#0B6B3A]" />
      </div>

      <div>

        <h2 className="text-xl font-bold text-[#0B6B3A]">
          Parish
        </h2>

        <p className="mt-1 text-gray-500">
          Parish portal.
        </p>

      </div>

    </div>

    <ArrowRight className="text-[#0B6B3A]" />

  </CardContent>
</Card>




 <Card
  onClick={() => router.push("/committee/login")}
  className="cursor-pointer rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6B3A] hover:shadow-xl"
>
  <CardContent className="flex items-center justify-between p-6">

    <div className="flex items-center gap-5">

      <div className="rounded-xl bg-green-50 p-4">
        <Users className="h-8 w-8 text-[#0B6B3A]" />
      </div>

      <div>

        <h2 className="text-xl font-bold text-[#0B6B3A]">
          Committee
        </h2>

        <p className="mt-1 text-gray-500">
          Access committee dashboard and assigned responsibilities.
        </p>

      </div>

    </div>

    <ArrowRight className="text-[#0B6B3A]" />

  </CardContent>
</Card>


</div>


      </CardContent>

    </Card>
  );
}