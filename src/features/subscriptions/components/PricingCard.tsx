import { Card, CardBody, CardFooter, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { PRICING_PLANS } from "@/constants/theme";

type Plan = (typeof PRICING_PLANS)[number];

interface PricingCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  isLoading: boolean;
  highlighted?: boolean;
  onSelect: () => void;
}

export function PricingCard({ plan, isCurrentPlan, isLoading, highlighted, onSelect }: PricingCardProps) {
  const isFree = plan.id === "free";

  return (
    <Card
      hoverable={false}
      className={cn("flex flex-col text-center", highlighted && "border-primary border-2")}
    >
      <CardBody>
        <CardTitle>{plan.name}</CardTitle>
        <div className="my-md">
          <span className="font-headline-lg text-headline-lg text-primary">
            {isFree ? "Free" : `$${plan.price}`}
          </span>
          {!isFree && (
            <span className="font-label-sm text-label-sm text-on-surface-variant"> /{plan.interval}</span>
          )}
        </div>
        <ul className="flex flex-col gap-xs font-body-md text-body-md text-on-surface-variant mb-lg list-none">
          <li>{plan.booksPerPeriod} books per {plan.periodLabel}</li>
          <li>{plan.loanDurationDays}-day loan period</li>
        </ul>
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          variant={highlighted ? "primary" : "outline"}
          disabled={isCurrentPlan || isFree}
          isLoading={isLoading}
          loadingText="Redirecting..."
          onClick={onSelect}
        >
          {isCurrentPlan ? "Current Plan" : isFree ? "Included Free" : `Upgrade to ${plan.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
}