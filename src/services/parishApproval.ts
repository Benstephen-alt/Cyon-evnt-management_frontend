const API = process.env.NEXT_PUBLIC_API_URL;

export async function getPendingParishes() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/pending`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function approveParish(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/parish/${id}/approve`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}