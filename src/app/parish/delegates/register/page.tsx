"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentDraft,
  updateCurrentDraft,
  submitCurrentDraft,
} from "@/services/delegateDraft";
import { Badge } from "@/components/ui/badge";

import { uploadDelegatePhoto } from "@/services/upload";
import { getParishDashboardinfo } from "@/services/parish";
import { useParams } from "next/navigation";



interface DraftDelegate {
  fullName: string;
  gender: "MALE" | "FEMALE" | "";
  age: number | "";
  phoneNumber: string;
  photoUrl: string;
}

const EMPTY_DRAFT: DraftDelegate = {
  fullName: "",
  gender: "",
  age: "",
  phoneNumber: "",
  photoUrl: "",
};

export default function RegisterDelegatePage() {
  const [parishInfo, setParishInfo] = useState({
  parish: "",
  deanery: "",

});
  
const router = useRouter();
  const [draft, setDraft] =
    useState<DraftDelegate>(EMPTY_DRAFT);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [saveMessage, setSaveMessage] =
    useState("");

    const [validationError, setValidationError] = useState("");

  const initialized = useRef(false);

  const debounceTimer =
    useRef<NodeJS.Timeout | null>(null);


const { id } = useParams();

const [delegate, setDelegate] = useState<any>(null);


  // ===============================
  // INITIAL LOAD
  // ===============================

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    initialize();
  }, []);

  async function initialize() {

  const dashboard = await getParishDashboardinfo();


  
    try { 

setParishInfo({
  parish: dashboard.data.parish.parishName,
  deanery: dashboard.data.parish.deanery,
});


      setLoading(true);

      const response = await getCurrentDraft();

      if (response.data) {
        setDraft({
          fullName:
            response.data.fullName ?? "",

          gender:
            response.data.gender ?? "",

          age:
            response.data.age ?? "",

          phoneNumber:
            response.data.phoneNumber ?? "",

          photoUrl:
            response.data.photoUrl ?? "",
        });
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Unable to load draft."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===============================
  // FORM CHANGE
  // ===============================

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setDraft((prev) => ({
      ...prev,
      [name]:
        name === "age"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  }

  // ===============================
  // AUTO SAVE
  // ===============================

  useEffect(() => {
    if (loading) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(
      async () => {
        try {
          setSaving(true);

          await updateCurrentDraft(draft);

          setSaveMessage(
            "✓ All changes saved"
          );

        } catch {

          setSaveMessage(
            "Unable to save draft."
          );

        } finally {

          setSaving(false);

        }
      },
      800
    );

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [draft]);

  // ===============================
  // PHOTO UPLOAD
  // ===============================

  


  async function handlePhotoUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response =
        await uploadDelegatePhoto(file);

      setDraft((prev) => ({
        ...prev,
        photoUrl: response.photoUrl,
      }));

    } catch {

      alert(
        "Unable to upload photo."
      );

    } finally {

      setUploading(false);

    }
  }

  // ===============================
  // SUBMIT
  // ===============================

  async function handleSubmit() {
  setValidationError("");

  if (!draft.fullName.trim()) {
    setValidationError("Delegate full name is required.");
    return;
  }

  if (!draft.gender) {
    setValidationError("Please select delegate gender.");
    return;
  }

  if (!draft.age) {
    setValidationError("Age is required.");
    return;
  }

  if (!draft.phoneNumber.trim()) {
    setValidationError("Phone number is required.");
    return;
  }

  if (!draft.photoUrl) {
    setValidationError("Delegate photograph is required.");
    return;
  }

  try {
    setSubmitting(true);

    const response = await submitCurrentDraft();

    router.push(
  `/parish/delegates/register/success/${response.delegate.id}`
);

  } catch (err: any) {
    setValidationError(
      err?.response?.data?.message ??
      "Unable to submit delegate."
    );
  } finally {
    setSubmitting(false);
  }
}

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading...
    </div>
  );
}
    return (
  <div className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-5xl px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0B6B3A]">
          Register Delegate
        </h1>

        <p className="mt-2 text-gray-600">
          Fill in the delegate information. Your progress is saved
          automatically.
        </p>
      </div>

      {/* Status */}
      <div className="mb-6 flex flex-wrap items-center gap-4">

        {saving ? (
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
            Saving...
          </span>
        ) : (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
          {saving ? (
    <Badge>Saving...</Badge>
) : (
    <Badge>{saveMessage || "✓ All changes saved"}</Badge>
)}
          </span>
        )}

        {uploading && (
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Uploading photo...
          </span>
        )}

        {error && (
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
            {error}
          </span>
        )}

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* ================= PHOTO ================= */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-semibold">
            Delegate Photograph
          </h2>

          <div className="flex flex-col items-center">

            {draft.photoUrl ? (
              <img
                src={`http://localhost:5000${draft.photoUrl}`}
                alt="Delegate"
                className="h-56 w-56 rounded-xl border object-cover"
              />
            ) : (
              <div className="text-center">

  <div className="mb-3 text-6xl">
    📷
  </div>

  <p className="font-medium">
    Upload Delegate Photograph
  </p>

  <p className="mt-2 text-sm text-gray-400">
    JPG, PNG (Maximum 5MB)
  </p>

</div>
            )}

            <label className="mt-5 w-full cursor-pointer rounded-lg bg-[#0B6B3A] px-5 py-3 text-center font-medium text-white transition hover:bg-green-700">

              Choose Photograph

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />

            </label>

          </div>

        </div>

        {/* ================= FORM ================= */}

        <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-xl font-semibold">
            Personal Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={draft.fullName}
                onChange={handleChange}
                placeholder="Enter delegate name"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0B6B3A]"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Gender
              </label>

              <select
                name="gender"
                value={draft.gender}
                onChange={(e) => setDraft({
                  ...draft, gender: e.target.value as "MALE" | "FEMALE",
                })}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0B6B3A]"
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Age
              </label>

              <input
                type="number"
                value={draft.age}
                onChange={(e) =>
        setDraft({
            ...draft,
            age: e.target.value === "" ? "" : Number(e.target.value),
        })
    }
                placeholder="Age"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0B6B3A]"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium">
                Phone Number
              </label>

              <input
                 value={draft.phoneNumber}
    onChange={(e) =>
        setDraft({
            ...draft,
            phoneNumber: e.target.value,
        })
    }
                placeholder="08012345678"
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0B6B3A]"
              />

            </div>

          </div>

          {/* Parish Info */}

          <div className="mt-10">

            <h2 className="mb-5 text-xl font-semibold">
              Parish Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Parish
                </label>

                <input className="w-full rounded-lg border bg-gray-100 px-4 py-3"
    value={parishInfo.parish}
    readOnly
/>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Deanery
                </label>

                <input className="w-full rounded-lg border bg-gray-100 px-4 py-3"
    value={parishInfo.deanery}
    readOnly
              />

              </div>

            </div>

          </div>

          {/* Submit */}

          {validationError && (
  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
    {validationError}
  </div>
)}

          <div className="mt-10 flex justify-end">

           <button
  onClick={handleSubmit}
  disabled={
    submitting ||
    uploading ||
    saving
  }
  className="rounded-lg bg-[#0B6B3A] px-10 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
>

  {submitting
    ? "Submitting Delegate..."
    : "Submit Delegate"}

</button>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}
  

