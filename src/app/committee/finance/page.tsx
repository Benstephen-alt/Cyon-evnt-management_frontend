"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminHeader from "../../admin/dashboard/Header";

import {
  getFinanceDashboard,
  createBudget,
updateBudget,
createFundRelease,
uploadFile,
deleteFundRelease,
 getCommitteeOptions,
  getCommitteeMembers,
  getCommitteeOption,
  CommitteeMemberOption
} from "@/services/finance";


export default function FinancePage() {

  const [loading, setLoading] =
    useState(true);

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [budgetModalOpen, setBudgetModalOpen] =
    useState(false);

  const [releaseModalOpen, setReleaseModalOpen] =
    useState(false);

   
  const [savingRelease, setSavingRelease] =
  useState(false);

  const [committees, setCommittees] =
  useState<getCommitteeOption[]>([]);

const [committeeMembers, setCommitteeMembers] =
  useState<CommitteeMemberOption[]>([]);

const [releaseForm, setReleaseForm] =
  useState({
    authority: "DIOCESAN_PRESIDENT",

    committeeId: "",

    committeeMemberId: "",

    amount: "",

    remarks: "",

    receiptUrl: "",
  });



    const [budgetAmount, setBudgetAmount] =
  useState(
    dashboard?.totalBudget ?? 0
  );

const [savingBudget, setSavingBudget] =
  useState(false);

  const executiveReleases =
  dashboard?.executiveReleases ?? [];

  useEffect(() => {
    loadDashboard();
    loadCommittees();
  }, []);


   async function loadCommittees() {

  try {

    const response =
      await getCommitteeOptions();

    setCommittees(
      response.data
    );

  } catch (error) {

    console.error(error);

  }

}


  async function loadDashboard() {

  try {

    setLoading(true);

    const response =
      await getFinanceDashboard();

    setDashboard(response.data);

    setBudgetAmount(
  response.data.totalBudget
);

  } catch (error) {

    console.error(error);

    alert(
      "Unable to load finance dashboard."
    );

  } finally {

    setLoading(false);

  }

}




async function handleSaveBudget() {

  if (budgetAmount <= 0) {

    alert(
      "Budget must be greater than zero."
    );

    return;

  }

  try {

    setSavingBudget(true);

    if (
      dashboard.totalBudget > 0
    ) {

      await updateBudget({
        amount: budgetAmount,
      });

    } else {

      await createBudget({
        amount: budgetAmount,
      });

    }

    await loadDashboard();

    setBudgetModalOpen(false);

    alert(
      "Budget saved successfully."
    );

  } catch (error) {

    console.error(error);

    alert(
      "Unable to save budget."
    );

  } finally {

    setSavingBudget(false);

  }

}

async function handleCreateFundRelease() {

  if (!releaseForm.committeeId) {

  alert(
    "Please select a committee."
  );

  return;

}

if (!releaseForm.committeeMemberId) {

  alert(
    "Please select a recipient."
  );

  return;

}

  if (
    Number(releaseForm.amount) <= 0
  ) {

    alert(
      "Enter a valid amount."
    );

    return;

  }

  try {

    setSavingRelease(true);

    await createFundRelease({

      authority:
        releaseForm.authority as any,

      committeeId:
releaseForm.committeeId,

committeeMemberId:
releaseForm.committeeMemberId,

      amount: Number(
        releaseForm.amount
      ),

      remarks:
        releaseForm.remarks,

      receiptUrl:
        releaseForm.receiptUrl,
    });

    setReleaseModalOpen(false);

    setReleaseForm({
    authority: "DIOCESAN_PRESIDENT",

    committeeId: "",

    committeeMemberId: "",

    amount: "",

    remarks: "",

    receiptUrl: "",
});
    

    await loadDashboard();

  } catch (error) {

    console.error(error);

    alert(
      "Unable to create fund release."
    );

  } finally {

    setSavingRelease(false);

  }

}


async function handleDeleteFundRelease(
  id: string
) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this fund release?"
  );

  if (!confirmed) return;

  try {
    await deleteFundRelease(id);

    await loadDashboard();

    alert(
      "Fund release deleted successfully."
    );

  } catch (error) {
    console.error(error);

    alert(
      "Unable to delete fund release."
    );
  }
}


