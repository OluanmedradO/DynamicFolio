"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

function PostHogInit() {
    useEffect(() => {
        const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

        if (!key || !host) return;
        if (posthog.__loaded) return;

        posthog.init(key, {
            api_host: host,
            capture_pageview: true,
            autocapture: false,
            disable_session_recording: true,
            capture_performance: false,
            persistence: "localStorage+cookie",
            opt_out_capturing_by_default: false,
        });
    }, []);

    return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <PHProvider client={posthog}>
            <PostHogInit />
            {children}
        </PHProvider>
    );
}
