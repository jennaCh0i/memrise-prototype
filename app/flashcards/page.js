import Link from "next/link";
import { Screen, Box, T, Avatar, ME, DeckBubble } from "@/components/ui";
import { Wordmark } from "@/components/Shapes";

// Tab / Flash cards
const DECKS = [
  { x: 22, y: 318, c: "#ffcf00", t: "coffee\norder", n: "8", href: "/flashcards/coffee-order" },
  { x: 214, y: 318, c: "#e1b3e3", t: "takeout", n: "6" },
  { x: 22, y: 494, c: "#b1c2fa", t: "T-money", n: "5" },
  { x: 214, y: 494, c: "#bdb596", t: "pharmacy", op: 0.45 },
  { x: 22, y: 670, c: "#ef6b4d", t: "airport", n: "4" },
  { x: 214, y: 670, c: "#ffcf00", t: "dinner", op: 0.6 },
];

export default function FlashCards() {
  return (
    <Screen bg="#f7f6f2" nav="Flash cards">
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <T x={26} y={150} font="serif" size={44} lh={44}>flash cards</T>
      <T x={315} y={166} font="dm" size={14} weight={500} lh={18} color="var(--plum)">saved  24  →</T>
      <Link href="/flashcards/coffee-order">
        <Box x={22} y={222} w={376} h={68} r={34} bg="var(--yellow)" />
        <T x={46} y={240} font="serif" size={26} lh={26} color="var(--plum)">12 due today</T>
        <Box x={326} y={232} w={48} h={48} r={24} bg="var(--plum)" />
        <T x={326} y={240} w={48} font="dm" size={22} weight={500} lh={27} align="center" color="var(--paper)">→</T>
      </Link>
      {DECKS.map((d) => <DeckBubble key={d.t} x={d.x} y={d.y} color={d.c} title={d.t} count={d.n} opacity={d.op} href={d.href} />)}
    </Screen>
  );
}
