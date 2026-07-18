import { ReceiptType } from "./finance";

export interface ExpenseFormData {
  expenseName: string;

  description: string;

  amount: number;

  receiptType: ReceiptType;

  receiptUrl: string;
}