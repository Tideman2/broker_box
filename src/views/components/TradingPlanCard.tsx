'use client';

import { Card, CardContent, Stack, Typography, Button, Box } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    title: string;
    features: string[];
    buttonText: string;
    onClick?: () => void;
};

export default function TradingPlanCard({
    title,
    features,
    buttonText,
    onClick,
}: Props) {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 0,
                }}
            >
                {/* Title */}
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <DiamondIcon color="secondary" />
                    <Typography variant="h6">{title}</Typography>
                </Stack>

                {/* Scrollable Features */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        pr: 1, // space for scrollbar
                    }}
                >
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
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
}