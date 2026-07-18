import api from "@/lib/api";
import { id } from "date-fns/locale";

export interface IncomeRecord {
  id: string;

  source:
    | "PARISH_REGISTRATION"
    | "VENDOR_REGISTRATION"
    | "DONATION"
    | "SPONSORSHIP"
    | "OTHER";

  payerName: string;

  amount: number;

  receiptUrl?: string;

  remarks?: string;

  recordedBy: string;

  createdAt: string;
}

export interface IncomeStatistics {
  totalIncome: number;

  parishIncome: number;

  vendorIncome: number;

  donationIncome: number;

  sponsorshipIncome: number;

  otherIncome: number;
}

export interface CreateIncomeDto {
  source:
    | "DONATION"
    | "SPONSORSHIP"
    | "OTHER";

  payerName: string;

  amount: number;

  receiptUrl?: string;

  remarks?: string;
}

export interface UpdateIncomeDto
  extends CreateIncomeDto {}


  export async function getIncomeStatistics() {
  const response =
    await api.get(
      "/income/statistics"
    );

  return response.data;
}


export async function getIncomeRecords() {
  const response =
    await api.get("/income/incomes");

  return response.data;
}

export async function getIncomeRecord(
  id: string
) {
  const response =
    await api.get(
      `/income/${id}`
    );

  return response.data;
}

export async function createIncome(
  data: CreateIncomeDto
) {
  const response =
    await api.post(
      "/income",
      data
    );

  return response.data;
}

export async function updateIncome(
  id: string,
  data: UpdateIncomeDto
) {
  const response =
    await api.put(
      `/income/${id}`,
      data
    );

  return response.data;
}

export async function deleteIncome(
  id: string
) {
  const response =
    await api.delete(
      `/income/${id}`
    );

  return response.data;
}

export interface CreateBudgetDto {
  amount: number;
}

export async function createBudget(
  data: CreateBudgetDto
) {
  const response = await api.post(
    "/finance/create-budgets",
    data
  );

  return response.data;
}

export interface UpdateBudgetDto {
  amount: number;
}

export async function updateBudget(
  data: UpdateBudgetDto
) {
  const response = await api.put(
    `/finance/update-budget`,
    data
  );

  return response.data;
}

export interface FinanceDashboard {
  totalBudget: number;

  totalExpenses: number;

  balance: number;

  deficit: number;

  financialStatus: "BALANCE" | "DEFICIT";

  executiveReleases: {
    id: string;

    releasedBy: string;

    recipient: string;

    purpose: string;

    amount: number;

    receiptUrl?: string;

    createdAt: string;
  }[];
}

export async function getFinanceDashboard() {
  const response = await api.get(
    "/finance/finance-dashboard"
  );

  return response.data as {
    success: boolean;
    data: FinanceDashboard;
  };
}

export interface CreateFundReleaseDto {
  authority:
    | "DIOCESAN_PRESIDENT"
    | "GENERAL_COMMITTEE_CHAIRMAN"
    | "CHAPLAIN";

  committeeId: string;

  committeeMemberId: string;

  amount: number;

  remarks?: string;

  receiptUrl?: string;
}

export async function createFundRelease(
  data: CreateFundReleaseDto
) {
  const response = await api.post(
    "/finance/fund-releases",
    data
  );

  return response.data;
}

export async function uploadFile(
  formData: FormData
) {
  const response = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
}


export async function deleteFundRelease(
  id: string
) {
  const response = await api.delete(
    `/finance/delete-fund-releases/${id}`
  );

  return response.data;
}

export interface CommitteeOption {
  id: string;
  committeeName: string;
}

export async function getCommitteeOptions() {
  const response = await api.get(
    "/finance/options"
  );

  return response.data;
}

export interface getCommitteeOption {
  id: string;
  committeeName: string;
}

export interface CommitteeMemberOption {
  id: string;
  fullName: string;
}

export async function getCommitteeMembers(
  committeeId: string
) {
  const response = await api.get(
    `/finance/${committeeId}/members`
  );
  return response.data;
}

export async function getAccountSummary() {
  const response = await api.get(
    "/finance/account-summary"
  );

  return response.data;
}