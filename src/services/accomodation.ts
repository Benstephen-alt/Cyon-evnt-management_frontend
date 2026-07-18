import api from "@/lib/api";



export interface CreateHostelDto {
  hostelName: string;
  gender: "MALE" | "FEMALE";
}

export async function getHostels() {
  const response = await api.get(
    "/hostels/hostel"
  );

  return response.data;
}

export async function createHostel(
  data: CreateHostelDto
) {
  const response = await api.post(
    "/hostels/create",
    data
  );

  return response.data;
}

export interface UpdateHostelDto {
  hostelName: string;
  gender: "MALE" | "FEMALE";
}

export async function getHostelById(
  hostelId: string
) {
  const response = await api.get(
    `/hostels/${hostelId}`
  );

  return response.data;
}


export async function updateHostel(
  hostelId: string,
  data: UpdateHostelDto
) {
  const response = await api.put(
    `/hostels/${hostelId}`,
    data
  );

  return response.data;
}

export interface HallSummary {
  id: string;
  hallName: string;
  capacity: number;
  occupiedBeds: number;
  availableBeds: number;
}

export async function getHostelDetails(
  hostelId: string
) {
  const response = await api.get(
    `/hostels/${hostelId}`
  );

  return response.data;
}

export interface CreateHallDto {
  hostelId: string;
  hallName: string;
  totalBeds: number;
}


export async function createHall(
  data: CreateHallDto
) {
  const response = await api.post(
    "/halls/create",
    data
  );

  return response.data;
}


export interface UpdateHallDto {
  hallName: string;
  totalBeds: number;
}

export async function getHallById(
  hallId: string
) {
  const response = await api.get(
    `/halls/${hallId}`
  );

  return response.data;
}

export async function updateHall(
  hallId: string,
  data: UpdateHallDto
) {
  const response = await api.put(
    `/halls/update/${hallId}`,
    data
  );

  return response.data;
}