import { apiFetch } from "@/lib/apiClient";

export interface DashboardStats {
  activeBookings: number;
  overdueBookings: number;
  returnedBookings: number;
  totalFavorites: number;
  plan: "free" | "pro" | "premium";
  planLimit: number;
  planUsed: number;
  periodLabel: "month" | "year";
  periodResetDate: string;
  monthlyBookings: { month: string; count: number }[];
}

export async function apiGetDashboardStats() {
  return apiFetch<DashboardStats>("/dashboard/stats");
}