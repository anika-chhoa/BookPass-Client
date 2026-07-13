import { apiFetch } from "@/lib/apiClient";

export interface Favorite {
  id: string; bookId: string; bookTitle: string; bookCoverUrl: string; bookWriter: string; createdAt: string;
}

export async function apiAddFavorite(bookId: string) {
  return apiFetch<Favorite>(`/favorites/${bookId}`, { method: "POST" });
}
export async function apiRemoveFavorite(bookId: string) {
  return apiFetch<null>(`/favorites/${bookId}`, { method: "DELETE" });
}
export async function apiListMyFavorites() {
  return apiFetch<Favorite[]>("/favorites/me");
}