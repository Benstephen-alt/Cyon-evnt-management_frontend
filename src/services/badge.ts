const API = process.env.NEXT_PUBLIC_API_URL;

export async function downloadDelegateBadge(
  delegateId: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/badge/${delegateId}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.blob();
}