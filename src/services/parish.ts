import api from "@/lib/api";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const API = process.env.NEXT_PUBLIC_API_URL;


export async function getParishDashboard() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/admin/parish-admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function downloadParishBadges(
  parishId: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/badges/admin/parish/${parishId}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Download failed.");
  }

  return await response.blob();
}

export async function getParishDelegates(
  parishId: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/parishes/${parishId}/delegates`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function exportParishDelegates(
  parishId: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/parishes/${parishId}/delegates/export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ); 

  return response.blob();
}

export async function getParishDashboards() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/admin/adminpr-dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}


export async function getParishDetails(
  parishId: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/admin/parishes/${parishId}/delegates`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        
      },
    }
  );

  return response.json();
  
  
}



export async function parishLogin(accessCode: string) {
  const response = await fetch(`${API}/parish/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessCode,
    }),
  });

  return response.json();
}

export async function approveParishRegistration(
  id: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/admin/${id}/approve`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}


export async function getPendingRegistrations() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/admin/pending`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}/** */

export async function getDashboardSummary() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/admin/admin-dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}


export async function registerParish(
  formData: FormData
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API}/parish/register-parish`,
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

export async function checkApprovalStatus(
  parishId: string
) {
  const response = await fetch(
    `${API}/parish/check-approval/${parishId}`
  );

  return response.json();
}

export async function getParishDashboardinfo() {
  const response = await api.get("/parish/parish-dashboard");
  return response.data;
}