import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-[3px]",
};

/**
 * The single spinner used everywhere inline loading is needed
 * (primarily inside Button via isLoading). Uses primary token only.
 */
export function Spinner({ size = "md", className }: { size?: Size; className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block rounded-full border-current border-t-transparent animate-spin",
        sizeMap[size],
        className
      )}
    />
  );
}
