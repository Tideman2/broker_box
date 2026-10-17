import { authConfig } from "@/config/auth";
import { getServerAxios } from "../server-axios";

import type { RegistrationData } from "@/contexts/register/types";
import type { User } from "./types";

export type LoginUserPayload = {
    email: string;
    password: string;
};

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

export type ForgotPasswordPayload = {
    email: string;
};

export type ForgotPasswordResponse = {
    message: string;
    timeout: number;
};

export type VerifyOtpPayload = {
    email: string;
    otp: string;
};

export type VerifyOtpResponse = {
    message: string;
    password_reset_token: string;
};

export type ResetPasswordPayload = {
    email: string;
    new_password: string;
    reset_token: string;
};

export type ResetPasswordResponse = {
    message: string;
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

export const registerUser = async (
    data: RegistrationData
) => {
    try {
        const serverAxios = await getServerAxios()
        const response = await serverAxios.post(
            authConfig.registerEndpoint,
            transformRegistrationData(data)
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error registering user:",
            error
        );
        throw error;
    }
};

export const requestPasswordReset = async (
    data: ForgotPasswordPayload
): Promise<ForgotPasswordResponse> => {
    try {
        const serverAxios = await getServerAxios();
        const response = await serverAxios.post<ForgotPasswordResponse>(
            authConfig.resetPasswordEndpoint,
            data
        );

        return response.data;
    } catch (error) {
        console.error("Error requesting password reset:", error);
        throw error;
    }
};

export const verifyOtp = async (
    data: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
    try {
        const serverAxios = await getServerAxios();
        const response = await serverAxios.post<VerifyOtpResponse>(
            authConfig.verifyResetPasswordEndpoint,
            data
        );

        return response.data;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};

export const resetPassword = async (
    data: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
    try {
        const serverAxios = await getServerAxios();
        const response = await serverAxios.post<ResetPasswordResponse>(
            authConfig.completeResetPasswordEndpoint,
            data
        );

        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};

export const getCurrentUser = async (): Promise<User> => {
    const serverAxios = await getServerAxios();
    const response = await serverAxios.get<User>(
        authConfig.profileEndpoint
    );

    return response.data;
};

export const logoutUser = async () => {
    try {
        const serverAxios = await getServerAxios()
        const response = await serverAxios.post(
            authConfig.logoutEndpoint
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error logging out user:",
            error
        );
        throw error;
    }
};

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