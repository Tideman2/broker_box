import { Box, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckIcon from "@mui/icons-material/Check";
import { alpha } from "@mui/material/styles";

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
            alignItems="flex-start"
            sx={{ py: 1.5, px: { xs: 0.5, sm: 2 } }}
        >
            {STAGES.map((stage, index) => {
                const Icon = stage.icon;
                const active = index === activeStage;
                const reached = index < activeStage;

                return (
                    <Box key={stage.label} sx={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                        {index > 0 && (
                            <Box
                                sx={{
                                    flex: 1,
                                    height: 2,
                                    mt: 2.25,
                                    mx: 1,
                                    borderRadius: 1,
                                    backgroundColor: reached
                                        ? "primary.main"
                                        : "divider",
                                }}
                            />
                        )}
                        <Stack alignItems="center" spacing={0.75} sx={{ minWidth: 72 }}>
                            <Box
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1.5px solid",
                                    borderColor: active
                                        ? "primary.main"
                                        : reached
                                          ? "primary.main"
                                          : "divider",
                                    backgroundColor: active
                                        ? "primary.main"
                                        : reached
                                          ? (theme) => alpha(theme.palette.primary.main, 0.12)
                                          : "background.paper",
                                    color: active
                                        ? "primary.contrastText"
                                        : reached
                                          ? "primary.main"
                                          : "text.disabled",
                                    boxShadow: active
                                        ? (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`
                                        : "none",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <Icon sx={{ fontSize: 18 }} />
                            </Box>
                            <Typography
                                variant="caption"
                                sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "0.7rem",
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                    color: active ? "primary.main" : reached ? "text.primary" : "text.disabled",
                                    fontWeight: active || reached ? 700 : 400,
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
