"use client";
import { type } from "@/lib/type";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Screen, Box, T, Avatar, Chip, P2 } from "@/components/ui";
import { Svg } from "@/components/Shapes";
import Icon from "@/components/Icons";
import { suggestFix } from "@/lib/grammar";

// Live / Korean speaking room — prompt → people take turns → live transcript → suggested fix.
const PROMPT = { ko: "주말에 뭐 했어요?", en: "what did you do this weekend?", try: "저는 주말에 ___ 했어요." };
const CURVE = "M0 228H170C290 228 380 262 420 316V912H0Z";
const PEOPLE = {
  Mina: { src: P2, color: "#e1b3e3" },
  James: { color: "#b1c2fa", initial: "J" },
  You: { color: "var(--yellow)", initial: "나" },
};
// What the other learners "say" (cycled). Some have slips on purpose so the fix card shows up.
const SCRIPT = {
  Mina: ["저는 주말에 자전거 탔어요!", "저는 주말에 친구를 만나요.", "저는 주말에 카페에 갔어요."],
  James: ["저는 어제 영화를 봐요.", "저는 집에서 쉬었어요.", "저는 어제 떡볶이를 먹어요."],
};
const ORDER = ["Mina", "James", "You"];
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function Face({ x, y, who, size = 32, style }) {
  const p = PEOPLE[who];
  if (p.src) return <Avatar x={x} y={y} size={size} src={p.src} style={style} />;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: p.color, display: "grid", placeItems: "center",
      fontFamily: "var(--ko)", fontSize: size * 0.42, fontWeight: 500, color: "var(--plum)", ...style }}>{p.initial}</div>
  );
}

