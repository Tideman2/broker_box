import {
    Stack, Typography, Card,
    ListItemButton, ListItemText, ListItemIcon,
    Button
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';

export const ElitePlanCardLogout = () => {

    return (
        <Stack alignItems="center" justifyContent="center" spacing={2} mt={"auto"} mb={2}>
            <Card sx={{ width: "200px", height: "auto", p: 2, }}>
                <Typography variant="body2" color="secondary">
                    Elite plan
                </Typography>
                <Typography variant="caption">
                    Upgrade for 2x Trade execution
                </Typography>
                <Button sx={{ mt: 2 }}>
                    Upgrade now
                </Button>
            </Card>

            <ListItemButton
                sx={{
                    borderRadius: 2,
                    p: 2,
                    '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        boxShadow: '0 0 10px rgba(0,214,255,0.5)',
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 36,
                    }}
                >
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Log out"} />
            </ListItemButton>
        </Stack>
    )
}