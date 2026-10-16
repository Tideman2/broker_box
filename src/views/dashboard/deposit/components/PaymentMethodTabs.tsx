import { Box, Tab, Tabs, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { alpha } from "@mui/material/styles";

import DashboardCard from "@/components/DashboardCard";

import { COMING_SOON_MESSAGE, COMING_SOON_TITLE } from "./mockContent";

export const METHOD_CRYPTO = 1;
export const METHOD_BANK = 2;

type PaymentMethodTabsProps = {
    method: number;
    onChange: (method: number) => void;
    disabled?: boolean;
};

export default function PaymentMethodTabs({
    method,
    onChange,
    disabled,
}: PaymentMethodTabsProps) {
    return (
        <DashboardCard
            title="Payment Method"
            sx={{ p: { xs: 2, md: 2.5 } }}
        >
            <Tabs
                value={method}
                onChange={(_, value: number) => onChange(value)}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                    minHeight: 48,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                        alpha(theme.palette.primary.main, 0.05),
                    p: 0.5,
                    "& .MuiTabs-indicator": {
                        height: "100%",
                        borderRadius: 1.5,
                        zIndex: 0,
                    },
                    "& .MuiTab-root": {
                        minHeight: 40,
                        borderRadius: 1.5,
                        zIndex: 1,
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        textTransform: "none",
                        color: "text.secondary",
                        "&.Mui-selected": { color: "primary.main" },
                    },
                }}
            >
                <Tab value={METHOD_CRYPTO} label="Crypto Deposit" disabled={disabled} />
                <Tab value={METHOD_BANK} label="Bank Transfer" disabled={disabled} />
            </Tabs>

            {method === METHOD_BANK && (
                <Box
                    sx={{
                        display: "flex",
                        gap: 1.5,
                        alignItems: "flex-start",
                        p: 2,
                        mt: 2,
                        borderRadius: 2,
                        border: "1px dashed",
                        borderColor: "divider",
                        backgroundColor: (theme) =>
                            alpha(theme.palette.info.main, 0.05),
                    }}
                >
                    <InfoOutlinedIcon
                        sx={{ fontSize: 18, color: "info.main", mt: 0.25, flexShrink: 0 }}
                    />
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }} mb={0.25}>
                            {COMING_SOON_TITLE}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {COMING_SOON_MESSAGE}
                        </Typography>
                    </Box>
                </Box>
            )}
        </DashboardCard>
    );
}
