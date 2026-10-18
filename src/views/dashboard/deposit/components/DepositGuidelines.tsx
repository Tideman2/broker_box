import { Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DashboardCard from "@/components/DashboardCard";

import { GUIDELINES } from "./mockContent";

export default function DepositGuidelines() {
    return (
        <DashboardCard
            icon={InfoOutlinedIcon}
            title="Deposit Guidelines"
        >
            <Stack spacing={1.5}>
                {GUIDELINES.map((guideline) => (
                    <Stack
                        key={guideline}
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                    >
                        <CheckCircleIcon
                            sx={{ fontSize: 16, color: "success.main", mt: 0.2, flexShrink: 0 }}
                        />
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", lineHeight: 1.6 }}
                        >
                            {guideline}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </DashboardCard>
    );
}
