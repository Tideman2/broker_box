'use client';

import { Card, CardContent, Stack, Typography, Button, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    title: string;
    features: string[];
    buttonText: string;
    onClick?: () => void;
    recommended?: boolean;
};

export default function TradingPlanCard({
    title,
    features,
    buttonText,
    onClick,
    recommended = false,
}: Props) {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                position: 'relative',
                flex: 1,
                minWidth: { xs: '100%', sm: 260 },
                ...(recommended && {
                    border: 2,
                    borderColor: 'primary.main',
                    boxShadow: '0 0 24px rgba(0,214,255,0.18)',
                }),
            }}
        >
            {recommended && (
                <Chip
                    label="Recommended"
                    color="primary"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        borderRadius: 999,
                        fontWeight: 600,
                    }}
                />
            )}
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 1,
                    pt: recommended ? 4 : 1,
                }}
            >
                {/* Title */}
                <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                    <Typography variant="h6">{title}</Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, fontVariantNumeric: 'tabular-nums' }}>
                    Billed monthly · Cancel anytime
                </Typography>

                {/* Features */}
                <Box sx={{ flex: 1 }}>
                    <Stack spacing={1.5}>
                        {features.map((feature, index) => (
                            <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
                                <CheckCircleIcon
                                    sx={{
                                        fontSize: 18,
                                        mt: '2px',
                                        color: 'success.main',
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {feature}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>

                {/* Button */}
                <Button
                    fullWidth
                    size="large"
                    variant={recommended ? 'contained' : 'outlined'}
                    color={recommended ? 'primary' : 'inherit'}
                    sx={{ mt: 3 }}
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
}
