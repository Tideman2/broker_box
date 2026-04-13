'use client';

import { Card, CardContent, Stack, Typography, Box } from '@mui/material';

type Props = {
    image: string;
    title: string;
    description: string;
};

export default function IntroToStepIconText({ image, title, description }: Props) {
    return (
        <Card
            sx={{
                p: 2,
                height: '100%',
            }}
        >
            <CardContent>
                <Stack spacing={2} alignItems="center" textAlign="center">

                    {/* Image */}
                    <Box
                        component="img"
                        src={image}
                        alt={title}
                        sx={{
                            width: 64,
                            height: 64,
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 0 10px rgba(0,214,255,0.4))',
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