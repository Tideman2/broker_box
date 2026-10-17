'use client';

import { useEffect, useRef } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

type RevealProps = {
    children: React.ReactNode;
    /** Transition delay in ms, so staggered siblings stay restrained. */
    delay?: number;
    sx?: SxProps<Theme>;
};

/**
 * Fades content up as it scrolls into view.
 *
 * Children render visible, so nothing can be lost if JavaScript never runs.
 * The hidden state is armed after mount and only for elements that are
 * currently off-screen — above-the-fold content is left untouched, which also
 * avoids a flash on first paint. `prefers-reduced-motion` disables the effect.
 */
export default function Reveal({ children, delay = 0, sx }: RevealProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (typeof IntersectionObserver === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const { top, bottom } = element.getBoundingClientRect();
        const onScreen = top < window.innerHeight && bottom > 0;
        if (onScreen) return;

        element.style.opacity = '0';
        element.style.transform = 'translateY(16px)';
        element.style.transition = `opacity 500ms ease ${delay}ms, transform 500ms ease ${delay}ms`;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <Box ref={ref} sx={sx}>
            {children}
        </Box>
    );
}
