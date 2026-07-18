"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ParishQrPage() {
  const [qrImage, setQrImage] = useState("");
  const [parishName, setParishName] = useState("");
  const [parishCode, setParishCode] = useState("");

  useEffect(() => {
    loadQr();
  }, []);

  async function loadQr() {
    const response = await getMyParishQr();

    setQrImage(response.data.qrImage);
    setParishName(response.data.parishName);
    setParishCode(response.data.parishCode);
  }


async function getMyParishQr() {
  const response = await api.get(
    "/qr/parish/me/qrcode"
  );

  return response.data;
}


  function downloadQr() {
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = `${parishName}-QR.png`;
    a.click();
  }

  return (
    <div className="mx-auto max-w-xl p-8">

      <h1 className="text-3xl font-bold mb-8">
        Parish QR Code
      </h1>

      <div className="rounded-2xl border p-8 bg-white shadow">

        <h2 className="text-xl font-semibold">
          {parishName}
        </h2>

        <p className="text-gray-500 mb-6">
          {parishCode}
        </p>

        {qrImage && (
          <img
            src={qrImage}
            alt="Parish QR Code"
            className="mx-auto w-72"
          />
        )}

        <button
          onClick={downloadQr}
          className="mt-8 w-full rounded-xl bg-green-600 py-3 text-white"
        >
          Download QR Code
        </button>

      </div>

    </div>
  );
}