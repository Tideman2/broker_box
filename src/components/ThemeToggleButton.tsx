import { styled, IconButton, useTheme, } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import { useThemeMode } from '@/contexts/theme/hooks';

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(2),
    zIndex: 1500,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 12,
    boxShadow: '0 1px 2px rgba(16,24,40,0.12)',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
    },
}));

export default function ThemeToggleButtonComponent() {
    const { toggleTheme } = useThemeMode();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <ThemeToggleButton
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Brightness7 /> : <Brightness4 />}
        </ThemeToggleButton>
    );
}
