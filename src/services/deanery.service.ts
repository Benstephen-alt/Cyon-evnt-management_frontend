const API = process.env.NEXT_PUBLIC_API_URL;

export async function getDeaneries() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/deaneries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function createDeanery(data: {
  name: string;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/deaneries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updateDeanery(
  id: string,
  data: {
    name: string;
  }
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/deaneries/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function deleteDeanery(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/deaneries/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}