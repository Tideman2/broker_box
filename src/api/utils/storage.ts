export const getStorage = (key: string): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem(key);
};


export const setStorage = (
    key: string,
    value: string
): void => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(key, value);
};


export const removeStorage = (key: string): void => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.removeItem(key);
};