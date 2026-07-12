/**
 * DESIGN TOKENS — LOCKED.
 * Source of truth: /STYLE_GUIDE.md at repo root.
 * Do not add new colors, radii, or font roles here without updating that file first.
 */
var colors = {
    // Primary — deep forest green
    primary: "#204e2b",
    "primary-container": "#bcefc0",
    "on-primary": "#ffffff",
    "on-primary-container": "#afe2b3",
    // Secondary — brick red
    secondary: "#bc4749",
    "secondary-container": "#baee99",
    "on-secondary": "#ffffff",
    "on-secondary-container": "#416d28",
    // Tertiary — olive (used sparingly: badges/icons only)
    tertiary: "#384c00",
    "tertiary-container": "#4b6500",
    "on-tertiary": "#ffffff",
    "on-tertiary-container": "#bfe36d",
    // Neutral / surface scale
    background: "#f9faf4",
    surface: "#f9faf4",
    "surface-container-lowest": "#ffffff",
    "surface-container-low": "#f3f4ee",
    "surface-container": "#edeee9",
    "surface-container-high": "#e7e9e3",
    "surface-container-highest": "#e2e3de",
    "surface-variant": "#e2e3de",
    "on-surface": "#191c19",
    "on-surface-variant": "#414941",
    outline: "#727970",
    "outline-variant": "#c1c9be",
    // Functional only — not part of the 3-brand-color budget
    error: "#ba1a1a",
    "on-error": "#ffffff",
    "error-container": "#ffdad6",
    "on-error-container": "#93000a",
};
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: colors,
            borderRadius: {
                DEFAULT: "0.125rem",
                lg: "0.25rem",
                xl: "0.5rem", // <- the ONLY radius used on cards/buttons/inputs/modals app-wide
                full: "9999px",
            },
            spacing: {
                unit: "4px",
                xs: "4px",
                sm: "8px",
                md: "16px",
                lg: "24px",
                gutter: "24px",
                xl: "48px",
                xxl: "80px",
                "margin-mobile": "16px",
                "margin-desktop": "64px",
            },
            fontFamily: {
                "display-lg": ["Playfair Display", "serif"],
                "headline-lg": ["Playfair Display", "serif"],
                "headline-md": ["Playfair Display", "serif"],
                "body-lg": ["\"Source Serif 4\"", "serif"],
                "body-md": ["\"Source Serif 4\"", "serif"],
                "label-md": ["Work Sans", "sans-serif"],
                "label-sm": ["Work Sans", "sans-serif"],
            },
            fontSize: {
                "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "700" }],
                "headline-lg": ["40px", { lineHeight: "48px", fontWeight: "700" }],
                "headline-lg-mobile": ["32px", { lineHeight: "40px", fontWeight: "700" }],
                "headline-md": ["28px", { lineHeight: "36px", fontWeight: "600" }],
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "500" }],
                "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600" }],
            },
            maxWidth: {
                "container-max": "1280px",
            },
        },
    },
    daisyui: {
        themes: [
            {
                libro: {
                    primary: colors.primary,
                    "primary-content": colors["on-primary"],
                    secondary: colors.secondary,
                    "secondary-content": colors["on-secondary"],
                    accent: colors.tertiary,
                    "accent-content": colors["on-tertiary"],
                    neutral: colors["on-surface"],
                    "neutral-content": colors.background,
                    "base-100": colors["surface-container-lowest"],
                    "base-200": colors["surface-container-low"],
                    "base-300": colors["surface-container-high"],
                    "base-content": colors["on-surface"],
                    error: colors.error,
                    "error-content": colors["on-error"],
                },
            },
        ],
        darkTheme: false,
    },
    plugins: [require("daisyui")],
};
