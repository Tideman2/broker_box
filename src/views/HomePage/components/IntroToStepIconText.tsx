'use client';

import { Card, CardContent, Stack, Typography, Box, Chip } from '@mui/material';

type Props = {
    image: string;
    title: string;
    description: string;
    step?: string;
};

export default function IntroToStepIconText({ image, title, description, step }: Props) {
    return (
        <Card
            sx={{
                p: 2,
                height: '100%',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent sx={{ flex: 1, display: 'flex', p: 1 }}>
                <Stack spacing={2} alignItems="center" textAlign="center" sx={{ flex: 1 }}>
                    {step && (
                        <Chip label={step} size="small" color="info" sx={{ borderRadius: 999 }} />
                    )}

                    {/* Image */}
                    <Box
                        component="img"
                        src={image}
                        alt={title}
                        sx={{
                            width: 64,
                            height: 64,
                            objectFit: 'contain',
                        }}
                    />

                    {/* Title */}
                    <Typography variant="h6">
                        {title}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                </Stack>
            </CardContent>
        </Card>
    );
}
