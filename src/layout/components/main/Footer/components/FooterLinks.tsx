'use client';
import { Stack, Link } from '@mui/material';

import { PATHS } from '@/routes/paths';

const links = [
    { label: 'Home', href: PATHS.home.root },
    { label: 'Packages', href: PATHS.home.packages },
    { label: 'About', href: PATHS.home.about },
    { label: 'Contact', href: PATHS.home.contact },
    { label: 'Login', href: PATHS.auth.login },
];

const FooterLinks = () => {
    return (
        <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            gap={3}
            sx={{ mb: 4 }}
        >
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    underline="hover"
                    variant="subtitle2"
                    sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                >
                    {link.label}
                </Link>
            ))}
        </Stack>
    );
};

export default FooterLinks;