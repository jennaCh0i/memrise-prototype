"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Desktop-only jump list for reviewing the prototype.
const GROUPS = [
  ["Tabs", [
    ["Home", "/home"],
    ["Lessons", "/"],
    ["Flash cards", "/flashcards"],
    ["Community · Talk", "/community"],
    ["Community · Play", "/community/play"],
  ]],
  ["Lesson · coffee order", [
    ["Make it yours", "/lesson/coffee-order/make-it-yours"],
    ["Situation detail", "/lesson/coffee-order"],
  ]],
  ["Scene 2 · order a drink", [
    ["1 · Listen", "/lesson/coffee-order/scene-2?step=0"],
    ["2 · Speak", "/lesson/coffee-order/scene-2?step=1"],
    ["3 · Put it in order", "/lesson/coffee-order/scene-2?step=2"],
    ["4 · Hear it slowly", "/lesson/coffee-order/scene-2?step=3"],
    ["5 · Curveball", "/lesson/coffee-order/scene-2?step=4"],
    ["6 · Scene done", "/lesson/coffee-order/scene-2?step=5"],
  ]],
  ["More", [
    ["Flash cards · coffee order", "/flashcards/coffee-order"],
    ["Korean speaking room", "/community/live"],
    ["Day 0 · the big recap", "/lesson/day-0"],
  ]],
];

export default function Shortcuts() {
  const path = usePathname();
  const [search, setSearch] = useState("");
  useEffect(() => { setSearch(window.location.search); }, [path]);
  const here = path + (path.endsWith("scene-2") ? search || "?step=0" : "");

  return (
    <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 260, padding: "32px 20px", overflowY: "auto", background: "#151413", color: "#fefff8", fontFamily: "var(--dm)" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: 26, lineHeight: "30px", marginBottom: 4 }}>memrise</div>
      <div style={{ fontSize: 12, color: "#8a857e", marginBottom: 28 }}>prototype · shortcuts</div>
      {GROUPS.map(([title, items]) => (
        <div key={title} style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8a857e", marginBottom: 8 }}>{title}</div>
          {items.map(([label, href]) => {
            const on = href === here;
            const style = { display: "block", padding: "8px 12px", borderRadius: 10, fontSize: 14, lineHeight: "18px", marginBottom: 2,
              background: on ? "#ffcf00" : "transparent", color: on ? "#430b27" : "#e4e2da", fontWeight: on ? 500 : 400 };
            // Scene steps reload the page so the chosen step opens directly.
            return href.includes("?") ? <a key={href} href={href} style={style}>{label}</a> : <Link key={href} href={href} style={style}>{label}</Link>;
          })}
        </div>
      ))}
    </aside>
  );
}
