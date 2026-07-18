const API = process.env.NEXT_PUBLIC_API_URL;

export async function registerDelegate(formData: FormData) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/delegates`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return response.json();
}

export async function getParishDelegates() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/delegates/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function getDelegateDetails(
  id: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/delegates/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function downloadDelegateBadge(
  id: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/badge/${id}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.blob();
}