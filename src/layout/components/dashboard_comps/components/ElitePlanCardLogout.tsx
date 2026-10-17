import {
    Stack, Typography, Card,
    ListItemButton, ListItemText, ListItemIcon,
    Button
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';

import { useRouter } from 'next/navigation';

import { PATHS } from '@/routes/paths';

import { logout } from '@/app/actions/auth-actions';

export const ElitePlanCardLogout = () => {

    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push(PATHS.auth.login);
    };

    return (
        <Stack alignItems="stretch" justifyContent="center" spacing={1} mt="auto" px={2} pb={2} pt={2}>
            <Card
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="body2" fontWeight={700}>
                    Elite plan
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Upgrade for 2x Trade execution
                </Typography>
                <Button variant="contained" size="small" fullWidth sx={{ mt: 2, borderRadius: 1.5 }}>
                    Upgrade now
                </Button>
            </Card>

            <ListItemButton
                onClick={handleLogout}
                sx={{
                    borderRadius: 1.5,
                    px: 2,
                    py: 1,
                    color: 'text.secondary',
                    '&:hover': { bgcolor: 'action.hover' },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 36,
                        color: 'text.secondary',
                        '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                >
                    <LogoutIcon fontSize="inherit" />
                </ListItemIcon>
                <ListItemText
                    primary="Log out"
                    primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
                />
            </ListItemButton>
        </Stack>
    )
}