import api from "@/lib/api";


export async function getEvent(id: string) {
  const response = await api.get(`/events/${id}`);

  return response.data;
}

export async function deleteEvent(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function activateEvent(
  id: string
) {
  const response = await api.patch(
    `/events/${id}/activate`
  );

  return response.data;
}

const API = process.env.NEXT_PUBLIC_API_URL;

export async function createEvent(data: any) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function getEvents() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function updateEvent(
  id: string,
  data: {
    eventName: string;
    theme: string;
    year: number;
    registrationFee: number;
    startDate: string;
    endDate: string;
    registrationOpen: boolean;
  }
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  

  return response.json();
}


export async function toggleRegistration(
  id: string,
  registrationOpen: boolean
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/events/${id}/registration`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        registrationOpen,
      }),
    }
  );

  return response.json();
}




export async function getActiveEvent() {
  const response = await api.get(
    "/events/active"
  );

  return response.data;
}