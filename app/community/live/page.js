"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icons";
import Avatar from "@/components/Avatar";

// Community / 02 · Live room — open Korean practice room with topic, peer Q&A, and chat with "suggest a fix".
const TOPICS = [
  { ko: "주말에 뭐 했어요?", en: "What did you do this weekend?", starter: "저는 주말에 ___ 했어요." },
  { ko: "제일 좋아하는 음식이 뭐예요?", en: "What’s your favourite food?", starter: "제가 제일 좋아하는 음식은 ___ 예요." },
  { ko: "한국에 가면 뭐 하고 싶어요?", en: "What do you want to do in Korea?", starter: "한국에 가면 ___ 하고 싶어요." },
];

const SPEAKERS = [
  { name: "Jisoo", role: "native · host", img: "jisoo", init: "JS", c: "var(--lilac)", speaking: true },
  { name: "Mina", role: "intermediate", img: "mina", init: "MN", c: "var(--periwinkle)" },
  { name: "You", role: "beginner", img: "me", init: "ME", c: "var(--yellow)", me: true },
];

const LEO_LINE = "저는 어제 영화를 봐요 🎬";
const START_CHAT = [
  { id: 1, type: "msg", name: "Mina · intermediate", text: "저는 주말에 한강에서 자전거 탔어요 🚲", c: "var(--lilac)" },
  { id: 2, type: "msg", name: "Leo · beginner", text: LEO_LINE, c: "var(--khaki)" },
  { id: 3, type: "fix", name: "Sora", for: "Leo", original: "저는 어제 영화를 봐요", corrected: "저는 어제 영화를 봤어요", note: "어제 = yesterday, so past tense: 봐요 → 봤어요" },
  { id: 4, type: "msg", name: "Leo · beginner", text: "아 고마워요! 👍", c: "var(--khaki)" },
];
const HELP = [
  { ko: "다시 한 번 말해 주세요", en: "again?" },
  { ko: "천천히요", en: "slower" },
  { ko: "무슨 뜻이에요?", en: "meaning?" },
];

