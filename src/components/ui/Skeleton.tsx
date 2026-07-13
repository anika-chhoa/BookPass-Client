import { cn } from "@/lib/utils";
import { CARD_RADIUS, CARD_PADDING } from "@/constants/theme";


export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-surface-container-high", CARD_RADIUS, className)} />;
}

export function SkeletonCard() {
  return (
    <div className={cn("bg-surface-container-lowest border border-outline-variant flex flex-col h-full", CARD_RADIUS, CARD_PADDING)}>
      <Skeleton className="w-full aspect-[2/3] -m-lg mb-md !rounded-none" />
      <Skeleton className="h-5 w-3/4 mb-sm" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-sm">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full overflow-hidden border border-outline-variant rounded-xl">
      <div className="flex gap-md p-md bg-surface-container-low">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-md p-md border-t border-outline-variant">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
