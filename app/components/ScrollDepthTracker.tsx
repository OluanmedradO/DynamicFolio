"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "../lib/analytics";

const DEPTHS = [25, 50, 75] as const;

export default function ScrollDepthTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const tracked = new Set<number>();

        const handleScroll = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll <= 0) return;

            const depth = Math.round((window.scrollY / maxScroll) * 100);

            DEPTHS.forEach((threshold) => {
                if (depth >= threshold && !tracked.has(threshold)) {
                    tracked.add(threshold);
                    trackEvent(`scroll_depth_${threshold}`, { value: threshold, section: pathname });
                }
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    return null;
}
