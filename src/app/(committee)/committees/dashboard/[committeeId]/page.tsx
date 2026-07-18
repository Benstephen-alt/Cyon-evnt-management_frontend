"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import SummaryCards from "@/components/dashboard/SummaryCards";
import FinancialStatus from "@/components/dashboard/FinancialStatus";
import FundReleaseTable from "@/components/dashboard/FundReleaseTable";
import ExpenseTable from "@/components/dashboard/ExpenseTable";
import ExpenseModal from "@/components/dashboard/ExpenseModal";

import {
  getCommitteeDashboard,
  createExpense,
  updateExpense,
  deleteExpense,
} from "@/services/committee";

import { uploadExpenseReceipt} from "@/services/upload";

import {
  CommitteeDashboard,
  ExpenseRecord,
} from "@/types/committeeDashboard";

import {
  ExpenseFormData,
} from "@/types/expenses";


export default function CommitteeDashboardPage(){ 

const [loading, setLoading] =
useState(true);

const [saving, setSaving] =
useState(false);

const [uploading, setUploading] =
useState(false);

const [dashboard, setDashboard] =
useState<CommitteeDashboard | null>(null);

const [showExpenseModal, setShowExpenseModal] =
useState(false);

const [editingExpense, setEditingExpense] =
useState<ExpenseRecord | null>(null);

const [expenseForm, setExpenseForm] =
useState<ExpenseFormData>({
  expenseName: "",
  description: "",
  amount: 0,
  receiptType: "RECEIPT",
  receiptUrl: "",
});


const { committeeId } = useParams();

useEffect(() => {

    if (!committeeId) return;

    fetchDashboard();

}, [committeeId]);



async function fetchDashboard() {

    try{

        setLoading(true);

        const data =
            await getCommitteeDashboard(
                committeeId as string
            );

        setDashboard(data);

    }finally{

        setLoading(false);

    }

}


function handleEditExpense(
    expense: ExpenseRecord
){

    setEditingExpense(expense);

    setExpenseForm({

        expenseName:
            expense.expenseName,

        description:
            expense.description,

        amount:
            Number(expense.amount),

        receiptType:
            expense.receiptType,

        receiptUrl:
            expense.receiptUrl ?? "",

    });

    setShowExpenseModal(true);

}


async function handleDeleteExpense(
  expenseId: string
) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this expense?"
  );

  if (!confirmed) return;

  try {
    await deleteExpense(expenseId);

    await fetchDashboard();
  } catch (error) {
    console.error(error);

    alert(
      "Failed to delete expense."
    );
  }
}


async function handleSaveExpense(){

    if(!dashboard) return;

    try{

        setSaving(true);

        if(editingExpense){

            await updateExpense(
                editingExpense.id,
                expenseForm
            );

        }else{

            await createExpense(
                dashboard.committee.id,
                expenseForm
            );

        }

        setShowExpenseModal(false);

        setEditingExpense(null);

        fetchDashboard();

    }finally{

        setSaving(false);

    }

}


async function handleReceiptUpload(
    file:File
){

    try{

        setUploading(true);

        const url =
            await uploadExpenseReceipt(file);

        setExpenseForm({

            ...expenseForm,

            receiptUrl:url,

        });
 
    }finally{

        setUploading(false);

    }

}



if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading dashboard...
      </div>
    );
  }






return (

<div className="space-y-8">

{/* Header */}

<div className="flex items-center justify-between">

<div>

<h1 className="text-3xl font-bold">

{dashboard?.committee.committeeName}

</h1>

<p className="text-gray-500">

Committee Finance Dashboard

</p>

</div>

<button

onClick={()=>{

setEditingExpense(null);

setExpenseForm({

expenseName:"",

description:"",

amount:0,

receiptType:"RECEIPT",

receiptUrl:"",

});

setShowExpenseModal(true);

}}

className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"

>

+ Record Expense

</button>

</div>

<SummaryCards

totalReleased={
dashboard?.totalReleased ?? 0
}

totalExpenses={
dashboard?.totalExpenses ?? 0
}

availableBalance={
dashboard?.availableBalance ?? 0
}

deficit={
dashboard?.deficit ?? 0
}

/>

<FinancialStatus

financialStatus={
dashboard?.financialStatus ??
"BALANCE"
}

availableBalance={
dashboard?.availableBalance ?? 0
}

deficit={
dashboard?.deficit ?? 0
}

/>

<FundReleaseTable

releases={
dashboard?.fundReleases ?? []
}

/>

<ExpenseTable

expenses={
dashboard?.expenses ?? []
}

onEdit={handleEditExpense}

onDelete={handleDeleteExpense}

/>

<ExpenseModal

open={showExpenseModal}

editing={!!editingExpense}

loading={saving}

uploading={uploading}

value={expenseForm}

onClose={()=>{

setShowExpenseModal(false);

setEditingExpense(null);

}}

onChange={setExpenseForm}

onSave={handleSaveExpense}

onUpload={handleReceiptUpload}

/>

</div>

);
}