export default function LiveRoom() {
  const [topic, setTopic] = useState(0);
  const [questions, setQuestions] = useState([
    { id: 1, q: "Is 반말 okay with friends my age?", by: "Leo · beginner", votes: 6, state: "on air", voted: false },
    { id: 2, q: "How do I say “I’m full” politely?", by: "Mina · intermediate", votes: 3, state: "open", voted: false },
  ]);
  const [mic, setMic] = useState(false);
  const [hand, setHand] = useState(false);
  const [sheet, setSheet] = useState(null); // "chat" | "ask" | null
  const [chat, setChat] = useState(START_CHAT);
  const [draft, setDraft] = useState("");
  const [fixMode, setFixMode] = useState(false);
  const listRef = useRef(null);

  useEffect(() => { listRef.current?.scrollTo({ top: 1e6, behavior: "smooth" }); }, [chat, sheet]);

  const t = TOPICS[topic % TOPICS.length];
  const vote = (id) => setQuestions((qs) => qs.map((q) => q.id === id ? { ...q, voted: !q.voted, votes: q.votes + (q.voted ? -1 : 1) } : q));

  function send(text) {
    const value = (text ?? draft).trim();
    if (!value) return;
    if (fixMode) {
      setChat((c) => [...c, { id: Date.now(), type: "fix", name: "You", for: "Leo", original: LEO_LINE.replace(" 🎬", ""), corrected: value, note: "Sent as a suggestion — Leo can tap to thank you." }]);
      setFixMode(false);
    } else {
      setChat((c) => [...c, { id: Date.now(), type: "mine", text: value }]);
    }
    setDraft("");
  }

  function ask() {
    const value = draft.trim();
    if (!value) return;
    setQuestions((qs) => [...qs, { id: Date.now(), q: value, by: "You · beginner", votes: 1, state: "open", voted: true }]);
    setDraft(""); setSheet(null);
  }

  const shown = [...questions].sort((a, b) => (b.state === "on air") - (a.state === "on air") || b.votes - a.votes).slice(0, 3);

  return (
    <>
      <div className="screen">
        <div className="pad" style={{ paddingTop: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/community" aria-label="Minimise room" style={{ color: "var(--ink-soft)" }}><Icon name="down" size={30} /></Link>
            <Link href="/community" className="t-body-strong" style={{ color: "var(--tomato)" }}>✌️ Leave quietly</Link>
          </div>
          <div className="t-small" style={{ marginTop: 14, color: "var(--plum)" }}><span style={{ color: "var(--tomato)" }}>●</span> LIVE · 14 learners</div>
          <h1 className="t-heading-l" style={{ marginTop: 4 }}>Korean speaking room</h1>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <span className="chip chip-accent">All levels</span>
            <span className="chip chip-brand">Mostly Korean · English OK</span>
          </div>

          {/* topic */}
          <div key={topic} className="rise" style={{ marginTop: 16, background: "var(--lilac)", color: "var(--plum)", borderRadius: "var(--radius-lg)", padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="t-caps" style={{ opacity: .75 }}>Topic · from Jisoo</span>
              <button className="t-small" onClick={() => setTopic((n) => n + 1)}>Next topic →</button>
            </div>
            <div className="t-ko-m" style={{ marginTop: 4 }}>{t.ko}</div>
            <div className="t-small" style={{ opacity: .75 }}>{t.en}</div>
            <div className="t-small" style={{ marginTop: 10, background: "var(--paper)", borderRadius: "var(--radius-sm)", padding: "8px 12px" }}>
              Try: <span className="t-ko" style={{ fontSize: 14 }}>{t.starter}</span>
            </div>
          </div>

          {/* questions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
            <span className="t-body-strong">Questions · {questions.length}</span>
            <button className="t-small brand" onClick={() => setSheet("ask")}>＋ Ask</button>
          </div>
          <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
            {shown.map((q) => (
              <div key={q.id} className="rise" style={{
                height: 56, display: "flex", alignItems: "center", gap: 12, padding: "0 14px 0 8px", background: "var(--white)", borderRadius: "var(--radius-md)",
                boxShadow: q.state === "on air" ? "inset 0 0 0 2px var(--yellow)" : "none",
              }}>
                <button onClick={() => vote(q.id)} aria-label="Upvote" style={{
                  width: 40, height: 40, borderRadius: "var(--radius-sm)", display: "grid", placeItems: "center", lineHeight: 1,
                  background: q.voted ? "var(--plum)" : "var(--cream)", color: q.voted ? "var(--paper)" : "var(--plum)",
                }}>
                  <span className="t-tab">▲</span><span className="t-body-strong">{q.votes}</span>
                </button>
                <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                  <span className="t-body-strong" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.q}</span>
                  <span className="t-small muted">{q.by}</span>
                </span>
                {q.state === "on air" && <span className="chip chip-accent">on air</span>}
              </div>
            ))}
          </div>

          {/* stage */}
          <div className="t-small muted" style={{ marginTop: 20 }}>On stage · 11 listening</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: 12, paddingBottom: 24 }}>
            {SPEAKERS.map((s) => {
              const talking = s.me ? mic : s.speaking;
              return (
                <div key={s.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <span style={{ position: "relative" }}>
                    <Avatar src={`/images/${s.img}.jpg`} initials={s.init} size={84} radius={30} color={s.c}
                      style={{ boxShadow: talking ? "0 0 0 4px var(--yellow)" : "none", transition: "box-shadow .2s ease" }} />
                    {!talking && (
                      <span style={{ position: "absolute", right: -6, bottom: -6, width: 28, height: 28, borderRadius: 99, background: "var(--white)", display: "grid", placeItems: "center", color: "var(--ash)" }}>
                        <Icon name="micOff" size={16} />
                      </span>
                    )}
                    {s.me && hand && <span style={{ position: "absolute", left: -6, top: -6, fontSize: 22 }}>✋</span>}
                  </span>
                  <span className="t-body-strong">{s.name}</span>
                  <span className="t-tab muted">{s.role}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* action bar */}
      <div style={{ flex: "none", height: 108, background: "var(--paper)", borderTop: "1px solid var(--stone)", display: "flex", alignItems: "center", gap: 10, padding: "0 24px 12px" }}>
        <button className="round round-light" aria-label="Chat" onClick={() => setSheet("chat")}><Icon name="chat" /></button>
        <button className="btn btn-light btn-sm" onClick={() => setSheet("ask")}>＋ Ask a question</button>
        <button className="btn btn-sm" aria-pressed={hand} onClick={() => setHand((h) => !h)}
          style={{ padding: "0 14px", background: hand ? "var(--yellow)" : "var(--paper)", boxShadow: hand ? "none" : "inset 0 0 0 1px var(--stone)" }}>✋</button>
        <span style={{ flex: 1 }} />
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <button onClick={() => setMic((m) => !m)} aria-pressed={mic} aria-label={mic ? "Mute" : "Unmute"} style={{
            width: 64, height: 64, borderRadius: 99, display: "grid", placeItems: "center",
            background: mic ? "var(--yellow)" : "var(--charcoal)", color: mic ? "var(--plum)" : "var(--paper)",
          }}><Icon name={mic ? "mic" : "micOff"} size={28} /></button>
          <span className="t-tab muted">{mic ? "mic on" : "mic off"}</span>
        </span>
      </div>

      {/* sheets */}
      {sheet && (
        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div onClick={() => { setSheet(null); setFixMode(false); }} style={{ position: "absolute", inset: 0, background: "rgba(34,33,33,.55)" }} />
          <div className="rise" style={{
            position: "relative", background: "var(--cream)", borderRadius: "28px 28px 0 0", padding: "10px 24px 28px",
            height: sheet === "chat" ? "72%" : "auto", display: "flex", flexDirection: "column", gap: 14,
          }}>
            <span style={{ width: 40, height: 5, borderRadius: 3, background: "var(--stone)", alignSelf: "center" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="t-heading-m">{sheet === "chat" ? "Chat" : "Ask the room"}</div>
                <div className="t-small muted">{sheet === "chat" ? "Type if you can’t talk right now · fixes welcome" : "Others upvote, speakers answer out loud"}</div>
              </div>
              <button aria-label="Close" onClick={() => { setSheet(null); setFixMode(false); }}><Icon name="x" size={26} /></button>
            </div>

            {sheet === "chat" && (
              <>
                <div ref={listRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, scrollbarWidth: "none" }}>
                  {chat.map((m) => m.type === "mine" ? (
                    <div key={m.id} className="rise" style={{ alignSelf: "flex-end", maxWidth: "80%", background: "var(--plum)", color: "var(--paper)", borderRadius: "var(--radius-md)", padding: "10px 14px" }} >
                      <span className="t-body" style={{ fontFamily: "var(--font-sans), var(--font-ko)" }}>{m.text}</span>
                    </div>
                  ) : (
                    <div key={m.id} className="rise" style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ width: 28, height: 28, borderRadius: 99, flex: "none", background: m.type === "fix" ? "var(--periwinkle)" : m.c }} />
                      {m.type === "fix" ? (
                        <div style={{ background: "var(--lilac)", color: "var(--plum)", borderRadius: "var(--radius-md)", padding: "10px 14px" }}>
                          <div className="t-caps" style={{ opacity: .75 }}>✎ {m.name} suggests a fix for {m.for}</div>
                          <div className="t-small muted" style={{ textDecoration: "line-through" }}>{m.original}</div>
                          <div className="t-ko" style={{ fontSize: 15 }}>{m.corrected}</div>
                          <div className="t-small" style={{ opacity: .75 }}>{m.note}</div>
                        </div>
                      ) : (
                        <div style={{ background: "var(--white)", borderRadius: "var(--radius-md)", padding: "10px 14px" }}>
                          <div className="t-small muted">{m.name}</div>
                          <div className="t-body" style={{ fontFamily: "var(--font-sans), var(--font-ko)" }}>{m.text}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <button className={`pill ${fixMode ? "on" : ""}`} onClick={() => { setFixMode((f) => !f); if (!fixMode) setDraft("저는 어제 영화를 봤어요"); }}>
                    <span className="ko">✎</span><span className="en">{fixMode ? "Fixing Leo’s line" : "Suggest a fix"}</span>
                  </button>
                  {HELP.map((h) => (
                    <button key={h.ko} className="pill" onClick={() => send(h.ko)}><span className="ko">{h.ko}</span><span className="en">{h.en}</span></button>
                  ))}
                </div>
                <form className="field filled" onSubmit={(e) => { e.preventDefault(); send(); }}>
                  <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={fixMode ? "Write the corrected line" : "Message in Korean or English"} />
                  <button type="submit" className="round round-brand" style={{ width: 40, height: 40 }} aria-label="Send"><Icon name="send" size={18} /></button>
                </form>
              </>
            )}

            {sheet === "ask" && (
              <form onSubmit={(e) => { e.preventDefault(); ask(); }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="field filled">
                  <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="e.g. When do I use 요?" />
                </div>
                <button className="btn btn-dark" type="submit" disabled={!draft.trim()}>Add to the queue</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
