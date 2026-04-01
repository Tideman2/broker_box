import { createTheme } from '@mui/material/styles';

const baseTypography = {
    fontFamily: `'Geist', 'Inter', 'Roboto', sans-serif`,

    h1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontSize: '2.5rem', fontWeight: 600 },
    h3: { fontSize: '2rem', fontWeight: 600 },
    h4: { fontSize: '1.75rem', fontWeight: 600 },
    h5: { fontSize: '1.5rem', fontWeight: 500 },
    h6: { fontSize: '1.25rem', fontWeight: 500 },

    subtitle1: { fontSize: '1.1rem', fontWeight: 500, color: '#9FB3C8' },
    subtitle2: { fontSize: '0.95rem', fontWeight: 500 },

    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9rem', lineHeight: 1.6 },

    caption: { fontSize: '0.75rem', opacity: 0.7 },
    overline: { fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' },
};

const baseComponents = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                textTransform: 'none',
                boxShadow: '0 0 12px rgba(0,229,255,0.3)',
            },
            contained: {
                // automatic text color contrast
                color: 'inherit',
                '&:hover': {
                    filter: 'brightness(1.1)',
                },
            },
        },
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                boxShadow: '0 0 20px rgba(124,77,255,0.15)',
            },
        },
    },
    MuiLink: {
        styleOverrides: {
            root: {
                '&.active': {},
                '&:hover': {},
            },
        },
    },
};

// ------------------- DARK THEME -------------------
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#00E5FF', contrastText: '#0A0F1C' },
        secondary: { main: '#7C4DFF', contrastText: '#FFFFFF' },
        background: { default: '#0A0F1C', paper: '#12182B' },
        text: { primary: '#E6F1FF', secondary: '#9FB3C8', disabled: '#5C6B82' },
        success: { main: '#00FFA3', contrastText: '#0A0F1C' },
        error: { main: '#FF4D6D', contrastText: '#0A0F1C' },
        warning: { main: '#FFC857', contrastText: '#0A0F1C' },
        info: { main: '#38BDF8', contrastText: '#0A0F1C' },
    },
    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiCard: {
            styleOverrides: {
                root: {
                    ...baseComponents.MuiCard.styleOverrides.root,
                    background: 'linear-gradient(180deg, #12182B, #0A0F1C)',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#00E5FF',
                    '&.active': { color: '#7C4DFF' },
                    '&:hover': { textShadow: '0 0 8px #00E5FF' },
                },
            },
        },
    },
});

// ------------------- LIGHT THEME -------------------
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#00B0FF', contrastText: '#FFFFFF' },
        secondary: { main: '#B388FF', contrastText: '#FFFFFF' },
        background: { default: '#F4F7FA', paper: '#FFFFFF' },
        text: { primary: '#0A0F1C', secondary: '#FFFFFF', disabled: '#9FB3C8' },
        success: { main: '#00C48C', contrastText: '#FFFFFF' },
        error: { main: '#FF6B6B', contrastText: '#FFFFFF' },
        warning: { main: '#FFC857', contrastText: '#0A0F1C' },
        info: { main: '#38BDF8', contrastText: '#FFFFFF' },
    },
    typography: baseTypography,
    components: {
        ...baseComponents,
        MuiCard: {
            styleOverrides: {
                root: {
                    ...baseComponents.MuiCard.styleOverrides.root,
                    background: '#FFFFFF',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#00B0FF',
                    '&.active': { color: '#B388FF' },
                    '&:hover': { textShadow: '0 0 6px #00B0FF' },
                },
            },
        },
    },
});