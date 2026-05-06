"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        let mx = -100;
        let my = -100;
        let rx = -100;
        let ry = -100;
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            setPosition({ x: mx, y: my });
        };

        const animCursor = () => {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            setRingPosition({ x: rx, y: ry });
            animationFrameId = requestAnimationFrame(animCursor);
        };

        document.addEventListener("mousemove", handleMouseMove);
        animCursor();

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".phone-center") ||
                target.closest(".multi-card") ||
                target.closest(".dot") ||
                target.closest(".carousel-btn")
            ) {
                document.body.classList.add("hovering");
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.closest(".phone-center") ||
                target.closest(".multi-card") ||
                target.closest(".dot") ||
                target.closest(".carousel-btn")
            ) {
                document.body.classList.remove("hovering");
            }
        };

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <div
                className="cursor"
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            ></div>
            <div
                className="cursor-ring"
                style={{ left: `${ringPosition.x}px`, top: `${ringPosition.y}px` }}
            ></div>
        </>
    );
}
