"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen, T, BackLink, TextField, Pill, ChoiceTile, Button } from "@/components/ui";

// Lesson / 02 · Make it yours
const SUGGESTIONS = [["아아", "iced americano"], ["라떼", "latte"], ["따아", "hot americano"], ["바닐라 라떼", "vanilla latte"]];
const WHO = [[24, 473, "Just me"], [214, 473, "A friend"], [24, 545, "Someone older"], [214, 545, "Ordering for a group"]];

export default function MakeItYours() {
  const router = useRouter();
  const [drink, setDrink] = useState("vanilla oat latte");
  const [who, setWho] = useState("Just me");
  return (
    <Screen bg="#f3f4ef">
      <BackLink x={24} y={66} href="/" />
      <T x={24} y={114} font="dm" size={11} weight={600} ls="0.06em" lh={14} color="var(--plum)">DAY 13 · COFFEE ORDER</T>
      <T x={24} y={136} font="serif" size={34} lh="110%">Make it your order</T>

      <T x={24} y={195} font="dm" size={15} weight={500} lh={20}>What do you usually order?</T>
      <TextField x={24} y={223} value={drink} onChange={setDrink} placeholder="Type or say your drink" filled={!!drink} />
      <T x={24} y={291} font="dm" size={13} lh={17} color="var(--ash)">Popular at Seoul cafés</T>
      <div style={{ position: "absolute", left: 24, top: 316, width: 372, display: "flex", flexWrap: "wrap", gap: "12px 8px" }}>
        {SUGGESTIONS.map(([ko, en]) => <Pill key={en} ko={ko} en={en} on={drink.trim().toLowerCase() === en} onClick={() => setDrink(en)} />)}
      </div>

      <T x={24} y={445} font="dm" size={15} weight={500} lh={20}>Who's with you?</T>
      <div role="radiogroup">
        {WHO.map(([x, y, l]) => <ChoiceTile key={l} x={x} y={y} label={l} on={who === l} onClick={() => setWho(l)} />)}
      </div>
      <T x={24} y={617} w={372} font="dm" size={13} lh={17} color="var(--ash)">Someone older (a boss, in-laws) switches your lines to polite 합니다체.</T>

      <Button x={24} y={820} label="Build my scene" disabled={!drink.trim()} onClick={() => router.push("/lesson/coffee-order")} />
    </Screen>
  );
}
