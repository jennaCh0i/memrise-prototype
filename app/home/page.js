"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Screen, Box, T, Photo, Avatar, ME } from "@/components/ui";
import { Svg, HOME_HEADER, Wordmark } from "@/components/Shapes";

// Tab / Home — week 10 › "With this content" (420 × 1349). Positions, sizes and colours from Figma.
// Calendar strip: day 1 (Sep 13) → today, Oct 24 (day 42) → the trip (Nov 11). Scrolls sideways;
// the date sitting in the highlighted slot (x 106, as in Figma) is selected and drives the big number.
const DAY1 = new Date(2026, 8, 13);
const TODAY_INDEX = 41; // Oct 24 = day 42
const TOTAL = 60;      // up to Nov 11
const STEP = 74;       // pill spacing in the Figma frame
const SLOT_X = 106;    // where the selected pill sits
const DATES = Array.from({ length: TOTAL }, (_, i) => {
  const d = new Date(DAY1); d.setDate(DAY1.getDate() + i);
  return { i, label: `${d.toLocaleString("en-US", { month: "short" })}\n${d.getDate()}` };
});
const LESSON_CARDS = [
  { tag: "TODAY · DAY 13", title: "coffee order", src: "/images/barista.jpg", href: "/lesson/coffee-order/make-it-yours" },
  { tag: "TOMORROW · DAY 12", title: "T-money\ntop-up", src: "/images/tmoney.jpg" },
];
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
  const [day, setDay] = useState(TODAY_INDEX + 1);
  return (
    <Screen bg="#f7f6f2" nav="Home" height={1349}>
      <Svg w={420} h={337} d={HOME_HEADER} fill="#FFCF00" />
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <div style={{ position: "absolute", left: 26, top: 115, lineHeight: "112px", whiteSpace: "pre", color: "#2a2a28" }}>
        <span style={{ fontFamily: "var(--columba)", fontSize: 80 }}>{day}</span>
        <span style={{ fontFamily: "var(--columba)", fontSize: 35 }}> </span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 35 }}>{day === 1 ? "day" : "days"}</span>
      </div>

      <DateStrip onSelect={(i) => setDay(i + 1)} />

      {/* Lessons — cards scroll sideways */}
      {sectionLabel(37, 449, "Lessons")}
      <div className="hscroll" style={{ position: "absolute", left: 0, top: 477, width: 420, height: 241, scrollSnapType: "x mandatory", scrollPaddingLeft: 31 }}>
        <div style={{ position: "relative", width: 31 + LESSON_CARDS.length * 304 + 11, height: 241 }}>
          {LESSON_CARDS.map((c, i) => {
            const x = 31 + i * 304;
            const tagW = Math.max(118, c.tag.length * 7.2 + 18);
            const card = (
              <>
                <Photo x={x} y={0} w={292} h={241} r={20} src={c.src} style={{ scrollSnapAlign: "start" }} />
                <Box x={x} y={0} w={292} h={241} r={20} style={{ background: FADE }} />
                <Box x={x + 16} y={16} w={tagW} h={24} r={12} bg="#fefff8" />
                <T x={x + 16} y={22} w={tagW} font="inter" size={10} weight={600} lh={12} align="center" color="#430b27">{c.tag}</T>
                <T x={x + 16} y={c.title.includes("\n") ? 177 : 199} font="serif" size={24} lh={c.title.includes("\n") ? "95%" : 31} color="#ffffff">{c.title}</T>
              </>
            );
            return c.href ? <Link key={i} href={c.href} className="press">{card}</Link> : <div key={i}>{card}</div>;
          })}
        </div>
      </div>

      {/* Before your trip */}
      {sectionLabel(32, 742, "Before your trip")}
      <Link href="/flashcards/coffee-order" className="press">
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
      <T x={32} y={970} font="inter" size={15} weight={500} lh={18} color="#7e7e7e">Trip readiness</T>
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
