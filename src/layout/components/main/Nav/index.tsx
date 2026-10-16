'use client';

import { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

import BrandLogo from '@/asset/logo';
import { PATHS } from '@/routes/paths';
import ThemeToggleButtonComponent from '@/components/ThemeToggleButton';
import { useMediaQuery } from '@/layout/hook/useMediaQueries';

import ContentWrapper from '../../ContentWrapper';
import { NavbarItem } from './NavbarItem';

const NAV_ITEMS = [
    { label: 'Packages', href: PATHS.home.packages },
    { label: 'About', href: PATHS.home.about },
    { label: 'Contact', href: PATHS.home.contact },
    { label: 'Login', href: PATHS.auth.login },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isDesktop = useMediaQuery("fromMd");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0); // true if scrolled down
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const toggleDrawer = (state: boolean) => () => {
        setOpen(state);
    };

    return (
        <AppBar position="sticky"
            color="transparent"
            elevation={0}
            sx={{
                top: 0,
                bgcolor: isScrolled ? 'background.paper' : 'transparent',
                backgroundImage: 'none',
                borderBottom: '1px solid',
                borderColor: isScrolled ? 'divider' : 'transparent',
                boxShadow: isScrolled ? 1 : 0,
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                transition: 'background-color 0.3s, box-shadow 0.3s, border-color 0.3s',
            }}>
            <ContentWrapper sx={{ paddingY: 1 }}>
                <Toolbar disableGutters sx={{ gap: 2, minHeight: 64 }}>
                    {/* Logo */}
                    <BrandLogo width={40} height={40} />
                    <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1, ml: 2 }}>
                        Merchant Box
                    </Typography>
                    {/* Desktop Menu */}
                    {isDesktop && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            {NAV_ITEMS.map((item) => (
                                <NavbarItem key={item.href} label={item.label} href={item.href} />
                            ))}
                            <ThemeToggleButtonComponent />
                        </Box>
                    )}

                    {/* Mobile Menu Button */}
                    {!isDesktop && (
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="Open menu"
                            onClick={toggleDrawer(true)}
                            sx={{ mr: 1 }}
                        >
                            <MenuIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    )}

                    {/* Mobile Drawer */}
                    <Drawer
                        anchor="right"
                        open={open} onClose={toggleDrawer(false)}
                        transitionDuration={400}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        BackdropProps={{
                            sx: {
                                backdropFilter: 'blur(6px)',
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            },
                        }}
                        sx={{
                            '& .MuiDrawer-paper': {
                                width: 270,
                                boxSizing: 'border-box',
                                bgcolor: 'background.paper',
                                backdropFilter: 'blur(12px)',
                                borderLeft: '1px solid',
                                borderColor: 'divider',
                                p: 2,
                            },
                        }}>
                        <Box sx={{ width: '100%' }} role="presentation" onClick={toggleDrawer(false)}>
                            <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {NAV_ITEMS.map((item) => (
                                    <ListItemButton
                                        key={item.href}
                                        component={Link}
                                        href={item.href}
                                        sx={{ borderRadius: 1.5, px: 2, py: 1 }}
                                    >
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Box>
                        <ThemeToggleButtonComponent />
                    </Drawer>
                </Toolbar>
            </ContentWrapper>
        </AppBar>
    );
}