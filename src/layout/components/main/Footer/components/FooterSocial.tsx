'use client';
import { Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const socialLinks = [
    { icon: <Facebook />, href: 'https://facebook.com' },
    { icon: <Twitter />, href: 'https://twitter.com' },
    { icon: <Instagram />, href: 'https://instagram.com' },
    { icon: <LinkedIn />, href: 'https://linkedin.com' }
];

const FooterSocial = () => {
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ mb: 4 }}
        >
            {socialLinks.map((social, index) => (
                <IconButton
                    key={index}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Social link"
                    sx={{
                        width: 40,
                        height: 40,
                        color: 'text.secondary',
                        border: '1px solid',
                        borderColor: 'divider',
                        '& .MuiSvgIcon-root': { fontSize: 20 },
                        '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'action.hover' },
                    }}
                >
                    {social.icon}
                </IconButton>
            ))}
        </Stack>
    );
};

export default FooterSocial;