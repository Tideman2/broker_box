'use client';

import type { ElementType } from 'react';
import { Card, CardContent, Stack, Typography, Box, Chip } from '@mui/material';

type Props = {
    icon: ElementType;
    title: string;
    description: string;
    step?: string;
};

/** One numbered step card in the "How It Works" grid. */
export default function IntroToStepIconText({ icon: Icon, title, description, step }: Props) {
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
                <Stack spacing={2} alignItems="flex-start" sx={{ flex: 1 }}>
                    {step && (
                        <Chip label={step} size="small" color="info" sx={{ borderRadius: 999 }} />
                    )}

                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            display: 'grid',
                            placeItems: 'center',
                            color: 'primary.main',
                            bgcolor: 'action.hover',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Icon fontSize="small" />
                    </Box>

                    <Typography variant="h6" sx={{ textWrap: 'balance' }}>
                        {title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
