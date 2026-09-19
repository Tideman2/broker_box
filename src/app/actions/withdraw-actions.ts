"use server";

import {
    addBankDestination as fetchAddBankDestination,
    addCryptoDestination as fetchAddCryptoDestination,
    getAssets as fetchGetAssets,
    getAvailableBalance as fetchGetAvailableBalance,
    getWithdrawalDetail as fetchGetWithdrawalDetail,
    getWithdrawalRecords as fetchGetWithdrawalRecords,
    getWithdrawDestinations as fetchGetWithdrawDestinations,
    withdrawFunds as fetchWithdrawFunds,
} from "@/api/withdraw";
import { extractServerErrorMessage } from "@/api/utils/server-error";

import type {
    AddBankDestinationRequest,
    AddCryptoDestinationRequest,
    AssetResponse,
    DestinationResponse,
    UserWithdrawalRecordsResponse,
    WithdrawFundsRequest,
    WithdrawFundsResponse,
} from "@/api/withdraw/types";
import type { ActionResult } from "@/api/utils/action-result";

export async function getAssets(): Promise<AssetResponse[]> {
    return fetchGetAssets();
}

export async function getWithdrawDestinations(): Promise<DestinationResponse[]> {
    return fetchGetWithdrawDestinations();
}

export async function getAvailableBalance(): Promise<number> {
    return fetchGetAvailableBalance();
}

export async function getWithdrawalRecords(): Promise<
    UserWithdrawalRecordsResponse[]
> {
    return fetchGetWithdrawalRecords();
}

export async function getWithdrawalDetail(
    id: number
): Promise<WithdrawFundsResponse> {
    return fetchGetWithdrawalDetail(id);
}

export async function addBankDestination(
    payload: AddBankDestinationRequest
): Promise<ActionResult<DestinationResponse>> {
    try {
        const data = await fetchAddBankDestination(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}

export async function addCryptoDestination(
    payload: AddCryptoDestinationRequest
): Promise<ActionResult<DestinationResponse>> {
    try {
        const data = await fetchAddCryptoDestination(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}

export async function withdrawFunds(
    payload: WithdrawFundsRequest
): Promise<ActionResult<WithdrawFundsResponse>> {
    try {
        const data = await fetchWithdrawFunds(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: extractServerErrorMessage(error) };
    }
}