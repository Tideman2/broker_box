import React from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'tv-ticker-tape': React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                symbols?: string;
            };
        }
    }
}