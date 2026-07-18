// lib/auth.ts

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("admin");
  localStorage.removeItem("parish");
  localStorage.removeItem("account");
}

