import { createTheme } from '@mui/material/styles';

// Professional brokerage direction:
// - Brand cyan #00D6FF / violet #8C5CFF preserved.
// - 8dp rhythm (spacing factor 8), card radius 16, button radius 12.
// - Subtle shadows instead of neon glow.
// - Tabular numerals for figures, uppercase 0.75rem table headers,
//   visible focus-visible rings.

const baseTypography = {
    fontFamily: `'Geist', 'Inter', 'Roboto', sans-serif`,

    h1: {
        fontSize: 'clamp(2.5rem, 6vw, 3.75rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
    },
    h2: {
        fontSize: 'clamp(2.2rem, 5vw, 3rem)',
        fontWeight: 600,
    },
    h3: {
        fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
        fontWeight: 600,
    },
    h4: {
        fontSize: 'clamp(1.6rem, 3.2vw, 2rem)',
        fontWeight: 600,
    },
    h5: {
        fontSize: 'clamp(1.4rem, 2.5vw, 1.6rem)',
        fontWeight: 500,
    },
    h6: {
        fontSize: 'clamp(1.2rem, 2vw, 1.3rem)',
        fontWeight: 500,
        fontVariantNumeric: 'tabular-nums',
    },

    subtitle1: {
        fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
        fontWeight: 500,
        color: '#9FB3C8',
    },
    subtitle2: {
        fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
        fontWeight: 500,
    },

    body1: {
        fontSize: 'clamp(0.95rem, 1.4vw, 1rem)',
        lineHeight: 1.7,
        fontVariantNumeric: 'tabular-nums lining-nums',
    },
    body2: {
        fontSize: 'clamp(0.85rem, 1.2vw, 0.9rem)',
        lineHeight: 1.6,
        fontVariantNumeric: 'tabular-nums lining-nums',
    },

    caption: {
        fontSize: 'clamp(0.7rem, 1vw, 0.75rem)',
        opacity: 0.7,
        fontVariantNumeric: 'tabular-nums',
    },
    overline: {
        fontSize: 'clamp(0.65rem, 0.9vw, 0.7rem)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    },
};

// Shared button sizing on the 8dp rhythm. Radius 12, no neon glow.
const buttonSizeOverrides = {
    root: {
        borderRadius: 12,
        textTransform: 'none',
        boxShadow: 'none',

        // default (md)
        fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
        padding: 'clamp(6px, 1vw, 10px) clamp(14px, 2vw, 18px)',
    },

    sizeSmall: {
        fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
        padding: 'clamp(4px, 0.8vw, 6px) clamp(10px, 1.5vw, 14px)',
    },

    sizeLarge: {
        fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
        padding: 'clamp(8px, 1.2vw, 12px) clamp(18px, 2.5vw, 24px)',
    },
};

const baseComponents = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                fontVariantNumeric: 'tabular-nums lining-nums',
            },
        },
    },
    MuiSkeleton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
            },
        },
    },
    // Table header variant: uppercase 0.75rem secondary.
    MuiTableCell: {
        styleOverrides: {
            head: {
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'text.secondary',
            },
        },
    },
};

