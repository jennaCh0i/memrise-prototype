import Link from "next/link";
import { Screen, Box, T, Photo, Avatar, ME } from "@/components/ui";
import { Svg, HOME_HEADER, Wordmark } from "@/components/Shapes";

// Tab / Home
const DATES = [
  { x: -43 }, { x: 31, t: "Oct\n23" }, { x: 106, t: "Oct\n24", today: true },
  { x: 180, t: "Oct\n25" }, { x: 254, t: "Oct\n26" }, { x: 328, t: "Oct\n27" }, { x: 402 },
];
const BARS = ["#b1c2fa", "#e1b3e3", "#ffcf00", "rgba(239,107,77,.35)", "rgba(67,11,39,.35)"];

export default function Home() {
  return (
    <Screen bg="#f7f6f2" nav="Home">
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
          <Box x={d.x} y={353} w={63} h={56} r={20} bg={d.today ? "var(--yellow)" : "#1a1a1a"} />
          {d.t && <T x={d.x + 12} y={360} w={39} font="serif" size={20} lh={19} align="center" color={d.today ? "var(--ink-soft)" : "var(--paper)"}>{d.t}</T>}
        </div>
      ))}
      <Box x={59} y={416} w={6} h={6} r={3} bg="var(--ink-soft)" />
      <Box x={134} y={416} w={6} h={6} r={3} bg="var(--ink-soft)" />

      <T x={32} y={437} font="inter" size={15} weight={500} lh="130%" color="var(--ash)">Korean · Seoul in 18 days</T>
      <Link href="/" className="press">
        <Photo x={31} y={466} w={292} h={241} r={20} src="/images/barista.jpg" />
        <Box x={31} y={466} w={292} h={241} r={20} style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.65) 100%)" }} />
        <Box x={47} y={482} w={118} h={24} r={12} bg="var(--paper)" />
        <T x={47} y={488} w={118} font="inter" size={10} weight={600} ls="0.05em" lh={12} align="center" color="var(--plum)">TODAY · DAY 13</T>
        <T x={47} y={606} font="serif" size={32} lh={32} color="var(--paper)">coffee order</T>
        {BARS.map((c, i) => <Box key={i} x={47 + i * 53} y={654} w={49} h={4} r={2} bg={c} />)}
      </Link>
      <Box x={335} y={466} w={292} h={241} r={20} bg="var(--yellow)" />
      <T x={351} y={482} font="inter" size={10} weight={600} ls="0.05em" lh={12} color="var(--plum)">DAY 14</T>
      <T x={351} y={600} font="serif" size={30} lh={28.5} color="var(--plum)">{"T-money\ntop-up"}</T>

      <T x={32} y={723} font="inter" size={15} weight={500} lh="130%" color="var(--ash)">Before your trip</T>
      <Link href="/flashcards/coffee-order" className="press">
        <Box x={31} y={751} w={366} h={241} r={20} bg="var(--plum)" />
        <T x={51} y={767} font="serif" size={22} lh={22} color="var(--paper)">12 words to review</T>
        <Box x={309} y={768} w={68} h={26} r={13} bg="var(--yellow)" />
        <T x={309} y={773} w={68} font="dm" size={13} weight={500} lh={17} align="center" color="var(--plum)">4 min</T>
      </Link>
    </Screen>
  );
}
