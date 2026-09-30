import { getServerAxios } from "../server-axios";
import { planConfig } from "@/config/plan";

import type { PlansResponse } from "./types";

export const getPlans = async (): Promise<PlansResponse> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<PlansResponse>(
            planConfig.plansEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching plans:", error);
        throw error;
    }
};