// ------------------- DARK THEME -------------------
export const darkTheme = createTheme({
    spacing: 8,
    shape: {
        borderRadius: 16,
    },
    palette: {
        mode: 'dark',

        // ---------------- Primary & CTA ----------------
        primary: {
            main: '#00D6FF',       // CTA buttons, primary links
            contrastText: '#0A0F1C', // Text on primary buttons
        },
        secondary: {
            main: '#8C5CFF',       // Secondary buttons / highlights
            contrastText: '#FFFFFF',
        },

        // ---------------- Backgrounds ----------------
        background: {
            default: '#0A0F1C',    // Main page background
            paper: '#12182B',      // Cards, modals, panels
        },

        // ---------------- Text ----------------
        text: {
            primary: '#E6F1FF',    // Main text on dark backgrounds
            secondary: '#FFFFFF',  // Subtext, labels, hints (increased contrast from #9FB3C8)
            disabled: '#5C6B82',   // Disabled / inactive text
        },

        // ---------------- Feedback / Status ----------------
        success: { main: '#00FFA3', contrastText: '#0A0F1C' }, // success messages / badges
        error: { main: '#FF4D6D', contrastText: '#0A0F1C' },   // errors / alerts
        warning: { main: '#FFC857', contrastText: '#0A0F1C' }, // warnings / caution
        info: { main: '#38BDF8', contrastText: '#0A0F1C' },    // informational

        // ---------------- Divider / Borders ----------------
        divider: '#1E2640',       // Lines / borders
    },

    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontVariantNumeric: 'tabular-nums lining-nums',
                },
                '*:focus-visible': {
                    outline: '2px solid #00D6FF',
                    outlineOffset: '2px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                ...buttonSizeOverrides,
                contained: {
                    color: 'inherit',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
                    '&:hover': {
                        filter: 'brightness(1.08)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.45)',
                    },
                    '&:focus-visible': {
                        outline: '2px solid #00D6FF',
                        outlineOffset: '2px',
                    },
                },
                outlined: {
                    '&:focus-visible': {
                        outline: '2px solid #00D6FF',
                        outlineOffset: '2px',
                    },
                },
                text: {
                    '&:focus-visible': {
                        outline: '2px solid #00D6FF',
                        outlineOffset: '2px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: 'linear-gradient(180deg, #12182B, #0A0F1C)',
                    border: '1px solid #1E2640',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.35)',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#00D6FF',            // Links
                    '&.active': { color: '#8C5CFF' },
                    '&:hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                    },
                    '&:focus-visible': {
                        outline: '2px solid #00D6FF',
                        outlineOffset: '2px',
                    },
                },
            },
        },
    },
});

// ------------------- LIGHT THEME -------------------
export const lightTheme = createTheme({
    spacing: 8,
    shape: {
        borderRadius: 16,
    },
    palette: {
        mode: 'light',

        // ---------------- Primary & CTA ----------------
        primary: {
            main: '#007BFF',        // CTA buttons, primary links (darker blue for contrast)
            contrastText: '#FFFFFF', // Text on primary buttons
        },
        secondary: {
            main: '#9C6BFF',        // Secondary buttons / highlights
            contrastText: '#FFFFFF',
        },

        // ---------------- Backgrounds ----------------
        background: {
            default: '#F4F7FA',     // Main page
            paper: '#FFFFFF',       // Cards, panels
        },

        // ---------------- Text ----------------
        text: {
            primary: '#0A0F1C',     // Main text on light background
            secondary: '#5C6B82',   // Subtext / labels
            disabled: '#9FB3C8',    // Disabled text
        },

        // ---------------- Feedback / Status ----------------
        // Darkened tones so text in these colors meets 4.5:1 on white.
        success: { main: '#067647', contrastText: '#FFFFFF' },
        error: { main: '#D92D20', contrastText: '#FFFFFF' },
        warning: { main: '#B54708', contrastText: '#FFFFFF' },
        info: { main: '#026AA2', contrastText: '#FFFFFF' },

        // ---------------- Divider / Borders ----------------
        divider: '#D1D9E6',       // Lines / borders
    },

    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontVariantNumeric: 'tabular-nums lining-nums',
                },
                '*:focus-visible': {
                    outline: '2px solid #0069D9',
                    outlineOffset: '2px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                ...buttonSizeOverrides,
                contained: {
                    color: 'inherit',
                    boxShadow: '0 1px 2px rgba(16,24,40,0.12)',
                    '&:hover': {
                        filter: 'brightness(0.97)',
                        boxShadow: '0 2px 8px rgba(16,24,40,0.16)',
                    },
                    '&:focus-visible': {
                        outline: '2px solid #0069D9',
                        outlineOffset: '2px',
                    },
                },
                outlined: {
                    '&:focus-visible': {
                        outline: '2px solid #0069D9',
                        outlineOffset: '2px',
                    },
                },
                text: {
                    '&:focus-visible': {
                        outline: '2px solid #0069D9',
                        outlineOffset: '2px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: '#FFFFFF',
                    border: '1px solid #D1D9E6',
                    boxShadow: '0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#007BFF',            // Links
                    '&.active': { color: '#9C6BFF' },
                    '&:hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                    },
                    '&:focus-visible': {
                        outline: '2px solid #0069D9',
                        outlineOffset: '2px',
                    },
                },
            },
        },
    },
});
