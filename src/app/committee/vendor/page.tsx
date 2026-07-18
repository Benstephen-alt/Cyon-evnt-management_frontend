"use client";

import { useEffect, useState } from "react";

import { Download } from "lucide-react";

import AdminHeader from "../../admin/dashboard/Header";

import VendorTag from "@/components/vendor/vendor";

import {
  getVendors,
  createVendor,
  updateVendor,
  VendorCategory, Vendor,  deleteVendor,
  downloadVendorTag,
  printVendorTag,
} from "@/services/committee";



export default function VendorPage() {

    const [vendors, setVendors] =
  useState<any[]>([]);

const [loading, setLoading] =
  useState(true);

const [showModal, setShowModal] =
  useState(false);

  const [editingVendor, setEditingVendor] =
  useState<Vendor | null>(null);
  
const [deletingId, setDeletingId] =
  useState<string | null>(null);

  const [showTagPreview, setShowTagPreview] =
  useState(false);

const [selectedVendor, setSelectedVendor] =
  useState<Vendor | null>(null);

  const [form, setForm] = useState({
  businessName: "",

  ownerName: "",

  phoneNumber: "",

  category: VendorCategory.OTHER,

  description: "",

  amountPaid: 0,

  remarks: "",
});

const [saving, setSaving] =
  useState(false);

  useEffect(() => {
  loadVendors();
}, []);


async function handleSubmit() {
  try {
    if (
      !form.businessName ||
      !form.ownerName ||
      !form.phoneNumber ||
      !form.amountPaid
    ) {
      alert(
        "Please complete all required fields."
      );

      return;
    }

    setSaving(true);

    if (editingVendor) {
  await updateVendor(
    editingVendor.id,
    {
      businessName:
        form.businessName,

      ownerName:
        form.ownerName,

      phoneNumber:
        form.phoneNumber,

      category:
        form.category,

      description:
        form.description,

      amountPaid:
        Number(form.amountPaid),

      remarks:
        form.remarks,
    }
  );
} else {
  await createVendor({
    businessName:
      form.businessName,

    ownerName:
      form.ownerName,

    phoneNumber:
      form.phoneNumber,

    category:
      form.category,

    description:
      form.description,

    amountPaid:
      Number(form.amountPaid),

    remarks:
      form.remarks,
  });
}

    setShowModal(false);

    setEditingVendor(null);

    setForm({
      businessName: "",

      ownerName: "",

      phoneNumber: "",

      category: VendorCategory.OTHER,

      description: "",

      amountPaid: 0,

      remarks: "",
    });

    loadVendors();

  } catch (error) {
    console.error(error);

    alert(
      "Unable to register vendor."
    );
  } finally {
    setSaving(false);
  }
}

async function loadVendors() {
  try {
    setLoading(true);

    const response =
      await getVendors();

    setVendors(response.data);

  } finally {
    setLoading(false);
  }
}


async function handleDelete(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this vendor?\n\nThis will also remove the corresponding income record."
  );

  if (!confirmed) return;

  try {
    setDeletingId(id);

    await deleteVendor(id);

    await loadVendors();

    alert("Vendor deleted successfully.");
  } catch (error) {
    console.error(error);

    alert("Unable to delete vendor.");
  } finally {
    setDeletingId(null);
  }
}


async function handleDownloadTag(
  id: string
) {
  try {
    const blob =
      await downloadVendorTag(id);

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "Vendor-Tag.pdf";

    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);

    alert(
      "Unable to download vendor tag."
    );
  }
}

if (loading) {
  return (
    <>
      <AdminHeader />

      <div className="p-8">

        Loading...

      </div>

    </>
  );
}


