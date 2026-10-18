'use client';

import {
    AppBar,
    Toolbar,
    Box,
    InputBase,
    IconButton,
    Avatar,
    Typography,
    Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useMediaQuery } from '@/layout/hook/useMediaQueries';
import { useThemeMode } from '@/contexts/theme/hooks';
import { useAuthSession } from '@/contexts/authSession/hooks';
import { formatInitials } from '@/utils/format';

type props = {
    setMobileOpen: (open: boolean) => void;
}

export default function DashboardNavbar({ setMobileOpen }: props) {
    const isMobile = useMediaQuery("upToSm");
    const { toggleTheme } = useThemeMode();
    const { user, loading } = useAuthSession();

    // The session has no avatar, so the chip falls back to the user's initials.
    const displayName = user?.full_name?.trim() || user?.email || '';
    const initials = formatInitials(displayName) || '?';

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
                    alignItems: 'center',
                    gap: 2,
                    minHeight: 64,
                    px: { xs: 2, md: 3 },
                }}
            >
                {isMobile && (
                    <IconButton
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open navigation menu"
                        sx={{ color: 'text.secondary' }}
                    >
                        <MenuIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                )}
                {/* Search (LEFT) */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: 'background.default',
                        border: '1px solid',
                        borderColor: 'divider',
                        px: 2,
                        py: 0.5,
                        borderRadius: 999,
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />

                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'Search' }}
                        sx={{
                            flex: 1,
                            color: 'text.primary',
                            fontSize: '0.875rem',
                        }}
                    />
                </Box>

                {/* Right side */}
                <Stack direction="row" spacing={1} alignItems="center">
                    {/* Theme toggle */}
                    <IconButton onClick={toggleTheme} aria-label="Toggle theme" sx={{ color: 'text.secondary' }}>
                        <Brightness7Icon sx={{ fontSize: 20 }} />
                    </IconButton>

                    {/* Notifications */}
                    <IconButton aria-label="Notifications" sx={{ color: 'text.secondary' }}>
                        <NotificationsIcon sx={{ fontSize: 20 }} />
                    </IconButton>

                    {/* User */}
                    <Stack
                        direction="row"
                        spacing={1}
                        px={1}
                        py={0.5}
                        alignItems="center"
                        sx={{
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 999,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bgcolor: 'primary.main',
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                            }}
                        >
                            {loading ? '' : initials}
                        </Avatar>
                        {!isMobile && (
                            <Typography variant="body2" fontWeight={600} sx={{ pr: 0.5 }}>
                                {loading ? '' : displayName}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}