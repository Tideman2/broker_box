import { Button } from "@mui/material";
import Link from "next/link";

type NavbarItemProps = {
    label: string;
    href: string;
}

export const NavbarItem = ({ label, href }: NavbarItemProps) => {

    return <Button color="inherit" component={Link} href={href}>{label}</Button>;
}