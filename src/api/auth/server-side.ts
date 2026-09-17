import { authConfig } from "@/config/auth";
import { getServerAxios } from "../server-axios";

export type LoginUserPayload = {
    email: string;
    password: string;
};

export const loginUser = async (data: LoginUserPayload) => {
    try {
        const serverAxios = await getServerAxios()
        const response = await serverAxios.post(
            authConfig.loginEndpoint,
            data
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error logging in user:",
            error
        );
        throw error;
    }
}