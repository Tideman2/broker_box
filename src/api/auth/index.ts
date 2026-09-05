import { RegistrationData } from "@/contexts/register/types";
import { authConfig } from "@/config/auth";
import { axios } from "@/api";

import { setStorage } from "../utils/storage";

// TYPES
export type RegisterUserPayload = {
    country: string;
    email: string;
    password: string;
    full_name: string;
    phone: string;
    dob?: string;
    username?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    accept_terms: boolean;
    marketing_opt_in?: boolean;
};

// API CALLS
export const registerUser = async (
    data: RegistrationData
) => {
    try {

        const payload = transformRegistrationData(data);
        const response = await axios.post(
            "auth/register",
            payload
        );

        setStorage(authConfig.token, response.data.token);

        return response.data;

    } catch (error) {
        console.error(
            "Error registering user:",
            error
        );
        throw error;
    }
};


// TRANSFORMERS

export const transformRegistrationData = (
    data: RegistrationData
): RegisterUserPayload => {

    return {
        country: data.country,
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        phone: data.phone,
        dob: data.dob || undefined,
        username: data.username || undefined,
        address1: data.address1,
        address2: data.address2 || undefined,
        city: data.city,
        state: data.state,
        zip: data.zip,
        accept_terms: data.acceptTerms,
        marketing_opt_in: data.marketingOptIn ?? false,
    };
};