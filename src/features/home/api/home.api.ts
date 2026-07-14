import { apiFetch } from "@/lib/apiClient";

export interface PublicStats {
  totalBooks: number;
  totalUsers: number;
  totalReviews: number;
}

export async function apiGetPublicStats() {
  return apiFetch<PublicStats>("/stats/public");
}