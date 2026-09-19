"use server";

import {
    depositFunds as fetchDepositFunds,
    getAssets as fetchGetAssets,
    getAvailableBalance as fetchGetAvailableBalance,
    getDepositDetail as fetchGetDepositDetail,
    getDeposits as fetchGetDeposits,
} from "@/api/deposit";
import { extractServerErrorMessage } from "@/api/utils/server-error";

import type {
    AssetResponse,
    DepositFundsRequest,
    DepositFundsResponse,
    DepositResponse,
} from "@/api/deposit/types";
import type { ActionResult } from "@/api/utils/action-result";

export async function getAssets(): Promise<AssetResponse[]> {
    return fetchGetAssets();
}

export async function getAvailableBalance(): Promise<number> {
    return fetchGetAvailableBalance();
}

export async function getDeposits(
    limit: number,
    offset: number
): Promise<DepositResponse[]> {
    return fetchGetDeposits(limit, offset);
}

export async function getDepositDetail(
    id: number
): Promise<DepositFundsResponse> {
    return fetchGetDepositDetail(id);
}

export async function depositFunds(
    payload: DepositFundsRequest
): Promise<ActionResult<DepositFundsResponse>> {
    try {
        const data = await fetchDepositFunds(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}