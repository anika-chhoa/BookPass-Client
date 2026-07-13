import { apiFetch } from "@/lib/apiClient";

export interface Booking {
  id: string; bookId: string; bookTitle: string; bookCoverUrl: string;
  bookedAt: string; dueDate: string; returnedAt: string | null; status: "active" | "returned";
}

export async function apiCreateBooking(bookId: string) {
  return apiFetch<Booking>("/bookings", { method: "POST", body: JSON.stringify({ bookId }) });
}
export async function apiListMyBookings() {
  return apiFetch<Booking[]>("/bookings/me");
}
export async function apiReturnBooking(bookingId: string) {
  return apiFetch<null>(`/bookings/${bookingId}/return`, { method: "POST" });
}