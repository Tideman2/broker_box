'use client';

import { Box, Card, CardContent, Stack, Typography, type ElementType } from '@mui/material';

type AboutCardProps = {
    icon: ElementType;
    title: string;
    body: string;
};

/** Reusable text card used by the About page's problem / approach / audience blocks. */
export default function AboutCard({ icon: Icon, title, body }: AboutCardProps) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={2} sx={{ height: '100%' }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
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
                        {body}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
