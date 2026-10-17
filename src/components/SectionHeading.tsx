'use client';

import { Chip, Stack, Typography } from '@mui/material';

type SectionHeadingProps = {
    /** Small chip rendered above the heading. */
    eyebrow: string;
    title: string;
    description?: string;
    align?: 'center' | 'left';
};

/**
 * The eyebrow + heading + supporting copy block repeated by every landing and
 * About page section, kept here so both pages stay typographically identical.
 */
export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'center',
}: SectionHeadingProps) {
    const centered = align === 'center';

    return (
        <Stack
            spacing={2}
            alignItems={centered ? 'center' : 'flex-start'}
            sx={{ textAlign: centered ? 'center' : 'left' }}
        >
            <Chip
                label={eyebrow}
                color="info"
                size="small"
                sx={{ borderRadius: 999 }}
            />
            <Typography variant="h2" sx={{ textWrap: 'balance', maxWidth: 760 }}>
                {title}
            </Typography>
            {description ? (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 640 }}
                >
                    {description}
                </Typography>
            ) : null}
        </Stack>
    );
}
