import { useState, useEffect } from "react";
import { MEDIA_QUERY_BREAKPOINTS } from "./const"

type BaseBreakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// Largest first — used to find the best matching breakpoint
const BREAKPOINT_ORDER: BaseBreakpoint[] = ["2xl", "xl", "lg", "md", "sm", "xs"];

export function useResponsiveValue<T>(
    values: Partial<Record<BaseBreakpoint, T>>,
): T | undefined {
    // Only consider breakpoints the caller actually provided, largest first
    const orderedKeys = BREAKPOINT_ORDER.filter((key) => key in values);
    const keysDep = orderedKeys.join(",");

    const [activeKey, setActiveKey] = useState<BaseBreakpoint | undefined>(undefined);

    useEffect(() => {
        const entries = orderedKeys.map((key) => ({
            key,
            media: window.matchMedia(MEDIA_QUERY_BREAKPOINTS[key]),
        }));

        const computeActive = () => {
            const match = entries.find(({ media }) => media.matches);
            setActiveKey(match?.key);
        };

        computeActive();

        entries.forEach(({ media }) => media.addEventListener("change", computeActive));
        return () => {
            entries.forEach(({ media }) => media.removeEventListener("change", computeActive));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keysDep]);

    return activeKey !== undefined ? values[activeKey] : undefined;
}