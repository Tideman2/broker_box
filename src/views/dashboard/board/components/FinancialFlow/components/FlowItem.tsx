import { Box, Stack, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import StatusPill from '@/components/StatusPill';
import { useFormatCurrency } from '@/contexts/currency/hooks';
import { formatDate } from '@/utils/display';
import { toNumber } from '@/utils/format';

import type { StatusTone } from '@/utils/display';
import type { MoneyFlowItem, MoneyFlowType } from '@/api/wallet/types';

const TYPE_LABELS: Record<MoneyFlowType, string> = {
    DEPOSIT: 'Deposit',
    WITHDRAWAL: 'Withdrawal',
    SUBSCRIPTION_INVESTMENT: 'Plan investment',
    SUBSCRIPTION_PAYOUT: 'Plan payout',
};

/**
 * Deposit and withdrawal statuses are lowercase while subscription statuses
 * are uppercase, so both forms are normalised here instead of editing the
 * shared maps the deposit tables rely on.
 */
const STATUS_LABELS: Record<string, string> = {
    confirmed: 'Completed',
    ACTIVE: 'Active',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
};

const STATUS_TONES: Record<string, StatusTone> = {
    confirmed: 'success',
    ACTIVE: 'success',
    COMPLETED: 'success',
    CANCELLED: 'error',
};

/** `occurred_at` is UTC; both parts are rendered in the viewer's local time. */
const occurredAtParts = (value: string): { date: string; time: string } => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return { date: '—', time: '—' };

    return {
        date: formatDate(value),
        time: parsed.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }),
    };
};

type FlowItemProps = {
    item: MoneyFlowItem;
};

export default function FlowItem({ item }: FlowItemProps) {
    const { formatAmount } = useFormatCurrency();
    const isIn = item.direction === 'IN';
    const occurred = occurredAtParts(item.occurred_at);

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            py={1.25}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ minWidth: 0 }}
            >
                <Box
                    aria-hidden="true"
                    sx={{
                        width: 28,
                        height: 28,
                        flexShrink: 0,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isIn ? 'success.main' : 'error.main',
                        border: '1px solid',
                        borderColor: isIn ? 'success.main' : 'error.main',
                    }}
                >
                    {isIn ? (
                        <ArrowDownwardIcon sx={{ fontSize: 16 }} />
                    ) : (
                        <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                    )}
                </Box>

                <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {TYPE_LABELS[item.type]}
                    </Typography>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            {occurred.date} · {occurred.time}
                        </Typography>
                        <StatusPill
                            status={item.status}
                            label={STATUS_LABELS[item.status] ?? item.status}
                            tone={STATUS_TONES[item.status] ?? 'info'}
                            sx={{
                                px: 1,
                                py: 0,
                                fontSize: '0.65rem',
                                lineHeight: 1.6,
                            }}
                        />
                    </Stack>
                </Stack>
            </Stack>

            <Stack alignItems="flex-end" spacing={0.25} sx={{ flexShrink: 0 }}>
                <Typography
                    variant="body2"
                    fontWeight={700}
                    color={isIn ? 'success.main' : 'error.main'}
                    sx={{
                        fontVariantNumeric: 'tabular-nums',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {isIn ? '+' : '−'}
                    {formatAmount(toNumber(item.amount))}
                </Typography>
                {item.asset_symbol && (
                    <Typography variant="caption" color="text.secondary">
                        {item.asset_symbol}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
}
