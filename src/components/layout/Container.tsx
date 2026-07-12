import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Every page/section wraps its content in this instead of defining its own
 * width/padding. This is what keeps horizontal alignment identical across
 * every section of the site.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("container-max mx-auto px-margin-mobile md:px-margin-desktop", className)}>
      {children}
    </div>
  );
}
