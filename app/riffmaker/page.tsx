"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Space_Mono } from "next/font/google";
import { useEffect } from "react";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const waveformBars = [
  { delay: "0s", duration: ".85s" },
  { delay: ".05s", duration: "1.1s" },
  { delay: ".1s", duration: ".75s" },
  { delay: ".15s", duration: "1.2s" },
  { delay: ".2s", duration: ".9s" },
  { delay: ".25s", duration: "1.05s" },
  { delay: ".3s", duration: ".8s" },
  { delay: ".35s", duration: "1.15s" },
  { delay: ".4s", duration: ".95s" },
  { delay: ".45s", duration: ".7s" },
  { delay: ".5s", duration: "1.1s" },
  { delay: ".55s", duration: ".88s" },
];

export default function RiffMakerPage() {
  const pathname = usePathname();
  const portfolioHref = pathname.startsWith("/en") ? "/en" : "/";

  useEffect(() => {
    const cur = document.getElementById("cur") as HTMLDivElement | null;
    const ring = document.getElementById("cur-ring") as HTMLDivElement | null;
    const canvas = document.getElementById("wc") as HTMLCanvasElement | null;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let ringRaf = 0;
    let waveRaf = 0;
    let streakInterval = 0;

    const onMouseMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      if (cur) {
        cur.style.left = `${mx}px`;
        cur.style.top = `${my}px`;
      }
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      if (ring) {
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
      }
      ringRaf = window.requestAnimationFrame(animateRing);
    };

    const ctx = canvas?.getContext("2d") ?? null;
    let waveTime = 0;

    const resizeCanvas = () => {
      if (!canvas) {
        return;
      }
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    const drawWave = () => {
      if (!canvas || !ctx) {
        return;
      }
      waveTime += 0.014;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bars = 90;
      const totalWidth = canvas.width;
      const barWidth = totalWidth / bars;
      const startX = 0;
      const centerY = canvas.height / 2;

      for (let i = 0; i < bars; i += 1) {
        const n = i / bars;
        const amp =
          Math.sin(n * Math.PI * 4 + waveTime * 2.2) * 0.36 +
          Math.sin(n * Math.PI * 9 + waveTime * 3.4) * 0.2 +
          Math.sin(n * Math.PI * 2.2 + waveTime * 1.15) * 0.25;
        const env = 0.55 + 0.45 * Math.sin(n * Math.PI);
        const h = Math.max(3, Math.abs(amp) * env * canvas.height * 0.45 + canvas.height * 0.018);
        const x = startX + i * barWidth;

        const gradient = ctx.createLinearGradient(x, centerY - h / 2, x, centerY + h / 2);
        gradient.addColorStop(0, "rgba(192,39,31,0)");
        gradient.addColorStop(0.25, "rgba(192,39,31,.55)");
        gradient.addColorStop(0.5, "rgba(229,53,43,.9)");
        gradient.addColorStop(0.75, "rgba(192,39,31,.55)");
        gradient.addColorStop(1, "rgba(192,39,31,0)");

        ctx.fillStyle = gradient;
        if (typeof ctx.roundRect === "function") {
          ctx.beginPath();
          ctx.roundRect(x + 1, centerY - h / 2, barWidth - 2, h, 2);
          ctx.fill();
        } else {
          ctx.fillRect(x + 1, centerY - h / 2, barWidth - 2, h);
        }
      }

      waveRaf = window.requestAnimationFrame(drawWave);
    };

    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
    const smooth = (value: number) => {
      const t = clamp01(value);
      return t * t * (3 - 2 * t);
    };
    const reveal = (progressValue: number, start: number, end: number) => {
      if (end <= start) {
        return progressValue >= end ? 1 : 0;
      }
      return smooth((progressValue - start) / (end - start));
    };
    const progress = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const sectionHeight = Math.max(el.offsetHeight, el.scrollHeight);
      if (sectionHeight <= 0) {
        return 0;
      }
      const raw = (window.innerHeight - rect.top) / sectionHeight;
      return clamp01(raw);
    };
    const stickyProgress = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const range = Math.max(1, el.offsetHeight - window.innerHeight);
      return clamp01(-rect.top / range);
    };
    const setVar = (el: HTMLElement | null | undefined, name: string, value: string) => {
      el?.style.setProperty(name, value);
    };
    const setLineReveal = (el: Element | null, amount: number) => {
      setVar(el as HTMLElement | null, "--line-y", `${(1 - amount) * 108}%`);
      el?.classList.toggle("up", amount > 0.98);
    };
    const setDevice = (
      el: HTMLElement | null,
      amount: number,
      from: { x?: number; y?: number; ry?: number; rx?: number; scale?: number },
    ) => {
      const t = clamp01(amount);
      setVar(el, "--device-opacity", t.toFixed(3));
      setVar(el, "--device-x", `${(from.x ?? 0) * (1 - t)}px`);
      setVar(el, "--device-y", `${(from.y ?? 0) * (1 - t)}px`);
      setVar(el, "--device-ry", `${(from.ry ?? 0) * (1 - t)}deg`);
      setVar(el, "--device-rx", `${(from.rx ?? 0) * (1 - t)}deg`);
      setVar(el, "--device-scale", `${(from.scale ?? 1) + (1 - (from.scale ?? 1)) * t}`);
      setVar(el, "--screen-y", `${(1 - t) * 14}px`);
    };

    const q = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;
    const s1 = q<HTMLDivElement>("s1");
    const s2 = q<HTMLDivElement>("s2");
    const s3 = q<HTMLDivElement>("s3");
    const s4 = q<HTMLDivElement>("s4");

    const mw1 = document.querySelector("#mw1 .mwi");
    const mw2 = document.querySelector("#mw2 .mwi");
    const mw3 = document.querySelector("#mw3 .mwi");
    const mSub = q<HTMLParagraphElement>("m-sub");
    const mGlow = q<HTMLDivElement>("m-glow");
    const mDevice = q<HTMLDivElement>("m-device");

    const cFlood = q<HTMLDivElement>("c-flood");
    const cEye = q<HTMLDivElement>("c-eye");
    const cl1 = q<HTMLSpanElement>("cl1");
    const cl2 = q<HTMLSpanElement>("cl2");
    const cl3 = q<HTMLSpanElement>("cl3");
    const cCopy = q<HTMLParagraphElement>("c-copy");
    const cWv = q<HTMLDivElement>("wv");
    const cDevice = q<HTMLDivElement>("c-device");

    const oh1 = q<HTMLSpanElement>("oh1");
    const oh2 = q<HTMLSpanElement>("oh2");
    const op1Device = q<HTMLDivElement>("op1-device");
    const op2Device = q<HTMLDivElement>("op2-device");

    const fl = q<HTMLDivElement>("fl");
    const fh1 = q<HTMLSpanElement>("fh1");
    const fh2 = q<HTMLSpanElement>("fh2");
    const streak = q<HTMLDivElement>("st");
    const streakNum = q<HTMLDivElement>("sn");
    const flowSub = q<HTMLParagraphElement>("fsub");
    const days = document.querySelectorAll<HTMLElement>(".sday");

    let streakDone = false;

    const animateScenes = () => {
      const isDesktopScene = window.matchMedia("(min-width: 901px)").matches;

      if (s1) {
        const p1 = isDesktopScene ? stickyProgress(s1) : progress(s1);
        const word1 = reveal(p1, isDesktopScene ? 0.08 : 0.02, isDesktopScene ? 0.2 : 0.08);
        const word2 = reveal(p1, isDesktopScene ? 0.16 : 0.08, isDesktopScene ? 0.32 : 0.16);
        const word3 = reveal(p1, isDesktopScene ? 0.26 : 0.15, isDesktopScene ? 0.44 : 0.24);
        const copy = reveal(p1, isDesktopScene ? 0.36 : 0.2, isDesktopScene ? 0.58 : 0.32);
        const phone = reveal(p1, isDesktopScene ? 0.1 : 0.12, isDesktopScene ? 0.62 : 0.26);
        setLineReveal(mw1, word1);
        setLineReveal(mw2, word2);
        setLineReveal(mw3, word3);
        setDevice(mDevice, phone, { y: 110, ry: -22, rx: 8, scale: 0.84 });
        setVar(mGlow, "--glow-o", `${Math.min(0.9, phone * 0.9)}`);
        setVar(mSub, "--copy-o", copy.toFixed(3));
        setVar(mSub, "--copy-y", `${(1 - copy) * 16}px`);
        mSub?.classList.toggle("show", copy > 0.98);
        mDevice?.classList.toggle("land", phone > 0.98);
        mGlow?.classList.toggle("on", phone > 0.35);
      }

      if (s2) {
        const p2 = isDesktopScene ? stickyProgress(s2) : progress(s2);
        const flood = reveal(p2, 0.04, isDesktopScene ? 0.48 : 0.18);
        const eye = reveal(p2, 0.08, isDesktopScene ? 0.2 : 0.14);
        const line1 = reveal(p2, isDesktopScene ? 0.14 : 0.12, isDesktopScene ? 0.28 : 0.2);
        const line2 = reveal(p2, isDesktopScene ? 0.22 : 0.18, isDesktopScene ? 0.4 : 0.27);
        const line3 = reveal(p2, isDesktopScene ? 0.32 : 0.24, isDesktopScene ? 0.54 : 0.34);
        const late = reveal(p2, isDesktopScene ? 0.42 : 0.28, isDesktopScene ? 0.72 : 0.4);
        const phone = reveal(p2, isDesktopScene ? 0.12 : 0.24, isDesktopScene ? 0.68 : 0.38);
        if (cFlood) {
          cFlood.style.clipPath = `circle(${Math.round(flood * 160)}% at 78% 50%)`;
        }
        cFlood?.classList.toggle("open", flood > 0.98);
        setVar(cEye, "--copy-o", eye.toFixed(3));
        setVar(cEye, "--copy-y", `${(1 - eye) * 10}px`);
        cEye?.classList.toggle("show", eye > 0.98);
        setLineReveal(cl1, line1);
        setLineReveal(cl2, line2);
        setLineReveal(cl3, line3);
        setDevice(cDevice, phone, { x: 120, y: 24, ry: 16, scale: 0.86 });
        setVar(cCopy, "--copy-o", late.toFixed(3));
        setVar(cCopy, "--copy-y", `${(1 - late) * 18}px`);
        setVar(cWv, "--wave-o", late.toFixed(3));
        cCopy?.classList.toggle("show", late > 0.98);
        cWv?.classList.toggle("show", late > 0.98);
        cDevice?.classList.toggle("show", phone > 0.98);
      }

      const s3El = s3 ?? q<HTMLDivElement>("s3");
      if (s3El) {
        const p3 = isDesktopScene ? stickyProgress(s3El) : progress(s3El);
        const oh1El = oh1 ?? q<HTMLSpanElement>("oh1");
        const oh2El = oh2 ?? q<HTMLSpanElement>("oh2");
        const op1El = op1Device ?? q<HTMLDivElement>("op1-device");
        const op2El = op2Device ?? q<HTMLDivElement>("op2-device");
        const obsEl = q<HTMLDivElement>("obs");
        const head1 = reveal(p3, 0.06, isDesktopScene ? 0.2 : 0.12);
        const head2 = reveal(p3, isDesktopScene ? 0.16 : 0.1, isDesktopScene ? 0.34 : 0.22);
        const phone1 = reveal(p3, isDesktopScene ? 0.18 : 0.08, isDesktopScene ? 0.58 : 0.18);
        const phone2 = reveal(p3, isDesktopScene ? 0.28 : 0.1, isDesktopScene ? 0.66 : 0.2);
        const badges = reveal(p3, isDesktopScene ? 0.52 : 0.16, isDesktopScene ? 0.76 : 0.28);
        setLineReveal(oh1El, head1);
        setLineReveal(oh2El, head2);
        setDevice(op1El, phone1, { x: -120, y: 36, ry: 18, scale: 0.9 });
        setDevice(op2El, phone2, { x: 120, y: 36, ry: -18, scale: 0.9 });
        setVar(obsEl, "--badges-o", badges.toFixed(3));
        setVar(obsEl, "--badges-y", `${(1 - badges) * 18}px`);
        op1El?.classList.toggle("show", phone1 > 0.98);
        op2El?.classList.toggle("show", phone2 > 0.98);
        obsEl?.classList.toggle("show", badges > 0.98);
      }

      if (s4) {
        const p4 = isDesktopScene ? stickyProgress(s4) : progress(s4);
        const label = reveal(p4, 0.04, isDesktopScene ? 0.16 : 0.1);
        const head1 = reveal(p4, isDesktopScene ? 0.12 : 0.08, isDesktopScene ? 0.3 : 0.16);
        const head2 = reveal(p4, isDesktopScene ? 0.22 : 0.14, isDesktopScene ? 0.42 : 0.24);
        const streakIn = reveal(p4, isDesktopScene ? 0.38 : 0.22, isDesktopScene ? 0.62 : 0.34);
        const sub = reveal(p4, isDesktopScene ? 0.58 : 0.3, isDesktopScene ? 0.76 : 0.42);
        setVar(fl, "--copy-o", label.toFixed(3));
        setVar(fl, "--copy-y", `${(1 - label) * 10}px`);
        fl?.classList.toggle("show", label > 0.98);
        setLineReveal(fh1, head1);
        setLineReveal(fh2, head2);
        setVar(streak, "--streak-o", streakIn.toFixed(3));
        setVar(streak, "--streak-y", `${(1 - streakIn) * 28}px`);
        setVar(streak, "--streak-scale", `${0.96 + streakIn * 0.04}`);
        if (streakIn > 0.98) {
          streak?.classList.add("show");
          if (!streakDone && streakNum) {
            streakDone = true;
            let value = 0;
            window.clearInterval(streakInterval);
            streakInterval = window.setInterval(() => {
              value += 1;
              streakNum.textContent = `${Math.min(value, 7)}`;
              if (value >= 7) {
                window.clearInterval(streakInterval);
              }
            }, 130);
            days.forEach((day, i) => window.setTimeout(() => day.classList.add("show"), 350 + i * 80));
          }
        } else if (p4 < (isDesktopScene ? 0.3 : 0.18)) {
          streak?.classList.remove("show");
          streakDone = false;
          if (streakNum) {
            streakNum.textContent = "0";
          }
          days.forEach((day) => day.classList.remove("show"));
        }
        setVar(flowSub, "--copy-o", sub.toFixed(3));
        setVar(flowSub, "--copy-y", `${(1 - sub) * 18}px`);
        flowSub?.classList.toggle("show", sub > 0.98);
      }

      const ctaEl = q<HTMLElement>("cta");
      if (ctaEl) {
        const pc = progress(ctaEl);
        ctaEl.querySelector<HTMLElement>(".cta-h")?.classList.toggle("show", pc > 0.06);
        ctaEl.querySelector<HTMLElement>(".cta-sub")?.classList.toggle("show", pc > 0.1);
        ctaEl.querySelector<HTMLElement>(".dl-wrap")?.classList.toggle("show", pc > 0.14);
      }
    };

    const onScroll = () => window.requestAnimationFrame(animateScenes);

    document.addEventListener("mousemove", onMouseMove);
    ringRaf = window.requestAnimationFrame(animateRing);
    resizeCanvas();
    if (canvas && ctx) {
      drawWave();
    }
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    animateScenes();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(ringRaf);
      window.cancelAnimationFrame(waveRaf);
      window.clearInterval(streakInterval);
    };
  }, []);

  return (
    <div
      className={spaceMono.variable}
      style={{
        minHeight: "100vh",
        background: "#080808",
      }}
    >
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --red: #c0271f;
          --red-hi: #e5352b;
          --red-dark: #7a0c08;
          --red-glow: rgba(192, 39, 31, 0.45);
          --black: #080808;
          --white: #f4eee8;
          --muted: rgba(244, 238, 232, 0.42);
          --border: rgba(255, 255, 255, 0.06);
        }
        body { background: var(--black); color: var(--white); font-family: var(--font-dm-sans), sans-serif; overflow-x: clip; cursor: none; }
        #cur, #cur-ring { position: fixed; pointer-events: none; z-index: 99999; transform: translate(-50%, -50%); }
        #cur { width: 10px; height: 10px; background: var(--red-hi); border-radius: 50%; }
        #cur-ring { width: 36px; height: 36px; border: 1px solid rgba(192, 39, 31, 0.45); border-radius: 50%; transition: width .35s, height .35s, border-color .2s; }
        body:has(a:hover) #cur { width: 16px; height: 16px; }
        body:has(a:hover) #cur-ring { width: 56px; height: 56px; border-color: rgba(192, 39, 31, .7); }
        #grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 9990; opacity: .028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px;
        }
        #intro { position: relative; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
        #wc { position: absolute; inset: 0; width: 100%; height: 100%; }
        .i-content { position: relative; z-index: 2; width: min(92vw, 980px); text-align: center; display: flex; flex-direction: column; align-items: center; transform: translateY(-1.5vh); }
        .i-content::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 48%;
          width: min(76vw, 760px);
          height: min(32vw, 260px);
          transform: translate(-50%, -50%);
          border-radius: 999px;
          background:
            radial-gradient(circle at center, rgba(255,255,255,.1), transparent 24%),
            radial-gradient(circle at center, rgba(229,53,43,.32), transparent 68%);
          filter: blur(14px);
          opacity: .78;
          pointer-events: none;
        }
        .i-logo { position: relative; z-index: 1; width: min(36vw, 460px); max-width: calc(100vw - 56px); max-height: 156px; height: auto; object-fit: contain; display: block; margin: 0 auto 34px; align-self: center; transform-origin: center center; filter: brightness(0) invert(1) drop-shadow(0 24px 54px rgba(0,0,0,.55)) drop-shadow(0 0 54px rgba(229,53,43,.34)); animation: logoFadeUp 1s cubic-bezier(.16,1,.3,1) .1s both; }
        .i-tag { order: 2; font-family: var(--font-space-mono), monospace; font-size: 11px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.86); text-shadow: 0 0 18px rgba(229,53,43,.72), 0 2px 12px rgba(0,0,0,.9); animation: heroFadeUp .9s cubic-bezier(.16,1,.3,1) .45s both; }
        .i-actions { order: 3; margin-top: 28px; animation: heroFadeUp .9s cubic-bezier(.16,1,.3,1) .6s both; }
        .i-play {
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 46px; padding: 0 20px;
          border-radius: 999px;
          border: 1px solid rgba(229,53,43,.38);
          background: rgba(192,39,31,.18);
          color: var(--white);
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 18px 46px rgba(192,39,31,.16);
          transition: transform .25s ease, border-color .25s ease, background .25s ease, box-shadow .25s ease;
        }
        .i-play svg { width: 16px; height: 16px; flex-shrink: 0; }
        .i-play:hover { transform: translateY(-2px); border-color: rgba(229,53,43,.72); background: rgba(192,39,31,.28); box-shadow: 0 24px 64px rgba(192,39,31,.24); }
        .i-scroll { position: absolute; bottom: 36px; display: flex; flex-direction: column; align-items: center; gap: 10px; animation: heroFadeUp .9s cubic-bezier(.16,1,.3,1) .75s both; }
        .i-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, transparent, var(--red-hi)); animation: sPulse 2.2s ease-in-out infinite; }
        .i-scroll-lbl { font-family: var(--font-space-mono), monospace; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }

        .scene { position: relative; }
        .scene-pin { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; background: radial-gradient(ellipse 90% 70% at 50% 50%, rgba(18,38,55,.74), transparent 70%), var(--black); isolation: isolate; }
        #s1 .scene-pin::before,
        #s3 .scene-pin::before,
        #s4 .scene-pin::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        #s1 .scene-pin::before {
          background:
            radial-gradient(ellipse 58% 54% at 70% 45%, rgba(229,53,43,.24), transparent 64%),
            radial-gradient(ellipse 72% 58% at 28% 42%, rgba(18,58,84,.64), transparent 72%),
            linear-gradient(180deg, rgba(10,36,54,.64), rgba(8,8,8,.22));
        }
        #s3 .scene-pin::before {
          background:
            radial-gradient(ellipse 62% 52% at 50% 38%, rgba(74,158,255,.18), transparent 66%),
            radial-gradient(ellipse 58% 55% at 72% 74%, rgba(229,53,43,.22), transparent 68%),
            linear-gradient(180deg, rgba(10,38,58,.7), rgba(8,8,8,.2));
        }
        #s4 .scene-pin::before {
          background:
            radial-gradient(ellipse 78% 58% at 50% 58%, rgba(192,39,31,.28), transparent 68%),
            radial-gradient(ellipse 60% 48% at 28% 30%, rgba(18,58,84,.5), transparent 70%),
            linear-gradient(180deg, rgba(9,32,50,.78), rgba(8,8,8,.26));
        }
        .scene-rule { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(192,39,31,.35), transparent); }
        #s1, #s2, #s3 { height: 220vh; }
        #s4 { height: 200vh; }
        .m-inner, .cap-inner { width: 100%; height: 100%; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 0 9vw; gap: 60px; position: relative; z-index: 2; }
        .m-beam { position: absolute; right: 0; top: 0; bottom: 0; width: 55%; background: radial-gradient(ellipse 80% 90% at 60% 50%, rgba(139,16,10,.28) 0%, transparent 70%); pointer-events: none; z-index: 1; }
        .m-text { position: relative; z-index: 2; }
        .m-word, .cap-h, .org-h, .flow-h { font-family: var(--font-syne), sans-serif; font-weight: 900; letter-spacing: -.04em; }
        .m-word { font-size: clamp(52px,7.5vw,108px); line-height: .9; overflow: hidden; display: block; }
        .mwi, .cap-li, .fhi { display: block; transform: translateY(var(--line-y, 108%)); transition: transform .35s linear; }
        .mwi.up, .cap-li.up, .fhi.up { transform: translateY(0); }
        .org-hi { display: block; transform: translateY(0); }
        .m-word.accent .mwi, .flow-h em, .org-h em { color: var(--red-hi); font-style: normal; }
        .m-sub, .cap-copy, .flow-sub { color: var(--muted); font-weight: 300; opacity: var(--copy-o, 0); transform: translateY(var(--copy-y, 12px)); transition: opacity .35s linear, transform .35s linear; }
        .m-sub.show, .cap-copy.show, .flow-sub.show { opacity: 1; transform: translateY(0); }
        .m-sub { max-width: 400px; margin-top: 36px; font-size: 17px; line-height: 1.75; }
        .m-phone-wrap, .cap-phone-wrap { display: flex; justify-content: center; perspective: 1100px; position: relative; z-index: 2; }
        .m-glow { position: absolute; width: 80%; height: 80%; border-radius: 50%; background: radial-gradient(ellipse at center, var(--red-glow) 0%, transparent 68%); opacity: var(--glow-o, 0); transition: opacity .35s linear; }
        .m-glow.on { opacity: 1; }
        .phone-device {
          position: relative;
          width: var(--device-width, min(310px,40vw));
          padding: var(--device-pad, 10px);
          border-radius: var(--device-radius, 46px);
          background:
            linear-gradient(145deg, rgba(255,255,255,.18), rgba(255,255,255,.02) 18%, rgba(0,0,0,.58) 62%, rgba(255,255,255,.08)),
            #090b0f;
          border: 1px solid rgba(255,255,255,.14);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.06),
            inset 0 -18px 34px rgba(0,0,0,.72),
            0 42px 120px rgba(0,0,0,.86);
          opacity: var(--device-opacity, 0);
          transform:
            translate3d(var(--device-x, 0), var(--device-y, 0), 0)
            rotateY(var(--device-ry, 0deg))
            rotateX(var(--device-rx, 0deg))
            rotateZ(var(--device-rz, 0deg))
            scale(var(--device-scale, 1));
          transform-style: preserve-3d;
          transition: opacity .2s linear;
        }
        .phone-device::before {
          content: "";
          position: absolute;
          top: 14px;
          left: 50%;
          width: 27%;
          height: 11px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(5,7,10,.95), rgba(23,27,34,.9));
          box-shadow: inset 0 1px 1px rgba(255,255,255,.08), 0 1px 8px rgba(0,0,0,.45);
          transform: translateX(-50%);
          z-index: 4;
        }
        .phone-device::after {
          content: "";
          position: absolute;
          right: -4px;
          top: 27%;
          width: 3px;
          height: 54px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.04));
          box-shadow: -1px 0 2px rgba(0,0,0,.5);
        }
        .phone-screen {
          position: relative;
          display: block;
          aspect-ratio: 1170 / 2532;
          overflow: hidden;
          border-radius: calc(var(--device-radius, 46px) - 12px);
          background: #07111a;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);
        }
        .phone-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background:
            linear-gradient(105deg, rgba(255,255,255,.16), transparent 28%, transparent 68%, rgba(255,255,255,.05)),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(255,255,255,.08), transparent 60%);
          mix-blend-mode: screen;
          opacity: .42;
        }
        .phone-home {
          position: absolute;
          left: 50%;
          bottom: 11px;
          width: 36%;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,255,255,.42);
          transform: translateX(-50%);
          z-index: 4;
        }
        .m-device { --device-width: min(310px,40vw); --device-radius: 46px; }
        .cap-device { --device-width: min(295px,38vw); --device-radius: 44px; }
        .m-phone, .cap-phone, .op1, .op2 {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translate3d(0, var(--screen-y, 0), 0) scale(var(--screen-scale, 1.035));
        }

        .cap-bg { position: absolute; inset: 0; background: var(--black); z-index: 0; }
        .cap-flood { position: absolute; inset: 0; background: var(--red-dark); clip-path: circle(0% at 78% 50%); transition: clip-path 1.3s cubic-bezier(.16,1,.3,1); z-index: 1; }
        .cap-flood.open { clip-path: circle(160% at 78% 50%); }
        .cap-inner { position: relative; z-index: 2; }
        .cap-eyebrow, .flow-lbl { font-family: var(--font-space-mono), monospace; font-size: 11px; letter-spacing: .22em; text-transform: uppercase; opacity: var(--copy-o, 0); transform: translateY(var(--copy-y, 10px)); transition: opacity .35s linear, transform .35s linear; }
        .cap-eyebrow.show, .flow-lbl.show { opacity: 1; transform: translateY(0); }
        .cap-h { font-size: clamp(56px,8vw,108px); line-height: .88; }
        .cap-line, .fhl, .org-hl { display: block; overflow: hidden; }
        .cap-copy { max-width: 380px; margin-top: 30px; font-size: 16px; line-height: 1.78; }
        .wv { display: flex; align-items: center; gap: 4px; height: 56px; margin-top: 32px; opacity: var(--wave-o, 0); transition: opacity .35s linear; }
        .wv.show { opacity: 1; }
        .wv-b { flex: 1; max-width: 5px; border-radius: 3px; background: rgba(255,255,255,.38); animation: wvAnim 1s ease-in-out infinite; }
        .cap-device.show { opacity: 1; transform: translateX(0) rotateY(0) scale(1); }
        .org-inner, .flow-inner { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; z-index: 2; }
        .org-inner { padding: clamp(26px,5vh,56px) 8vw; gap: clamp(22px,3.8vh,42px); }
        .flow-inner { padding: 0 8vw; gap: 48px; }
        .org-h { font-size: clamp(32px,5vw,58px); line-height: .96; max-width: 980px; }
        .org-hl { padding-top: .08em; margin-top: -.08em; }
        .org-phones { display: flex; gap: clamp(14px,1.8vw,26px); align-items: flex-end; perspective: 1200px; }
        .org-device {
          --device-width: clamp(160px,23vh,230px);
          --device-radius: 38px;
          --device-pad: 8px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.05),
            inset 0 -16px 28px rgba(0,0,0,.68),
            0 28px 76px rgba(0,0,0,.62);
        }
        #op1-device { --device-rz: -1.5deg; }
        #op2-device { --device-rz: 1.5deg; margin-top: clamp(8px,1.5vh,18px); }
        .org-device.show { opacity: 1; }
        .org-badges { display: flex; flex-wrap: wrap; gap: 9px; justify-content: center; max-width: 680px; opacity: var(--badges-o, 0); transform: translateY(var(--badges-y, 18px)); transition: opacity .35s linear, transform .35s linear; }
        .org-badges.show { opacity: 1; transform: translateY(0); }
        .ob { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 100px; font-family: var(--font-space-mono), monospace; font-size: 10px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04); opacity: 1; transform: translateY(0) scale(1); transition: opacity .45s, transform .45s; }
        .ob .d { width: 7px; height: 7px; border-radius: 50%; }

        .flow-bg-base { position: absolute; inset: 0; background: radial-gradient(ellipse 100% 80% at 50% 86%, rgba(122,12,8,.7) 0%, transparent 68%); z-index: 0; }
        .flow-inner { position: relative; z-index: 2; }
        .flow-lbl { color: rgba(192,39,31,.9); }
        .flow-h { font-size: clamp(46px,6.8vw,92px); line-height: .9; max-width: 720px; }
        .streak { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 24px; padding: 32px 40px; min-width: 380px; opacity: var(--streak-o, 0); transform: translateY(var(--streak-y, 28px)) scale(var(--streak-scale, .96)); transition: opacity .35s linear, transform .35s linear; }
        .streak.show { opacity: 1; transform: translateY(0) scale(1); }
        .streak-top { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .s-fire { font-size: 38px; animation: fire 1.6s ease-in-out infinite; }
        .s-lbl { font-family: var(--font-space-mono), monospace; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
        .s-num { font-family: var(--font-syne), sans-serif; font-size: 54px; font-weight: 900; line-height: 1; }
        .s-grid { display: flex; gap: 8px; }
        .sday { flex: 1; height: 46px; border-radius: 11px; background: rgba(255,255,255,.06); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; font-family: var(--font-space-mono), monospace; font-size: 9px; color: rgba(255,255,255,.3); opacity: 0; transform: translateY(10px); transition: all .4s; }
        .sday.act { background: rgba(192,39,31,.3); color: rgba(255,255,255,.75); }
        .sday.tod { background: var(--red); color: white; font-weight: 700; }
        .sday.show { opacity: 1; transform: translateY(0); }
        .sday-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: .6; }

        #cta { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 100px 8vw; position: relative; overflow: hidden; }
        #tech-proof { min-height: 86vh; display: grid; grid-template-columns: minmax(0, .82fr) minmax(420px, 1fr); align-items: center; gap: clamp(48px,7vw,104px); padding: 128px 8vw; border-top: 1px solid var(--border); background: radial-gradient(ellipse 70% 60% at 100% 20%, rgba(192,39,31,.18), transparent 66%); }
        .tp-kicker { font-family: var(--font-space-mono), monospace; font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: var(--red-hi); margin-bottom: 18px; }
        .tp-title { max-width: 680px; font-family: var(--font-syne), sans-serif; font-size: clamp(42px,5.2vw,74px); font-weight: 900; line-height: .94; letter-spacing: -.04em; margin-bottom: 24px; }
        .tp-title em { color: var(--red-hi); font-style: normal; }
        .tp-copy { max-width: 560px; color: var(--muted); font-size: 17px; line-height: 1.75; font-weight: 300; }
        .tp-grid { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; }
        .tp-item { min-height: 110px; padding: 22px; border: 1px solid rgba(255,255,255,.08); border-radius: 14px; background: rgba(255,255,255,.035); display: flex; flex-direction: column; justify-content: space-between; }
        .tp-item span { font-family: var(--font-space-mono), monospace; font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.36); }
        .tp-item strong { margin-top: 14px; font-size: 15px; line-height: 1.35; color: var(--white); }
        .cta-atm { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(192,39,31,.35) 0%, transparent 68%); }
        .cta-bg-riff { position: absolute; font-family: var(--font-syne), sans-serif; font-size: clamp(120px,20vw,240px); font-weight: 900; color: var(--red); opacity: .06; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .cta-h { font-family: var(--font-syne), sans-serif; font-size: clamp(44px,6.5vw,84px); font-weight: 900; line-height: .9; margin-bottom: 24px; position: relative; z-index: 2; opacity: 0; transform: translateY(28px); transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1); }
        .cta-h.show { opacity: 1; transform: translateY(0); }
        .cta-h em { color: var(--red-hi); font-style: normal; }
        .cta-sub { font-size: 18px; color: var(--muted); max-width: 480px; line-height: 1.75; font-weight: 300; margin-bottom: 56px; position: relative; z-index: 2; opacity: 0; transform: translateY(20px); transition: opacity .8s cubic-bezier(.16,1,.3,1) .18s, transform .8s cubic-bezier(.16,1,.3,1) .18s; }
        .cta-sub.show { opacity: 1; transform: translateY(0); }
        .dl-wrap { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; position: relative; z-index: 2; opacity: 0; transform: translateY(16px); transition: opacity .7s cubic-bezier(.16,1,.3,1) .34s, transform .7s cubic-bezier(.16,1,.3,1) .34s; }
        .dl-wrap.show { opacity: 1; transform: translateY(0); }
        .dl { display: inline-flex; align-items: center; gap: 12px; padding: 14px 28px; border-radius: 14px; text-decoration: none; font-size: 15px; font-weight: 500; border: 1px solid rgba(255,255,255,.12); }
        .dl-p { background: var(--white); color: var(--black); }
        .dl-s { background: rgba(255,255,255,.06); color: var(--white); }
        .dl.is-live {
          background: rgba(229,53,43,.14);
          border-color: rgba(229,53,43,.4);
          box-shadow: 0 18px 48px rgba(229,53,43,.18);
        }
        .dl-note {
          margin-left: 2px;
          padding: 3px 8px;
          border-radius: 999px;
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #dff7e9;
          border: 1px solid rgba(34,197,94,.48);
          background: rgba(34,197,94,.14);
        }
        .dl svg { width: 20px; height: 20px; }
        footer { padding: 32px 8vw; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .f-copy { font-family: var(--font-space-mono), monospace; font-size: 11px; color: var(--muted); letter-spacing: .05em; }
        .f-links { display: flex; gap: 24px; }
        .f-links a { font-size: 12px; color: var(--muted); text-decoration: none; }
        .f-links a:hover { color: var(--white); }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes logoFadeUp { from { opacity: 0; translate: 0 24px; scale: .96; } to { opacity: 1; translate: 0 0; scale: 1; } }
        @keyframes logoFadeUpMobile { from { opacity: 0; translate: 0 18px; scale: .96; } to { opacity: 1; translate: 0 0; scale: 1; } }
        @keyframes sPulse { 0%,100% { opacity: 1; transform: scaleY(1); } 50% { opacity: .35; transform: scaleY(.55); } }
        @keyframes wvAnim { 0%,100% { transform: scaleY(.15); } 50% { transform: scaleY(1); } }
        @keyframes fire { 0%,100% { transform: scale(1) rotate(-2deg); } 50% { transform: scale(1.14) rotate(2deg); } }
        @media (min-width: 901px) {
          .m-inner, .cap-inner {
            max-width: 1540px;
            margin: 0 auto;
            padding-inline: clamp(82px, 8vw, 156px);
            gap: clamp(72px, 8vw, 150px);
          }
          .m-device { --device-width: clamp(280px, 18vw, 340px); }
          .cap-device { --device-width: clamp(260px, 17vw, 318px); }
          .org-inner, .flow-inner {
            max-width: 1480px;
            margin-inline: auto;
          }
          .org-h {
            font-size: clamp(40px, 4.7vw, 76px);
            max-width: 1260px;
          }
          .org-device { --device-width: clamp(150px, 22vh, 240px); }
          .flow-h {
            font-size: clamp(52px, 5.8vw, 104px);
            max-width: 900px;
          }
        }
        @media (max-width: 900px) {
          body { cursor: auto; }
          #cur, #cur-ring { display: none; }

          #intro { min-height: 100svh; height: 100svh; }
          .i-content { width: 100%; transform: translateY(-2vh); }
          .i-content::before { width: 88vw; height: 220px; opacity: .56; }
          .i-logo { width: min(68vw, 250px); height: auto; margin: 0 auto 24px; align-self: center; animation: logoFadeUpMobile 1s cubic-bezier(.16,1,.3,1) .1s both; }
          .i-actions { margin-top: 20px; }
          .i-play { min-height: 42px; padding: 0 16px; font-size: 10px; }
          .i-tag { font-size: 9px; letter-spacing: .16em; line-height: 1.6; padding: 0 6vw; }
          .i-scroll { bottom: 22px; }

          #s1, #s2, #s3, #s4 { height: auto; min-height: 100svh; }
          .scene-pin { position: relative; min-height: 100svh; height: auto; align-items: center; padding-top: 0; }

          .m-inner, .cap-inner {
            grid-template-columns: 1fr;
            min-height: 100svh;
            height: auto;
            padding: 48px 6vw 32px;
            gap: 26px;
            justify-items: center;
          }
          #s1 .m-inner { padding-top: 28px; padding-bottom: 18px; gap: 18px; }
          #s1 .m-beam { display: none; }
          .mwi, .cap-li, .fhi, .org-hi { transform: translateY(0) !important; }
          .cap-line, .fhl, .org-hl, .m-word { overflow: visible; }
          #s1 .m-text {
            text-align: center;
            width: 100%;
            max-width: 100%;
            justify-self: stretch;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #s1 .m-word {
            width: 100%;
            margin: 0 auto;
            text-align: center;
            font-size: clamp(23px, 7.6vw, 28px);
            line-height: 1.01;
            letter-spacing: -.022em;
          }
          #s1 .mwi {
            display: inline-block;
            width: auto;
            margin-inline: auto;
            text-align: center;
            white-space: nowrap;
          }
          .m-sub {
            margin-top: 12px;
            font-size: 13px;
            line-height: 1.45;
            max-width: 34ch;
            text-align: center;
          }
          .m-device { --device-width: min(62vw, 24svh, 240px); --device-radius: 36px; --device-pad: 7px; }

          .cap-h { font-size: clamp(42px, 14vw, 64px); line-height: 1; }
          .cap-copy {
            margin-top: 16px;
            font-size: 14px;
            line-height: 1.55;
            max-width: 35ch;
            text-align: center;
          }
          .cap-device { --device-width: min(72vw, 25svh, 290px); --device-radius: 38px; --device-pad: 7px; }
          .wv { margin-top: 20px; height: 44px; }

          .org-inner, .flow-inner { min-height: 100svh; height: auto; }
          .org-inner { padding: 24px 6vw 18px; gap: 12px; }
          .org-h { font-size: clamp(24px, 8.3vw, 34px); line-height: 1; max-width: 96vw; }
          .org-hl { padding-top: 0; margin-top: 0; }
          .org-phones { flex-direction: row; align-items: flex-end; gap: 8px; }
          .org-device { --device-width: min(47vw, 17svh, 190px); --device-radius: 34px; --device-pad: 6px; }
          #op2-device { margin-top: 12px; }
          .org-badges { max-width: 100%; gap: 6px; }
          .ob { padding: 6px 10px; font-size: 9px; }

          .flow-inner { padding: 40px 6vw 26px; gap: 22px; }
          .flow-lbl { font-size: 9px; letter-spacing: .16em; }
          .flow-h { font-size: clamp(36px, 12vw, 54px); line-height: 1.06; max-width: 94vw; }
          #s4 .fhl { overflow: visible; padding: .04em 0; }
          .streak { min-width: auto; width: 100%; max-width: 360px; padding: 20px 16px; border-radius: 18px; }
          .streak-top { margin-bottom: 14px; }
          .s-fire { font-size: 30px; }
          .s-num { font-size: 44px; }
          .s-grid { gap: 5px; }
          .sday { height: 42px; font-size: 8px; }

          .m-sub, .cap-copy, .flow-sub, .cap-eyebrow, .flow-lbl, .wv, .org-badges {
            opacity: 1 !important;
            transform: none !important;
          }
          .phone-device {
            opacity: 1 !important;
            transform: none !important;
          }

          #cta { padding: 72px 6vw; min-height: 100svh; }
          #tech-proof { min-height: auto; grid-template-columns: 1fr; padding: 72px 6vw; }
          .tp-grid { grid-template-columns: 1fr; }
          .tp-copy { font-size: 14px; line-height: 1.6; }
          .cta-h { font-size: clamp(46px, 14vw, 64px); line-height: .9; margin-bottom: 16px; }
          .cta-sub { font-size: 14px; line-height: 1.6; margin-bottom: 34px; }
          .dl { width: 100%; max-width: 290px; justify-content: center; padding: 13px 20px; }
          .dl-note { font-size: 9px; padding: 2px 7px; }

          footer { padding: 24px 6vw; justify-content: center; text-align: center; }
          .f-links { gap: 14px; flex-wrap: wrap; justify-content: center; }
        }
        @media (max-width: 420px) {
          #s1 .m-word { font-size: clamp(22px, 7.2vw, 27px); }
          .cap-h { font-size: clamp(34px, 12.8vw, 52px); }
          .cap-inner { gap: 18px; }
          .cap-copy { margin-top: 10px; }
          .cap-device { --device-width: min(72vw, 23svh, 270px); }
          .org-h { font-size: clamp(24px, 9.6vw, 32px); }
          .flow-h { font-size: clamp(33px, 11.5vw, 46px); line-height: 1.08; }
        }
        @media (min-width: 700px) and (max-width: 900px) {
          #s1, #s2, #s3, #s4 { height: auto; min-height: 100svh; }
          .scene-pin { align-items: center; padding-top: 0; }
          .m-inner, .cap-inner { padding: 26px 8vw; gap: 18px; align-content: center; }
          #s1 .m-inner { padding-top: 22px; padding-bottom: 22px; gap: 16px; }
          #s1 .m-word { font-size: clamp(30px, 5vw, 42px); line-height: .98; }
          .m-sub { max-width: 44ch; font-size: 14px; line-height: 1.5; }
          .m-device { --device-width: min(31vw, 19svh, 240px); }
          .cap-h { font-size: clamp(54px, 8.2vw, 76px); line-height: .9; }
          .cap-copy { margin-top: 14px; font-size: 14px; line-height: 1.5; }
          .wv { margin-top: 14px; height: 34px; }
          .cap-device { --device-width: min(33vw, 20svh, 255px); }
          .org-inner { justify-content: center; padding: 24px 7vw; gap: 12px; }
          .org-h { font-size: clamp(30px, 5.4vw, 44px); max-width: 720px; }
          .org-device { --device-width: min(24vw, 15svh, 190px); }
          .flow-inner { justify-content: center; padding: 30px 7vw; gap: 18px; }
          .flow-h { font-size: clamp(42px, 8vw, 62px); max-width: 680px; }
          .streak { max-width: 390px; padding: 20px 18px; }
          .flow-sub { font-size: 14px; line-height: 1.5; }
        }
        @media (max-width: 420px) and (max-height: 740px) {
          .scene-pin { align-items: flex-start; padding-top: 10px; }
          #s3 .org-inner { justify-content: flex-start; gap: 8px; padding-top: 12px; }
          #s3 .org-h { font-size: clamp(21px, 8.4vw, 29px); line-height: .9; }
          #s3 .org-device { --device-width: min(43vw, 15svh, 165px); }
          #s3 .ob { font-size: 8px; padding: 4px 8px; }
        }
        @media (max-height: 760px) and (min-width: 901px) {
          .org-inner { gap: 18px; padding-top: 20px; padding-bottom: 20px; }
          .org-h { font-size: clamp(30px,5vw,56px); }
          .org-device { --device-width: clamp(110px,16vh,150px); }
          #op2-device { margin-top: clamp(10px,1.8vh,20px); }
          .ob { padding: 6px 12px; font-size: 9px; }
        }
        @media (max-height: 900px) and (min-width: 901px) {
          #s3 .org-inner { gap: 14px; padding-top: 14px; padding-bottom: 14px; }
          #s3 .org-h { font-size: clamp(22px,4vw,42px); line-height: .93; max-width: 1000px; }
          #s3 .org-hl { padding-top: 0; margin-top: 0; }
          #s3 .org-phones { gap: 12px; }
          #s3 .org-device { --device-width: clamp(125px,19vh,200px); }
          #s3 #op2-device { margin-top: clamp(6px,1vh,12px); }
          #s3 .org-badges { gap: 6px; max-width: 760px; }
          #s3 .ob { padding: 5px 10px; font-size: 8px; }
        }
        #rm-back-bar {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 24px;
          background: rgba(8,8,8,0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          font-family: var(--font-space-mono), monospace; font-size: 13px; font-weight: 400;
        }
        #rm-back-name { color: rgba(244,238,232,0.4); letter-spacing: .04em; }
        #rm-back-link { color: rgba(244,238,232,0.5); text-decoration: none; letter-spacing: .04em; transition: color .2s; }
        #rm-back-link:hover, #rm-back-link:focus-visible { color: rgba(244,238,232,0.92); outline: none; }
        @media (max-width: 480px) {
          #rm-back-bar { padding: 10px 16px; font-size: 12px; }
        }
      `}</style>

      <header id="rm-back-bar">
        <span id="rm-back-name">Luan Medrado</span>
        <Link href={portfolioHref} id="rm-back-link">← Portfolio</Link>
      </header>

      <div id="cur" />
      <div id="cur-ring" />
      <div id="grain" />

      <section id="intro">
        <canvas id="wc" />
        <div className="i-content">
          <Image src="/riff-maker/riff-cropped.png" className="i-logo" alt="Riff" width={682} height={205} />
          <div className="i-actions">
            <a href="https://play.google.com/store/apps/details?id=com.oluanmedrado.riffmaker" target="_blank" rel="noopener noreferrer" className="i-play">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.18 23.76c.36.2.77.2 1.16-.02l12.44-7.17-2.68-2.67-10.92 9.86zM.29 1.04C.11 1.42 0 1.86 0 2.38v19.25c0 .52.1.96.29 1.33l.07.07 10.78-10.78v-.25L.36.97.29 1.04zM20.23 10.27l-2.82-1.63-3 2.99 3 2.99 2.84-1.63c.81-.47.81-1.25-.02-1.72zM4.34.22L16.78 7.4l-2.68 2.67L3.18.23C3.56.01 3.98.04 4.34.22z" /></svg>
              Baixar na Play Store
            </a>
          </div>
          <div className="i-tag">Capture riffs e ideias musicais antes que elas sumam.</div>
        </div>
        <div className="i-scroll">
          <div className="i-scroll-lbl">scroll</div>
          <div className="i-scroll-line" />
        </div>
      </section>

      <div className="scene" id="s1">
        <div className="scene-pin">
          <div className="m-inner">
            <div className="m-beam" />
            <div className="m-text">
              <span className="m-word" id="mw1"><span className="mwi">Nenhuma ideia</span></span>
              <span className="m-word" id="mw2"><span className="mwi">merece ser</span></span>
              <span className="m-word accent" id="mw3"><span className="mwi">perdida.</span></span>
              <p className="m-sub" id="m-sub">
                Capture riffs, ideias e versões sem perder o fluxo criativo.
                <br />
                Um app mobile autoral feito para o momento em que a inspiração aparece.
              </p>
            </div>
            <div className="m-phone-wrap">
              <div className="m-glow" id="m-glow" />
              <div className="phone-device m-device" id="m-device">
                <div className="phone-screen">
                  <Image src="/riff-3.jpg" className="m-phone" id="m-ph" alt="Tela de ideias do Riff Maker" width={1170} height={2532} />
                </div>
                <span className="phone-home" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="scene-rule" />
        </div>
      </div>

      <div className="scene" id="s2">
        <div className="scene-pin">
          <div className="cap-bg" />
          <div className="cap-flood" id="c-flood" />
          <div className="cap-inner">
            <div>
              <div className="cap-eyebrow" id="c-eye">Gravação instantânea</div>
              <div className="cap-h">
                <span className="cap-line"><span className="cap-li" id="cl1">Um</span></span>
                <span className="cap-line"><span className="cap-li d1" id="cl2">toque.</span></span>
                <span className="cap-line"><span className="cap-li d2" id="cl3">Gravado.</span></span>
              </div>
              <p className="cap-copy" id="c-copy">
                Grave riffs, beats ou ideias cantadas no mesmo instante.
                <br />
                Sem setup. Sem pensar. Só apertar e registrar.
              </p>
              <div className="wv" id="wv">
                {waveformBars.map((bar) => (
                  <div
                    key={`${bar.delay}-${bar.duration}`}
                    className="wv-b"
                    style={{ animationDelay: bar.delay, animationDuration: bar.duration }}
                  />
                ))}
              </div>
            </div>
            <div className="cap-phone-wrap">
              <div className="phone-device cap-device" id="c-device">
                <div className="phone-screen">
                  <Image src="/riff-1.jpg" className="cap-phone" id="c-ph" alt="Tela de captura do Riff Maker" width={1170} height={2532} />
                </div>
                <span className="phone-home" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="scene-rule" />
        </div>
      </div>

      <div className="scene" id="s3">
        <div className="scene-pin">
          <div className="org-inner">
            <div className="org-h">
              <span className="org-hl"><span className="org-hi" id="oh1">Nunca mais <em>perca</em> um riff.</span></span>
              <span className="org-hl"><span className="org-hi d1" id="oh2">Tudo salvo, nomeado e fácil de encontrar.</span></span>
            </div>
            <div className="org-phones">
              <div className="phone-device org-device" id="op1-device">
                <div className="phone-screen">
                  <Image src="/riff-2.jpg" className="op1" id="op1" alt="Tela de projetos do Riff Maker" width={1170} height={2532} />
                </div>
                <span className="phone-home" aria-hidden="true" />
              </div>
              <div className="phone-device org-device" id="op2-device">
                <div className="phone-screen">
                  <Image src="/riff-3.jpg" className="op2" id="op2" alt="Tela de ideias do Riff Maker" width={1170} height={2532} />
                </div>
                <span className="phone-home" aria-hidden="true" />
              </div>
            </div>
            <div className="org-badges" id="obs">
              {[
                ["#C0271F", "Beat"],
                ["#4A9EFF", "Guitarra"],
                ["#3FC97E", "Voz"],
                ["#E8C547", "Indie"],
                ["#FF7A5A", "Trap"],
                ["#C97EFF", "Projeto"],
                ["#FF9E4A", "Batida"],
                ["#78D6FF", "Intro"],
              ].map(([color, label]) => (
                <span className="ob" key={label}>
                  <span className="d" style={{ background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="scene-rule" />
        </div>
      </div>

      <div className="scene" id="s4">
        <div className="scene-pin">
          <div className="flow-bg-base" />
          <div className="flow-inner">
            <div className="flow-lbl" id="fl">Consistência criativa</div>
            <div className="flow-h">
              <span className="fhl"><span className="fhi" id="fh1">Mantenha</span></span>
              <span className="fhl"><span className="fhi d1" id="fh2">o <em>flow</em> vivo.</span></span>
            </div>
            <div className="streak" id="st">
              <div className="streak-top">
                <div className="s-fire">🔥</div>
                <div>
                  <div className="s-lbl">Dias no flow</div>
                  <div className="s-num" id="sn">0</div>
                </div>
              </div>
              <div className="s-grid">
                <div className="sday" data-i="0"><div className="sday-dot" />SEG</div>
                <div className="sday act" data-i="1"><div className="sday-dot" />TER</div>
                <div className="sday act" data-i="2"><div className="sday-dot" />QUA</div>
                <div className="sday act" data-i="3"><div className="sday-dot" />QUI</div>
                <div className="sday act" data-i="4"><div className="sday-dot" />SEX</div>
                <div className="sday act" data-i="5"><div className="sday-dot" />SAB</div>
                <div className="sday tod" data-i="6"><div className="sday-dot" />DOM</div>
              </div>
            </div>
            <p className="flow-sub" id="fsub">
              Cada dia que você grava, seu flow evolui.
              <br />
              Ideias viram riffs. Riffs viram músicas.
            </p>
          </div>
          <div className="scene-rule" />
        </div>
      </div>

      <section id="tech-proof">
        <div>
          <p className="tp-kicker">Produto autoral</p>
          <h2 className="tp-title">
            De ideia musical a <em>app publicado.</em>
          </h2>
          <p className="tp-copy">
            O Riff Maker foi criado como produto real: identidade própria, fluxo mobile, persistência local, visão de monetização e publicação na Google Play. Ele mostra minha capacidade de unir produto, design e engenharia em uma experiência completa.
          </p>
        </div>
        <div className="tp-grid">
          {[
            ["Mobile", "React Native + Expo"],
            ["Dados", "SQLite offline-first"],
            ["Backup", "Google Drive backup"],
            ["Monetização", "RevenueCat/PRO"],
            ["Distribuição", "Publicado na Google Play"],
            ["Produto", "Onboarding, identidade e visão musical"],
          ].map(([label, value]) => (
            <div className="tp-item" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="cta">
        <div className="cta-atm" />
        <div className="cta-bg-riff">∞</div>
        <h2 className="cta-h">
          Pare de perder ideias.
          <br />
          <em>Comece a criar.</em>
        </h2>
        <p className="cta-sub">
          Capture suas ideias no momento em que elas surgem.
          <br />
          Gratuito para começar. Poderoso o suficiente para nunca mais largar.
        </p>
        <div className="dl-wrap">
          <a href="https://play.google.com/store/apps/details?id=com.oluanmedrado.riffmaker" target="_blank" rel="noopener noreferrer" className="dl dl-s is-live">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.36.2.77.2 1.16-.02l12.44-7.17-2.68-2.67-10.92 9.86zM.29 1.04C.11 1.42 0 1.86 0 2.38v19.25c0 .52.1.96.29 1.33l.07.07 10.78-10.78v-.25L.36.97.29 1.04zM20.23 10.27l-2.82-1.63-3 2.99 3 2.99 2.84-1.63c.81-.47.81-1.25-.02-1.72zM4.34.22L16.78 7.4l-2.68 2.67L3.18.23C3.56.01 3.98.04 4.34.22z" /></svg>
            <span>Google Play</span>
            <span className="dl-note">Disponível</span>
          </a>
          <Link href="/projects/riffmaker" className="dl dl-s">
            <span>Ver case técnico</span>
          </Link>
        </div>
      </section>

      <footer>
        <div className="f-copy">© 2026 RIFF MAKER · Feito para músicos</div>
        <div className="f-links">
          <Link href="/riffmaker/privacy">Privacidade</Link>
        </div>
      </footer>
    </div>
  );
}
