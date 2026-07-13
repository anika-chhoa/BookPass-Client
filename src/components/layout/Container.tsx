import { type ReactNode } from "react";
import { cn } from "@/lib/utils";


export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("container-max mx-auto px-margin-mobile md:px-margin-desktop", className)}>
      {children}
    </div>
  );
}
