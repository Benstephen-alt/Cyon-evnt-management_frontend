import { ExpenseCategory, ReceiptType } from "./finance";




export interface CommitteeDashboard {
  committee: {
    id: string;
    committeeName: string;
  };

  totalReleased: number;

  totalExpenses: number;

  availableBalance: number;

  deficit: number;

  financialStatus: "BALANCE" | "DEFICIT";

  fundReleases: FundReleaseRecord[];

  expenses: ExpenseRecord[];
}

export interface FundReleaseRecord {
  id: string;

  amount: number;

  authority: string;

  recipientName: string;

  remarks?: string;

  releasedAt: string;

  releasedBy: {
    admin: {
      fullName: string;
    };
  };
}



export interface ExpenseRecord {
  id: string;

  expenseName: string;

  category: ExpenseCategory;

  description: string;

  amount: number;

  receiptType: ReceiptType;

  receiptUrl?: string;

  createdAt: string;

  updatedAt: string;

  committeeMember: {
    id: string;

    user: {
      admin: {
        fullName: string;
      };
    };
  };
}
