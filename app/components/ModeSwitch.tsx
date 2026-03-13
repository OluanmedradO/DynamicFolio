"use client";

import { useEffect, useRef } from "react";
import { useMode } from "../context/ModeContext";
import { trackEvent } from "../lib/analytics";

function DevIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="m8 9-4 3 4 3" />
            <path d="m16 9 4 3-4 3" />
            <path d="m14 5-4 14" />
        </svg>
    );
}

function EditorIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
        </svg>
    );
}

export default function ModeSwitch() {
    const { mode, setMode } = useMode();
    const switchRef = useRef<HTMLDivElement | null>(null);

    const handleModeChange = (nextMode: "dev" | "editor") => {
        if (mode === nextMode) {
            return;
        }

        trackEvent("preference_change", {
            eventCategory: "preferences",
            preference: "mode",
            from: mode,
            to: nextMode,
        });
        setMode(nextMode);
    };

    useEffect(() => {
        const updateSwitchState = () => {
            const switchElement = switchRef.current;
            const aboutSection = document.getElementById("sobre");

            if (!switchElement || !aboutSection) {
                return;
            }

            const rect = aboutSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const isAroundAboutSection = rect.top < viewportHeight * 0.85;
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const isAboutActive = Math.abs(sectionCenter - viewportCenter) <= Math.min(120, viewportHeight * 0.16);

            switchElement.classList.toggle("collapsed", isAroundAboutSection);
            switchElement.classList.toggle("minimal", isAboutActive);
        };

        updateSwitchState();
        window.addEventListener("scroll", updateSwitchState, { passive: true });
        window.addEventListener("resize", updateSwitchState);

        return () => {
            window.removeEventListener("scroll", updateSwitchState);
            window.removeEventListener("resize", updateSwitchState);
        };
    }, []);

    return (
        <div className="mode-switch" id="modeSwitch" ref={switchRef}>
            <div className="switch-topline">
                <span className="switch-topline-dot"></span>
                <span className="switch-topline-label">Skills</span>
            </div>
            <button
                className={`switch-btn${mode === "dev" ? " active" : ""}`}
                id="btnDev"
                type="button"
                aria-pressed={mode === "dev"}
                onClick={() => handleModeChange("dev")}
            >
                <span className="switch-icon-wrap">
                    <span className="switch-icon"><DevIcon /></span>
                </span>
                <span className="switch-copy">
                    <span className="switch-label">Dev</span>
                </span>
            </button>
            <div className="switch-divider"></div>
            <button
                className={`switch-btn${mode === "editor" ? " active" : ""}`}
                id="btnEditor"
                type="button"
                aria-pressed={mode === "editor"}
                onClick={() => handleModeChange("editor")}
            >
                <span className="switch-icon-wrap">
                    <span className="switch-icon"><EditorIcon /></span>
                </span>
                <span className="switch-copy">
                    <span className="switch-label">Editor</span>
                </span>
            </button>
        </div>
    );
}
