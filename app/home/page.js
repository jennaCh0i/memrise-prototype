"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Screen, Box, T, Photo, Avatar, ME } from "@/components/ui";
import { Svg, HOME_HEADER, Wordmark } from "@/components/Shapes";

// Tab / Home — week 10 › "With this content" (420 × 1349). Positions, sizes and colours from Figma.
// Calendar strip, Sep 13 → D-day. The big number is a countdown: days left until the trip
// from the selected date (today, Oct 24 = 42 days, so D-day is Dec 5). Earlier dates → bigger number.
// The date sitting in the highlighted slot (x 106, as in Figma) is the selected one.
const DAY1 = new Date(2026, 8, 13);
const TODAY_INDEX = 41;               // Oct 24
const DAYS_LEFT_TODAY = 42;
const TOTAL = TODAY_INDEX + DAYS_LEFT_TODAY + 1; // last pill is D-day (Dec 5)
const STEP = 74;       // pill spacing in the Figma frame
const SLOT_X = 106;    // where the selected pill sits
const DATES = Array.from({ length: TOTAL }, (_, i) => {
  const d = new Date(DAY1); d.setDate(DAY1.getDate() + i);
  return { i, label: `${d.toLocaleString("en-US", { month: "short" })}\n${d.getDate()}` };
});
const LESSON_CARDS = [
  { tag: "TODAY · DAY 13", title: "coffee order", src: "/images/barista.jpg", href: "/lesson/coffee-order/make-it-yours" },
  { tag: "TOMORROW · DAY 12", title: "T-money\ntop-up", src: "/images/tmoney.jpg" },
  { tag: "DAY 11", title: "pharmacy", src: "/images/pharmacy.jpg" },
  { tag: "DAY 10", title: "dinner party", src: "/images/dinner.jpg" },
];
const CARD_STEP = 303; // card spacing in the Figma lesson-card row
// [label, labelY, trackY, fillW, countY, count]
const READY = [
  ["Getting around", 1090, 1090, 160, 1084, "4/4"],
  ["Eating out", 1123, 1123, 68, 1120, "2/4"],
  ["Health", 1155, 1155, 86, 1153, "1/2"],
  ["Your stay", 1187, 1189, 40, 1187, "1/3"],
];
const FADE = "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.8) 100%)";
const sectionLabel = (x, y, text) => <T x={x} y={y} font="dm" size={14} weight={500} lh="130%" color="#a3a3a3">{text}</T>;

function useSeoulTime() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow({
        day: d.toLocaleDateString("en-US", { weekday: "short", timeZone: "Asia/Seoul" }),
        time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Seoul" }),
      });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return now || { day: "Sat", time: "10:41 AM" };
}

