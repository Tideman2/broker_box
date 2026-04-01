'use client';

import Box, { BoxProps } from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Theme, SxProps } from '@mui/material/styles';

import { layoutClasses } from '../classes';

export interface LayoutSectionProps {
    sx?: BoxProps['sx'];
    cssVars?: SxProps<Theme>;
    children?: React.ReactNode;
    footerSection?: React.ReactNode;
    headerSection?: React.ReactNode;
}

export const LayoutSection = ({
    sx,
    cssVars,
    children,
    footerSection,
    headerSection,
}: LayoutSectionProps) => {
    const inputGlobalStyles = (
        <GlobalStyles
            styles={{
                body: {
                    '--layout-nav-zIndex': 1201,
                    '--layout-nav-mobile-width': '320px',
                    '--layout-header-blur': '8px',
                    '--layout-header-zIndex': 1100,
                    '--layout-header-mobile-height': '57px',
                    '--layout-header-desktop-height': '57px',
                    ...cssVars,
                },
            }}
        />
    );

    return (
        <>
            {inputGlobalStyles}

            <Box id="root__layout" className={layoutClasses.root} sx={sx}>
                {headerSection}
                {children}
                {footerSection}
            </Box>
        </>
    );
};
