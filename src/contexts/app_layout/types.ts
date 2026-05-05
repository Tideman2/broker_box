
type app_context_type = {
    isMobile: boolean;
    setMobile?: (isMobile: boolean) => void; // optional setter if needed in the future
};

export default app_context_type;