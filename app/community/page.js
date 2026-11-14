import Link from "next/link";
import { Screen, Box, T, Avatar, ME, P2, P3, Button, Segmented } from "@/components/ui";
import { Svg, LIVE_BUBBLE, Wordmark } from "@/components/Shapes";
import Icon from "@/components/Icons";

// Tab / Community (Talk)
const QS = [
  { y: 480, av: P2, who: "Mina · Korean, day 30", q: "How do I politely say no to more food at a family dinner?", meta: "8 answers · native speaker answered" },
  { y: 630, av: P3, who: "Leo · French, day 12", q: "Is “tu” okay with a café barista, or too casual?", meta: "3 answers" },
];

export default function Community() {
  return (
    <Screen bg="#f7f6f2" nav="Community">
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <T x={24} y={150} font="serif" size={40} lh={40} color="#1f1d1c">Community</T>
      <Segmented x={264} y={152} value="Talk" />

      <Svg x={22} y={226} w={376} h={198} d={LIVE_BUBBLE} fill="#DDD9C9" />
      <Box x={44} y={251} w={8} h={8} r={4} bg="var(--plum)" />
      <T x={58} y={245} font="inter" size={13} weight={500} lh={16} color="var(--plum)">Live now</T>
      <T x={44} y={268} font="serif" size={26} lh={26} color="#1f1d1c">Korean speaking room</T>
      {[ME, P2, P3].map((s, i) => <Avatar key={i} x={44 + i * 22} y={326} size={34} src={s} />)}
      <T x={134} y={334} font="inter" size={14} lh={17} color="#8a857e">13 learners</T>
      <Button x={273} y={323} small kind="brand" label="Join" href="/community/live" />

      <T x={24} y={450} font="inter" size={13} weight={500} lh={16} color="#8a857e">Questions</T>
      {QS.map((q) => (
        <div key={q.y}>
          <Avatar x={24} y={q.y} size={32} src={q.av} />
          <T x={66} y={q.y + 8} font="inter" size={13} lh={16} color="#8a857e">{q.who}</T>
          <T x={24} y={q.y + 46} w={372} font="inter" size={17} weight={500} lh="135%" color="#1f1d1c">{q.q}</T>
          <T x={24} y={q.y + 104} font="inter" size={13} lh={16} color="#8a857e">{q.meta}</T>
          <Box x={24} y={q.y + 136} w={372} h={1} bg="#e8e5de" />
        </div>
      ))}
      <Link href="/community/live" aria-label="Ask a question" className="press"
        style={{ position: "absolute", left: 336, top: 748, width: 60, height: 60, borderRadius: 30, background: "var(--plum)", color: "var(--paper)", display: "grid", placeItems: "center" }}>
        <Icon name="plus" size={26} />
      </Link>
    </Screen>
  );
}
