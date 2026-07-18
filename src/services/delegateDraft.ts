import api from "../lib/api";

export interface DraftDelegate {
  fullName: string;
  gender: "MALE" | "FEMALE" | "";
  age: number | "";
  phoneNumber: string;
  photoUrl: string;
}

export async function getCurrentDraft() {
  const { data } = await api.get(
    "/delegate-drafts/current"
  );

  return data;
}

export async function updateCurrentDraft(
  payload: Partial<DraftDelegate>
) {
  const { data } = await api.put(
    "/delegate-drafts/current",
    payload
  );

  return data;
}

export async function submitCurrentDraft() {
  const { data } = await api.post(
    "/delegate-drafts/current/submit"
  );

  return data;
}

export async function deleteCurrentDraft() {
  const { data } = await api.delete(
    "/delegate-drafts/current"
  );

  return data;
}