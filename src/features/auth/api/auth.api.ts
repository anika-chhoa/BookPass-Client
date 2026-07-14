import { apiFetch, setAccessToken } from "@/lib/apiClient";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan: "free" | "pro" | "premium";
  avatarUrl: string;
}
interface AuthResult { accessToken: string; user: AuthUser; }

export async function apiRegister(name: string, email: string, password: string, avatarUrl?: string) {
  const data = await apiFetch<AuthResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, avatarUrl }),
  });
  setAccessToken(data.accessToken);
  return data.user;
}
export async function apiLogin(email: string, password: string) {
  const data = await apiFetch<AuthResult>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
  setAccessToken(data.accessToken);
  return data.user;
}
export async function apiGoogleLogin(idToken: string) {
  const data = await apiFetch<AuthResult>("/auth/google", { method: "POST", body: JSON.stringify({ idToken }) });
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
export async function apiUpdateProfile(updates: { name?: string; avatarUrl?: string }) {
  return apiFetch<AuthUser>("/auth/me", { method: "PATCH", body: JSON.stringify(updates) });
}
export async function apiUploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return apiFetch<{ url: string }>("/upload/avatar", { method: "POST", body: formData });
}