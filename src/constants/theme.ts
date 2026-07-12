/**
 * LOCKED DESIGN TOKENS.
 * Mirrors tailwind.config.ts. Import these constants instead of hardcoding
 * Tailwind class strings in multiple places, so a single change here
 * propagates everywhere. See /STYLE_GUIDE.md for the full rationale.
 */

// The one and only radius used on every card, button, input, and modal.
export const CARD_RADIUS = "rounded-xl";

// Shared hover-lift utility class (defined in globals.css) — every card type uses this.
export const CARD_HOVER = "card-hover";

// Standard card internal padding.
export const CARD_PADDING = "p-lg";

// Cover image aspect ratio for book covers — guarantees uniform card height.
export const COVER_ASPECT = "aspect-[2/3]";

export const GRID_BREAKPOINTS = {
  featuredBooks: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  browseBooks: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  categories: "grid-cols-2 lg:grid-cols-4",
  topWriters: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  stats: "grid-cols-1 md:grid-cols-3",
  testimonials: "grid-cols-1 md:grid-cols-3",
} as const;

export const GRID_GAP = "gap-lg";

export const TYPE = {
  display: "font-display-lg text-headline-lg-mobile md:text-display-lg",
  h1: "font-headline-lg text-headline-lg",
  h2: "font-headline-md text-headline-md",
  bodyLg: "font-body-lg text-body-lg",
  bodyMd: "font-body-md text-body-md",
  labelMd: "font-label-md text-label-md",
  labelSm: "font-label-sm text-label-sm",
} as const;

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "forever",
    booksPerPeriod: 2,
    periodLabel: "month",
    loanDurationDays: 14,
  },
  {
    id: "pro",
    name: "Pro",
    price: 10,
    interval: "month",
    booksPerPeriod: 8,
    periodLabel: "month",
    loanDurationDays: 21,
  },
  {
    id: "premium",
    name: "Premium",
    price: 96,
    interval: "year",
    booksPerPeriod: 120,
    periodLabel: "year",
    loanDurationDays: 30,
  },
] as const;

export type PlanId = (typeof PRICING_PLANS)[number]["id"];
