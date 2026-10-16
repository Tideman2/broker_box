import { Divider, Stack, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import DashboardCard from "@/components/DashboardCard";
import DetailRow from "@/components/DetailRow";

import { NETWORK_FEES, NETWORK_FEES_NOTE } from "./mockContent";

export default function NetworkFees() {
    return (
        <DashboardCard
            title="Network Fees"
            icon={ReceiptLongIcon}
            sx={{ position: { lg: "sticky" }, top: { lg: 88 } }}
        >
            <Stack spacing={1.25} divider={<Divider sx={{ borderColor: "divider" }} />}>
                {NETWORK_FEES.map((fee) => (
                    <DetailRow key={fee.label} label={fee.label} value={fee.value} />
                ))}
            </Stack>

            <Divider sx={{ my: 1.5, borderColor: "divider" }} />

            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic", lineHeight: 1.6 }}>
                {NETWORK_FEES_NOTE}
            </Typography>
        </DashboardCard>
    );
}
