import api from "@/lib/api";

export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface CommitteeLoginDto {
  email: string;
  password: string;
}

export interface ParishLoginDto {
  accessCode: string;
}

export async function adminLogin(
  data: AdminLoginDto
) {
  const response = await api.post(
    "/auth/admin/login",
    data
  );

  return response.data;
}

export async function committeeLogin(
  data: CommitteeLoginDto
) {
  const response = await api.post(
    "/auth/committee/login",
    data
  );

  return response.data;
}

export async function parishLogin(
  data: ParishLoginDto
) {
  const response = await api.post(
    "/auth/parish/login",
    data
  );

  return response.data;
}