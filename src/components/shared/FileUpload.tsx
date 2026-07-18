"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (file: File) => void;
}

export default function FileUpload({
  label,
  accept = "*",
  onChange,
}: FileUploadProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  return (
    <div>

      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        onChange={(e) => {
          const file =
            e.target.files?.[0];

          if (file) {
            onChange(file);
          }
        }}
      />

      <button
        type="button"
        onClick={() =>
          inputRef.current?.click()
        }
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-400 p-6 hover:bg-gray-50"
      >
        <Upload size={20} />

        Upload Receipt

      </button>

    </div>
  );
}