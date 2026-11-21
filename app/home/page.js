"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Screen, Box, T, Photo, Avatar, ME } from "@/components/ui";
import { Svg, HOME_HEADER, Wordmark } from "@/components/Shapes";

// Tab / Home (week 10)
const DATES = [
  { x: -43 }, { x: 31, t: "Oct\n23" }, { x: 106, t: "Oct\n24", today: true },
  { x: 180, t: "Oct\n25" }, { x: 254, t: "Oct\n26" }, { x: 328, t: "Oct\n27" }, { x: 402 },
];
// Lesson cards (scroll sideways). Photos only where we have them.
const LESSON_CARDS = [
  { tag: "TODAY · DAY 13", title: "coffee order", src: "/images/barista.jpg", href: "/lesson/coffee-order/make-it-yours" },
  { tag: "TOMORROW · DAY 12", title: "T-money\ntop-up", bg: "#b1c2fa" },
  { tag: "DAY 11", title: "pharmacy", bg: "#e1b3e3" },
];
const READY = [
  ["Getting around", 4, 4],
  ["Eating out", 2, 4],
  ["Health", 1, 2],
  ["Your stay", 1, 3],
];
const label = (y, text) => <T x={37} y={y} font="inter" size={14} weight={500} lh="130%" color="#8e8e8e">{text}</T>;

function useSeoulTime() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const day = d.toLocaleDateString("en-US", { weekday: "short", timeZone: "Asia/Seoul" });
      const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Seoul" });
      setNow({ day, time });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return now || { day: "Sat", time: "10:41 AM" };
}

export default function Home() {
  const seoul = useSeoulTime();
  return (
    <Screen bg="#f7f6f2" nav="Home" height={1350}>
      <Svg w={420} h={337} d={HOME_HEADER} fill="#FFCF00" />
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <div style={{ position: "absolute", left: 26, top: 115, lineHeight: "112px", whiteSpace: "pre", color: "var(--ink-soft)" }}>
        <span style={{ fontFamily: "var(--columba)", fontSize: 80 }}>42</span>
        <span style={{ fontFamily: "var(--columba)", fontSize: 35 }}> </span>
        <span style={{ fontFamily: "var(--serif)", fontSize: 35 }}>days</span>
      </div>

      {DATES.map((d) => (
        <div key={d.x}>
          <Box x={d.x} y={353} w={63} h={56} r={20} bg={d.today ? "var(--yellow)" : "var(--plum)"} />
          {d.t && <T x={d.x + 12} y={360} w={39} font="serif" size={20} lh={19} align="center" color={d.today ? "var(--plum)" : "var(--paper)"}>{d.t}</T>}
        </div>
      ))}
      <Box x={59} y={416} w={6} h={6} r={3} bg="var(--ink-soft)" />
      <Box x={134} y={416} w={6} h={6} r={3} bg="var(--ink-soft)" />

      {/* Lessons — sideways carousel */}
      {label(451, "Lessons")}
      <div className="hscroll" style={{ position: "absolute", left: 0, top: 477, width: 420, height: 241, scrollSnapType: "x mandatory", scrollPaddingLeft: 31 }}>
        <div style={{ position: "relative", width: 31 + LESSON_CARDS.length * 304 + 19, height: 241 }}>
          {LESSON_CARDS.map((c, i) => {
            const x = 31 + i * 304;
            const card = (
              <>
                {c.src ? <Photo x={x} y={0} w={292} h={241} r={24} src={c.src} /> : <Box x={x} y={0} w={292} h={241} r={24} bg={c.bg} />}
                <Box x={x} y={0} w={292} h={241} r={24} style={{ background: c.src ? "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.6) 100%)" : "transparent", scrollSnapAlign: "start" }} />
                <Box x={x + 16} y={16} w={c.tag.length * 7.4 + 28} h={26} r={13} bg="var(--paper)" />
                <T x={x + 16} y={23} w={c.tag.length * 7.4 + 28} font="inter" size={10} weight={600} ls="0.05em" lh={12} align="center" color="var(--plum)">{c.tag}</T>
                <T x={x + 16} y={c.title.includes("\n") ? 170 : 196} font="serif" size={28} lh={28} color={c.src ? "var(--paper)" : "var(--plum)"}>{c.title}</T>
              </>
            );
            return c.href ? <Link key={i} href={c.href} className="press">{card}</Link> : <div key={i}>{card}</div>;
          })}
        </div>
      </div>

      {/* Before your trip */}
      {label(744, "Before your trip")}
      <Link href="/flashcards/coffee-order" className="press">
        <Box x={31} y={769} w={178} h={175} r={24} bg="var(--plum)" />
        <T x={51} y={787} font="inter" size={10} weight={600} lh={12} color="var(--paper)">Flashcard</T>
        <T x={51} y={807} font="serif" size={26} lh={22} color="var(--paper)">{"12 words\nto review"}</T>
        <Box x={47} y={905} w={68} h={26} r={13} bg="var(--yellow)" />
        <T x={47} y={910} w={68} font="dm" size={13} weight={500} lh={17} align="center" color="var(--plum)">4 min</T>
      </Link>
      <Box x={219} y={769} w={178} h={175} r={24}
        style={{ background: "linear-gradient(180deg, #f2d27f 0%, #e1a75a 55%, #b9773c 100%)" }} />
      <T x={235} y={787} font="inter" size={10} weight={600} lh={12} color="var(--ink-soft)">Seoul now</T>
      <T x={235} y={850} font="serif" size={24} lh={22} color="var(--paper)">{`${seoul.day}\n${seoul.time}\n6°C`}</T>

      {/* Trip readiness */}
      {label(972, "Trip readiness")}
      <Box x={31} y={999} w={366} h={231} r={24} bg="var(--paper)" />
      <T x={51} y={1022} font="serif" size={40} lh={48} color="var(--plum)">60%</T>
      <T x={141} y={1032} font="serif" size={26} lh={32} color="var(--plum)">ready for Seoul</T>
      {READY.map(([name, done, total], i) => {
        const y = 1092 + i * 33;
        return (
          <div key={name}>
            <T x={51} y={y} font="dm" size={14} lh={18} color="var(--ink-soft)">{name}</T>
            <Box x={170} y={y + 3} w={160} h={12} r={6} bg="#e9e8e3" />
            <Box x={170} y={y + 3} w={Math.round((160 * done) / total)} h={12} r={6} bg="#2f3a5c" />
            <T x={337} y={y} w={40} font="dm" size={13} weight={500} lh={18} align="right" color="var(--plum)">{`${done}/${total}`}</T>
          </div>
        );
      })}
    </Screen>
  );
}
