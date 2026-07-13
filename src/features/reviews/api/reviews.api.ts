import { apiFetch } from "@/lib/apiClient";

export interface Review { id: string; bookId: string; userName: string; rating: number; comment: string; createdAt: string; }

export async function apiListBookReviews(bookId: string) {
  return apiFetch<Review[]>(`/reviews/book/${bookId}`);
}
export async function apiCreateReview(bookId: string, rating: number, comment: string) {
  return apiFetch<Review>(`/reviews/book/${bookId}`, { method: "POST", body: JSON.stringify({ rating, comment }) });
}