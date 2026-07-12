import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class strings safely (handles conflicting utility classes).
 * Every primitive component uses this instead of raw template strings,
 * so conditional/variant classes never silently collide.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