export default function SpeakingRoom() {
  const [phase, setPhase] = useState("intro"); // intro | room
  const [prep, setPrep] = useState(60);
  const [clock, setClock] = useState(300);
  const [turn, setTurn] = useState(0); // index into ORDER, cycles
  const [lines, setLines] = useState([]); // {who, text, fix, checking}
  const [live, setLive] = useState(""); // interim transcript while someone is talking
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(null); // null | "answer" | "question"
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState("");
  const rec = useRef(null);
  const said = useRef({ Mina: 0, James: 0 });

  const speaker = ORDER[turn % ORDER.length];
  const nextUp = ORDER[(turn + 1) % ORDER.length];
  const myTurn = speaker === "You";

  // countdowns
  useEffect(() => {
    const id = setInterval(() => {
      if (phase === "intro") setPrep((s) => (s <= 1 ? (setPhase("room"), 0) : s - 1));
      else setClock((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  function addLine(who, text) {
    const fix = suggestFix(text);
    setLines((ls) => [...ls, { who, text, fix, checking: !!fix }]);
    if (fix) setTimeout(() => setLines((ls) => ls.map((l, i) => (i === ls.length - 1 ? { ...l, checking: false } : l))), 700);
  }

  // the other learners take their turn: words appear as they "speak"
  useEffect(() => {
    if (phase !== "room" || myTurn) return;
    const list = SCRIPT[speaker];
    const text = list[said.current[speaker]++ % list.length];
    let i = 0, timers = [];
    timers.push(setTimeout(function tick() {
      i += 1; setLive(text.slice(0, i));
      if (i < text.length) timers.push(setTimeout(tick, 70));
      else timers.push(setTimeout(() => { setLive(""); addLine(speaker, text); timers.push(setTimeout(() => setTurn((t) => t + 1), 2600)); }, 300));
    }, 900));
    return () => timers.forEach(clearTimeout);
  }, [phase, turn]); // eslint-disable-line

  function finishMine(text) {
    const t = text.trim();
    setLive(""); setListening(false);
    if (!t) return;
    addLine("You", t);
    if (myTurn) setTimeout(() => setTurn((n) => n + 1), 3500);
  }

  function toggleMic() {
    if (!myTurn) { flash(`You're up after ${nextUp === "You" ? speaker : nextUp}`); return; }
    if (listening) { rec.current && rec.current.stop(); return; }
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) { flash("Voice isn't available in this browser — type instead"); setTyping("answer"); return; }
    const r = new SR();
    r.lang = "ko-KR"; r.interimResults = true; r.continuous = false;
    let final = "";
    r.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript; else interim += e.results[i][0].transcript;
      }
      setLive(final + interim);
    };
    r.onerror = () => { setListening(false); setLive(""); flash("Couldn't hear you — try again or type"); };
    r.onend = () => finishMine(final);
    rec.current = r; setListening(true); setLive(""); r.start();
  }

  function sendTyped() {
    const t = draft.trim();
    if (!t) return;
    if (typing === "question") { setLines((ls) => [...ls, { who: "You", text: t, question: true }]); flash("Question sent to the room"); }
    else finishMine(t);
    setDraft(""); setTyping(null);
  }

  function flash(m) { setToast(m); setTimeout(() => setToast(""), 2200); }

  const last = lines[lines.length - 1];
  const showingLive = !!live;
  const answered = myTurn && !showingLive && last?.who === "You" && !last.question && lines.length > 0 && lines[lines.length - 1] === last;
  const waiting = myTurn && !answered;
  const prev = showingLive ? last : lines[lines.length - 2];
  const current = showingLive ? { who: myTurn ? "You" : speaker, text: live } : last;

  return (
    <Screen bg="var(--plum)" overlay={
      <>
        {/* bottom bar */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: "var(--paper)" }}>
          {typing ? (
            <form onSubmit={(e) => { e.preventDefault(); sendTyped(); }}
              style={{ position: "absolute", left: 24, top: 18, width: 372, height: 56, borderRadius: 999, background: "#ecebe4", display: "flex", alignItems: "center", gap: 8, padding: "0 8px 0 8px" }}>
              <button type="button" aria-label="Close" onClick={() => { setTyping(null); setDraft(""); }} className="press"
                style={{ width: 40, height: 40, borderRadius: 999, display: "grid", placeItems: "center", color: "var(--plum)" }}><Icon name="x" size={20} /></button>
              <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
                placeholder={typing === "question" ? "Ask the room a question…" : myTurn ? "Type your answer in Korean…" : "Type in Korean…"}
                style={{ flex: 1, minWidth: 0, fontFamily: "var(--ko)", ...type("ko", 17), color: "var(--ink-soft)" }} />
              <button type="submit" aria-label="Send" className="press"
                style={{ width: 40, height: 40, borderRadius: 999, background: "var(--plum)", color: "var(--paper)", display: "grid", placeItems: "center" }}><Icon name="send" size={18} /></button>
            </form>
          ) : (
            <>
              <button aria-label="Type instead" onClick={() => setTyping("answer")} className="press"
                style={{ position: "absolute", left: 24, top: 24, width: 48, height: 48, borderRadius: 999, background: "#f0efe9", color: "var(--plum)", display: "grid", placeItems: "center" }}>
                <Icon name="chat" size={22} />
              </button>
              <button onClick={() => setTyping("question")} className="press"
                style={{ position: "absolute", left: 84, top: 28, width: 228, height: 40, borderRadius: 999, background: "#ecebe4",
                  fontFamily: "var(--dm)", ...type("dm", 15), color: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center" }}>＋ Ask a question</button>
              <button aria-label={listening ? "Stop" : "Speak"} onClick={phase === "room" ? toggleMic : () => setPhase("room")} className={`press${listening ? " pulse" : ""}`}
                style={{ position: "absolute", left: 324, top: 10, width: 72, height: 72, borderRadius: 999, display: "grid", placeItems: "center",
                  background: listening ? "var(--yellow)" : waiting && phase === "room" ? "var(--plum)" : "var(--charcoal)", color: listening ? "var(--plum)" : "var(--paper)" }}>
                <Icon name={listening || (waiting && phase === "room") ? "mic" : "micOff"} size={28} />
              </button>
            </>
          )}
        </div>
        {toast && (
          <div className="fade" style={{ position: "absolute", left: 24, right: 24, bottom: 136, height: 44, borderRadius: 999, background: "var(--charcoal)", color: "var(--paper)",
            display: "grid", placeItems: "center", fontFamily: "var(--dm)", ...type("dm", 15) }}>{toast}</div>
        )}
      </>
    }>
      {/* header */}
      <Link href="/community"><T x={24} y={71} font="dm" size={15} lh={20} color="var(--paper)">←  back</T></Link>
      <Link href="/community" className="press" style={{ position: "absolute", left: 307, top: 67, width: 96, height: 30, borderRadius: 999, background: "#ef6b4d", color: "var(--paper)",
        display: "grid", placeItems: "center", fontFamily: "var(--dm)", ...type("dm", 13) }}>Leave</Link>
      <T x={24} y={126} font="serif" size={28} lh={36} color="var(--paper)">Korean speaking room</T>
      <Chip x={24} y={171} kind="accent" label="All levels" />
      <Chip x={108} y={171} kind="tag" label="● LIVE · 14 learners" style={{ textTransform: "none", ...type("dm", 13), fontWeight: 400, background: "var(--paper)" }} />
      <Box x={333} y={135} w={68} h={55} r={14} bg="#e1b3e3" />
      <Box x={339} y={135} w={62} h={55} r={14} bg="#b1c2fa" />
      <Avatar x={346} y={135} size={55} src={P2} style={{ borderRadius: 14 }} />
      <T x={337} y={200} font="dm" size={12} lh={16} color="#b49aa7">11 active</T>
      <Svg x={0} y={0} w={420} h={912} d={CURVE} fill="#FEFFF8" />

      {phase === "intro" ? (
        <button onClick={() => setPhase("room")} style={{ position: "absolute", left: 0, top: 316, width: 420, height: 476, background: "transparent", border: 0 }}>
          <T x={0} y={167} w={420} align="center" font="dm" size={20} lh={24} color="var(--charcoal)">{mmss(prep)}</T>
          <T x={0} y={201} w={420} align="center" font="ko" size={28} weight={700} lh={36} color="var(--plum)">{PROMPT.ko}</T>
          <T x={0} y={248} w={420} align="center" font="ko" size={13} lh={18} color="var(--charcoal)">{`Try:  ${PROMPT.try}`}</T>
          <T x={0} y={300} w={420} align="center" font="dm" size={12} lh={16} color="#b5b1a6">room opens when the timer ends · tap to jump in</T>
        </button>
      ) : (
        <div className="fade">
          <T x={32} y={284} font="dm" size={20} lh={24} color="var(--charcoal)">{mmss(clock)}</T>
          <T x={32} y={314} font="dm" size={12} lh={16} color="var(--plum)">lets talk about…</T>
          <T x={32} y={333} font="ko" size={26} weight={700} lh={34} color="var(--plum)">{PROMPT.ko}</T>
          <T x={32} y={368} font="dm" size={13} lh={16} color="#8a857e">{PROMPT.en}</T>

          {/* transcript: previous (faded) → now speaking → fix or next up */}
          {prev && prev !== current && (
            <div key={`p${lines.indexOf(prev)}`} style={{ opacity: 0.25 }}>
              <Face x={32} y={462} who={prev.who} />
              <T x={72} y={464} w={324} font="ko" size={prev.text.length > 16 ? 18 : 22} weight={500} lh={28} color="var(--plum)" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {prev.fix ? prev.fix.fixed : prev.text}
              </T>
            </div>
          )}
          {current ? (
            <div key={`c${lines.length}${showingLive}`} className="rise">
              <Face x={32} y={536} who={current.who}  />
              <T x={72} y={536} w={324} font="ko" size={current.text.length > 16 ? 20 : 24} weight={500} lh={32} color="var(--plum)">
                {current.question ? `Q. ${current.text}` : current.text}{showingLive ? "▍" : ""}
              </T>
            </div>
          ) : (
            <T x={32} y={540} w={356} font="dm" size={15} lh={20} color="#b5b1a6">{`${speaker} is up first…`}</T>
          )}

          {!showingLive && current?.fix ? (
            <div className="rise">
              <Chip x={31} y={622} kind="accent" label={current.checking ? "✎  checking…" : "✎  Suggested fix"} style={{ height: 32 }} />
              {!current.checking && (
                <div style={{ position: "absolute", left: 31, top: 663, width: 360, borderRadius: 16, background: "#f1f1ec", padding: "12px 14px" }}>
                  <T font="ko" size={12} lh={18} color="#8a857e" style={{ position: "relative", textDecoration: "line-through" }}>{current.text}</T>
                  <T font="ko" size={15} weight={700} lh={22} color="var(--plum)" style={{ position: "relative" }}>{current.fix.fixed}</T>
                  <T font="ko" size={12} lh={18} color="var(--charcoal)" style={{ position: "relative" }}>{current.fix.note}</T>
                </div>
              )}
            </div>
          ) : null}

          {!showingLive && current && !current.fix && !current.question && (
            <Chip x={31} y={622} kind="tag" label="✓  sounds natural" style={{ height: 32, background: "#e8ecfb", textTransform: "none", ...type("dm", 13), fontWeight: 500 }} />
          )}

          {/* who's next */}
          <div style={{ opacity: waiting && !listening && !showingLive ? 1 : 0.35 }}>
            <Face x={32} y={current?.fix && !showingLive ? 758 : 680} who={waiting ? "You" : nextUp} size={28} />
            <T x={70} y={current?.fix && !showingLive ? 761 : 683} w={320} font="dm" size={16} lh={22} color={waiting ? "var(--plum)" : "#b5b1a6"}>
              {waiting ? (listening ? "listening… tap the mic when you're done" : "your turn — tap the mic or type") : `next up ${nextUp === "You" ? "you" : nextUp}`}
            </T>
          </div>
        </div>
      )}
    </Screen>
  );
}
