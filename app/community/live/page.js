"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icons";
import { Screen, Box, T, Chip, Button, TopicCard, LiveQuestion, Speaker, RoundLight, MicToggle, ChatMessage, Pill, TextField, ME, P2, P3 } from "@/components/ui";

// Community / 02 · Live room (+ chat sheet)
const TOPICS = [
  { ko: "주말에 뭐 했어요?", en: "What did you do this weekend?", starter: "저는 주말에 ___ 했어요." },
  { ko: "제일 좋아하는 음식이 뭐예요?", en: "What’s your favourite food?", starter: "제가 제일 좋아하는 음식은 ___ 예요." },
  { ko: "한국에 가면 뭐 하고 싶어요?", en: "What do you want to do in Korea?", starter: "한국에 가면 ___ 하고 싶어요." },
];
const LEO = "저는 어제 영화를 봐요";
const START = [
  { id: 1, type: "msg", name: "Mina · intermediate", text: "저는 주말에 한강에서 자전거 탔어요 🚲", c: "#e1b3e3" },
  { id: 2, type: "msg", name: "Leo · beginner", text: LEO + " 🎬", c: "#e1ded1" },
  { id: 3, type: "fix", name: "Sora", for: "Leo", original: LEO, corrected: "저는 어제 영화를 봤어요", note: "어제 = yesterday, so past tense: 봐요 → 봤어요" },
  { id: 4, type: "msg", name: "Leo · beginner", text: "아 고마워요! 👍", c: "#e1ded1" },
  { id: 5, type: "mine", text: "한강 is so nice in fall! 🍂" },
];
const HELP = [["다시 한 번 말해 주세요", "again?"], ["천천히요", "slower"], ["무슨 뜻이에요?", "meaning?"]];

