"use client";

import { Fragment, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./YouTubeGrid.module.css";
import { useLanguage } from "../context/LanguageContext";

const channels = [
  {
    name: "Switch Game List",
    views: "4.15M",
    viewsFull: "4,150,000 views",
    avatarSrc: "/Switch Game List.jpg",
    href: "https://www.youtube.com/@SwitchGameList",
  },
  {
    name: "True Sailing Life",
    views: "3.91M",
    viewsFull: "3,910,000 views",
    avatarSrc: "/True Sailing Life.jpg",
    href: "https://www.youtube.com/@TrueSailingLife",
  },
  {
    name: "Money Cultures",
    views: "691K",
    viewsFull: "691,000 views",
    avatarSrc: "/Money Cultures.jpg",
    href: "https://www.youtube.com/@MoneyCultures",
  },
  {
    name: "Global Travel List",
    views: "141K",
    viewsFull: "141,000 views",
    avatarSrc: "/Global Travel List.jpg",
    href: "https://www.youtube.com/@GlobalTravelList",
  },
  {
    name: "Guitarra gospel",
    views: "18.6M",
    viewsFull: "18,643,296 views",
    avatarSrc: "/guitarragospel.jpg",
    href: "https://www.youtube.com/@guitarragospeloficial",
  },
  {
    name: "Novato",
    views: "326K",
    viewsFull: "326,452 views",
    avatarSrc: "/novato.jpg",
    href: "https://www.youtube.com/@novato.oficial",
  },  
] as const;

export default function YouTubeGrid() {
  const { lang } = useLanguage();
  const channelRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const copy =
    lang === "en"
      ? {
        totalViews: "total views",
        partners: "partner channels",
      }
      : {
        totalViews: "views totais",
        partners: "canais parceiros",
      };

  useEffect(() => {
    const items = channelRefs.current.filter((item): item is HTMLAnchorElement => item !== null);

    if (!items.length) {
      return;
    }

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const index = items.indexOf(entry.target as HTMLAnchorElement);
          const timer = window.setTimeout(() => {
            entry.target.classList.add(styles.itemVisible);
          }, index * 90);

          timers.push(timer);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        {lang === "en" ? <><span>YouTube</span> Creators</> : <>Criadores do <span>YouTube</span></>}
      </h2>

      <div className={styles.channels}>
        {channels.map((channel, index) => (
          <Fragment key={channel.name}>
            <a
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channel}
              ref={(element) => {
                channelRefs.current[index] = element;
              }}
            >
              <div className={styles.avatar}>
                <Image src={channel.avatarSrc} alt={channel.name} fill sizes="72px" className={styles.avatarImage} />
                <div className={styles.avatarArrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
              <span className={styles.viewsBadge} aria-label={channel.viewsFull}>
                <strong className={styles.viewsValue}>{channel.views}</strong>
                <span className={styles.viewsLabel}>views</span>
              </span>
              <span className={styles.channelName}>{channel.name}</span>
            </a>
            {index < channels.length - 1 && <div className={styles.dotDivider} aria-hidden="true"></div>}
          </Fragment>
        ))}
      </div>

      <div className={styles.totals}>
        <div className={styles.totalItem}>
          <span className={styles.totalNumber}>27.9M+</span>
          <span className={styles.totalLabel}>{copy.totalViews}</span>
        </div>
        <div className={styles.totalSep} aria-hidden="true"></div>

        <div className={styles.totalItem}>
          <span className={styles.totalNumber}>30k+</span>
          <span className={styles.totalLabel}>likes</span>
        </div>
        <div className={styles.totalSep} aria-hidden="true"></div>

        <div className={styles.totalItem}>
          <span className={styles.totalNumber}>6</span>
          <span className={styles.totalLabel}>{copy.partners}</span>
        </div>
      </div>
    </div>
  );
}