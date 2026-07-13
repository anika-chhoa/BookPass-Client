import { useState } from "react";
import { cn } from "@/lib/utils";

export function StarRatingInput({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-xs">
      {stars.map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className={cn("text-2xl leading-none transition-colors", (hover || value) >= i ? "text-secondary" : "text-outline-variant")}
          aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}