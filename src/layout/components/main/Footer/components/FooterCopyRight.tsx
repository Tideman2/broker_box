'use client';
import { Typography, Stack, Divider } from '@mui/material';
import BrandLogo from '@/asset/logo';

const FooterCopyright = () => {
    return (
        <Stack spacing={2}>
            <Divider />
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ pt: 1 }}>
                <BrandLogo width={32} height={32} />
                <Typography variant="caption" color="text.secondary">
                    &copy; {new Date().getFullYear()} Merchant box. All rights reserved.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default FooterCopyright;