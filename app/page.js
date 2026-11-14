import Link from "next/link";
import { Screen, Box, T, Photo } from "@/components/ui";
import { Svg, LESSON_CURVE } from "@/components/Shapes";

// Tab / Lessons
const TILES = [
  { x: -41, title: "airport\ncheck-in", day: "day 12", dx: -3, bg: "var(--plum)", fg: "var(--paper)" },
  { x: 79, title: "coffee\norder", day: "day 13", dx: 109, bg: "var(--yellow)", fg: "var(--plum)", href: "/lesson/coffee-order/make-it-yours" },
  { x: 199, title: "T-money\ntop-up", day: "day 14", dx: 237, bg: "var(--plum)", fg: "var(--paper)" },
  { x: 319, title: "pharmacy", day: "day 15", dx: 366, bg: "var(--plum)", fg: "var(--paper)" },
];

export default function Lessons() {
  return (
    <Screen bg="#f7f6f2" nav="Lessons">
      <Photo x={-41} y={-123} w={516} h={774} src="/images/barista.jpg" />
      <Svg x={0} y={531} w={420} h={381} d={LESSON_CURVE} fill="#FEFFF8" />
      <T x={26} y={410} font="columba" size={30} lh="140%" color="var(--paper)">day 13</T>
      <T x={26} y={437} font="columba" size={50} lh="140%" color="var(--paper)">coffee order</T>
      {TILES.map((t) => {
        const tile = (
          <>
            <Box x={t.x} y={651} w={106} h={106} r={20} bg={t.bg} />
            <T x={t.x + 12} y={662} w={86} font="serif" size={16} lh={16} color={t.fg}>{t.title}</T>
            <T x={t.dx} y={730} w={46} font="dm" size={14} lh="140%" color={t.fg}>{t.day}</T>
          </>
        );
        return t.href ? <Link key={t.x} href={t.href} className="press">{tile}</Link> : <div key={t.x}>{tile}</div>;
      })}
      <Box x={26} y={794} w={368} h={6} r={3} bg="#dadada" />
      <Box x={26} y={794} w={159} h={6} r={3} bg="var(--plum)" />
    </Screen>
  );
}
