'use client';

import {
    AppBar,
    Toolbar,
    Box,
    InputBase,
    IconButton,
    Avatar,
    Typography,
    Badge,
    Stack,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useMediaQuery } from '@/layout/hook/useMediaQueries';
import { useThemeMode } from '@/contexts/theme/hooks';

type props = {
    setMobileOpen: (open: boolean) => void;
}

export default function DashboardNavbar({ setMobileOpen }: props) {
    const isMobile = useMediaQuery("upToSm");
    const { toggleTheme } = useThemeMode();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                {isMobile && (
                    <Button
                        onClick={() => setMobileOpen(true)}
                    >
                        {<MenuIcon />}
                    </Button>
                )}
                {/* Search (LEFT) */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.default',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />

                    <InputBase
                        placeholder="Search…"
                        sx={{
                            flex: 1,
                            color: 'text.primary',
                        }}
                    />
                </Box>

                {/* Right side */}
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* Theme toggle */}
                    <IconButton onClick={toggleTheme}>
                        <Brightness7Icon />
                    </IconButton>

                    {/* Notifications */}
                    <IconButton>
                        <Badge badgeContent={3} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* User */}
                    <Stack direction="row" spacing={1} p={1} alignItems="center">
                        <Avatar
                            src="/avatar.png" // replace with real
                            sx={{ width: 36, height: 36 }}
                        />
                        <Typography variant="body2">
                            Isaac
                        </Typography>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}