import Link from "next/link";
import { Screen, Box, T, Avatar, ME, DeckBubble } from "@/components/ui";
import { Wordmark } from "@/components/Shapes";

// Tab / Flash cards — week 10 (420 × 1146): neutral due bar, 2-column bubbles, locked decks.
const DECKS = [
  { x: 22, y: 339, c: "#ffcf00", t: "coffee\norder", n: "8", href: "/flashcards/coffee-order" },
  { x: 214, y: 339, c: "#e1b3e3", t: "takeout", n: "6" },
  { x: 22, y: 515, c: "#b1c2fa", t: "t-money", n: "5" },
  { x: 215, y: 516, c: "#430b27", t: "airport", n: "4", ink: "#deded8" },
  { x: 22, y: 698, c: "#ec4e32", t: "pharmacy", n: "5" },
  { x: 218, y: 698, c: "#e1ded1", locked: true },
  { x: 22, y: 874, c: "#e1ded1", locked: true },
  { x: 218, y: 874, c: "#e1ded1", locked: true },
];

export default function FlashCards() {
  return (
    <Screen bg="#f7f6f2" nav="Flash cards" height={1146}>
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <T x={26} y={150} font="serif" size={44} lh="56px" color="#2a2a28">flash cards</T>
      <Link href="/flashcards/coffee-order">
        <Box x={22} y={222} w={376} h={68} r={34} bg="#e1ded1" />
        <T x={46} y={235} font="serif" size={26} lh="35px" color="#430b27">12 due today</T>
        <Box x={339} y={232} w={48} h={48} r={24} bg="#430b27" />
        <T x={339} y={241} w={48} font="dm" size={22} weight={500} lh="29px" align="center" color="#fefff8">→</T>
      </Link>
      {DECKS.map((d, i) => (
        <DeckBubble key={i} x={d.x} y={d.y} color={d.c} title={d.t} count={d.n} href={d.href} ink={d.ink} locked={d.locked} />
      ))}
    </Screen>
  );
}
