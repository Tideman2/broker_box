import { removeStorage, setStorage } from "./storage";
import { authConfig } from "@/config/auth";

import { jwtDecode } from 'jwt-decode';
import { PATHS } from "@/routes/paths";

type TokenPayload = {
    exp?: number;
};


export const isTokenExpired = (
    token: string
): boolean => {
    try {
        const decoded =
            jwtDecode<TokenPayload>(token);

        if (!decoded.exp) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp <= currentTime;

    } catch {
        return true;
    }
};

export const invalidateSession = (
    message?: string
) => {
    removeStorage(authConfig.token);
    window.location.href = PATHS.auth.login;
};

