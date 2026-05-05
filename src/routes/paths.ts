const ROOTS = {
    AUTH: '/auth',
    CHECKOUT: '/checkout',
    DASHBOARD: '/dashboard',
};

export const PATHS = {
    home: {
        root: '/',
        about: '/about',
        packages: '/packages',
        contact: '/contact',
    },

    // AUTH
    auth: {
        root: ROOTS.AUTH,
        login: `${ROOTS.AUTH}/login`,
        register: `${ROOTS.AUTH}/register`,
        resetPassword: {
            root: `${ROOTS.AUTH}/reset-password`,
            verify: `${ROOTS.AUTH}/reset-password/verify`,
            complete: `${ROOTS.AUTH}/reset-password/complete`,
            success: `${ROOTS.AUTH}/reset-password/success`,
        },
    },

    // DASHBOARD
    dashboard: {
        root: ROOTS.DASHBOARD,
        settings: `${ROOTS.DASHBOARD}/settings`,
        portfolio: `${ROOTS.DASHBOARD}/portfolio`,
        markets: `${ROOTS.DASHBOARD}/markets`,
        investmentplans: `${ROOTS.DASHBOARD}/investment-plans`,
        deposit: `${ROOTS.DASHBOARD}/deposit`,
        withdraw: `${ROOTS.DASHBOARD}/withdraw`,
    },
}

