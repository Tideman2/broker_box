"use server";

import { getMoneyFlow as fetchGetMoneyFlow } from "@/api/wallet";

import type { MoneyFlowResponse } from "@/api/wallet/types";

export async function getMoneyFlow(): Promise<MoneyFlowResponse> {
    return fetchGetMoneyFlow();
}
