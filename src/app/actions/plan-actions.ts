"use server";

import { getPlans as fetchGetPlans } from "@/api/plan";

import type { PlansResponse } from "@/api/plan/types";

export async function getPlans(): Promise<PlansResponse> {
    return fetchGetPlans();
}
