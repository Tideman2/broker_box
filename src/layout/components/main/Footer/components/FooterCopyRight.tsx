'use client';
import { Typography, Box, Stack } from '@mui/material';
import BrandLogo from '@/asset/logo';

const FooterCopyright = () => {
    return (
        <Stack direction={"row"} justifyContent={"center"} alignItems="center" spacing={2}>
            <BrandLogo width={50} height={50} />
            <Typography variant="caption" color="text.primary">
                &copy; {new Date().getFullYear()} Merchant box. All rights reserved.
            </Typography>
        </Stack>
    );
};

export default FooterCopyright;