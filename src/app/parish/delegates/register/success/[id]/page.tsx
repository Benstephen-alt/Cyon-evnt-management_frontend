"use client";
import { useEffect, useState, useRef } from "react";

import { useParams } from "next/navigation";

import { useRouter } from "next/navigation";

import api from "@/lib/api";
import html2canvas from "html2canvas";

export default function SuccessPage() {




const router = useRouter();

const { id } = useParams();

const [loading, setLoading] = useState(true);

const [delegate, setDelegate] = useState<any>(null);

const badgeRef = useRef<HTMLDivElement>(null);

const registerAnother = () => {
  router.push("/parish/delegates/register");
};

useEffect(() => {
  loadDelegate();
}, []);

async function loadDelegate() {
  try {

    const response = await api.get(
      `/delegates/${id}`
    );

    setDelegate(response.data.delegate);

  } finally {

    setLoading(false);

  }
}


const downloadBadge = async () => {
  if (!badgeRef.current) return;

  const canvas = await html2canvas(badgeRef.current, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
  });

  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = `${delegate.delegateNumber}.png`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



if (loading) {
  return (
    <div className="flex h-screen items-center justify-center">
      Loading...
    </div>
  );
}

return (

<div className="mx-auto max-w-5xl p-10">

<div className="rounded-2xl bg-white shadow-lg">

<div className="border-b p-8 text-center">

<div className="text-6xl">

✅

</div>

<h1 className="mt-5 text-4xl font-bold text-green-700">

Registration Successful

</h1>

<p className="mt-3 text-gray-600">

The delegate has been registered successfully.

</p>

</div>

<div className="grid gap-8 p-8 md:grid-cols-2">

<div>

<h2 className="mb-6 text-xl font-bold">

Delegate Details

</h2>

<div className="space-y-4">

<InfoRow
label="Delegate Number"
value={delegate.delegateNumber}
/>

<InfoRow
label="Name"
value={delegate.fullName}
/>

<InfoRow
label="Parish"
value={delegate.parishName}
/>

<InfoRow
label="Deanery"
value={delegate.deaneryName}
/>

</div>

</div>

<div>

<h2 className="mb-6 text-xl font-bold">

Badge Preview
</h2>


<div ref={badgeRef}  className="w-[360px] h-[560px]" > 
<img

src={`http://localhost:5000/api/badges/${delegate.id}`}

className="rounded-xl border shadow-lg"

/>
</div>


<div className="mt-8 flex gap-4">

  <button
    onClick={downloadBadge}
    className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
  >
    Download Badge
  </button>

  <button
    onClick={registerAnother}
    className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
  >
    Register Another Delegate
  </button>

</div>





</div>

</div>

</div>

</div>

);

function InfoRow({
    label,
    value,
}:{
    label:string;
    value:string;
}){

return(

<div>

<p className="text-sm text-gray-500">

{label}

</p>

<p className="font-semibold">

{value}

</p>

</div>

);

}
}