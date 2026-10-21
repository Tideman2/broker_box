"use server";

import {
    addBankDestination as fetchAddBankDestination,
    addCryptoDestination as fetchAddCryptoDestination,
    deleteWithdrawDestination as fetchDeleteWithdrawDestination,
    getAssets as fetchGetAssets,
    getAvailableBalance as fetchGetAvailableBalance,
    getWithdrawalDetail as fetchGetWithdrawalDetail,
    getWithdrawalRecords as fetchGetWithdrawalRecords,
    getWithdrawDestinations as fetchGetWithdrawDestinations,
    updateWithdrawDestination as fetchUpdateWithdrawDestination,
    withdrawFunds as fetchWithdrawFunds,
} from "@/api/withdraw";
import { extractServerError } from "@/api/utils/server-error";

import type {
    AddBankDestinationRequest,
    AddCryptoDestinationRequest,
    AssetResponse,
    DestinationResponse,
    UpdateDestinationInput,
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
        return { success: false, ...extractServerError(error) };
    }
}

export async function addCryptoDestination(
    payload: AddCryptoDestinationRequest
): Promise<ActionResult<DestinationResponse>> {
    try {
        const data = await fetchAddCryptoDestination(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, ...extractServerError(error) };
    }
}

export async function updateWithdrawDestination(
    id: number,
    payload: UpdateDestinationInput
): Promise<ActionResult<DestinationResponse>> {
    try {
        const data = await fetchUpdateWithdrawDestination(id, payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, ...extractServerError(error) };
    }
}

export async function deleteWithdrawDestination(
    id: number
): Promise<ActionResult<null>> {
    try {
        await fetchDeleteWithdrawDestination(id);
        return { success: true, data: null };
    } catch (error) {
        return { success: false, ...extractServerError(error) };
    }
}

export async function withdrawFunds(
    payload: WithdrawFundsRequest
): Promise<ActionResult<WithdrawFundsResponse>> {
    try {
        const data = await fetchWithdrawFunds(payload);
        return { success: true, data };
    } catch (error) {
        return { success: false, ...extractServerError(error) };
    }
}