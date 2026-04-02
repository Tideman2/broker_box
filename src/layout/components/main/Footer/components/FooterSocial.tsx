'use client';
import { Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com' },
    { icon: <Twitter />, href: 'https://twitter.com' },
    { icon: <Instagram />, href: 'https://instagram.com' },
    { icon: <LinkedIn />, href: 'https://linkedin.com' },
];

const FooterSocial = () => {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            justifyContent="center"
            sx={{ mb: { xs: 3, md: 5 } }}
        >
            {socialLinks.map((social, index) => (
                <IconButton
                    key={index}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': { color: 'secondary.main', borderColor: 'secondary.main' },
                    }}
                >
                    {social.icon}
                </IconButton>
            ))}
        </Stack>
    );
};

export default FooterSocial;