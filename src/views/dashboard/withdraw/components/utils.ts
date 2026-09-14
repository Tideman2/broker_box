export { formatAmount, toNumber } from "@/utils/format";
export {
    STATUS_LABELS,
    STATUS_TONES,
    extractErrorMessage,
    formatDate,
    statusLabel,
    statusTone,
    truncateAddress,
} from "@/utils/display";

import { truncateAddress } from "@/utils/display";

import type { DestinationResponse } from "@/api/withdraw/types";

export const destinationSubtitle = (destination: DestinationResponse): string => {
    if (destination.type === "BANK") {
        const parts = [destination.bank_name, destination.account_name].filter(
            Boolean
        );
        return parts.join(" · ") || "Bank destination";
    }
    const symbol = destination.asset_symbol;
    const address = destination.address;
    if (symbol && address) return `${symbol} · ${truncateAddress(address)}`;
    return address ?? "Crypto destination";
};