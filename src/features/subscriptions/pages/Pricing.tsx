import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { PRICING_PLANS, GRID_GAP, type PlanId } from "@/constants/theme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { apiCreateCheckoutSession } from "../api/subscriptions.api";
import { PricingCard } from "../components/PricingCard";

export default function Pricing() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  const [error, setError] = useState("");

  const cancelled = searchParams.get("checkout") === "cancelled";

  const handleSelect = async (planId: "pro" | "premium") => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setError("");
    setLoadingPlan(planId);
    try {
      const { url } = await apiCreateCheckoutSession(planId);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setLoadingPlan(null);
    }
  };

  return (
    <Container className="py-xxl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-sm text-center">
        Plans for every kind of reader
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl text-center">
        Upgrade anytime. Cancel anytime — access continues until the end of your billing period.
      </p>

      {cancelled && (
        <p className="text-error font-label-sm text-label-sm text-center mb-lg">
          Checkout cancelled — no charge was made.
        </p>
      )}
      {error && (
        <p className="text-error font-label-sm text-label-sm text-center mb-lg">{error}</p>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-3 ${GRID_GAP} max-w-4xl mx-auto`}>
        {PRICING_PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={user?.plan === plan.id}
            isLoading={loadingPlan === plan.id}
            highlighted={plan.id === "pro"}
            onSelect={() => plan.id !== "free" && handleSelect(plan.id as "pro" | "premium")}
          />
        ))}
      </div>
    </Container>
  );
}