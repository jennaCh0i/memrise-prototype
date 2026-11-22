"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Screen, Box, T, Photo, Button } from "@/components/ui";
import { Svg } from "@/components/Shapes";

// Scene 2 · Order a drink — week 10 frames, one flow:
// 03 Watch locals (listen) → 04 Your turn (speak) → 05 Build the line → 06 Hear it slowly → 07 Barista curveball → 08 Scene done

// All six frames share this cream/plum shape; only its height differs.
const curve = (h) =>
  `M420 ${h - 5.6}C420 ${h - 2.96} 420 ${h - 1.64} 419.18 ${h - 0.82}C418.36 ${h} 417.04 ${h} 414.4 ${h}H5.6C2.96 ${h} 1.64 ${h} 0.82 ${h - 0.82}C0 ${h - 1.64} 0 ${h - 2.96} 0 ${h - 5.6}V0H120.565C127.783 0 130.675 2.59375 130.675 7.7793V93.333C218.728 24.6238 288.026 0 364.532 0C367.419 0 370.279 0.0278 373.11 0.0977L373.333 0H420Z`;

const PLUM = "#430b27", PAPER = "#fefff8", YELLOW = "#ffcf00";
const WAVE = [10, 18, 30, 22, 40, 28, 14, 34, 46, 30, 20, 38, 24, 12, 28, 42, 26, 16, 32, 22, 12, 8, 14, 10, 6];

// Korean voice (the phone's built-in speech)
function say(text, rate = 0.8) {
  try {
    const s = window.speechSynthesis; if (!s) return;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR"; u.rate = rate;
    const v = s.getVoices().find((x) => x.lang && x.lang.startsWith("ko")); if (v) u.voice = v;
    s.speak(u);
  } catch (e) {}
}

