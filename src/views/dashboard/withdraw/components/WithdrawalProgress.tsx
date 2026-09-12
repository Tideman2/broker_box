import { Box, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckIcon from "@mui/icons-material/Check";

type Stage = {
    label: string;
    icon: typeof SendIcon;
};

const STAGES: Stage[] = [
    { label: "Requested", icon: SendIcon },
    { label: "Processing", icon: AutorenewIcon },
    { label: "Completed", icon: CheckIcon },
];

type WithdrawalProgressProps = {
    activeStage?: number;
};

export default function WithdrawalProgress({
    activeStage = 0,
}: WithdrawalProgressProps) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{ py: 1, px: { xs: 0, sm: 2 } }}
        >
            {STAGES.map((stage, index) => {
                const Icon = stage.icon;
                const active = index === activeStage;
                const reached = index < activeStage;

                return (
                    <Box key={stage.label} sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                        {index > 0 && (
                            <Box
                                sx={{
                                    flex: 1,
                                    height: 2,
                                    mx: 1,
                                    backgroundColor: reached
                                        ? "primary.main"
                                        : "divider",
                                }}
                            />
                        )}
                        <Stack alignItems="center" spacing={0.5}>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid",
                                    borderColor: active
                                        ? "primary.main"
                                        : "divider",
                                    backgroundColor: active
                                        ? "primary.main"
                                        : "transparent",
                                    color: active
                                        ? "primary.contrastText"
                                        : "text.disabled",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <Icon sx={{ fontSize: 18 }} />
                            </Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    whiteSpace: "nowrap",
                                    color: active ? "primary.main" : "text.disabled",
                                    fontWeight: active ? 600 : 400,
                                }}
                            >
                                {stage.label}
                            </Typography>
                        </Stack>
                    </Box>
                );
            })}
        </Stack>
    );
}