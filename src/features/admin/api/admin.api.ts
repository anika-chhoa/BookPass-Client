import { apiFetch } from "@/lib/apiClient";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan: "free" | "pro" | "premium";
  avatarUrl: string;
  createdAt: string;
}

export interface AdminBooking {
  id: string;
  userName: string;
  userEmail: string;
  bookTitle: string;
  bookedAt: string;
  dueDate: string;
  returnedAt: string | null;
  status: "active" | "returned";
}

export interface AdminPayment {
  id: string;
  userName: string;
  userEmail: string;
  plan: "pro" | "premium";
  amountTotal: number;
  currency: string;
  stripeSessionId: string;
  status: "paid";
  createdAt: string;
}

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function apiListAdminUsers(page = 1, limit = 20) {
  return apiFetch<PaginatedResult<AdminUser>>(`/admin/users?page=${page}&limit=${limit}`);
}
export async function apiUpdateUserRole(userId: string, role: "user" | "admin") {
  return apiFetch<AdminUser>(`/admin/users/${userId}/role`, { method: "PATCH", body: JSON.stringify({ role }) });
}
export async function apiListAdminBookings(page = 1, limit = 20) {
  return apiFetch<PaginatedResult<AdminBooking>>(`/admin/bookings?page=${page}&limit=${limit}`);
}
export async function apiListAdminPayments(page = 1, limit = 20) {
  return apiFetch<PaginatedResult<AdminPayment>>(`/admin/payments?page=${page}&limit=${limit}`);
}

export interface AdminStats {
  totalUsers: number;
  totalBooks: number;
  activeBookings: number;
  overdueBookings: number;
  returnedBookings: number;
  totalRevenue: number;
  planDistribution: { plan: string; count: number }[];
  topCategories: { category: string; count: number }[];
  monthlyRevenue: { month: string; amount: number }[];
  monthlyBookings: { month: string; count: number }[];
}

export async function apiGetAdminStats() {
  return apiFetch<AdminStats>("/admin/stats");
}