import { apiFetch } from "@/lib/apiClient";

export interface FeaturedReview {
  id: string;
  bookId: string;
  userName: string;
  userAvatarUrl: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export async function apiGetFeaturedReviews(limit = 3) {
  return apiFetch<FeaturedReview[]>(`/reviews/featured?limit=${limit}`);
}