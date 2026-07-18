import api from "@/lib/api";




const API = process.env.NEXT_PUBLIC_API_URL;

export async function getDelegateDetails(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/admin/delegates/${id}`,
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
    `${API}/admin/parish/${id}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.blob();
}


export async function getParishDelegates(search = "") {
  const response = await api.get("/delegates", {
    params: { search },
  });

  return response.data;
}