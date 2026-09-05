import DashboardLayout from "@/layout/core/Dashboard";
import { AuthProvider } from "@/contexts/authSession/context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>
        <AuthProvider>
            {children}
        </AuthProvider>
    </DashboardLayout>;
}