import { GLOBAL_CONFIG } from "@/config/global";

export const MIN_WITHDRAW_AMOUNT = 100;

export const BALANCE_CHANGE_PERCENT = 12.5;

export const BALANCE_CAPTION =
    "Withdrawals are processed within 2-24 hours depending on network load.";

export const IMPORTANT_NOTE = `Ensure the wallet address supports the network being used. ${GLOBAL_CONFIG.site.name} is not responsible for funds sent to incorrect or incompatible networks.`;

export const NETWORK_FEES = [
    { label: "Internal Processing", value: "FREE" },
    { label: "Network Fee (BTC)", value: "0.0001 BTC" },
    { label: "Network Fee (ERC20)", value: "~$12.50" },
] as const;

export const NETWORK_FEES_NOTE =
    "Network fees vary based on real-time congestion and are paid directly to the blockchain miners.";

export const SUPPORT_TITLE = "Need help with a transfer?";

export const SUPPORT_BODY =
    "Our support team is available 24/7 for security verifications.";

export const SUPPORT_ACTION = "Contact Support";

export const SUCCESS_MODAL_TITLE = "Withdrawal Request Successful";

export const SUCCESS_MODAL_CAPTION =
    "Your withdrawal has been recorded and is now being processed. Track its progress in Recent Withdrawals.";