import { CARD_RADIUS } from "@/constants/theme";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Spinner } from "./Spinner";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:brightness-95 active:scale-95",
  secondary: "bg-secondary text-white hover:brightness-95 active:scale-95",
  ghost: "bg-transparent text-on-surface hover:bg-surface-container",
  outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-md py-xs text-label-sm",
  md: "px-lg py-sm text-label-md",
  lg: "px-xl py-md text-label-md",
};

/**
 * The single Button primitive. `isLoading` is built in from Phase 0 — every
 * async action (Book Now, Add to Favorite, Login submit, Add Item submit,
 * Stripe checkout) uses this prop instead of a custom local spinner.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      fullWidth = false,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-sm font-label-md font-medium transition-all",
          CARD_RADIUS,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          (disabled || isLoading) &&
            "opacity-60 cursor-not-allowed active:scale-100",
          className,
        )}
        {...rest}
      >
        {isLoading ? (
          <>
            <Spinner size="sm" />
            <span>{loadingText ?? "Loading"}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
