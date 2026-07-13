import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CARD_RADIUS, CARD_HOVER, CARD_PADDING } from "@/constants/theme";


interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  bordered?: boolean;
  padded?: boolean;
}

export function Card({
  children,
  hoverable = true,
  bordered = true,
  padded = true,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest",
        CARD_RADIUS,
        "overflow-hidden flex flex-col h-full",
        bordered && "border border-outline-variant",
        !bordered && "shadow-sm",
        hoverable && CARD_HOVER,
        padded && CARD_PADDING,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Cover image slot — fixed aspect ratio so every card with an image is the same height. */
export function CardCover({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: ReactNode;
}) {
  return (
    <div className={cn("relative w-full aspect-[2/3]", CARD_RADIUS, "overflow-hidden -m-lg mb-md")}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {badge && (
        <div className="absolute bottom-2 right-2 bg-tertiary-container text-on-tertiary-container text-label-sm font-label-sm px-2 py-1 rounded">
          {badge}
        </div>
      )}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="font-headline-md text-body-lg text-on-surface line-clamp-1">{children}</h3>;
}

export function CardSubtitle({ children }: { children: ReactNode }) {
  return <p className="font-label-sm text-label-sm text-on-surface-variant line-clamp-1">{children}</p>;
}

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="flex-1 flex flex-col gap-xs mt-sm">{children}</div>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="mt-md pt-md border-t border-outline-variant">{children}</div>;
}
