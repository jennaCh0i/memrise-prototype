"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Screen, Box, T, Photo } from "@/components/ui";
import { Svg, LESSON_CURVE } from "@/components/Shapes";

// Tab / Lessons
// Tiles are 106×106, 120 apart (from Figma). The strip scrolls sideways and
// opens with today's lesson (day 13) at x 79, exactly where the Figma frame has it.
const LESSONS = [
  { day: 9, title: "subway\nride" },
  { day: 10, title: "convenience\nstore" },
  { day: 11, title: "takeout" },
  { day: 12, title: "airport\ncheck-in" },
  { day: 13, title: "coffee\norder", today: true, href: "/lesson/coffee-order/make-it-yours" },
  { day: 14, title: "T-money\ntop-up" },
  { day: 15, title: "pharmacy" },
  { day: 16, title: "dinner with\nfriends" },
  { day: 17, title: "hair\nsalon" },
  { day: 18, title: "phone\nplan" },
  { day: 19, title: "doctor's\nvisit" },
  { day: 20, title: "apartment\nviewing" },
];
const PAD = 26;
const STEP = 120;
const TODAY_X = 79;

export default function Lessons() {
  const strip = useRef(null);
  useEffect(() => {
    const i = LESSONS.findIndex((l) => l.today);
    if (strip.current) strip.current.scrollLeft = PAD + i * STEP - TODAY_X;
  }, []);

  return (
    <Screen bg="#f7f6f2" nav="Lessons">
      <Photo x={-41} y={-123} w={516} h={774} src="/images/barista.jpg" />
      <Svg x={0} y={531} w={420} h={381} d={LESSON_CURVE} fill="#FEFFF8" />
      <T x={26} y={410} font="columba" size={30} lh="140%" color="var(--paper)">day 13</T>
      <T x={26} y={437} font="columba" size={50} lh="140%" color="var(--paper)">coffee order</T>

      <div ref={strip} className="hscroll" style={{ position: "absolute", left: 0, top: 651, width: 420, height: 106 }}>
        <div style={{ position: "relative", width: PAD * 2 + (LESSONS.length - 1) * STEP + 106, height: 106 }}>
          {LESSONS.map((l, i) => {
            const x = PAD + i * STEP;
            const bg = l.today ? "var(--yellow)" : "var(--plum)";
            const fg = l.today ? "var(--plum)" : "var(--paper)";
            const tile = (
              <>
                <Box x={x} y={0} w={106} h={106} r={20} bg={bg} />
                <T x={x + 12} y={11} w={86} font="serif" size={16} lh={16} color={fg}>{l.title}</T>
                <T x={x + 12} y={79} w={82} font="dm" size={14} lh="140%" color={fg} align="right">{`day ${l.day}`}</T>
              </>
            );
            return l.href ? (
              <Link key={l.day} href={l.href} className="press" style={{ scrollSnapAlign: "start" }}>{tile}</Link>
            ) : (
              <div key={l.day}>{tile}</div>
            );
          })}
        </div>
      </div>

      <Box x={26} y={794} w={368} h={6} r={3} bg="#dadada" />
      <Box x={26} y={794} w={159} h={6} r={3} bg="var(--plum)" />
    </Screen>
  );
}
