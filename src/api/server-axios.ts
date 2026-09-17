// src/api/server-axios.ts
import axios from "axios";
import { getCookie } from "./utils/cookies";
import { authConfig } from "@/config/auth";

export const getServerAxios = async () => {
    const cookie = await getCookie(authConfig.sessionToken)
    const instance = axios.create({
        baseURL: process.env.BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Automatically inject the Authorization bearer token if the cookie exists
    if (cookie) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${cookie.value}`;
    }

    return instance;
};
