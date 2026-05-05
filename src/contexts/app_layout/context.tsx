'use client';
import React, { useEffect, createContext } from 'react';
import app_context_type from './types';
import { MOBILE_BREAKPOINT } from './const'
import useWindowSize from '@/layout/hook/useWindowSize';

export const AppLayoutContext = createContext<app_context_type | undefined>(undefined);

export const AppLayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { width } = useWindowSize();
    const [isMobile, setIsMobile] = React.useState(width ? width < MOBILE_BREAKPOINT : false);

    useEffect(() => {
        setIsMobile(width ? width < MOBILE_BREAKPOINT : false);
    }, [width]);

    return (
        <AppLayoutContext.Provider value={{ isMobile }}>
            {children}
        </AppLayoutContext.Provider>
    );
};

export const useAppLayout = () => {
    const context = React.useContext(AppLayoutContext);
    if (context === undefined) {
        throw new Error('useAppLayout must be used within an AppLayoutProvider');
    }
    return context;
}