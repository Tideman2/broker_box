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
            color={isScrolled ? "default" : "transparent"}
            elevation={isScrolled ? 4 : 0}
            sx={{
                top: 0,
                transition: 'background-color 0.3s, box-shadow 0.3s',
            }}>
            <ContentWrapper sx={{ paddingY: 1 }}>
                <Toolbar>
                    {/* Logo */}
                    <BrandLogo width={40} height={40} />
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                        Merchant Box
                    </Typography>
                    {/* Desktop Menu */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 2,
                        }}
                    >
                        {NAV_ITEMS.map((item) => (
                            <NavbarItem key={item.href} label={item.label} href={item.href} />
                        ))}
                        <ThemeToggleButtonComponent />
                    </Box>

                    {/* Mobile Menu Button */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'block', md: 'none' }, mr: 5 }}
                    >
                        <MenuIcon />
                    </IconButton>

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
                                backdropFilter: 'blur(12px)',
                                borderRight: '1px solid',
                                borderColor: 'divider',
                            },
                        }}>
                        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                            <List>
                                {NAV_ITEMS.map((item) => (
                                    <ListItemButton key={item.href} component={Link} href={item.href}>
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