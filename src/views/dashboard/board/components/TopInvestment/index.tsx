import { Box, Button, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import DashboardCard from '@/components/DashboardCard';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import StatusPill from '@/components/StatusPill';
import { formatDate } from '@/utils/display';
import { formatAmount, toNumber } from '@/utils/format';

import {
    RISK_LABELS,
    SUBSCRIPTION_STATUS_LABELS,
    SUBSCRIPTION_STATUS_TONES,
    formatDuration,
    formatRoi,
} from '@/views/dashboard/investment_plan/constants';

import type { PlanResponse } from '@/api/plan/types';
import type { SubscriptionResponse } from '@/api/subscription/types';

type TopInvestmentProps = {
    subscription?: SubscriptionResponse;
    plan?: PlanResponse;
    loading?: boolean;
    error?: boolean;
    onRetry?: () => void;
};

type MetricProps = {
    label: string;
    value: string;
};

function Metric({ label, value }: MetricProps) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary" display="block">
                {label}
            </Typography>
            <Typography variant="body2">{value}</Typography>
        </Box>
    );
}

export default function TopInvestment({
    subscription,
    plan,
    loading,
    error,
    onRetry,
}: TopInvestmentProps) {
    return (
        <DashboardCard title="Top Investment" icon={TrendingUpIcon}>
            {loading ? (
                <LoadingState height={40} lines={4} />
            ) : error ? (
                <EmptyState
                    title="Top investment unavailable"
                    description="We could not load your investment plans."
                    action={
                        <Button size="small" variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    }
                />
            ) : !subscription ? (
                <EmptyState
                    icon={TrendingUpIcon}
                    title="No active investments"
                    description="Subscribe to a plan to see it here."
                />
            ) : (
                <Stack spacing={2}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Typography variant="subtitle1">
                            {subscription.plan_title}
                        </Typography>
                        <StatusPill
                            status={subscription.status}
                            label={SUBSCRIPTION_STATUS_LABELS[subscription.status]}
                            tone={SUBSCRIPTION_STATUS_TONES[subscription.status]}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={{ xs: 3, md: 4 }}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        <Metric
                            label="Invested"
                            value={formatAmount(toNumber(subscription.invested_amount), 0)}
                        />
                        <Metric
                            label="ROI"
                            value={plan ? formatRoi(plan.roi) : '—'}
                        />
                        <Metric
                            label="Duration"
                            value={plan ? formatDuration(plan.duration) : '—'}
                        />
                        <Metric
                            label="Risk"
                            value={plan ? RISK_LABELS[plan.risk_management] : '—'}
                        />
                    </Stack>

                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Expires
                        </Typography>
                        <Typography variant="body2">
                            {formatDate(subscription.expiration_date)}
                        </Typography>
                    </Box>
                </Stack>
            )}
        </DashboardCard>
    );
}
