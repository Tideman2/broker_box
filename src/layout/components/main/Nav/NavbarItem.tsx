import { Button } from "@mui/material";
import Link from "next/link";

type NavbarItemProps = {
    label: string;
    href: string;
}

export const NavbarItem = ({ label, href }: NavbarItemProps) => {
    return (
        <Button
            color="inherit"
            component={Link}
            href={href}
            sx={{
                px: 2,
                py: 1,
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                color: 'text.secondary',
                '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
            }}
        >
            {label}
        </Button>
    );
}