"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

export default function ScrollObserver() {
    useEffect(() => {
        let hasTrackedPageEnd = false;

        const selectors = [
            ".contact-big-title",
            ".featured-card",
            ".multilaser-section",
            ".multi-card",
            ".vl-card",
        ];

        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.12 });

        const skillIo = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.querySelectorAll(".skill-pill").forEach((pill, i) => {
                        setTimeout(() => pill.classList.add("visible"), i * 80);
                    });
                    skillIo.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });

        const multiIo = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll(".multi-card").forEach((c, i) => {
                        setTimeout(() => c.classList.add("visible"), i * 150);
                    });
                    multiIo.disconnect();
                }
            });
        }, { threshold: 0.1 });

        function attachObservers() {
            document.querySelectorAll(selectors.join(", ")).forEach(el => io.observe(el));
            document.querySelectorAll(".about-right").forEach(el => skillIo.observe(el));
            const ms = document.querySelector(".multilaser-section");
            if (ms) multiIo.observe(ms);
        }

        attachObservers();

        const mo = new MutationObserver(() => {
            attachObservers();
        });

        const projectsEl = document.getElementById("projetos");
        if (projectsEl) {
            mo.observe(projectsEl, { childList: true, subtree: true });
        }
        const vlEl = document.getElementById("vidalarsec");
        if (vlEl) {
            mo.observe(vlEl, { childList: true, subtree: true });
        }

        const onScroll = () => {
            if (hasTrackedPageEnd) {
                return;
            }

            const doc = document.documentElement;
            const viewportBottom = window.scrollY + window.innerHeight;
            const reachedEnd = viewportBottom >= doc.scrollHeight - 20;

            if (reachedEnd) {
                hasTrackedPageEnd = true;
                trackEvent("page_scroll_end", { page: window.location.pathname });
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => {
            io.disconnect();
            skillIo.disconnect();
            multiIo.disconnect();
            mo.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return null;
}
