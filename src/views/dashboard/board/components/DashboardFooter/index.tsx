import { Box, Stack, Typography } from '@mui/material';

type DashboardFooterProps = {
    year?: number;
};

export default function DashboardFooter({
    year = new Date().getFullYear(),
}: DashboardFooterProps) {
    return (
        <Box
            component="footer"
            sx={{
                pt: 3,
                mt: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={1}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontWeight: 600,
                    }}
                >
                    Test Broker
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    © {year} Test Broker. All rights reserved.
                </Typography>
            </Stack>
        </Box>
    );
}