import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviewCount,
  size = "sm",
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}) {
  const starSize = size === "sm" ? "text-sm" : "text-base";
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-xs">
      <div className={cn("flex text-secondary", starSize)}>
        {stars.map((i) => {
          const filled = rating >= i;
          const half = !filled && rating > i - 1;
          return (
            <span key={i} className="relative leading-none">
              <span className="text-outline-variant">★</span>
              {(filled || half) && (
                <span
                  className="absolute inset-0 overflow-hidden text-secondary"
                  style={{ width: filled ? "100%" : "50%" }}
                >
                  ★
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="font-label-sm text-label-sm text-on-surface-variant">
        {rating.toFixed(1)}
        {typeof reviewCount === "number" && ` (${reviewCount})`}
      </span>
    </div>
  );
}