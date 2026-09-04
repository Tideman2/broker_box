import { useEffect, useState } from "react";
import { MEDIA_QUERY_BREAKPOINTS } from "./const"

export function useMediaQuery(
    breakpoint: keyof typeof MEDIA_QUERY_BREAKPOINTS,
): boolean {
    const [matches, setMatches] = useState(false);
    const query = MEDIA_QUERY_BREAKPOINTS[breakpoint];

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}