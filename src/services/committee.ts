import api from "@/lib/api";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { CommitteeDashboard } from "@/types/committeeDashboard";
import { ExpenseCategory, ReceiptType } from "@/types/finance";

export async function getCommittees() {
  const response = await api.get("/committees");
  return response.data;
}

export async function getCommitteeById(
    committeeId: string
){
    const response =
        await api.get(`/committees/${committeeId}`);

    return response.data;
}

export async function getCommitteeMembers() {
  const response = await api.get("/committees/get-members");

  return response.data;
}

export async function createCommitteeAssignment(data: {
  committeeId: string;
  committeeMemberId: string;
}) {
  const response = await api.post(
    "/committees/create-assignments",
    data
  );

  return response.data;
}

export async function getAvailableCommitteeUsers() {
  const response = await api.get(
    "/committees/available-users"
  );

  return response.data;
}

export async function createCommitteeMember(
  data: {
    userId: string;
  }
) {
  const response = await api.post(
    "/committees/create-members",
    data
  );

  return response.data;
}

export async function getCommitteeMemberById(
  memberId: string
) {
  const response = await api.get(
    `/committees/search-members/${memberId}`
  );

  return response.data;
}

export async function updateCommitteeMember(
  memberId: string,
  data: {
    isActive: boolean;
  }
) {
  const response = await api.patch(
    `/committees/update-member/${memberId}`,
    data
  );

  return response.data;
}

export async function deleteCommitteeMember(
  memberId: string
) {
  const response = await api.delete(
    `/committees/delete-member/${memberId}`
  );

  return response.data;
}









export async function committeeLogin(data: {
  email: string;
  password: string;
}) {
  const response = await api.post(
    "/auth/committee/login",
    data
  );

  return response.data;
}

export async function getParishArrivalDashboard() {
  const response = await api.get(
    "/parish-arrivals/arrival-dashboard"
  );

  return response.data;
}

export async function scanParishQr(
  token: string
) {
  const response = await api.post(
    "/qr/scan/parishqr",
    {
      token,
    }
  );

  return response.data;
}

export async function confirmParishArrival(
  token: string
) {
  const response = await api.post(
    "/qr/scan/parishqr/confirm",
    {
      token,
    }
  );

  return response.data;
}


export interface AccommodationHostel {
  id: string;

  hostelName: string;

  gender: "MALE" | "FEMALE";

  totalHalls: number;

  totalBeds: number;

  occupiedBeds: number;

  availableBeds: number;
}

export interface AccommodationHall {
  id: string;

  hallName: string;

  totalBeds: number;

  occupiedBeds: number;

  availableBeds: number;
}

export interface AccommodationHostelDetails {
  id: string;

  hostelName: string;

  gender: "MALE" | "FEMALE";

  totalHalls: number;

  totalBeds: number;

  occupiedBeds: number;

  availableBeds: number;

  halls: AccommodationHall[];
}


export async function GetAccommodationHostels() {
  const response = await api.get(
    "/accommodation/committee/accommodation/hostels"
  );

  return response.data;
}

export async function getAccommodationHostelById(
  hostelId: string
) {
  const response = await api.get(
    `/accommodation/committee/accommodation/hostels/${hostelId}`
  );

  return response.data;
}




export enum VendorCategory {
  FOOD = "FOOD",
  DRINKS = "DRINKS",
  PROVISION = "PROVISIONS",
  POS = "POS",
  CLOTHING = "CLOTHING",
  BOOKS = "BOOKS",
  RELIGIOUS_ITEMS = "RELIGIOUS_ITEMS",
  ELECTRONICS = "ELECTRONICS",
  SERVICES = "SERVICES",
  AGRICULTURE = "AGRICULTURE",
  CRAFTS = "CRAFTS",
  HEALTH_BEAUTY = "HEALTH_BEAUTY",
  OTHER = "OTHER",
}

export interface Vendor {
  id: string;

  vendorCode: string;

  businessName: string;

  ownerName: string;

  phoneNumber: string;

  category: VendorCategory;

  description?: string;

  amountPaid: number;

  remarks?: string;

  recordedBy: string;

  createdAt: string;
}

export interface CreateVendorDto {
  businessName: string;

  ownerName: string;

  phoneNumber: string;

  category: VendorCategory;

  description?: string;

  amountPaid: number;

  remarks?: string;
}

export interface UpdateVendorDto {
  businessName?: string;

  ownerName?: string;

  phoneNumber?: string;

  category?: VendorCategory;

  description?: string;

  amountPaid?: number;

  remarks?: string;
}











export interface CreateVendorDto {
  businessName: string;

  ownerName: string;

  phoneNumber: string;

  category: VendorCategory;

  description?: string;

  amountPaid: number;

  remarks?: string;
}

export interface UpdateVendorDto {
  businessName?: string;

  ownerName?: string;

  phoneNumber?: string;

  category?: VendorCategory;

  description?: string;

  amountPaid?: number;

  remarks?: string;
}




/*
|--------------------------------------------------------------------------
| Get Vendors
|--------------------------------------------------------------------------
*/

export async function getVendors() {
  const response = await api.get(
    "/vendors/get-vendor"
  );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Create Vendor
|--------------------------------------------------------------------------
*/

export async function createVendor(
  data: CreateVendorDto
) {
  const response = await api.post(
    "/vendors/creates",
    data
  );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Update Vendor
|--------------------------------------------------------------------------
*/

export async function updateVendor(
  id: string,
  data: UpdateVendorDto
) {
  const response = await api.put(
    `/vendors/${id}`,
    data
  );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| Delete Vendor
|--------------------------------------------------------------------------
*/

export async function deleteVendor(
  id: string
) {
  const response = await api.delete(
    `/vendors/${id}`
  );

  return response.data;
}


export async function downloadVendorTag(
  id: string
) {
  const response = await api.get(
    `/vendors/${id}/tag`,
    {
      responseType: "blob",
    }
  );

  return response.data;
}





export async function printVendorTag(
  vendor: Vendor
) {
  const element = document.getElementById("vendor-tag-print");

if (!element) return;

const image = await toPng(element, {
  cacheBust: true,
  pixelRatio: 4,
  width: element.offsetWidth,
  height: element.offsetHeight,
});
  

  const pdf = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: [55, 90],
});

const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

pdf.addImage(
  image,
  "PNG",
  0,
  0,
  pageWidth,
  pageHeight
);

pdf.save(`${vendor.vendorCode}.pdf`);
}



export interface CreateExpenseDto {
  expenseName: string;
  description: string;
  amount: number;
  receiptType: ReceiptType;
  receiptUrl?: string;
}


export interface UpdateExpenseDto {
  expenseName?: string;
  description?: string;
  amount?: number;
  receiptType?: ReceiptType;
  receiptUrl?: string;
}



export async function createExpense(
  committeeId: string,
  data: CreateExpenseDto
) {
  const response = await api.post(
    `/finance/${committeeId}/expensess`,
    data
  );

  return response.data;
}


export async function updateExpense(
  expenseId: string,
  data: CreateExpenseDto
) {
  const response = await api.patch(
    `/finance/expenses/${expenseId}`,
    data
  );

  return response.data;
}


export async function deleteExpense(
  expenseId: string
) {
  const response = await api.delete(
    `/finance/delete-expenses/${expenseId}`
  );

  return response.data;
}





export async function getCommitteeDashboard(
  committeeId: string
): Promise<CommitteeDashboard> {
  const response = await api.get<{
    success: boolean;
    data: CommitteeDashboard;
  }>(
    `/finance/committee/member-dashboard/${committeeId}`
  );

  return response.data.data;
}