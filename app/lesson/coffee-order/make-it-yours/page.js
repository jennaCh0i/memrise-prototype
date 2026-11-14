"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icons";
import { useApp } from "@/components/AppState";
import { translate, orderLine, SUGGESTIONS } from "@/lib/menu";

// Lesson / 02 · Make it yours — type (or say) your drink, see it in Korean live.
const WHO = [
  { id: "me", label: "Just me" },
  { id: "friend", label: "A friend" },
  { id: "older", label: "Someone older" },
  { id: "group", label: "Ordering for a group" },
];

export default function MakeItYours() {
  const router = useRouter();
  const app = useApp();
  const [drink, setDrink] = useState("");
  const [who, setWho] = useState("me");
  const [listening, setListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState("");
  const recRef = useRef(null);

  useEffect(() => { setDrink(app.drink || ""); setWho(app.who || "me"); }, [app.drink, app.who]);

  const t = translate(drink);
  const line = orderLine(t, who);

  function listen() {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) { setVoiceNote("Voice works in Chrome — type it for now."); return; }
    if (listening) { recRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = "en-US"; rec.interimResults = true; rec.maxAlternatives = 1;
    rec.onresult = (e) => setDrink(Array.from(e.results).map((r) => r[0].transcript).join(" "));
    rec.onend = () => setListening(false);
    rec.onerror = () => { setListening(false); setVoiceNote("Couldn’t hear that — try again or type it."); };
    recRef.current = rec; setVoiceNote(""); setListening(true); rec.start();
  }

  function build() {
    app.update({ drink: drink.trim(), who });
    router.push("/lesson/coffee-order");
  }

  return (
    <div className="screen">
      <div className="pad top-space">
        <Link href="/" className="back"><Icon name="back" size={20} /> back</Link>

        <div style={{ marginTop: 24 }}>
          <div className="t-caps brand">Day 13 · coffee order</div>
          <h1 className="t-heading-l" style={{ marginTop: 8 }}>Make it your order</h1>
          <p className="t-body muted" style={{ marginTop: 8 }}>We’ll rebuild the scene around what you actually drink and who you’re with.</p>
        </div>

        {/* drink */}
        <div style={{ marginTop: 24 }}>
          <label htmlFor="drink" className="t-body-strong">What do you usually order?</label>
          <div className={`field ${drink ? "filled" : ""}`} style={{ marginTop: 8 }}>
            <input id="drink" value={drink} onChange={(e) => setDrink(e.target.value)}
              placeholder="Type or say your drink" autoComplete="off" enterKeyHint="done" />
            <button className="round round-brand" onClick={listen} aria-label={listening ? "Stop listening" : "Say your drink"}
              style={{ width: 40, height: 40, background: listening ? "var(--tomato)" : undefined, animation: listening ? "pulse 1.2s infinite" : "none" }}>
              <Icon name="mic" size={20} />
            </button>
          </div>
          {voiceNote && <p className="t-small muted" style={{ marginTop: 6 }}>{voiceNote}</p>}

          {t && line && (
            <div className="rise" key={t.ko} style={{ marginTop: 8, background: "var(--yellow)", borderRadius: "var(--radius-md)", padding: 16, color: "var(--plum)" }}>
              <div className="t-caps" style={{ opacity: .75 }}>At the counter you say</div>
              <div className="t-ko-m" style={{ marginTop: 4 }}>{t.ko}</div>
              <div className="t-small" style={{ opacity: .75 }}>{t.rom}</div>
              {t.slang && <div className="t-small" style={{ marginTop: 6 }}>Locals just say <b className="t-ko" style={{ fontSize: 14 }}>{t.slang}</b></div>}
              <div style={{ marginTop: 10, background: "var(--paper)", borderRadius: "var(--radius-sm)", padding: "8px 12px" }}>
                <div className="t-ko" style={{ fontSize: 15 }}>{line.ko}</div>
                <div className="t-small" style={{ opacity: .7 }}>{line.rom}</div>
              </div>
              {t.unknown.length > 0 && (
                <div className="t-small" style={{ marginTop: 8, opacity: .75 }}>
                  We’ll learn “{t.unknown.join(" ")}” together in the scene.
                </div>
              )}
            </div>
          )}

          <div className="t-small muted" style={{ marginTop: 14 }}>Popular at Seoul cafés</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {SUGGESTIONS.map((s) => (
              <button key={s.value} className={`pill ${drink.trim().toLowerCase() === s.value ? "on" : ""}`} onClick={() => setDrink(s.value)}>
                <span className="ko">{s.ko}</span><span className="en">{s.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* who */}
        <div style={{ marginTop: 28 }}>
          <div className="t-body-strong">Who’s with you?</div>
          <div className="grid-2" style={{ marginTop: 8 }} role="radiogroup">
            {WHO.map((w) => (
              <button key={w.id} role="radio" aria-checked={who === w.id} className={`tile ${who === w.id ? "on" : ""}`} onClick={() => setWho(w.id)}>
                {w.label}
              </button>
            ))}
          </div>
          <p className="t-small muted" style={{ marginTop: 8 }}>
            {who === "older"
              ? "Got it — your lines switch to the extra-polite 주시겠어요?"
              : "Someone older (a boss, in-laws) switches your lines to extra-polite Korean."}
          </p>
        </div>
      </div>

      <div style={{ position: "sticky", bottom: 0, marginTop: 24, padding: "16px 24px 28px", background: "linear-gradient(180deg, rgba(243,244,239,0), var(--cream) 30%)" }}>
        <button className="btn btn-dark" disabled={!drink.trim()} onClick={build}>Build my scene</button>
      </div>
    </div>
  );
}
