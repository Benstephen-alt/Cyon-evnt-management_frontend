"use client";

import { useEffect } from "react";

import {
  Html5QrcodeScanner,
} from "html5-qrcode";

interface Props {
  onScan: (token: string) => void;
}

export default function ParishQrScanner({
  onScan,
}: Props) {
  useEffect(() => {
    const scanner =
      new Html5QrcodeScanner(
        "parish-reader",
        {
          fps: 10,
          qrbox: {
            width: 280,
            height: 280,
          },
          rememberLastUsedCamera: true,
        },
        false
      );

    scanner.render(
      async (decodedText) => {

        await scanner.clear();

        onScan(decodedText);

      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScan]);

  return (
    <div
      id="parish-reader"
      className="overflow-hidden rounded-xl"
    />
  );
}