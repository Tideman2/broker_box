import { Box, Tab, Tabs, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
        <Box>
            <Tabs
                value={method}
                onChange={(_, value: number) => onChange(value)}
                variant="scrollable"
                textColor="primary"
                indicatorColor="primary"
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
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        backgroundColor: "background.paper",
                    }}
                >
                    <InfoOutlinedIcon
                        sx={{ fontSize: 18, color: "info.main", mt: 0.25, flexShrink: 0 }}
                    />
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }} mb={0.25}>
                            {COMING_SOON_TITLE}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {COMING_SOON_MESSAGE}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
}