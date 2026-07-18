import { ReceiptType } from "./finance";

export interface ExpenseFormData {
  expenseName: string;

  description: string;

  amount: number;

  receiptType: ReceiptType;

  receiptUrl: string;
}



export interface Event {
  id: string;
  eventName: string;
  theme: string;
  year: number;
  registrationFee: number;
  startDate: string;
  endDate: string;
  registrationOpen: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}