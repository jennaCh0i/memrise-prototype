"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Screen, Box, T, Photo } from "@/components/ui";
import { Svg, LESSON_CURVE } from "@/components/Shapes";
import { LESSONS as BASE, TODAY } from "@/lib/lessons";

// Tab / Lessons — week 10 (Coffee order / T-money / Pharmacy / Airport frames).
// Swipe the tiles: the one sitting in the yellow slot (x 79) is selected, and the hero photo,
// "day N" and big title above switch to that lesson. Tap a tile to jump to it; tap the
// selected tile again to open the lesson (where there is one).
const HERO = {
  "coffee\norder": { name: "Coffee order", src: "/images/barista.jpg", x: -41 },
  "T-money\ntop-up": { name: "T-money", src: "/images/hero-tmoney.jpg", x: -41 },
  pharmacy: { name: "Pharmacy", src: "/images/hero-pharmacy.jpg", x: -81 },
  "airport\ncheck-in": { name: "Airport", src: "/images/hero-airport.jpg", x: -41 },
};
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const LESSONS = [
  ...BASE.map((l) => ({
    ...l,
    today: l.day === TODAY,
    href: l.day === TODAY ? "/lesson/coffee-order/make-it-yours" : undefined,
    hero: HERO[l.title] || { name: cap(l.title.replace("\n", " ")) },
  })),
  { day: 0, title: "the big recap", special: true, href: "/lesson/day-0", hero: { name: "The big recap" } },
];
const SLOT = 79;   // x of the selected tile (Figma)
const STEP = 120;  // tile spacing (Figma)
const DARKEN = "linear-gradient(180deg, rgba(0,0,0,0) 58.6%, #000 94.6%)"; // Figma "Rectangle 53"

export default function Lessons() {
  const strip = useRef(null);
  const router = useRouter();
  const start = LESSONS.findIndex((l) => l.today);
  const [sel, setSel] = useState(start);
  const [progress, setProgress] = useState(start / (LESSONS.length - 1)); // 0 → first lesson, 1 → Day 0

  useEffect(() => { if (strip.current) strip.current.scrollLeft = start * STEP; }, [start]);

  const onScroll = () => {
    const pos = strip.current.scrollLeft / STEP;
    setProgress(Math.max(0, Math.min(1, pos / (LESSONS.length - 1))));
    const i = Math.max(0, Math.min(LESSONS.length - 1, Math.round(pos)));
    if (i !== sel) setSel(i);
  };
  const tap = (i) => {
    if (i === sel && LESSONS[i].href) router.push(LESSONS[i].href);
    else strip.current.scrollTo({ left: i * STEP, behavior: "smooth" });
  };

  const cur = LESSONS[sel];
  const name = cur.hero.name;
  const titleSize = name.length > 14 ? 40 : 50;

  return (
    <Screen bg="#f7f6f2" nav="Lessons">
      {/* hero */}
      <div key={sel} className="fade">
        {cur.hero.src ? (
          <Photo x={cur.hero.x} y={-123} w={516} h={774} src={cur.hero.src} />
        ) : (
          <Box x={0} y={0} w={420} h={651} style={{ background: cur.special ? "linear-gradient(180deg, #b1c2fa 0%, #6d6fb0 100%)" : "linear-gradient(180deg, #6b2a49 0%, #430b27 100%)" }} />
        )}
      </div>
      <Box x={-3} y={48} w={431} h={577} style={{ background: DARKEN }} />
      <Svg x={0} y={531} w={420} h={381} d={LESSON_CURVE} fill="#FEFFF8" />
      <T x={26} y={400} font="serif" size={26} lh="140%" color="#fefff8">{`day ${cur.day}`}</T>
      <T x={26} y={437 + (50 - titleSize) * 0.7} w={380} font="serif" size={titleSize} lh="140%" ls="-0.03em" color="#fefff8"
        style={{ whiteSpace: "nowrap" }}>{name}</T>

      {/* lesson tiles */}
      <div ref={strip} onScroll={onScroll} className="hscroll"
        style={{ position: "absolute", left: 0, top: 651, width: 420, height: 106, scrollSnapType: "x mandatory", scrollPaddingLeft: SLOT }}>
        <div style={{ position: "relative", width: (LESSONS.length - 1) * STEP + 420 + 120, height: 106 }}>
          {LESSONS.map((l, i) => {
            const x = SLOT + i * STEP;
            const on = i === sel;
            const bg = on ? "#ffcf00" : "#430b27";
            const fg = on ? "#430b27" : "#fefff8";
            const tile = l.special ? (
              <>
                <Box x={x} y={0} w={226} h={106} r={20} bg="#b1c2fa" style={{ scrollSnapAlign: "start" }} />
                <T x={x + 14} y={11} w={200} font="serif" size={22} lh={22} color="#430b27">the big recap</T>
                <T x={x + 14} y={37} w={160} font="dm" size={12} lh={16} color="#430b27">every lesson, one last run-through before you fly</T>
                <Box x={x + 14} y={76} w={56} h={20} r={10} bg="#ffcf00" />
                <T x={x + 14} y={79} w={56} font="dm" size={11} weight={600} lh={14} align="center" color="#430b27">D-DAY</T>
                <T x={x + 132} y={79} w={82} font="dm" size={14} lh="140%" color="#430b27" align="right">day 0 ✈</T>
              </>
            ) : (
              <>
                <Box x={x} y={0} w={106} h={106} r={20} bg={bg} style={{ scrollSnapAlign: "start", transition: "background .15s" }} />
                {/* even 12px margin on all four sides; long words step down a size so they never touch the edge */}
                <T x={x + 12} y={12} w={82} font="serif" size={l.title.split("\n").some((w) => w.length > 9) ? 14 : 16} lh="100%" color={fg} style={{ overflowWrap: "anywhere" }}>{l.title}</T>
                <T x={x + 12} y={106 - 12 - 17} w={82} font="dm" size={14} lh={17} color={fg} align="right">{`day ${l.day}`}</T>
              </>
            );
            // Each tile is its own sized box so nothing shifts while the strip is being swiped.
            return (
              <div key={l.day} onClick={() => tap(i)}
                style={{ position: "absolute", left: x, top: 0, width: l.special ? 226 : 106, height: 106, cursor: "pointer", WebkitTapHighlightColor: "transparent" }}>
                <div style={{ position: "absolute", left: -x, top: 0 }}>{tile}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Box x={26} y={794} w={368} h={6} r={3} bg="#dadada" />
      {/* progress bar follows the strip: how far along the lessons you are (Day 0 = full) */}
      <Box x={26} y={794} w={Math.max(6, Math.round(368 * progress))} h={6} r={3} bg="#430b27" />
    </Screen>
  );
}
