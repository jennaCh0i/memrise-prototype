"use client";
import { useState } from "react";
import { Screen, Box, T, Button, Chip, BackLink } from "@/components/ui";
import { LESSONS } from "@/lib/lessons";

// Lesson / Day 0 · The big recap — the special last lesson before the trip.
const STATS = [
  ["17", "situations"],
  ["136", "words"],
  ["42", "day streak"],
];
const COLORS = ["#b1c2fa", "#e1b3e3", "#ffcf00", "#ef6b4d"];
const ROW = 72; // 64 tall row + 8 gap
const LIST_Y = 426;

export default function BigRecap() {
  const [open, setOpen] = useState(null);
  const [toast, setToast] = useState(false);
  const height = LIST_Y + LESSONS.length * ROW + 140;

  return (
    <Screen
      bg="var(--plum)"
      height={height}
      overlay={
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "40px 24px 32px", background: "linear-gradient(180deg, rgba(67,11,39,0) 0%, var(--plum) 45%)" }}>
          <Button kind="accent" label={toast ? "Run-through starting…" : "Start the final run-through"} onClick={() => setToast(true)} style={{ width: "100%" }} />
        </div>
      }
    >
      <BackLink x={24} y={66} color="var(--paper)" />

      <Chip x={24} y={124} kind="accent" label="day 0 · D-day ✈" />
      <T x={24} y={164} font="serif" size={48} lh={48} color="var(--paper)">the big recap</T>
      <T x={24} y={222} w={372} font="dm" size={15} lh="140%" color="#d9c6cf">
        Every situation from the last 17 days in one run-through. One phrase each, out loud, before you land.
      </T>

      {STATS.map(([n, label], i) => (
        <div key={label}>
          <Box x={24 + i * 128} y={296} w={116} h={96} r={20} bg="rgba(254,255,248,0.08)" />
          <T x={38 + i * 128} y={306} font="columba" size={40} lh={48} color="var(--yellow)">{n}</T>
          <T x={38 + i * 128} y={358} font="dm" size={12} lh={16} color="#d9c6cf">{label}</T>
        </div>
      ))}

      <T x={24} y={LIST_Y - 26} font="dm" size={11} weight={600} lh={14} ls="0.06em" color="#d9c6cf">YOUR TRIP, ONE PHRASE AT A TIME · TAP FOR ENGLISH</T>

      {LESSONS.map((l, i) => {
        const y = LIST_Y + i * ROW;
        const on = open === l.day;
        return (
          <button key={l.day} className="press" onClick={() => setOpen(on ? null : l.day)}
            style={{ position: "absolute", left: 24, top: y, width: 372, height: 64, borderRadius: 16, border: 0, padding: 0, textAlign: "left",
              background: on ? "var(--yellow)" : "var(--paper)" }}>
            <Box x={14} y={18} w={6} h={28} r={3} bg={COLORS[i % 4]} />
            <T x={32} y={12} w={330} font="dm" size={12} weight={500} lh={16} color={on ? "var(--plum)" : "#8a857e"}>
              {on ? l.en : `day ${l.day} · ${l.title.replace("\n", " ")}`}
            </T>
            <T x={32} y={31} w={330} font="ko" size={17} weight={500} lh={22} color="var(--plum)">{l.ko}</T>
          </button>
        );
      })}
    </Screen>
  );
}
