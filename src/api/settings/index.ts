import { getServerAxios } from "../server-axios";
import { settingsConfig } from "@/config/settings";

import type { Preferences } from "@/api/auth/types";

export const getPreferences = async (): Promise<Preferences> => {
    try {
        const server = await getServerAxios();
        const response = await server.get<Preferences>(
            settingsConfig.preferencesEndpoint
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching preferences:", error);
        throw error;
    }
};

/** Accepts any subset; an empty body is a no-op. The 200 echoes stored state. */
export const updatePreferences = async (
    payload: Partial<Preferences>
): Promise<Preferences> => {
    try {
        const server = await getServerAxios();
        const response = await server.patch<Preferences>(
            settingsConfig.preferencesEndpoint,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Error updating preferences:", error);
        throw error;
    }
};
