import { apiFetch } from "@/lib/apiClient";
import type { Book } from "../types/book";

export interface BookListResult { items: Book[]; total: number; page: number; limit: number; totalPages: number; }
export interface BookListParams { category?: string; search?: string; sort?: "newest" | "rating" | "priceAsc" | "priceDesc"; page?: number; limit?: number; }

export async function apiListBooks(params: BookListParams = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return apiFetch<BookListResult>(`/books${qs ? `?${qs}` : ""}`);
}
export async function apiGetBook(id: string) {
  return apiFetch<Book>(`/books/${id}`);
}
export type CreateBookInput = Omit<Book, "id" | "rating" | "reviewCount" | "availableCopies">;
export async function apiCreateBook(input: CreateBookInput) {
  return apiFetch<Book>("/books", { method: "POST", body: JSON.stringify(input) });
}
export async function apiDeleteBook(id: string) {
  return apiFetch<null>(`/books/${id}`, { method: "DELETE" });
}
export async function apiUploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return apiFetch<{ url: string }>("/upload/image", { method: "POST", body: formData, headers: {} });
}