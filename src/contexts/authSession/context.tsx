'use client';

import {
    useMemo,
    useEffect,
    ReactNode,
    useCallback,
    createContext,
    useState,
} from 'react';

import { getSessionUser } from '@/app/actions/session-actions';

import type {
    User,
    UserRole,
} from '@/api/auth/types';

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
                const sessionUser = await getSessionUser();

                setUser(sessionUser);
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


    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);


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