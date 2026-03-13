"use client";

import { track } from "@vercel/analytics";

type EventValue = string | number | boolean | null | undefined;
type EventPayload = Record<string, EventValue>;

export function trackEvent(name: string, payload?: EventPayload) {
  const {
    eventCategory = "engagement",
    eventLabel,
    value,
    ...context
  } = payload ?? {};

  const fallbackLabel =
    typeof context.project === "string"
      ? context.project
      : typeof context.destination === "string"
      ? context.destination
      : typeof context.section === "string"
      ? context.section
      : typeof context.source === "string"
      ? context.source
      : "unknown";

  track(name, {
    event_category: String(eventCategory),
    event_action: name,
    event_label: String(eventLabel ?? fallbackLabel),
    value: typeof value === "number" ? value : undefined,
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    ...context,
  });
}
