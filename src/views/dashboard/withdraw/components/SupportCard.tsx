import { Box, Button, Stack, Typography } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { alpha } from "@mui/material/styles";

import { SUPPORT_ACTION, SUPPORT_BODY, SUPPORT_TITLE } from "./mockContent";

export default function SupportCard() {
    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.16)}, ${alpha(theme.palette.primary.main, 0.08)} 70%), ${theme.palette.background.paper}`,
            }}
        >
            <Stack spacing={1.5}>
                <Box
                    sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: (theme) =>
                            alpha(theme.palette.secondary.main, 0.16),
                    }}
                >
                    <HeadsetMicIcon sx={{ color: "secondary.main", fontSize: 26 }} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 800 }}>
                    {SUPPORT_TITLE}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {SUPPORT_BODY}
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ alignSelf: "flex-start", borderRadius: 2, fontWeight: 700 }}
                >
                    {SUPPORT_ACTION}
                </Button>
            </Stack>
        </Box>
    );
}
