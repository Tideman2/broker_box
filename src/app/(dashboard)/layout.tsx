import DashboardLayout from "@/layout/core/Dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}