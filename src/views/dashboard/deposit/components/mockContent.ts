import { GLOBAL_CONFIG } from "@/config/global";

export const DEPOSIT_NOTE =
    "Only send the selected asset to the displayed address. Sending unsupported assets may result in loss of funds. Always verify the address before sending. Deposits may require blockchain confirmation before appearing as confirmed.";

export const COMING_SOON_TITLE = "Bank Transfer";

export const COMING_SOON_MESSAGE =
    "Bank transfer deposits are coming soon. In the meantime, you can fund your account using Crypto Deposit.";

export const PAYMENT_METHOD_LABELS: Record<number, string> = {
    1: "Crypto Deposit",
    2: "Bank Transfer",
};

export const SUCCESS_MODAL_TITLE = "Deposit Request Submitted";

export const SUCCESS_MODAL_CAPTION =
    "Your deposit request has been recorded. Track its progress in Recent Deposits.";

export const COPY_ADDRESS_SUCCESS = "Copied to clipboard";

export const NO_ADDRESS_MESSAGE =
    "No wallet address available for this asset. Please contact support.";

export const GUIDELINES = [
    "Only send the selected cryptocurrency to the displayed address.",
    "Sending an unsupported asset may result in permanent loss of funds.",
    "Always verify the wallet address before sending any funds.",
    "Deposits may require blockchain confirmation before they appear as confirmed.",
    `${GLOBAL_CONFIG.site.name} is not responsible for funds sent to incorrect addresses.`,
] as const;