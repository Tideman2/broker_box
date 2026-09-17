'use client';

import {
    useMemo,
    useEffect,
    ReactNode,
    useCallback,
    createContext,
    useState,
} from 'react';

import { getStorage } from '@/api/utils/storage';

import { axios } from '@/api';

import { authConfig } from '@/config/auth';

import type {
    User,
    UserRole,
} from '@/api/auth/types';

import { isTokenExpired, invalidateSession } from '@/api/utils/auth';

export type AuthValuesProps = {
    user: User | null;

    role: UserRole | null;

    checkUserSession: () => Promise<void>;

    loading: boolean;

    authenticated: boolean;

    unauthenticated: boolean;

};

const defaultAuthValues: AuthValuesProps = {
    user: null,
    role: null,
    checkUserSession: async () => { },
    loading: true,
    authenticated: false,
    unauthenticated: false
};

export const AuthContext =
    createContext<AuthValuesProps>(defaultAuthValues);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);


    const checkUserSession =
        useCallback(async () => {
            try {

                const token = getStorage(
                    authConfig.token
                );

                if (!token || isTokenExpired(token)) {
                    console.log('Token is missing or expired. Invalidating session.');
                    setUser(null);
                    invalidateSession();
                    return;
                }

                const response = await axios.get<User>(
                    authConfig.profileEndpoint
                );

                setUser(response.data);

            } catch (error) {
                console.error(
                    'Failed to restore user session:',
                    error
                );
                setUser(null);
            } finally {
                setLoading(false);
            }

        }, []);


    // useEffect(() => {
    //     checkUserSession();
    // }, [checkUserSession]);


    const role =
        user?.role ?? null;


    const authenticated =
        !loading && user !== null;


    const unauthenticated =
        !loading && user === null;


    const memoizedValue = useMemo(
        () => ({
            user,
            role,
            checkUserSession,
            loading,
            authenticated,
            unauthenticated,
        }),

        [
            user,
            role,
            checkUserSession,
            loading,
            authenticated,
            unauthenticated,
        ]
    );


    return (

        <AuthContext.Provider
            value={memoizedValue}
        >

            {children}

        </AuthContext.Provider>

    );

}
