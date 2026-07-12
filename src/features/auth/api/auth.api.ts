import { apiFetch, setAccessToken } from "@/lib/apiClient";

export interface AuthUser { id: string; name: string; email: string; role: "user" | "admin"; plan: "free" | "pro" | "premium"; }
interface AuthResult { accessToken: string; user: AuthUser; }

export async function apiRegister(name: string, email: string, password: string) {
  const data = await apiFetch<AuthResult>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
  setAccessToken(data.accessToken);
  return data.user;
}
export async function apiLogin(email: string, password: string) {
  const data = await apiFetch<AuthResult>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  setAccessToken(data.accessToken);
  return data.user;
}
export async function apiRefresh() {
  const data = await apiFetch<AuthResult>("/auth/refresh", { method: "POST" });
  setAccessToken(data.accessToken);
  return data.user;
}
export async function apiLogout() {
  await apiFetch("/auth/logout", { method: "POST" });
  setAccessToken(null);
}