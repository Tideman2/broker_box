import InvestmentPlanCheckout from "@/views/dashboard/investment_plan/checkout";

type PageProps = {
    searchParams: Promise<{ planId?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
    const { planId } = await searchParams;
    const raw = Array.isArray(planId) ? planId[0] : planId;
    const parsed = Number(raw);

    // Guard here so a missing or malformed ?planId= never reaches the API.
    const plan = Number.isInteger(parsed) && parsed > 0 ? parsed : null;

    return <InvestmentPlanCheckout planId={plan} />;
}