async function handleCommitteeChange(
  committeeId: string
) {

  setReleaseForm({

    ...releaseForm,

    committeeId,

    committeeMemberId: "",

  });

  try {

    const response =
      await getCommitteeMembers(
        committeeId
      );

    setCommitteeMembers(
      response.data
    );

  } catch (error) {

    console.error(error);

  }

}



if (loading) {

  return (

    <div className="flex h-[70vh] items-center justify-center">

      Loading Finance Dashboard...

    </div>

  );

}

return (

<div>

<AdminHeader
/>

<div className="mb-8 flex justify-end">

<Link
href="/committee/finance/account-summary"
className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700"
>

Account Summary →

</Link>



<Link
href="/committee/finance/income"
className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700"
>

Income →

</Link>



</div>

<div className="grid gap-6 md:grid-cols-3">

   <div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">

Budget

</p>

<h2 className="mt-3 text-3xl font-bold text-blue-700">

₦{dashboard.totalBudget.toLocaleString()}

</h2>

<button
onClick={() =>
setBudgetModalOpen(true)
}
className="mt-6 rounded-lg bg-[#0B6B3A] px-5 py-2 text-white hover:bg-green-700"
>

{dashboard.totalBudget > 0
? "Edit Budget"
: "Create Budget"}

</button>

</div>

<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">

Expenses

</p>

<h2 className="mt-3 text-3xl font-bold text-red-600">

₦{dashboard.totalExpenses.toLocaleString()}

</h2>

</div>

<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">

{dashboard.deficit > 0
? "Deficit"
: "Balance"}

</p>

<h2
className={`mt-3 text-3xl font-bold ${
dashboard.deficit > 0
? "text-red-700"
: "text-green-700"
}`}
>

₦{
Math.abs(
dashboard.balance
).toLocaleString()
}

</h2>

</div>

</div>


<div className="mt-10 rounded-2xl bg-white p-8 shadow">

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h2 className="text-2xl font-bold">

        Executive Fund Releases

      </h2>

      <p className="mt-1 text-gray-500">

        Funds released by the Diocesan President,
        Chaplain and General Committee Chairman.

      </p>

    </div>

    <button
      onClick={() =>
        setReleaseModalOpen(true)
      }
      className="rounded-lg bg-[#0B6B3A] px-6 py-3 font-semibold text-white hover:bg-green-700"
    >

      + Executive Fund Release

    </button>

  </div>


  <div className="overflow-x-auto">

  <table className="w-full">

    <thead className="bg-gray-100">

      <tr>

        <th className="p-4 text-left">
          Date
        </th>

        <th className="p-4 text-left">
          Authority
        </th>

        <th className="p-4 text-left">
          Released By
        </th>

        <th className="p-4 text-left">
          Recipient
        </th>

        <th className="p-4 text-left">
          Purpose
        </th>

        <th className="p-4 text-right">
          Amount
        </th>

        <th className="p-4 text-center">
          Receipt
        </th>

        <th className="p-4 text-center">
          Action
        </th>

      </tr>

    </thead>

    <tbody>

      {dashboard.executiveReleases.length === 0 ? (

        <tr>

          <td
            colSpan={8}
            className="p-12 text-center text-gray-500"
          >

            No executive fund releases found.

          </td>

        </tr>

      ) : (

        dashboard.executiveReleases.map (
          (release: any) => (

            <tr
              key={release.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">

                {new Date(
                  release.createdAt
                ).toLocaleDateString()}

              </td>

              <td className="p-4">

  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">

    {release.authority
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c: string) =>
        c.toUpperCase()
      )}

  </span>

</td>

<td className="p-4">

  {release.releasedBy}

</td>

<td className="p-4">

  {release.recipient}

</td>

              
              <td className="p-4">

                {release.purpose}

              </td>

              <td className="p-4 text-right font-semibold">

                ₦{Number(
                  release.amount
                ).toLocaleString()}

              </td>

              <td className="p-4 text-center">

                {release.receiptUrl ? (

                  <a
                    href={release.receiptUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#0B6B3A] hover:underline"
                  >

                    View

                  </a>

                ) : (

                  "-"

                )}

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-3">

                  <button
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >

                    Edit

                  </button>

                  <button
  onClick={() =>
    handleDeleteFundRelease(
      release.id
    )
  }
  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
>

  Delete

</button>
                </div>

              </td>

            </tr>

          )
        )

      )}

    </tbody>

  </table>

</div>

</div>


{budgetModalOpen && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

<h2 className="text-2xl font-bold">

{dashboard.totalBudget > 0
? "Edit Budget"
: "Create Budget"}

</h2>

<p className="mt-2 text-gray-500">

Enter the total budget approved
for this event.

</p>

<div className="mt-8">

<label className="mb-2 block font-medium">

Budget Amount (₦)

</label>

<input
type="number"
value={budgetAmount}
onChange={(e)=>
setBudgetAmount(
Number(e.target.value)
)
}
className="w-full rounded-lg border p-3"
/>

</div>

<div className="mt-10 flex justify-end gap-4">

<button
onClick={()=>
setBudgetModalOpen(false)
}
className="rounded-lg border px-6 py-3 font-semibold"
>

Cancel

</button>

<button
onClick={handleSaveBudget}
disabled={savingBudget}
className="rounded-lg bg-[#0B6B3A] px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
>

{savingBudget
? "Saving..."
: "Save Budget"}

</button>

</div>

</div>

</div>

)}