return (
  <>
    <AdminHeader />

    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

  <div>

    <h1 className="text-3xl font-bold">

      Vendor Management

    </h1>

    <p className="mt-2 text-gray-500">

      Register and manage event vendors.

    </p>

  </div>

  <button
  type="button"
    onClick={() =>
      setShowModal(true)
    }
    className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
  >
    Register Vendor
  </button>

</div>



      <div className="grid gap-6 md:grid-cols-2">

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">

      Total Vendors

    </p>

    <h2 className="mt-3 text-3xl font-bold">

      {vendors.length}

    </h2>

  </div>

  <div className="rounded-2xl bg-white p-6 shadow">

    <p className="text-gray-500">

      Total Vendor Income

    </p>

    <h2 className="mt-3 text-3xl font-bold text-green-600">

      ₦
      {vendors
        .reduce(
          (
            total,
            vendor
          ) =>
            total +
            vendor.amountPaid,
          0
        )
        .toLocaleString("en-NG")}

    </h2>

  </div>

</div>



      <div className="rounded-2xl bg-white shadow">

  <div className="border-b p-6">

    <h2 className="text-2xl font-bold">

      Registered Vendors

    </h2>

    <p className="mt-1 text-sm text-gray-500">

      All vendors registered for the active event.

    </p>

  </div>

  <div className="overflow-x-auto">

    <table className="min-w-full">

      <thead className="bg-gray-100">

        <tr>

          <th className="p-4 text-left">
            Vendor Code
          </th>

          <th className="p-4 text-left">
            Business
          </th>

          <th className="p-4 text-left">
            Owner
          </th>

          <th className="p-4 text-left">
            Phone
          </th>

          <th className="p-4 text-left">
            Category
          </th>

          <th className="p-4 text-right">
            Amount
          </th>

          <th className="p-4 text-left">
            Registered By
          </th>

          <th className="p-4 text-center">
            Action
          </th>

        </tr>

      </thead>

      <tbody>

        {vendors.length === 0 ? (

          <tr>

            <td
              colSpan={8}
              className="p-10 text-center text-gray-500"
            >

              No vendors registered yet.

            </td>

          </tr>

        ) : (

          vendors.map((vendor) => (

            <tr
              key={vendor.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4 font-semibold">

                {vendor.vendorCode}

              </td>

              <td className="p-4">

                {vendor.businessName}

              </td>

              <td className="p-4">

                {vendor.ownerName}

              </td>

              <td className="p-4">

                {vendor.phoneNumber}

              </td>

              <td className="p-4">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                  {vendor.category
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .replace(
                      /\b\w/g,
                      (c: string) =>
                        c.toUpperCase()
                    )}

                </span>

              </td>

              <td className="p-4 text-right font-semibold">

                ₦
                {Number(
                  vendor.amountPaid
                ).toLocaleString("en-NG")}

              </td>

              <td className="p-4">

                {vendor.recordedBy}

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <button
  type="button"
  onClick={() => {
    setEditingVendor(vendor);

    setForm({
      businessName: vendor.businessName,

      ownerName: vendor.ownerName,

      phoneNumber: vendor.phoneNumber,

      category: vendor.category,

      description:
        vendor.description ?? "",

      amountPaid: vendor.amountPaid,

      remarks:
        vendor.remarks ?? "",
    });

    setShowModal(true);
  }}
  className="rounded bg-yellow-500 px-3 py-2 text-sm font-semibold text-white hover:bg-yellow-600"
>
  Edit
</button>
                  <button
  type="button"
  onClick={() => handleDelete(vendor.id)}
  disabled={deletingId === vendor.id}
  className="rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
>
  {deletingId === vendor.id
    ? "Deleting..."
    : "Delete"}
</button>

                  <button
  type="button"
  onClick={() => {
    setSelectedVendor(vendor);
    setShowTagPreview(true);
  }}
  className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
>
  Tag
</button>

                </div>

              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>



     {showModal && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

<div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

<div className="border-b p-6">

<h2 className="text-2xl font-bold">

{editingVendor
  ? "Edit Vendor"
  : "Register Vendor"}

</h2>

<p className="text-gray-500">

Register a new vendor.

</p>

</div>

<div className="space-y-5 p-6">

{/* Business Name */}

<div>

<label className="mb-2 block font-medium">

Business Name *

</label>

<input
className="w-full rounded-lg border p-3"
value={form.businessName}
onChange={(e)=>
setForm({
...form,
businessName:e.target.value
})
}
/>

</div>

{/* Owner */}

<div>

<label className="mb-2 block font-medium">

Owner Name *

</label>

<input
className="w-full rounded-lg border p-3"
value={form.ownerName}
onChange={(e)=>
setForm({
...form,
ownerName:e.target.value
})
}
/>

</div>

{/* Phone */}

<div>

<label className="mb-2 block font-medium">

Phone Number *

</label>

<input
className="w-full rounded-lg border p-3"
value={form.phoneNumber}
onChange={(e)=>
setForm({
...form,
phoneNumber:e.target.value
})
}
/>

</div>



<div>

<label className="mb-2 block font-medium">

Category

</label>

<select
  value={form.category}
  onChange={(e) =>
    setForm({
      ...form,
      category: e.target.value as VendorCategory,
    })
  }
>

<option value="FOOD">

Food

</option>

<option value="DRINKS">

Drinks

</option>

<option value="PROVISIONS">

Provisions

</option>

<option value="POS">

POS

</option>

<option value="CLOTHING">

Clothing

</option>

<option value="BOOKS">

Books

</option>

<option value="RELIGIOUS_ITEMS">

Religious Items

</option>

<option value="SERVICES">

Services

</option>

<option value="ELECTRONICS">

Electronics

</option>

<option value="AGRICULTURE">

Agriculture

</option>

<option value="CRAFTS">

Crafts

</option>

<option value="HEALTH_BEAUTY">

Health & Beauty

</option>

<option value="OTHER">

Other

</option>

</select>

</div>


<div>

<label className="mb-2 block font-medium">

Description

</label>

<textarea
rows={3}
className="w-full rounded-lg border p-3"
value={form.description}
onChange={(e)=>
setForm({
...form,
description:e.target.value
})
}
/>

</div>


<div>

<label className="mb-2 block font-medium">

Amount Paid *

</label>

<input
    type="number"
    value={form.amountPaid}
    onChange={(e) =>
        setForm({
            ...form,
            amountPaid: Number(e.target.value),
        })
    }
/>

</div>



<div>

<label className="mb-2 block font-medium">

Remarks

</label>

<textarea
rows={3}
className="w-full rounded-lg border p-3"
value={form.remarks}
onChange={(e)=>
setForm({
...form,
remarks:e.target.value
})
}
/>

</div>

<div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white p-6">

<button
type="button"
onClick={()=>
setShowModal(false)
}
className="rounded-lg border px-5 py-3"
>

Cancel

</button>

<button
type="button"
onClick={handleSubmit}
disabled={saving}
className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
>

{saving
  ? editingVendor
    ? "Updating..."
    : "Registering..."
  : editingVendor
    ? "Update Vendor"
    : "Register Vendor"}
</button>

</div>

</div>

</div>
</div>

     )}




   {
  showTagPreview &&
    selectedVendor && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

        <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

          {/* Header */}

          <div className="border-b p-5">

            <h2 className="text-xl font-bold">

              Vendor Tag Preview

            </h2>

            <p className="text-sm text-gray-500">

              Verify the information before downloading.

            </p>

          </div>

          {/* Body */}

          <div className="flex justify-center bg-gray-100 p-8">

            <VendorTag
              vendor={selectedVendor}
            />

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t p-5">

            <button
              type="button"
              onClick={() =>
                setShowTagPreview(false)
              }
              className="rounded-lg border px-5 py-2"
            >
              Close
            </button>

           <button
  type="button"
  onClick={() => {
    if (selectedVendor) {
      printVendorTag(selectedVendor);
    }
  }}
  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
>
  <Download size={18} />
  Download PDF
</button>

          </div>

        </div>

      </div>
   )};


<div
  style={{
    position: "fixed",
    left: "-10000px",
    top: 0,
    zIndex: -1,
  }}
>
  {selectedVendor && (
    <div id="vendor-tag-print">
      <VendorTag vendor={selectedVendor} />
    </div>
  )}
</div>


</div>
</>
);}