'use client';
import { Grid, Link } from '@mui/material';

const links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Blog', href: '#' },
];

const FooterLinks = () => {
    return (
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {links.map((link) => (
                <Grid key={link.label}>
                    <Link href={link.href} underline="hover" variant="subtitle1">
                        {link.label}
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default FooterLinks;