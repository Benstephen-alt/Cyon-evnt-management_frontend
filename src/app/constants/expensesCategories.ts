import {
  ExpenseCategory,
  ReceiptType,
} from "@/types/finance";



export const EXPENSE_CATEGORIES: {
  value: ExpenseCategory;
  label: string;
}[] = [

  {
    value: "FOOD",
    label: "Food & Catering",
  },

  {
    value: "TRANSPORT",
    label: "Transportation",
  },

  {
    value: "ACCOMMODATION",
    label: "Accommodation",
  },

  {
    value: "MEDICAL",
    label: "Medical",
  },

  {
    value: "PUBLICITY",
    label: "Publicity",
  },

  {
    value: "PRINTING",
    label: "Printing",
  },

  {
    value: "EQUIPMENT",
    label: "Equipment",
  },

  {
    value: "LABOUR",
    label: "Labour",
  },

  {
    value: "FUEL",
    label: "Fuel",

  },

  {
    value: "UTILITY",
    label: "Utilities",
  },

  {
    value: "MISC",
    label: "Miscellaneous",
  },

];


export const RECEIPT_TYPES: {
  value: ReceiptType;
  label: string;
}[] = [
  {
    value: "RECEIPT",
    label: "Receipt",
  },
  {
    value: "CASH",
    label: "Cash",
  },
];