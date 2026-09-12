import { Box, Button, Stack, Typography } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import { alpha } from "@mui/material/styles";

import { SUPPORT_ACTION, SUPPORT_BODY, SUPPORT_TITLE } from "./mockContent";

export default function SupportCard() {
    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.18)}, ${alpha(theme.palette.primary.main, 0.08)}), ${theme.palette.background.paper}`,
            }}
        >
            <Stack spacing={1.5}>
                <HeadsetMicIcon sx={{ color: "secondary.main", fontSize: 32 }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {SUPPORT_TITLE}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {SUPPORT_BODY}
                </Typography>
                <Button variant="outlined" color="secondary" sx={{ alignSelf: "flex-start" }}>
                    {SUPPORT_ACTION}
                </Button>
            </Stack>
        </Box>
    );
}