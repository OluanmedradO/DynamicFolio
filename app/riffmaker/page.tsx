"use client";

import Link from "next/link";
import { Space_Mono } from "next/font/google";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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
      const totalWidth = canvas.width * 0.74;
      const barWidth = totalWidth / bars;
      const startX = canvas.width / 2 - totalWidth / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < bars; i += 1) {
        const n = i / bars;
        const amp =
          Math.sin(n * Math.PI * 4 + waveTime * 2.2) * 0.36 +
          Math.sin(n * Math.PI * 9 + waveTime * 3.4) * 0.2 +
          Math.sin(n * Math.PI * 2.2 + waveTime * 1.15) * 0.25;
        const env = Math.sin(n * Math.PI) * 0.88 + 0.12;
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

    const progress = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const sectionHeight = Math.max(el.offsetHeight, el.scrollHeight);
      if (sectionHeight <= 0) {
        return 0;
      }
      const raw = (window.innerHeight - rect.top) / sectionHeight;
      return Math.max(0, Math.min(1, raw));
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
    const mPh = q<HTMLImageElement>("m-ph");

    const cFlood = q<HTMLDivElement>("c-flood");
    const cEye = q<HTMLDivElement>("c-eye");
    const cl1 = q<HTMLSpanElement>("cl1");
    const cl2 = q<HTMLSpanElement>("cl2");
    const cl3 = q<HTMLSpanElement>("cl3");
    const cCopy = q<HTMLParagraphElement>("c-copy");
    const cWv = q<HTMLDivElement>("wv");
    const cPh = q<HTMLImageElement>("c-ph");

    const oh1 = q<HTMLSpanElement>("oh1");
    const oh2 = q<HTMLSpanElement>("oh2");
    const op1 = q<HTMLImageElement>("op1");
    const op2 = q<HTMLImageElement>("op2");

    const fl = q<HTMLDivElement>("fl");
    const fh1 = q<HTMLSpanElement>("fh1");
    const fh2 = q<HTMLSpanElement>("fh2");
    const streak = q<HTMLDivElement>("st");
    const streakNum = q<HTMLDivElement>("sn");
    const flowSub = q<HTMLParagraphElement>("fsub");
    const days = document.querySelectorAll<HTMLElement>(".sday");

    let mState = 0;
    let cState = 0;
    let fState = 0;
    let streakDone = false;

    const animateScenes = () => {
      if (s1) {
        const p1 = progress(s1);
        if (p1 > 0.04 && mState < 1 && mw1) {
          mw1.classList.add("up");
          mState = 1;
        }
        if (p1 > 0.2 && mState < 2 && mw2) {
          mw2.classList.add("up");
          mState = 2;
        }
        if (p1 > 0.38 && mState < 3 && mw3) {
          mw3.classList.add("up");
          mState = 3;
        }
        const showText = p1 > 0.12;
        const showPhone = p1 > 0.18;
        mSub?.classList.toggle("show", showText);
        mPh?.classList.toggle("land", showPhone);
        mGlow?.classList.toggle("on", showPhone);
      }

      if (s2) {
        const p2 = progress(s2);
        cFlood?.classList.toggle("open", p2 > 0.07);
        if (p2 > 0.1 && cState < 1) {
          cEye?.classList.add("show");
          cState = 1;
        }
        if (p2 > 0.18 && cState < 2) {
          cl1?.classList.add("up");
          cState = 2;
        }
        if (p2 > 0.26 && cState < 3) {
          cl2?.classList.add("up");
          cState = 3;
        }
        if (p2 > 0.34 && cState < 4) {
          cl3?.classList.add("up");
          cState = 4;
        }
        const late = p2 > 0.46;
        cCopy?.classList.toggle("show", late);
        cWv?.classList.toggle("show", late);
        cPh?.classList.toggle("show", late);
      }

      const s3El = s3 ?? q<HTMLDivElement>("s3");
      if (s3El) {
        const p3 = progress(s3El);
        const oh1El = oh1 ?? q<HTMLSpanElement>("oh1");
        const oh2El = oh2 ?? q<HTMLSpanElement>("oh2");
        const op1El = op1 ?? q<HTMLImageElement>("op1");
        const op2El = op2 ?? q<HTMLImageElement>("op2");
        const obsEl = q<HTMLDivElement>("obs");
        oh1El?.classList.toggle("up", p3 > 0.05);
        oh2El?.classList.toggle("up", p3 > 0.13);
        op1El?.classList.toggle("show", p3 > 0.08);
        op2El?.classList.toggle("show", p3 > 0.08);
        obsEl?.classList.toggle("show", p3 > 0.3);
      }

      if (s4) {
        const p4 = progress(s4);
        fl?.classList.toggle("show", p4 > 0.04);
        if (p4 > 0.1 && fState < 1) {
          fh1?.classList.add("up");
          fState = 1;
        }
        if (p4 > 0.2 && fState < 2) {
          fh2?.classList.add("up");
          fState = 2;
        }
        if (p4 > 0.34) {
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
        } else if (p4 < 0.2) {
          streak?.classList.remove("show");
          streakDone = false;
          if (streakNum) {
            streakNum.textContent = "0";
          }
          days.forEach((day) => day.classList.remove("show"));
        }
        flowSub?.classList.toggle("show", p4 > 0.56);
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
        opacity: mounted ? 1 : 0,
        transition: "opacity .18s ease",
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
        body { background: var(--black); color: var(--white); font-family: var(--font-dm-sans), sans-serif; overflow-x: hidden; cursor: none; }
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
        .i-content { position: relative; z-index: 2; text-align: center; }
        .i-logo { height: 500px; margin-bottom: 28px; filter: brightness(0) invert(1); display: block; margin-left: auto; margin-right: auto; }
        .i-tag { font-family: var(--font-space-mono), monospace; font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: var(--muted); }
        .i-scroll { position: absolute; bottom: 36px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .i-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, transparent, var(--red-hi)); animation: sPulse 2.2s ease-in-out infinite; }
        .i-scroll-lbl { font-family: var(--font-space-mono), monospace; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }

        .scene { position: relative; }
        .scene-pin { position: sticky; top: 0; height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .scene-rule { position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(192,39,31,.35), transparent); }
        #s1, #s2, #s3 { height: 250vh; }
        #s4 { height: 220vh; }
        .m-inner, .cap-inner { width: 100%; height: 100%; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 0 9vw; gap: 60px; position: relative; }
        .m-beam { position: absolute; right: 0; top: 0; bottom: 0; width: 55%; background: radial-gradient(ellipse 80% 90% at 60% 50%, rgba(139,16,10,.28) 0%, transparent 70%); pointer-events: none; z-index: 1; }
        .m-text { position: relative; z-index: 2; }
        .m-word, .cap-h, .org-h, .flow-h { font-family: var(--font-syne), sans-serif; font-weight: 900; letter-spacing: -.04em; }
        .m-word { font-size: clamp(52px,7.5vw,108px); line-height: .9; overflow: hidden; display: block; }
        .mwi, .cap-li, .fhi { display: block; transform: translateY(108%); transition: transform .9s cubic-bezier(.16,1,.3,1); }
        .mwi.up, .cap-li.up, .fhi.up { transform: translateY(0); }
        .org-hi { display: block; transform: translateY(0); }
        .m-word.accent .mwi, .flow-h em, .org-h em { color: var(--red-hi); font-style: normal; }
        .m-sub, .cap-copy, .flow-sub { color: var(--muted); font-weight: 300; opacity: 0; transform: translateY(12px); transition: all .7s ease; }
        .m-sub.show, .cap-copy.show, .flow-sub.show { opacity: 1; transform: translateY(0); }
        .m-sub { max-width: 400px; margin-top: 36px; font-size: 17px; line-height: 1.75; }
        .m-phone-wrap, .cap-phone-wrap { display: flex; justify-content: center; perspective: 1100px; position: relative; z-index: 2; }
        .m-glow { position: absolute; width: 80%; height: 80%; border-radius: 50%; background: radial-gradient(ellipse at center, var(--red-glow) 0%, transparent 68%); opacity: 0; transition: opacity 1.2s; }
        .m-glow.on { opacity: 1; }
        .m-phone, .cap-phone { border: 1px solid rgba(255,255,255,.08); box-shadow: 0 50px 120px rgba(0,0,0,.9); display: block; opacity: 0; transition: transform 1.1s cubic-bezier(.16,1,.3,1), opacity .9s; }
        .m-phone { width: min(310px,40vw); border-radius: 44px; transform: translateY(100px) rotateY(-22deg) rotateX(8deg) scale(.85); }
        .m-phone.land { transform: translateY(0) rotateY(0) rotateX(0) scale(1); opacity: 1; }

        .cap-bg { position: absolute; inset: 0; background: var(--black); z-index: 0; }
        .cap-flood { position: absolute; inset: 0; background: var(--red-dark); clip-path: circle(0% at 78% 50%); transition: clip-path 1.3s cubic-bezier(.16,1,.3,1); z-index: 1; }
        .cap-flood.open { clip-path: circle(160% at 78% 50%); }
        .cap-inner { position: relative; z-index: 2; }
        .cap-eyebrow, .flow-lbl { font-family: var(--font-space-mono), monospace; font-size: 11px; letter-spacing: .22em; text-transform: uppercase; opacity: 0; transform: translateY(10px); transition: all .5s; }
        .cap-eyebrow.show, .flow-lbl.show { opacity: 1; transform: translateY(0); }
        .cap-h { font-size: clamp(56px,8vw,108px); line-height: .88; }
        .cap-line, .fhl, .org-hl { display: block; overflow: hidden; }
        .cap-copy { max-width: 380px; margin-top: 30px; font-size: 16px; line-height: 1.78; }
        .wv { display: flex; align-items: center; gap: 4px; height: 56px; margin-top: 32px; opacity: 0; transition: opacity .6s; }
        .wv.show { opacity: 1; }
        .wv-b { flex: 1; max-width: 5px; border-radius: 3px; background: rgba(255,255,255,.38); animation: wvAnim 1s ease-in-out infinite; }
        .cap-phone { width: min(295px,38vw); border-radius: 42px; transform: translateX(90px) rotateY(14deg) scale(.88); }
        .cap-phone.show { transform: translateX(0) rotateY(0) scale(1); opacity: 1; }
        .org-inner, .flow-inner { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .org-inner { padding: clamp(26px,5vh,56px) 8vw; gap: clamp(22px,3.8vh,42px); }
        .flow-inner { padding: 0 8vw; gap: 48px; }
        .org-h { font-size: clamp(32px,5vw,58px); line-height: .96; max-width: 980px; }
        .org-hl { padding-top: .08em; margin-top: -.08em; }
        .org-phones { display: flex; gap: clamp(8px,1.2vw,14px); align-items: flex-end; perspective: 1200px; }
        .op1, .op2 {
          display: block;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 28px 70px rgba(0,0,0,.55);
          opacity: 0;
          transition: transform 1.1s cubic-bezier(.16,1,.3,1), opacity .9s;
        }
        .op1 { width: clamp(160px,23vh,230px); transform: translateX(-18px) rotateY(5deg) scale(1); }
        .op2 { width: clamp(160px,23vh,230px); margin-top: clamp(8px,1.5vh,18px); transform: translateX(18px) rotateY(-5deg) scale(1); }
        .op1.show { transform: translateX(-18px) rotateY(5deg) scale(1); opacity: 1; }
        .op2.show { transform: translateX(18px) rotateY(-5deg) scale(1); opacity: 1; }
        .org-badges { display: flex; flex-wrap: wrap; gap: 9px; justify-content: center; max-width: 680px; }
        .ob { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 100px; font-family: var(--font-space-mono), monospace; font-size: 10px; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.04); opacity: 1; transform: translateY(0) scale(1); transition: opacity .45s, transform .45s; }
        .ob .d { width: 7px; height: 7px; border-radius: 50%; }

        .flow-bg-base { position: absolute; inset: 0; background: radial-gradient(ellipse 100% 80% at 50% 110%, rgba(122,12,8,.55) 0%, transparent 65%); z-index: 0; }
        .flow-inner { position: relative; z-index: 2; }
        .flow-lbl { color: rgba(192,39,31,.9); }
        .flow-h { font-size: clamp(46px,6.8vw,92px); line-height: .9; max-width: 720px; }
        .streak { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 24px; padding: 32px 40px; min-width: 380px; opacity: 0; transform: translateY(28px) scale(.96); transition: all .8s; }
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
        .cta-atm { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(192,39,31,.35) 0%, transparent 68%); }
        .cta-bg-riff { position: absolute; font-family: var(--font-syne), sans-serif; font-size: clamp(120px,20vw,240px); font-weight: 900; color: var(--red); opacity: .06; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .cta-h { font-family: var(--font-syne), sans-serif; font-size: clamp(44px,6.5vw,84px); font-weight: 900; line-height: .9; margin-bottom: 24px; position: relative; z-index: 2; }
        .cta-h em { color: var(--red-hi); font-style: normal; }
        .cta-sub { font-size: 18px; color: var(--muted); max-width: 480px; line-height: 1.75; font-weight: 300; margin-bottom: 56px; position: relative; z-index: 2; }
        .dl-wrap { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; position: relative; z-index: 2; }
        .dl { display: inline-flex; align-items: center; gap: 12px; padding: 14px 28px; border-radius: 14px; text-decoration: none; font-size: 15px; font-weight: 500; border: 1px solid rgba(255,255,255,.12); }
        .dl-p { background: var(--white); color: var(--black); }
        .dl-s { background: rgba(255,255,255,.06); color: var(--white); }
        .dl.is-soon {
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.22);
          cursor: not-allowed;
          pointer-events: none;
          opacity: .9;
        }
        .dl-note {
          margin-left: 2px;
          padding: 3px 8px;
          border-radius: 999px;
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #ffd7d4;
          border: 1px solid rgba(229,53,43,.55);
          background: rgba(229,53,43,.16);
        }
        .dl svg { width: 20px; height: 20px; }
        footer { padding: 32px 8vw; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
        .f-copy { font-family: var(--font-space-mono), monospace; font-size: 11px; color: var(--muted); letter-spacing: .05em; }
        .f-links { display: flex; gap: 24px; }
        .f-links a { font-size: 12px; color: var(--muted); text-decoration: none; }
        .f-links a:hover { color: var(--white); }
        @keyframes sPulse { 0%,100% { opacity: 1; transform: scaleY(1); } 50% { opacity: .35; transform: scaleY(.55); } }
        @keyframes wvAnim { 0%,100% { transform: scaleY(.15); } 50% { transform: scaleY(1); } }
        @keyframes fire { 0%,100% { transform: scale(1) rotate(-2deg); } 50% { transform: scale(1.14) rotate(2deg); } }
        @media (max-width: 860px) {
          body { cursor: auto; }
          #cur, #cur-ring { display: none; }

          #intro { min-height: 100svh; height: 100svh; }
          .i-content { width: 100%; }
          .i-logo { width: min(78vw, 320px); height: auto; margin: 0 auto 18px; }
          .i-tag { font-size: 9px; letter-spacing: .16em; padding: 0 6vw; }
          .i-scroll { bottom: 22px; }

          #s1, #s2, #s3, #s4 { height: 180vh; }
          .scene-pin { height: 100svh; align-items: flex-start; padding-top: 10px; }

          .m-inner, .cap-inner {
            grid-template-columns: 1fr;
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
          .m-phone { width: min(62vw, 240px); border-radius: 32px; }

          .cap-h { font-size: clamp(42px, 14vw, 64px); line-height: 1; }
          .cap-copy {
            margin-top: 16px;
            font-size: 14px;
            line-height: 1.55;
            max-width: 35ch;
            text-align: center;
          }
          .cap-phone {
            width: min(72vw, 290px);
            border-radius: 34px;
            transform: translateX(0) rotateY(0) scale(.98);
          }
          .cap-phone.show { transform: translateX(0) rotateY(0) scale(1); opacity: 1; }
          .wv { margin-top: 20px; height: 44px; }

          .org-inner { padding: 24px 6vw 18px; gap: 12px; }
          .org-h { font-size: clamp(24px, 8.3vw, 34px); line-height: 1; max-width: 96vw; }
          .org-hl { padding-top: 0; margin-top: 0; }
          .org-phones { flex-direction: row; align-items: flex-end; gap: 8px; }
          .op1, .op2 { width: min(47vw, 190px); transform: translateX(0) rotateY(0) scale(1); }
          .op2 { margin-top: 12px; }
          .op1.show, .op2.show { transform: translateX(0) rotateY(0) scale(1); opacity: 1; }
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

          .m-sub, .cap-copy, .flow-sub, .cap-eyebrow, .flow-lbl, .wv {
            opacity: 1 !important;
            transform: none !important;
          }
          .m-phone, .cap-phone, .op1, .op2 {
            opacity: 1 !important;
          }

          #cta { padding: 72px 6vw; min-height: 100svh; }
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
          .org-h { font-size: clamp(24px, 9.6vw, 32px); }
          .flow-h { font-size: clamp(33px, 11.5vw, 46px); line-height: 1.08; }
        }
        @media (max-width: 420px) and (max-height: 740px) {
          .scene-pin { align-items: flex-start; padding-top: 10px; }
          #s3 .org-inner { justify-content: flex-start; gap: 8px; padding-top: 12px; }
          #s3 .org-h { font-size: clamp(21px, 8.4vw, 29px); line-height: .9; }
          #s3 .op1, #s3 .op2 { width: min(43vw, 165px); }
          #s3 .ob { font-size: 8px; padding: 4px 8px; }
        }
        @media (max-height: 760px) and (min-width: 861px) {
          .org-inner { gap: 18px; padding-top: 20px; padding-bottom: 20px; }
          .org-h { font-size: clamp(30px,5vw,56px); }
          .op1, .op2 { width: clamp(110px,16vh,150px); }
          .op2 { margin-top: clamp(10px,1.8vh,20px); }
          .ob { padding: 6px 12px; font-size: 9px; }
        }
        @media (max-height: 900px) and (min-width: 861px) {
          #s3 .org-inner { gap: 14px; padding-top: 14px; padding-bottom: 14px; }
          #s3 .org-h { font-size: clamp(22px,4vw,42px); line-height: .93; max-width: 1000px; }
          #s3 .org-hl { padding-top: 0; margin-top: 0; }
          #s3 .org-phones { gap: 12px; }
          #s3 .op1, #s3 .op2 { width: clamp(125px,19vh,200px); }
          #s3 .op1 { transform: translateX(-12px) rotateY(4deg) scale(1); }
          #s3 .op2 { transform: translateX(12px) rotateY(-4deg) scale(1); }
          #s3 .op1.show { transform: translateX(-12px) rotateY(4deg) scale(1); }
          #s3 .op2.show { transform: translateX(12px) rotateY(-4deg) scale(1); }
          #s3 .op2 { margin-top: clamp(6px,1vh,12px); }
          #s3 .org-badges { gap: 6px; max-width: 760px; }
          #s3 .ob { padding: 5px 10px; font-size: 8px; }
        }
      `}</style>

      <div id="cur" />
      <div id="cur-ring" />
      <div id="grain" />

      <section id="intro">
        <canvas id="wc" />
        <div className="i-content">
          <img src="/riff-maker/riff.png" className="i-logo" alt="Riff" />
          <div className="i-tag">Para músicos que nunca param de criar</div>
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
                A melhor ideia vem quando você não está pronto.
                <br />
                E desaparece em segundos.
              </p>
            </div>
            <div className="m-phone-wrap">
              <div className="m-glow" id="m-glow" />
              <img src="/riff-3.jpg" className="m-phone" id="m-ph" alt="Tela de ideias do Riff Maker" />
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
              <img src="/riff-3.jpg" className="cap-phone" id="c-ph" alt="Tela de captura do Riff Maker" />
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
              <img src="/riff-2.jpg" className="op1" id="op1" alt="Tela de projetos do Riff Maker" />
              <img src="/riff-3.jpg" className="op2" id="op2" alt="Tela de ideias do Riff Maker" />
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
          <a href="#" className="dl dl-s is-soon" aria-disabled="true" tabIndex={-1}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.36.2.77.2 1.16-.02l12.44-7.17-2.68-2.67-10.92 9.86zM.29 1.04C.11 1.42 0 1.86 0 2.38v19.25c0 .52.1.96.29 1.33l.07.07 10.78-10.78v-.25L.36.97.29 1.04zM20.23 10.27l-2.82-1.63-3 2.99 3 2.99 2.84-1.63c.81-.47.81-1.25-.02-1.72zM4.34.22L16.78 7.4l-2.68 2.67L3.18.23C3.56.01 3.98.04 4.34.22z" /></svg>
            <span>Google Play</span>
            <span className="dl-note">Em breve</span>
          </a>
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
