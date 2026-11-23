"use client";
import { type } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen, Box, T, BackLink, Button } from "@/components/ui";

// Lesson / 02 · Make it yours — week 10, two steps:
//   1. type your go-to order (or tap popular picks)   2. who's with you?
// [ko, en, x, y, w] — positions and widths from the Figma frame
const PICKS = [
  ["아아", "iced americano", 25, 523, 186], ["카페 라떼", "cafe latte", 219, 523, 181],
  ["녹차 라떼", "matcha latte", 25, 574, 194], ["따아", "hot americano", 227, 574, 169],
  ["아이스티", "iced tea", 25, 625, 165], ["바닐라 라떼", "vanilla latte", 198, 625, 202],
];
const WHO = ["Just me", "Someone older", "A friend", "Ordering for a group"];

function Header() {
  return (
    <>
      <T x={24} y={121} font="dm" size={12} weight={500} ls="0.06em" lh={16} color="#430b27">DAY 13 · COFFEE ORDER</T>
      <T x={21} y={143} font="serif" size={34} lh="110%" ls="-0.01em" color="#2a2a28">Make it your order</T>
    </>
  );
}

export default function MakeItYours() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState("");
  const [picks, setPicks] = useState(["iced americano", "cafe latte", "matcha latte"]);
  const [who, setWho] = useState("Just me");
  const toggle = (en) => setPicks((p) => (p.includes(en) ? p.filter((x) => x !== en) : [...p, en]));

  if (step === 2) {
    return (
      <Screen bg="#f3f4ef">
        <button onClick={() => setStep(1)} style={{ position: "absolute", left: 24, top: 66, height: 24, display: "flex", alignItems: "center", gap: 8, color: "var(--ink-soft)" }}>
          <T font="dm" size={20} lh={24}>←</T><T font="dm" size={15} lh={20}>back</T>
        </button>
        <Header />
        <T x={24} y={223} font="dm" size={15} weight={500} lh={20} color="#a3a3a3">Who&apos;s with you?</T>
        <div role="radiogroup">
          {WHO.map((label, i) => {
            const on = who === label;
            return (
              <button key={label} role="radio" aria-checked={on} onClick={() => setWho(label)}
                style={{ position: "absolute", left: 24, top: 265 + i * 72, width: 363, height: 64, padding: 0, textAlign: "left" }}>
                <Box x={0} y={0} w={363} h={64} r={20} bg={on ? "#430b27" : "#ecebe4"} style={{ transition: "background .15s" }} />
                <T x={16} y={22} font="dm" size={15} lh={20} color={on ? "#fefff8" : "#2b2b2b"}>{label}</T>
              </button>
            );
          })}
        </div>
        <Button x={24} y={820} label="Build my scene" onClick={() => router.push("/lesson/coffee-order")} />
      </Screen>
    );
  }

  return (
    <Screen bg="#f3f4ef">
      <BackLink x={24} y={66} href="/" />
      <Header />

      {/* your go-to order */}
      <Box x={24} y={233} w={370} h={237} r={20} bg="#ecebe4" />
      <textarea value={order} onChange={(e) => setOrder(e.target.value)} placeholder="what is your go to order?" aria-label="Your go-to order"
        style={{ position: "absolute", left: 24, top: 233, width: 370, height: 237, padding: "24px 24px 24px 31px", background: "transparent", border: 0, resize: "none",
          fontFamily: "var(--dm), var(--ko)", ...type("dm", 22), color: "#2a2a28" }} />

      <T x={28} y={487} font="dm" size={15} weight={500} lh={20} color="#a3a3a3">Popular picks:</T>
      <div>
        {PICKS.map(([ko, en, x, y, w]) => {
          const on = picks.includes(en);
          return (
            <button key={en} onClick={() => toggle(en)} aria-pressed={on}
              style={{ position: "absolute", left: x, top: y, width: w, height: 43, padding: 0, justifyContent: "center", whiteSpace: "nowrap", borderRadius: 999, background: on ? "#430b27" : "#ecebe4", display: "flex", alignItems: "center", gap: 4, transition: "background .15s" }}>
              <span style={{ fontFamily: "var(--dm), var(--ko)", ...type("dm", 15), fontWeight: 500, color: on ? "#fefff8" : "#430b27" }}>{ko}</span>
              <span style={{ fontFamily: "var(--dm)", ...type("dm", 15), color: on ? "#fefff8" : "#7e7e7e" }}>{en}</span>
            </button>
          );
        })}
      </div>

      <Button x={24} y={820} label="Build my scene" onClick={() => setStep(2)} />
    </Screen>
  );
}
