import { Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import DashboardCard from "@/components/DashboardCard";

import { GUIDELINES } from "./mockContent";

export default function DepositGuidelines() {
    return (
        <DashboardCard
            icon={InfoOutlinedIcon}
            title="Deposit Guidelines"
        >
            <Stack spacing={1.25}>
                {GUIDELINES.map((guideline) => (
                    <Typography
                        key={guideline}
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", lineHeight: 1.6 }}
                    >
                        • {guideline}
                    </Typography>
                ))}
            </Stack>
        </DashboardCard>
    );
}