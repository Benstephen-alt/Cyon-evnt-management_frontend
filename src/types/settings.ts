export interface Admin {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: "SUPER_ADMIN" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

export interface ParishAccess {
  id: string;
  parishName: string;
  deaneryName: string;
  accessCode: string;
  isApproved: boolean;
}