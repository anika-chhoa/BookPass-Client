const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";
let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => (accessToken = t);

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), ...options.headers },
  });
  const body = await res.json();
  if (!res.ok || !body.success) throw new Error(body.message ?? "Request failed");
  return body.data as T;
}