function Back({ onClick, color = "#444444" }) {
  return (
    <button onClick={onClick} style={{ position: "absolute", left: 24, top: 70, height: 26, display: "flex", alignItems: "center", gap: 12, color }}>
      <T font="dm" size={20} lh={26} color={color}>←</T><T font="dm" size={15} lh={20} color={color}>back</T>
    </button>
  );
}
function Hero() {
  return (
    <>
      <Photo x={-41} y={-123} w={516} h={774} src="/images/barista.jpg" />
      <Box x={0} y={0} w={420} h={720} style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%)" }} />
    </>
  );
}
const ListenIcon = ({ c = PLUM, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill={c}><path d="M9 1.5C4.9 1.5 1.5 4.7 1.5 8.8V10h2.2V8.8C3.7 5.9 6 3.6 9 3.6s5.3 2.3 5.3 5.2V10h2.2V8.8C16.5 4.7 13.1 1.5 9 1.5z" /><rect x="1.5" y="9.5" width="5.5" height="7.5" rx="2" /><rect x="11" y="9.5" width="5.5" height="7.5" rx="2" /></svg>
);
const SpeakIcon = ({ c = "#151515", size = 18 }) => (
  <svg width={size} height={size * 17 / 18} viewBox="0 0 18 17" fill={c}><rect x="0" y="0" width="18" height="13" rx="3" /><path d="M3 12h8l-6 5z" /></svg>
);
function ModePill({ kind }) {
  const listen = kind === "listen";
  return (
    <div style={{ position: "absolute", left: 24, top: 112, height: 32, width: listen ? 112 : 104, borderRadius: 16, background: listen ? "#b1c2fa" : YELLOW, display: "flex", alignItems: "center", gap: 4, paddingLeft: 12 }}>
      {listen ? <ListenIcon /> : <SpeakIcon />}
      <T font="dm" size={11} weight={600} ls="0.08em" lh={14} color={PLUM}>{listen ? "LISTEN" : "SPEAK"}</T>
    </div>
  );
}
function Wave({ x, y, played, color = PLUM, rest = "#cacaca", step = 14, w = 6 }) {
  return WAVE.map((h, i) => (
    <div key={i} style={{ position: "absolute", left: x + i * step, top: y - h / 2, width: w, height: h, borderRadius: 3, background: i < played ? color : rest, transition: "background .12s" }} />
  ));
}

/* 03 · Watch locals — the barista says the line */
function Listen({ next, back }) {
  const [played, setPlayed] = useState(0);
  const [rate, setRate] = useState(0.75);
  const timer = useRef(null);
  const play = () => {
    say("라떼 한 잔 주세요.", rate);
    clearInterval(timer.current); setPlayed(0);
    let i = 0; timer.current = setInterval(() => { i += 1; setPlayed(i); if (i >= WAVE.length) clearInterval(timer.current); }, 90 / rate);
  };
  useEffect(() => { const t = setTimeout(play, 500); return () => { clearTimeout(t); clearInterval(timer.current); }; }, []); // eslint-disable-line
  const speaking = played > 0 && played < WAVE.length;
  const lit = played >= WAVE.length ? 3 : played > 16 ? 2 : played > 8 ? 1 : played > 0 ? 1 : 0; // words lit: 라떼 / 한 잔 / 주세요.
  return (
    <Screen bg={PAPER}>
      <Hero />
      <Svg x={0} y={291} w={420} h={474} d={curve(474)} fill={PAPER} />
      <Box x={0} y={760} w={420} h={152} bg={PAPER} />
      <Back onClick={back} />
      <ModePill kind="listen" />
      <div style={{ position: "absolute", left: 24, top: 228, height: 40, width: 214, borderRadius: 20, background: PAPER, display: "flex", alignItems: "center", paddingLeft: 14, gap: 8 }}>
        <span style={{ width: 12, height: 12, borderRadius: 6, background: "#b1c2fa" }} />
        <T font="dm" size={13} weight={500} lh={17} color={PLUM}>{speaking ? "barista is speaking" : "barista said"}</T>
        <span style={{ display: "flex", gap: 1.6, alignItems: "center", marginLeft: 8 }}>
          {[18, 21, 17, 7, 14, 20, 20, 14, 6].map((h, i) => <span key={i} className={speaking ? "pulse-bar" : ""} style={{ width: 3, height: h, borderRadius: 1.5, background: PLUM, animationDelay: `${i * 60}ms` }} />)}
        </span>
      </div>

      <Wave x={40} y={465} played={played} />
      <div style={{ position: "absolute", left: 35, top: 528 }}><ListenIcon c={PLUM} size={18} /></div>
      <div style={{ position: "absolute", left: 77, top: 505, fontFamily: "var(--ko)", fontSize: 40, lineHeight: "56px", whiteSpace: "nowrap" }}>
        {["라떼 ", "한 잔 ", "주세요."].map((w, i) => <span key={i} style={{ color: i < lit ? "#2a2a28" : "#cacaca", transition: "color .2s" }}>{w}</span>)}
      </div>
      <T x={83} y={581} font="dm" size={18} lh={23} color="#838383">latte han jan juseyo</T>
      <T x={83} y={607} font="dm" size={18} lh={23} color="#838383">One latte, please.</T>

      <button aria-label="Replay" onClick={play} style={{ position: "absolute", left: 24, top: 676, width: 44, height: 44, borderRadius: 22, background: "#e4e4de", display: "grid", placeItems: "center", color: PLUM }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 12a8 8 0 1 0 2.4-5.7" /><path d="M4 4v4.5h4.5" /></svg>
      </button>
      <button onClick={() => setRate((r) => (r === 0.75 ? 0.5 : r === 0.5 ? 1 : 0.75))} style={{ position: "absolute", left: 80, top: 676, width: 72, height: 44, borderRadius: 22, background: "#e4e4de", display: "grid", placeItems: "center" }}>
        <T font="dm" size={14} weight={500} lh={18} color="#2a2a28">{`${rate}×`}</T>
      </button>
      <Button x={24} y={818} kind="brand" label="Continue" onClick={next} />
    </Screen>
  );
}

/* 04 · Your turn — say it back */
const WORDS = [["라떼", "latte", 24], ["한", "han", 110], ["잔", "jan", 160], ["주세요.", "juseyo", 222]];
function Speak({ next, back }) {
  const [lit, setLit] = useState(0);         // words said so far
  const [listening, setListening] = useState(false);
  const timers = useRef([]);
  const start = () => {
    if (listening) return;
    setListening(true); setLit(0);
    timers.current = [1, 2, 3, 4].map((n) => setTimeout(() => setLit(n), 450 + n * 500));
    timers.current.push(setTimeout(() => { setListening(false); }, 2700));
    timers.current.push(setTimeout(next, 3500));
  };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const done = lit >= 4 && !listening;
  return (
    <Screen bg={PAPER}>
      <Hero />
      <Svg x={0} y={291} w={420} h={474} d={curve(474)} fill={PLUM} />
      <Box x={0} y={600} w={420} h={312} bg={PLUM} />
      <Back onClick={back} />
      <ModePill kind="speak" />
      <div style={{ position: "absolute", left: 24, top: 228, height: 40, width: 206, borderRadius: 20, background: "rgba(67,11,39,.9)", display: "flex", alignItems: "center", paddingLeft: 14, gap: 8 }}>
        <span style={{ width: 12, height: 12, borderRadius: 6, background: YELLOW }} />
        <T font="dm" size={13} weight={500} lh={17} color={PAPER}>{done ? "barista: 네, 잠시만요!" : "barista is waiting…"}</T>
      </div>

      {WORDS.map(([, ro, x]) => <T key={ro} x={x} y={474} font="dm" size={14} lh={18} color="rgba(254,255,248,.55)">{ro}</T>)}
      <div style={{ position: "absolute", left: 24, top: 490, fontFamily: "var(--ko)", fontSize: 40, lineHeight: "56px", whiteSpace: "nowrap" }}>
        {WORDS.map(([ko], i) => (
          <span key={ko} style={{ color: i < lit ? YELLOW : i === 0 && lit === 0 ? YELLOW : PAPER, fontWeight: i < Math.max(lit, 1) ? 700 : 400, opacity: i < Math.max(lit, 1) ? 1 : 0.5, transition: "all .2s" }}>{ko}{i < 3 ? " " : ""}</span>
        ))}
      </div>
      <T x={24} y={558} font="dm" size={18} lh={23} color="rgba(254,255,248,.6)">One latte, please.</T>
      <Wave x={24} y={642} played={listening ? Math.round((lit / 4) * WAVE.length) : done ? WAVE.length : WAVE.length} color={YELLOW} rest="rgba(255,207,0,.35)" step={12} w={5} />

      <div className={listening ? "pulse" : ""} style={{ position: "absolute", left: 158, top: 772, width: 104, height: 104, borderRadius: 52, background: "rgba(255,207,0,.18)" }} />
      <button aria-label="Speak" onClick={start} style={{ position: "absolute", left: 170, top: 784, width: 80, height: 80, borderRadius: 40, background: YELLOW, display: "grid", placeItems: "center" }}>
        <SpeakIcon size={36} />
      </button>
      {!listening && !done && <T x={0} y={746} w={420} align="center" font="dm" size={13} lh={17} color="rgba(254,255,248,.6)">tap and say it</T>}
    </Screen>
  );
}

/* 05 · Build the line */
const ANSWER = ["아이스", "아메리카노", "포장해", "주세요"];
const SLOTS = [[28, 436, 90], [128, 436, 130], [268, 436, 118], [28, 490, 108]];
const BANK = [["주세요", 24], ["포장해", 142]];
function Build({ next, back }) {
  const [placed, setPlaced] = useState(["아이스", "아메리카노", null, null]);
  const [wrong, setWrong] = useState(false);
  const used = placed.filter(Boolean);
  const put = (w) => { const i = placed.indexOf(null); if (i < 0) return; const p = [...placed]; p[i] = w; setPlaced(p); setWrong(false); };
  const take = (i) => { if (i < 2) return; const p = [...placed]; p[i] = null; setPlaced(p); setWrong(false); };
  const check = () => {
    if (placed.join(" ") === ANSWER.join(" ")) { say("아이스 아메리카노 포장해 주세요.", 0.8); setTimeout(next, 900); }
    else setWrong(true);
  };
  return (
    <Screen bg={PAPER}>
      <Hero />
      <Svg x={0} y={202} w={420} h={570} d={curve(570)} fill={PAPER} />
      <Box x={0} y={760} w={420} h={152} bg={PAPER} />
      <Back onClick={back} />
      <T x={24} y={340} font="serif" size={36} lh={44} color="#1f1d1c">Put it in order</T>
      <T x={24} y={395} font="serif" size={17} lh={17} color="#8a857e" style={{ fontStyle: "italic" }}>“An iced americano to go, please.”</T>

      <div className={wrong ? "shake" : ""}>
        {SLOTS.map(([x, y, w], i) => {
          const word = placed[i];
          return (
            <button key={i} onClick={() => take(i)} style={{ position: "absolute", left: x, top: y, width: w, height: 44, borderRadius: 12, background: word ? PLUM : "#f3f4ef", transition: "background .15s", display: "grid", placeItems: "center" }}>
              {word && <T font="ko" size={18} weight={500} lh={22} color={PAPER}>{word}</T>}
            </button>
          );
        })}
        <T x={140} y={504} font="ko" size={18} weight={500} lh={22} color="#000">.</T>
      </div>
      <T x={32} y={579} font="dm" size={12} weight={500} lh={16} color={wrong ? "#ef6b4d" : "#8a857e"}>{wrong ? "Not quite — 포장해 comes before 주세요" : `${used.length} of 4`}</T>
      {BANK.map(([w, x]) => {
        const gone = placed.includes(w);
        return (
          <button key={w} onClick={() => !gone && put(w)} disabled={gone}
            style={{ position: "absolute", left: x, top: 604, width: 106, height: 52, borderRadius: 12, background: gone ? "#f3f4ef" : YELLOW, transition: "background .15s", display: "grid", placeItems: "center" }}>
            <T font="ko" size={20} weight={500} lh={24} color={gone ? "#cacaca" : "#1f1d1c"}>{w}</T>
          </button>
        );
      })}
      <Button x={24} y={818} kind="brand" label="Check" onClick={check} disabled={used.length < 4} />
    </Screen>
  );
}

/* 06 · Hear it slowly */
const SOUNDS = [["보", "bo", "plain", 24], ["포", "po", "puff of air", 150], ["뽀", "ppo", "tight", 276]];
function Slowly({ next, back }) {
  const [sel, setSel] = useState(1);
  const [rate, setRate] = useState(0.5);
  return (
    <Screen bg={PLUM}>
      <Hero />
      <Svg x={0} y={201} w={420} h={474} d={curve(474)} fill={PLUM} />
      <Box x={0} y={575} w={420} h={337} bg={PLUM} />
      <Back onClick={back} />
      <T x={19} y={219} font="dm" size={15} lh={20} color={PAPER}>hear it slowly</T>
      <T x={24} y={358} font="serif" size={30} lh={38} color={PAPER}>Three sounds, side by side</T>
      <button onClick={() => setRate((r) => (r === 0.5 ? 0.75 : 0.5))} style={{ position: "absolute", left: 24, top: 405, width: 104, height: 40, borderRadius: 20, background: "#5a1d3a", display: "grid", placeItems: "center" }}>
        <T font="dm" size={14} weight={500} lh={18} color={PAPER}>{`${rate}×`}</T>
      </button>
      {SOUNDS.map(([ko, ro, desc, x], i) => {
        const on = i === sel;
        return (
          <button key={ko} onClick={() => { setSel(i); say(ko, rate); }}
            style={{ position: "absolute", left: x, top: 480, width: 116, height: 170, padding: 0 }}>
            <Box x={0} y={0} w={116} h={170} r={22} bg={on ? YELLOW : "#5a1d3a"} style={{ transition: "background .15s" }} />
            <T x={0} y={18} w={116} align="center" font="ko" size={52} lh={75} color={on ? PLUM : PAPER}>{ko}</T>
            <T x={0} y={103} w={116} align="center" font="dm" size={14} weight={500} lh={18} color={on ? PLUM : PAPER}>{ro}</T>
            <T x={0} y={125} w={116} align="center" font="dm" size={12} lh={16} color={on ? PLUM : "#d9c6cf"}>{desc}</T>
          </button>
        );
      })}
      <T x={24} y={670} w={372} font="dm" size={13} lh={18} color="#d9c6cf">Tap each one to hear it. 포 (po) is the one in 포장 — “to go”.</T>
      <Button x={24} y={818} kind="accent" label="Check" onClick={next} />
    </Screen>
  );
}

/* 07 · Barista curveball */
const ANSWERS = [["포장이요.", "To go."], ["네, 감사합니다.", "Yes, thank you."], ["카드로 할게요.", "By card."]];
function Curveball({ next, back }) {
  const [sel, setSel] = useState(0);
  const [wrong, setWrong] = useState(false);
  useEffect(() => { const t = setTimeout(() => say("드시고 가세요?", 0.8), 500); return () => clearTimeout(t); }, []);
  return (
    <Screen bg={PAPER}>
      <Hero />
      <Svg x={0} y={200} w={420} h={550} d={curve(550)} fill={PAPER} />
      <Box x={0} y={740} w={420} h={172} bg={PAPER} />
      <Back onClick={back} />
      <T x={21} y={217} font="dm" size={15} lh={20} color="#393939">curveball</T>
      <T x={24} y={340} font="serif" size={36} lh={44} color="#1f1d1c">What do you answer?</T>
      <button onClick={() => say("드시고 가세요?", 0.8)} style={{ position: "absolute", left: 24, top: 414, textAlign: "left" }}>
        <T font="ko" size={30} lh={43} color="#1f1d1c">드시고 가세요? 🔈</T>
      </button>
      <T x={26} y={462} font="dm" size={15} lh={20} color="#8a857e">deusigo gaseyo? · “For here?”</T>
      {ANSWERS.map(([ko, en], i) => {
        const on = i === sel;
        return (
          <button key={ko} onClick={() => { setSel(i); setWrong(false); say(ko, 0.85); }}
            style={{ position: "absolute", left: 24, top: 516 + i * 76, width: 372, height: 64, padding: 0, textAlign: "left" }}>
            <Box x={0} y={0} w={372} h={64} r={16} bg={on ? PLUM : "#ffffff"} style={{ transition: "background .15s" }} />
            <T x={20} y={10} font="ko" size={17} weight={500} lh={20} color={on ? PAPER : "#1f1d1c"}>{ko}</T>
            <T x={20} y={36} font="serif" size={14} lh={14} color={on ? "#d9c6cf" : "#8a857e"} style={{ fontStyle: "italic" }}>{en}</T>
          </button>
        );
      })}
      {wrong && <T x={24} y={752} w={372} align="center" font="dm" size={13} lh={18} color="#ef6b4d">You ordered it to go — try 포장이요.</T>}
      <Button x={24} y={818} kind="brand" label="Answer out loud" onClick={() => { if (sel === 0) { say("포장이요.", 0.85); setTimeout(next, 900); } else setWrong(true); }} />
    </Screen>
  );
}

/* 08 · Scene done */
function Done() {
  return (
    <Screen bg={YELLOW}>
      <Link href="/lesson/coffee-order"><T x={359} y={80} font="dm" size={14} weight={500} lh={18} color={PLUM}>Close</T></Link>
      <svg className="rise" width="34" height="40" viewBox="0 0 34 40" style={{ position: "absolute", left: 193, top: 292 }}>
        <path d="M17 0C22.4255 8 34 14.5455 34 26.1818C34 34.1818 26.4043 40 17 40C7.59575 40 0 34.1818 0 26.1818C0 18.9091 5.06383 14.9091 7.95745 10.9091C9.40426 16 11.9362 18.1818 14.1064 18.9091C13.383 12 14.1064 5.45455 17 0Z" fill="#EC4E32" />
        <path d="M17 40C11.9362 40 8.68085 36.3636 8.68085 32C8.68085 26.9091 13.0213 24.3636 15.5532 20.3636C17.3617 24.7273 25.3191 26.9091 25.3191 32C25.3191 36.3636 22.0638 40 17 40Z" fill="#F3F4EF" />
      </svg>
      <T x={29} y={354} w={362} align="center" font="serif" size={41} lh="92%" color={PLUM}>{"Awesome.\nContinue learning\nand challenge yourself!"}</T>
      <Button x={24} y={746} kind="light" label="Practice in flash cards" href="/flashcards/coffee-order" />
      <Button x={24} y={818} kind="brand" label="Next scene: pay and say thanks" href="/lesson/coffee-order" />
    </Screen>
  );
}

export default function Scene2() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  // ?step=N opens a step directly (used by the desktop shortcuts)
  useEffect(() => { const n = parseInt(new URLSearchParams(window.location.search).get("step"), 10); if (n >= 0 && n <= 5) setStep(n); }, []);
  const next = () => setStep((s) => s + 1);
  const back = () => (step === 0 ? router.push("/lesson/coffee-order") : setStep((s) => s - 1));
  const Steps = [Listen, Speak, Build, Slowly, Curveball, Done];
  const Step = Steps[step];
  return <div key={step} className="fade"><Step next={next} back={back} /></div>;
}
