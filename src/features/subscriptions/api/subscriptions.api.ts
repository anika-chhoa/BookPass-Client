import { apiFetch } from "@/lib/apiClient";

export async function apiCreateCheckoutSession(plan: "pro" | "premium") {
  return apiFetch<{ url: string }>("/subscriptions/checkout-session", {
    method: "POST",
    body: JSON.stringify({ plan }),
  });
}