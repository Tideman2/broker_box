import MainLayout from "@/layout/core/Main";
import TradingViewTicker2 from "@/views/trading-view-widgets/TradingViewTicker2";
import { headers } from 'next/headers'


export default async function Layout({ children }: { children: React.ReactNode }) {
    const nonce = (await headers()).get("x-nonce");

    return <MainLayout>
        {children}
        <TradingViewTicker2 nonce={nonce ?? ""} />
    </MainLayout>;
}