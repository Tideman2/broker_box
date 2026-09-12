"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Grid, Stack } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";

import {
    getAvailableBalance,
    getWithdrawDestinations,
    getWithdrawalRecords,
    withdrawFunds,
} from "@/api/withdraw";
import { withdrawQueryKeys } from "@/api/react-query-keys";

import { extractErrorMessage } from "./components/utils";

import WithdrawHeader from "./components/WithdrawHeader";
import BalanceBanner from "./components/BalanceBanner";
import WithdrawalRequest from "./components/WithdrawalRequest";
import NetworkFees from "./components/NetworkFees";
import SupportCard from "./components/SupportCard";
import RecentWithdrawals from "./components/RecentWithdrawals";
import AddDestinationModal from "./components/AddDestinationModal";
import FullHistoryDialog from "./components/FullHistoryDialog";
import WithdrawalDetailModal from "./components/WithdrawalDetailModal";
import WithdrawSuccessModal from "./components/WithdrawSuccessModal";
import DashboardFooter from "../board/components/DashboardFooter";

import type { DestinationResponse, WithdrawFundsResponse } from "@/api/withdraw/types";

export default function Withdraw() {
    const queryClient = useQueryClient();

    const [selectedDestination, setSelectedDestination] = useState<DestinationResponse | null>(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const [detailRecordId, setDetailRecordId] = useState<number | null>(null);
    const [successData, setSuccessData] = useState<WithdrawFundsResponse | null>(null);
    const [withdrawError, setWithdrawError] = useState<string>("");
    const [formResetKey, setFormResetKey] = useState(0);

    const balanceQuery = useQuery({
        queryKey: withdrawQueryKeys.availableBalance,
        queryFn: getAvailableBalance,
        refetchOnWindowFocus: false,
    });

    const destinationsQuery = useQuery({
        queryKey: withdrawQueryKeys.destinations,
        queryFn: getWithdrawDestinations,
        refetchOnWindowFocus: false,
    });

    const recordsQuery = useQuery({
        queryKey: withdrawQueryKeys.withdraws,
        queryFn: getWithdrawalRecords,
        refetchOnWindowFocus: false,
    });

    const withdrawMutation = useMutation({
        mutationFn: withdrawFunds,
        onMutate: () => setWithdrawError(""),
        onSuccess: (data: WithdrawFundsResponse) => {
            setSuccessData(data);
            setFormResetKey((key) => key + 1);
            queryClient.invalidateQueries({ queryKey: withdrawQueryKeys.availableBalance });
            queryClient.invalidateQueries({ queryKey: withdrawQueryKeys.withdraws });
        },
        onError: (error: unknown) => {
            setWithdrawError(extractErrorMessage(error));
        },
    });

    const destinations = destinationsQuery.data ?? [];
    const records = recordsQuery.data ?? [];

    const handleSelect = (destination: DestinationResponse) => {
        setSelectedDestination(destination);
    };

    const handleSubmit = (amount: number, destinationId: number) => {
        withdrawMutation.mutate({ amount, destination_id: destinationId });
    };

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <WithdrawHeader onViewHistory={() => setHistoryOpen(true)} />

                <BalanceBanner
                    balance={balanceQuery.data}
                    loading={balanceQuery.isLoading}
                    error={balanceQuery.isError}
                    onRetry={() => balanceQuery.refetch()}
                />

                {withdrawError && (
                    <Alert
                        severity="error"
                        variant="outlined"
                        onClose={() => setWithdrawError("")}
                    >
                        {withdrawError}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <WithdrawalRequest
                            key={`withdrawal-form-${formResetKey}`}
                            balance={balanceQuery.data}
                            destinations={destinations}
                            selectedId={selectedDestination?.id ?? null}
                            onSelect={handleSelect}
                            onAddNew={() => setAddModalOpen(true)}
                            destinationsLoading={destinationsQuery.isLoading}
                            destinationsError={destinationsQuery.isError}
                            destinationsRetry={() => destinationsQuery.refetch()}
                            submitting={withdrawMutation.isPending}
                            onSubmit={handleSubmit}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Stack spacing={3}>
                            <NetworkFees />
                            <SupportCard />
                        </Stack>
                    </Grid>
                </Grid>

                <RecentWithdrawals
                    records={records}
                    loading={recordsQuery.isLoading}
                    error={recordsQuery.isError}
                    onRetry={() => recordsQuery.refetch()}
                    onRowClick={(record) => setDetailRecordId(record.id)}
                />

                <DashboardFooter />
            </Stack>

            <AddDestinationModal
                key={addModalOpen ? "open" : "closed"}
                open={addModalOpen}
                onClose={() => setAddModalOpen(false)}
            />

            <FullHistoryDialog
                open={historyOpen}
                records={records}
                onClose={() => setHistoryOpen(false)}
                onRowClick={(record) => setDetailRecordId(record.id)}
            />

            <WithdrawalDetailModal
                recordId={detailRecordId}
                onClose={() => setDetailRecordId(null)}
            />

            <WithdrawSuccessModal
                data={successData}
                onDone={() => setSuccessData(null)}
            />
        </ContentWrapper>
    );
}