import { authConfig } from "@/config/auth";
import { getServerAxios } from "../server-axios";

import type { RegistrationData } from "@/contexts/register/types";
import type {
    ChangePasswordPayload,
    ChangePasswordResponse,
    LoginResponse,
    RegisterResponse,
    UpdateProfilePayload,
    User,
} from "./types";

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

export const loginUser = async (
    data: LoginUserPayload
): Promise<LoginResponse> => {
    const serverAxios = await getServerAxios();
    const response = await serverAxios.post<LoginResponse>(
        authConfig.loginEndpoint,
        data
    );

    return response.data;
};

export const registerUser = async (
    data: RegistrationData
): Promise<RegisterResponse> => {
    const serverAxios = await getServerAxios();
    const response = await serverAxios.post<RegisterResponse>(
        authConfig.registerEndpoint,
        transformRegistrationData(data)
    );

    return response.data;
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

export const updateProfile = async (
    data: UpdateProfilePayload
): Promise<User> => {
    try {
        const serverAxios = await getServerAxios();
        const response = await serverAxios.patch<User>(
            authConfig.profileEndpoint,
            data
        );

        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

/**
 * Changes the password and revokes every session on the server, including the
 * token used to make this call. The caller must clear the session afterwards.
 */
export const changePassword = async (
    data: ChangePasswordPayload
): Promise<ChangePasswordResponse> => {
    try {
        const serverAxios = await getServerAxios();
        const response = await serverAxios.post<ChangePasswordResponse>(
            authConfig.changePasswordEndpoint,
            data
        );

        return response.data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        console.log("Attempting to log out user server-side...");
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
    const dob = data.dob.trim();
    const username = data.username?.trim();
    const address2 = data.address2?.trim();

    return {
        country: data.country.trim(),
        email: data.email.trim(),
        // Passwords are never trimmed: leading/trailing spaces are valid.
        password: data.password,
        full_name: data.fullName.trim(),
        phone: data.phone.trim(),
        ...(dob && { dob }),
        ...(username && { username }),
        address1: data.address1.trim(),
        ...(address2 && { address2 }),
        city: data.city.trim(),
        state: data.state.trim(),
        zip: data.zip.trim(),
        accept_terms: data.acceptTerms,
        marketing_opt_in: data.marketingOptIn ?? false,
    };
};