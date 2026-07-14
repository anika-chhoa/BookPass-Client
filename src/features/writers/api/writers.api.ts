import { apiFetch } from "@/lib/apiClient";

export interface Writer {
  id: string;
  name: string;
  photoUrl: string;
}

export async function apiListWriters() {
  return apiFetch<Writer[]>("/writers");
}
export async function apiCreateWriter(name: string, photoUrl: string) {
  return apiFetch<Writer>("/writers", { method: "POST", body: JSON.stringify({ name, photoUrl }) });
}
export async function apiUploadWriterPhoto(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return apiFetch<{ url: string }>("/upload/writer-photo", { method: "POST", body: formData, headers: {} });
}