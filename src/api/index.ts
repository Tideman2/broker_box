import Axios, { AxiosInstance } from 'axios';

import {
    getStorage,
    removeStorage,
} from '@/api/utils/storage';

import { env } from '@/config/env';

import { authConfig } from '@/config/auth';


const invalidateSession = (message?: string) => {

    if (message?.toLowerCase().includes('token expire')) {
        removeStorage(authConfig.token);

        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }

};


export const baseURL = `${env.baseURL}/`;


const axios: AxiosInstance = Axios.create({
    baseURL,
});


axios.interceptors.request.use((config) => {
    const token = getStorage(authConfig.token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;
});


axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.data?.statusCode === 401) {
            invalidateSession(
                error?.response?.data?.result?.message
            );

        }

        return Promise.reject(error?.response ?? error);

    }

);


export { axios };