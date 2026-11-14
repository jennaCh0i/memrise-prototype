import { Screen, Box, T, Avatar, ME, P2, P3, Button, Segmented, GameCard } from "@/components/ui";
import { Wordmark } from "@/components/Shapes";

// Tab / Community · Play
export default function Play() {
  return (
    <Screen bg="#f3f4ef" nav="Community">
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <T x={24} y={150} font="serif" size={40} lh={40}>Community</T>
      <Segmented x={264} y={152} value="Play" />
      <T x={26} y={204} font="dm" size={15} lh={20} color="var(--ash)">Practice with people, not just flash cards.</T>

      <Box x={24} y={244} w={372} h={165} r={20} bg="var(--plum)" />
      <T x={44} y={264} font="dm" size={11} weight={600} ls="0.06em" lh={14} color="var(--yellow)">● LIVE NOW · 14 LEARNERS</T>
      <T x={44} y={284} font="serif" size={24} lh="115%" color="var(--paper)">Korean speaking room</T>
      <T x={44} y={318} font="dm" size={13} lh={17} color="var(--paper)">Today’s topic: 주말에 뭐 했어요?</T>
      {[P2, P3, ME].map((s, i) => <Avatar key={i} x={44 + i * 22} y={354} size={30} src={s} ring="0 0 0 2px var(--plum)" />)}
      <Button x={306} y={349} small kind="accent" label="Join" href="/community/live" />

      <T x={24} y={433} font="dm" size={15} weight={500} lh={20}>Word games</T>
      <T x={24} y={455} font="dm" size={13} lh={17} color="var(--ash)">built from this week’s coffee-order words</T>
      <GameCard x={24} y={485} color="#ffcf00" ko="끝말잇기" en="word relay" meta="Say a word from the last syllable · 2–6 players" />
      <GameCard x={214} y={485} color="#e1b3e3" ko="메뉴 러시" en="menu rush" meta="Order the fastest · you vs. 3 others" />

      <T x={24} y={713} font="dm" size={15} weight={500} lh={20}>Practice together</T>
      <Box x={24} y={741} w={372} h={72} r={16} bg="#fff" />
      <Avatar x={40} y={757} size={40} src={P3} />
      <T x={92} y={758} font="dm" size={15} weight={500} lh={20}>Roleplay the café</T>
      <T x={92} y={780} font="dm" size={13} lh={17} color="var(--ash)">with Mina · she’s the barista</T>
      <Button x={295} y={757} small kind="brand" label="Pair up" />
    </Screen>
  );
}
