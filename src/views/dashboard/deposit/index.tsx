"use client";

import { useState } from "react";
import { useMutation, useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Grid, Stack } from "@mui/material";

import ContentWrapper from "@/layout/components/ContentWrapper";

import { depositFunds, getAssets, getAvailableBalance, getDeposits } from "@/api/deposit";
import { depositQueryKeys } from "@/api/react-query-keys";

import { extractErrorMessage } from "@/utils/display";

import { DEPOSITS_PAGE_LIMIT } from "./constants";

import DepositHeader from "./components/DepositHeader";
import PaymentMethodTabs, { METHOD_CRYPTO } from "./components/PaymentMethodTabs";
import AssetSelector from "./components/AssetSelector";
import PaymentDetails from "./components/PaymentDetails";
import DepositSummary from "./components/DepositSummary";
import DepositGuidelines from "./components/DepositGuidelines";
import RecentDeposits from "./components/RecentDeposits";
import DepositDetailModal from "./components/DepositDetailModal";
import DepositSuccessModal from "./components/DepositSuccessModal";
import DashboardFooter from "../board/components/DashboardFooter";

import type { AssetResponse, DepositFundsResponse } from "@/api/deposit/types";

export default function Deposit() {
    const queryClient = useQueryClient();

    const [method, setMethod] = useState<number>(METHOD_CRYPTO);
    const [selectedAsset, setSelectedAsset] = useState<AssetResponse | null>(null);
    const [detailDepositId, setDetailDepositId] = useState<number | null>(null);
    const [successData, setSuccessData] = useState<DepositFundsResponse | null>(null);
    const [depositError, setDepositError] = useState<string>("");
    const [formResetKey, setFormResetKey] = useState(0);

    const assetsQuery = useQuery({
        queryKey: depositQueryKeys.assets,
        queryFn: getAssets,
        enabled: method === METHOD_CRYPTO,
        refetchOnWindowFocus: false,
    });

    const balanceQuery = useQuery({
        queryKey: depositQueryKeys.availableBalance,
        queryFn: getAvailableBalance,
        refetchOnWindowFocus: false,
    });

    const depositsQuery = useInfiniteQuery({
        queryKey: depositQueryKeys.deposits,
        queryFn: ({ pageParam }) => getDeposits(DEPOSITS_PAGE_LIMIT, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) =>
            lastPage.length < DEPOSITS_PAGE_LIMIT
                ? undefined
                : pages.length * DEPOSITS_PAGE_LIMIT,
        refetchOnWindowFocus: false,
    });

    const depositMutation = useMutation({
        mutationFn: depositFunds,
        onMutate: () => setDepositError(""),
        onSuccess: (data: DepositFundsResponse) => {
            setSuccessData(data);
            setFormResetKey((key) => key + 1);
            queryClient.invalidateQueries({ queryKey: depositQueryKeys.deposits });
            queryClient.invalidateQueries({ queryKey: depositQueryKeys.availableBalance });
        },
        onError: (error: unknown) => {
            setDepositError(extractErrorMessage(error));
        },
    });

    const assets = assetsQuery.data ?? [];
    const deposits = depositsQuery.data?.pages.flat() ?? [];

    const handleSelectAsset = (asset: AssetResponse) => {
        setSelectedAsset(asset);
    };

    const handleSubmit = (amount: number) => {
        if (!selectedAsset) return;
        depositMutation.mutate({
            deposit: {
                amount,
                asset_id: selectedAsset.id,
                payment_method: method,
            },
        });
    };

    return (
        <ContentWrapper>
            <Stack spacing={3}>
                <DepositHeader
                    onRefresh={() => {
                        depositsQuery.refetch();
                        balanceQuery.refetch();
                    }}
                    refreshing={depositsQuery.isRefetching || balanceQuery.isRefetching}
                />

                {depositError && (
                    <Alert
                        severity="error"
                        variant="outlined"
                        onClose={() => setDepositError("")}
                    >
                        {depositError}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Stack spacing={3}>
                            <PaymentMethodTabs
                                method={method}
                                onChange={setMethod}
                                disabled={depositMutation.isPending}
                            />

                            {method === METHOD_CRYPTO && (
                                <>
                                    <AssetSelector
                                        assets={assets}
                                        selectedId={selectedAsset?.id ?? null}
                                        onSelect={handleSelectAsset}
                                        loading={assetsQuery.isLoading}
                                        error={assetsQuery.isError}
                                        onRetry={() => assetsQuery.refetch()}
                                    />

                                    <PaymentDetails
                                        key={`deposit-form-${formResetKey}`}
                                        asset={selectedAsset}
                                        submitting={depositMutation.isPending}
                                        onSubmit={handleSubmit}
                                    />
                                </>
                            )}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Stack spacing={3}>
                            <DepositSummary
                                asset={selectedAsset}
                                balance={balanceQuery.data}
                                balanceLoading={balanceQuery.isLoading}
                                balanceError={balanceQuery.isError}
                                onBalanceRetry={() => balanceQuery.refetch()}
                            />
                            <DepositGuidelines />
                        </Stack>
                    </Grid>
                </Grid>

                <RecentDeposits
                    deposits={deposits}
                    loading={depositsQuery.isLoading}
                    error={depositsQuery.isError}
                    onRetry={() => depositsQuery.refetch()}
                    hasMore={depositsQuery.hasNextPage}
                    loadingMore={depositsQuery.isFetchingNextPage}
                    onLoadMore={() => depositsQuery.fetchNextPage()}
                    onRowClick={(deposit) => setDetailDepositId(deposit.id)}
                />

                <DashboardFooter />
            </Stack>

            <DepositDetailModal
                depositId={detailDepositId}
                onClose={() => setDetailDepositId(null)}
            />

            <DepositSuccessModal
                data={successData}
                onDone={() => setSuccessData(null)}
            />
        </ContentWrapper>
    );
}