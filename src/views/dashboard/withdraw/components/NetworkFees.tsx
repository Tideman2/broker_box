import { Box, Divider, Stack, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import DashboardCard from "@/components/DashboardCard";

import { NETWORK_FEES, NETWORK_FEES_NOTE } from "./mockContent";

export default function NetworkFees() {
    return (
        <DashboardCard title="Network Fees" icon={ReceiptLongIcon}>
            <Stack spacing={1.25}>
                {NETWORK_FEES.map((fee) => (
                    <Stack
                        key={fee.label}
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Typography variant="body2" color="text.secondary">
                            {fee.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {fee.value}
                        </Typography>
                    </Stack>
                ))}

                <Divider sx={{ my: 0.5 }} />

                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic" }}>
                    {NETWORK_FEES_NOTE}
                </Typography>

                <Box sx={{ height: 8 }} />
            </Stack>
        </DashboardCard>
    );
}