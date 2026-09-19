import MainLayout from "@/layout/core/Main";
import TradingViewTicker2 from "@/views/trading-view-widgets/TradingViewTicker2";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <MainLayout>
        {children}
        <TradingViewTicker2 />
    </MainLayout>;
}