export default function LiveRoom() {
  const [topic, setTopic] = useState(0);
  const [qs, setQs] = useState([
    { id: 1, q: "Is 반말 okay with friends my age?", by: "Leo · beginner", votes: 6, state: "on air" },
    { id: 2, q: "How do I say \"I'm full\" politely?", by: "Mina · intermediate", votes: 3, state: "open" },
  ]);
  const [mic, setMic] = useState(false);
  const [hand, setHand] = useState(false);
  const [sheet, setSheet] = useState(null);
  const [chat, setChat] = useState(START);
  const [draft, setDraft] = useState("");
  const [fix, setFix] = useState(false);
  const list = useRef(null);
  useEffect(() => { list.current?.scrollTo({ top: 1e6, behavior: "smooth" }); }, [chat, sheet]);

  const shown = [...qs].sort((a, b) => (b.state === "on air") - (a.state === "on air") || b.votes - a.votes).slice(0, 2);
  const vote = (id) => setQs((all) => all.map((q) => q.id === id ? { ...q, voted: !q.voted, votes: q.votes + (q.voted ? -1 : 1) } : q));
  const send = (text) => {
    const v = (text ?? draft).trim(); if (!v) return;
    setChat((c) => [...c, fix ? { id: Date.now(), type: "fix", name: "You", for: "Leo", original: LEO, corrected: v, note: "Sent as a suggestion — Leo can tap to thank you." } : { id: Date.now(), type: "mine", text: v }]);
    setFix(false); setDraft("");
  };
  const ask = () => { const v = draft.trim(); if (!v) return; setQs((all) => [...all, { id: Date.now(), q: v, by: "You · beginner", votes: 9, state: "open", voted: true }]); setDraft(""); setSheet(null); };
  const close = () => { setSheet(null); setFix(false); setDraft(""); };

  const actions = (
    <div style={{ position: "absolute", left: 0, bottom: 0, width: 420, height: 120, background: "var(--paper)", borderTop: "1px solid var(--stone)", zIndex: 5 }}>
      <RoundLight x={24} y={24} icon="chat" label="Chat" onClick={() => setSheet("chat")} />
      <Button x={84} y={28} small kind="light" label="＋ Ask a question" onClick={() => setSheet("ask")} />
      <Button x={254} y={28} small kind={hand ? "accent" : "light"} label="✋" onClick={() => setHand((h) => !h)} style={{ padding: "0 18px" }} />
      <MicToggle x={324} y={10} on={mic} onClick={() => setMic((m) => !m)} />
    </div>
  );

  const overlay = (
    <>
      {actions}
      {sheet && (
        <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
          <div className="fade" onClick={close} style={{ position: "absolute", inset: 0, background: "rgba(34,33,33,.55)" }} />
          <div className="sheet" style={{ position: "absolute", left: 0, bottom: 0, width: 420, height: sheet === "chat" ? 650 : 300, background: "#f3f4ef", borderRadius: "28px 28px 0 0" }}>
            <Box x={190} y={10} w={40} h={5} r={3} bg="var(--stone)" />
            <T x={24} y={29} font="serif" size={24} lh={28}>{sheet === "chat" ? "Chat" : "Ask the room"}</T>
            <T x={24} y={57} font="dm" size={13} lh={17} color="var(--ash)">{sheet === "chat" ? "Type if you can’t talk right now · fixes welcome" : "Others upvote, speakers answer out loud"}</T>
            <button aria-label="Close" onClick={close} style={{ position: "absolute", left: 372, top: 40, color: "var(--ink-soft)" }}><Icon name="x" /></button>
            {sheet === "chat" ? (<>
              <div ref={list} style={{ position: "absolute", left: 24, top: 88, width: 372, height: 372, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, scrollbarWidth: "none" }}>
                <span style={{ flex: 1 }} />
                {chat.map((m) => <ChatMessage key={m.id} m={m} />)}
              </div>
              <div style={{ position: "absolute", left: 24, top: 474, width: 372, display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Pill ko="✎" en={fix ? "Fixing Leo’s line" : "Suggest a fix"} on={fix} onClick={() => { setFix(!fix); if (!fix) setDraft("저는 어제 영화를 봤어요"); }} />
                {HELP.map(([ko, en]) => <Pill key={ko} ko={ko} en={en} onClick={() => send(ko)} />)}
              </div>
              <TextField x={24} y={560} value={draft} onChange={setDraft} placeholder={fix ? "Write the corrected line" : "Message in Korean or English"} filled={!!draft} onSubmit={() => send()} mic={false} send />
            </>) : (<>
              <TextField x={24} y={96} value={draft} onChange={setDraft} placeholder="e.g. When do I use 요?" filled={!!draft} onSubmit={ask} mic={false} />
              <Button x={24} y={168} label="Add to the queue" disabled={!draft.trim()} onClick={ask} />
            </>)}
          </div>
        </div>
      )}
    </>
  );

  return (
    <Screen bg="#fefff8" overlay={overlay}>
      <Link href="/community" className="press" style={{ position: "absolute", left: 300, top: 60, width: 96, height: 30, borderRadius: 15, background: "#ef6b4d", display: "grid", placeItems: "center" }}>
        <T font="dm" size={13} weight={500} color="var(--paper)">Leave</T>
      </Link>
      <Link href="/community"><T x={24} y={72} font="dm" size={15} lh={20} color="#d9c6cf">←  back</T></Link>
      <Box x={24} y={108} w={8} h={8} r={4} bg="var(--yellow)" />
      <T x={38} y={104} font="dm" size={11} weight={600} lh={14} color="var(--yellow)">LIVE  ·  14 learners</T>
      <T x={24} y={142} font="serif" size={30} lh={30} color="#1f1d1c">Korean speaking room</T>
      <Chip x={24} y={184} label="All levels" kind="accent" />
      <Chip x={108} y={184} label="Mostly Korean · English OK" kind="brand" />
      <TopicCard x={24} y={228} topic={TOPICS[topic % TOPICS.length]} onNext={() => setTopic((t) => t + 1)} />

      <T x={24} y={393} font="dm" size={15} weight={500} lh={20}>{`Questions  ·  ${qs.length + 3}`}</T>
      <button onClick={() => setSheet("ask")} style={{ position: "absolute", left: 357, top: 395 }}><T font="dm" size={13} lh={17} color="var(--plum)">See all</T></button>
      {shown.map((q, k) => <LiveQuestion key={q.id} x={24} y={421 + k * 64} q={q} onVote={() => vote(q.id)} />)}

      <T x={24} y={561} font="dm" size={13} lh={17} color="var(--ash)">On stage  ·  11 listening</T>
      <Speaker x={24} y={591} name="Jisoo" role="native · host" src={P2} speaking vote="var(--periwinkle)" />
      <Speaker x={158} y={591} name="Mina" role="intermediate" src={P3} vote="var(--lilac)" />
      <Speaker x={292} y={591} name="You" role="beginner" src={ME} speaking={mic} vote="var(--periwinkle)" hand={hand} />
    </Screen>
  );
}