function DateStrip({ onSelect }) {
  const ref = useRef(null);
  const [sel, setSel] = useState(TODAY_INDEX);
  useEffect(() => { if (ref.current) ref.current.scrollLeft = TODAY_INDEX * STEP; }, []);
  const onScroll = () => {
    const i = Math.max(0, Math.min(TOTAL - 1, Math.round(ref.current.scrollLeft / STEP)));
    if (i !== sel) { setSel(i); onSelect(i); }
  };
  return (
    <div ref={ref} onScroll={onScroll} className="hscroll"
      style={{ position: "absolute", left: 0, top: 353, width: 420, height: 72, scrollSnapType: "x mandatory", scrollPaddingLeft: SLOT_X }}>
      <div style={{ position: "relative", width: (TOTAL - 1) * STEP + 420, height: 72 }}>
        {DATES.map((d) => {
          const x = SLOT_X + d.i * STEP;
          const on = d.i === sel;
          return (
            <div key={d.i} onClick={() => ref.current.scrollTo({ left: d.i * STEP, behavior: "smooth" })} style={{ cursor: "pointer" }}>
              <Box x={x} y={0} w={63} h={56} r={20} bg={on ? "#ffcf00" : "#430b27"} style={{ scrollSnapAlign: "start", transition: "background .15s" }} />
              <T x={x + 12} y={8} w={39} font="serif" size={20} lh="95%" align="center" color={on ? "#2a2a28" : "#fefff8"}>{d.label}</T>
              {d.i <= TODAY_INDEX && <Box x={x + 28} y={63} w={6} h={6} r={3} bg="#2a2a28" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const seoul = useSeoulTime();
  const [left, setLeft] = useState(DAYS_LEFT_TODAY);
  return (
    <Screen bg="#f7f6f2" nav="Home" height={1349}>
      {/* Header gradient from Figma ("Exclude"): #F7F8EA → #FFCF00, mostly yellow, lightening toward the top */}
      <Svg w={420} h={337} d={HOME_HEADER} fill="url(#homeHeaderGrad)">
        <defs>
          <linearGradient id="homeHeaderGrad" gradientUnits="objectBoundingBox" x1="0.5" y1="-1.605" x2="0.5" y2="0.895">
            <stop offset="0" stopColor="#F7F8EA" />
            <stop offset="1" stopColor="#FFCF00" />
          </linearGradient>
        </defs>
      </Svg>
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <div style={{ position: "absolute", left: 26, top: 115, lineHeight: "112px", whiteSpace: "pre", color: "#2a2a28" }}>
        {left === 0 ? (
          <span style={{ fontFamily: "var(--serif)", fontSize: 80 }}>D-day</span>
        ) : (
          <>
            <span style={{ fontFamily: "var(--columba)", fontSize: 80 }}>{left}</span>
            <span style={{ fontFamily: "var(--columba)", fontSize: 35 }}> </span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 35 }}>{left === 1 ? "day" : "days"}</span>
          </>
        )}
      </div>

      <DateStrip onSelect={(i) => setLeft(DAYS_LEFT_TODAY - (i - TODAY_INDEX))} />

      {/* Lessons — cards scroll sideways */}
      {sectionLabel(37, 449, "Lessons")}
      <div className="hscroll" style={{ position: "absolute", left: 0, top: 477, width: 420, height: 241, scrollSnapType: "x mandatory", scrollPaddingLeft: 31 }}>
        <div style={{ position: "relative", width: 31 + (LESSON_CARDS.length - 1) * CARD_STEP + 292 + 31, height: 241 }}>
          {LESSON_CARDS.map((c, i) => {
            const x = 31 + i * CARD_STEP;
            const twoLines = c.title.includes("\n");
            // Card layout (week 10): photo + fade, white icon tile top-right, title + tag bottom-left
            const card = (
              <>
                <Photo x={x} y={0} w={292} h={241} r={20} src={c.src} style={{ scrollSnapAlign: "start" }} />
                <Box x={x} y={0} w={292} h={241} r={20} style={{ background: FADE }} />
                <Box x={x + 235} y={12} w={45} h={45} r={13} bg="#fefff8" />
                <svg width="18" height="15" viewBox="0 0 18 15" fill="#430b27" style={{ position: "absolute", left: x + 249, top: 27 }}>
                  <path d="M17.9999 10.9706C17.9999 12.0752 17.1045 12.9706 15.9999 12.9706H15.1764C13.3289 12.9706 11.6556 13.4594 9.5293 14.8235V2.94606C9.5293 2.26487 9.87118 1.62112 10.4673 1.29153C12.167 0.351866 13.609 0 15.1764 0H15.9999C17.1045 0 17.9999 0.895431 17.9999 2V10.9706Z" />
                  <path d="M0.000114441 10.9706C0.000114441 12.0752 0.895545 12.9706 2.00011 12.9706H2.82364C4.67107 12.9706 6.34443 13.4594 8.4707 14.8235V2.94606C8.4707 2.26487 8.12882 1.62112 7.53268 1.29153C5.83305 0.351866 4.39099 0 2.82364 0H2.00011C0.895545 0 0.000114441 0.895431 0.000114441 2V10.9706Z" />
                </svg>
                <T x={x + 16} y={twoLines ? 161 : 176} font="serif" size={24} lh={twoLines ? "95%" : 31} color="#fefff8">{c.title}</T>
                <T x={x + 16} y={214} font="dm" size={10} weight={500} ls="0.05em" lh={13} color="#ffffff">{c.tag}</T>
              </>
            );
            return c.href ? <Link key={i} href={c.href}>{card}</Link> : <div key={i}>{card}</div>;
          })}
        </div>
      </div>

      {/* Before your trip */}
      {sectionLabel(32, 742, "Before your trip")}
      <Link href="/flashcards/coffee-order">
        <Box x={31} y={769} w={178} h={175} r={20} bg="#430b27" />
        <T x={51} y={786} font="dm" size={10} weight={600} lh={13} color="#ffffff">Flashcard</T>
        <T x={51} y={806} w={141} font="serif" size={24} lh="90%" color="#fefff8">{"12 words\nto review"}</T>
        <Box x={47} y={904} w={68} h={26} r={13} bg="#ffcf00" />
        <T x={47} y={909} w={68} font="dm" size={13} weight={500} lh={17} align="center" color="#430b27">4 min</T>
      </Link>
      <Photo x={219} y={769} w={178} h={175} r={20} src="/images/seoul.jpg" />
      <Box x={219} y={769} w={178} h={175} r={20} bg="rgba(255, 207, 0, 0.4)" />
      <T x={235} y={786} font="dm" size={10} weight={600} lh={13} color="#000000">Seoul now</T>
      <T x={236} y={849} font="serif" size={24} lh="120%" color="#ffffff">{`${seoul.day}\n${seoul.time}\n6°C`}</T>

      {/* Trip readiness */}
      <T x={32} y={970} font="dm" size={15} weight={500} lh={18} color="#7e7e7e">Trip readiness</T>
      <Box x={31} y={999} w={366} h={232} r={20} bg="#fefff8" />
      <T x={51} y={1028} font="serif" size={40} lh="100%" color="#430b27">60%</T>
      <T x={140} y={1035} font="serif" size={25} lh="100%" color="#430b27">ready for Seoul</T>
      {READY.map(([name, ly, ty, fw, cy, count]) => (
        <div key={name}>
          <T x={51} y={ly} font="dm" size={14} lh={18} color="#2a2a28">{name}</T>
          <Box x={170} y={ty} w={160} h={14} r={30} bg="#ecebe4" />
          <Box x={170} y={ty} w={fw} h={14} r={30} bg="#2e385b" />
          <T x={337} y={cy} w={40} font="dm" size={13} weight={500} lh={17} align="right" color="#430b27">{count}</T>
        </div>
      ))}
    </Screen>
  );
}
