import DashboardLayout from "@/layout/core/Dashboard";
import { AuthProvider } from "@/contexts/authSession/context";
import { CurrencyProvider } from "@/contexts/currency/context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout>
        <AuthProvider>
            {/* Mounts inside the authed shell only, so the preferences request
                never fires on the public landing and auth routes. */}
            <CurrencyProvider>
                {children}
            </CurrencyProvider>
        </AuthProvider>
    </DashboardLayout>;
}
