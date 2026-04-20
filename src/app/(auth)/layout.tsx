import AuthLayout from "@/layout/core/Auth";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AuthLayout>{children}</AuthLayout>;
}