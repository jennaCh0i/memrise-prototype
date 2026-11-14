"use client";
import Link from "next/link";
import { useState } from "react";
import { Screen, Box, T, Photo, Button } from "@/components/ui";

// Lesson / 02 · Situation detail
const SCENES = [
  ["Meet the barista", "✓ done", "#b1c2fa"],
  ["Order a drink", "today", "#e1b3e3"],
  ["“For here or to go?”", "next", "#ffcf00"],
  ["Pay and say thanks", "locked", "#ef6b4d"],
  ["Fix a wrong order", "locked", "#430b27"],
];

export default function SituationDetail() {
  const [toast, setToast] = useState(false);
  return (
    <Screen bg="#f3f4ef">
      <Photo x={-48} y={-60} w={516} h={774} src="/images/barista.jpg" />
      <Box x={0} y={240} w={420} h={180} style={{ background: "linear-gradient(180deg, rgba(243,244,239,0) 0%, #f3f4ef 100%)" }} />
      <Box x={0} y={416} w={420} h={502} bg="#f3f4ef" />
      <Link href="/lesson/coffee-order/make-it-yours"><T x={24} y={72} font="dm" size={15} lh={20} color="var(--paper)">←  back</T></Link>

      <T x={24} y={330} font="dm" size={11} weight={600} lh={14} color="var(--plum)">DAY 13  ·  SEOUL IN 18 DAYS</T>
      <T x={24} y={348} font="serif" size={48} lh={48} color="#1f1d1c">coffee order</T>
      <T x={24} y={408} font="ko" size={13} weight={500} lh={16} color="#8a857e">5 scenes · about 6 min each · polite 해요체</T>

      {SCENES.map(([title, status, c], i) => {
        const y = 448 + i * 66, today = i === 1, locked = status === "locked";
        return (
          <div key={title}>
            <Box x={24} y={y} w={372} h={56} r={16} bg={today ? "#fefff8" : "#f3f4ef"} />
            <Box x={38} y={y + 14} w={6} h={28} r={3} bg={c} />
            <T x={58} y={y + 17} font="serif" size={18} lh={22} color="#8a857e">{String(i + 1)}</T>
            <T x={82} y={y + 18} font="dm" size={15} weight={500} lh={20} color={locked ? "#8a857e" : "#1f1d1c"}>{title}</T>
            <T x={316} y={y + 20} w={64} font="dm" size={12} weight={500} lh={16} align="right" color={today ? "var(--plum)" : "#8a857e"}>{status}</T>
          </div>
        );
      })}
      <T x={24} y={782} w={372} font="dm" size={12} lh={16} align="center" color="#8a857e">Watch locals → rehearse with a local → ready</T>

      {toast && (
        <div className="rise" role="status" style={{ position: "absolute", left: 24, top: 744, width: 372, background: "var(--plum)", color: "var(--paper)", borderRadius: 16, padding: "12px 16px", zIndex: 2 }}>
          <T font="dm" size={15} weight={500} color="var(--paper)">Scene 2 is next in the prototype ☕</T>
        </div>
      )}
      <Button x={24} y={814} label="Start scene 2" onClick={() => { setToast(true); setTimeout(() => setToast(false), 2400); }} />
    </Screen>
  );
}
