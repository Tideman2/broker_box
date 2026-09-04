import { styled, IconButton, } from '@mui/material';
import { Brightness7 } from '@mui/icons-material';

import { useThemeMode } from '@/contexts/theme/hooks';

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(2),
    zIndex: 1500,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
}));

export default function ThemeToggleButtonComponent() {
    const { toggleTheme } = useThemeMode();

    return (
        <ThemeToggleButton onClick={toggleTheme}>
            <Brightness7 />
        </ThemeToggleButton>
    );
}