{
releaseModalOpen && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

  <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">


<h2 className="text-2xl font-bold">

Executive Fund Release

</h2>

<p className="mt-2 text-gray-500">

Record a fund released by the executive.

</p>

<div className="mt-6">

<label className="mb-2 block">

Authority

</label>

<select
value={releaseForm.authority}
onChange={(e)=>

setReleaseForm({
...releaseForm,

authority:
e.target.value,
})

}
className="w-full rounded-lg border p-3"
>

<option value="DIOCESAN_PRESIDENT">

Diocesan President

</option>

<option value="GENERAL_COMMITTEE_CHAIRMAN">

General Committee Chairman

</option>

<option value="CHAPLAIN">

Chaplain

</option>

</select>

</div>


<div className="mt-5">

<label className="mb-2 block">

Committee

</label>

<select
value={releaseForm.committeeId}
onChange={(e)=>
handleCommitteeChange(
e.target.value
)
}
className="w-full rounded-lg border p-3"
>

<option value="">

Select Committee

</option>

{committees.map(
(committee)=>(
<option
key={committee.id}
value={committee.id}
>

{committee.committeeName}

</option>
)
)}

</select>

</div>


<div className="mt-5">

<label className="mb-2 block">

Recipient

</label>

<select
value={
releaseForm.committeeMemberId
}
onChange={(e)=>

setReleaseForm({

...releaseForm,

committeeMemberId:
e.target.value,

})

}
className="w-full rounded-lg border p-3"
disabled={
!releaseForm.committeeId
}
>

<option value="">

Select Recipient

</option>

{committeeMembers.map(
(member)=>(
<option
key={member.id}
value={member.id}
>

{member.fullName}

</option>
)
)}

</select>

</div>


<div className="mt-5">

<label className="mb-2 block">

Amount

</label>

<input
type="number"
value={releaseForm.amount}
onChange={(e)=>

setReleaseForm({
...releaseForm,

amount:
e.target.value,
})

}
className="w-full rounded-lg border p-3"
/>

</div>

<div className="mt-5">

<label className="mb-2 block">

Purpose

</label>

<textarea
rows={4}
value={releaseForm.remarks}
onChange={(e)=>

setReleaseForm({
...releaseForm,

remarks:
e.target.value,
})

}
className="w-full rounded-lg border p-3"
/>

</div>




<div className="mt-8 flex justify-end gap-4">

<button
onClick={()=>
setReleaseModalOpen(false)
}
className="rounded-lg border px-6 py-3"
>

Cancel

</button>

<button
onClick={handleCreateFundRelease}
disabled={savingRelease}
className="rounded-lg bg-[#0B6B3A] px-8 py-3 font-semibold text-white"
>

{savingRelease
? "Saving..."
: "Save"}

</button>

</div>

</div>

</div>

)
}

</div>
);}