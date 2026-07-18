export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  admin?: User;
  committeeMember?: User;
  parish?: {
    id: string;
    parishName: string;
    deanery: string;
  };
  awaitingApproval?: boolean;
}