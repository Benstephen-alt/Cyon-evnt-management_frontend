

import { EXPENSE_CATEGORIES, RECEIPT_TYPES } from "@/app/constants/expensesCategories";
import FileUpload from "@/components/shared/FileUpload";
import { ExpenseFormData } from "@/types/expenses";


interface ExpenseModalProps {
  open: boolean;

  loading: boolean;

  uploading: boolean;

  editing: boolean;

  value: ExpenseFormData;

  onClose(): void;

  onSave(): void;

  onUpload(file: File): void;

  onChange(
    value: ExpenseFormData
  ): void;
}





export default function ExpenseModal({
  open,
  loading,
  uploading,
  editing,
  value,
  onClose,
  onSave,
  onUpload,
  onChange,
}: ExpenseModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold">

            {editing
              ? "Edit Expense"
              : "Record Expense"}

          </h2>

          <p className="mt-1 text-gray-500">

            Enter the expense details.

          </p>

        </div>

        {/* Body */}

        <div className="grid gap-6 p-6 md:grid-cols-2">


            <div>

<label className="mb-2 block">

Expense Name

</label>

<input
className="w-full rounded-lg border p-3"
value={value.expenseName}
onChange={(e)=>

onChange({
...value,
expenseName:e.target.value,
})

}
/>

</div>






<div>

<label className="mb-2 block">

Amount

</label>

<input
type="number"
className="w-full rounded-lg border p-3"
value={value.amount}
onChange={(e)=>

onChange({
...value,
amount:Number(e.target.value),
})

}
/>

</div>



<div>

<label className="mb-2 block">

Payment Method

</label>

<select
className="w-full rounded-lg border p-3"
value={value.receiptType}
onChange={(e)=>

onChange({
...value,
receiptType:e.target.value as any,
})

}
>

{RECEIPT_TYPES.map(type=>(

<option
key={type.value}
value={type.value}
>

{type.label}

</option>

))}

</select>

</div>


<div className="md:col-span-2">

<label className="mb-2 block">

Description

</label>

<textarea
rows={4}
className="w-full rounded-lg border p-3"
value={value.description}
onChange={(e)=>

onChange({
...value,
description:e.target.value,
})

}
/>

</div>


<div className="md:col-span-2">

{

value.receiptUrl ? (

<div className="rounded-lg bg-green-100 p-4 text-green-700">

Receipt uploaded successfully.

</div>

) : (

uploading ? (

<div className="rounded-lg border p-6 text-center">

Uploading receipt...

</div>

) : (

<FileUpload
label="Receipt"
accept=".jpg,.jpeg,.png,.pdf"
onChange={onUpload}
/>

)

)

}

</div>




<div className="flex justify-end gap-3 border-t p-6">

<button
type="button"
onClick={onClose}
className="rounded-lg border px-5 py-2"
>

Cancel

</button>

<button
type="button"
onClick={onSave}
disabled={loading}
className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
>

{

loading

? "Saving..."

: editing

? "Update Expense"

: "Save Expense"

}

</button>

</div>

      </div>

    </div>

    </div>

  );}
