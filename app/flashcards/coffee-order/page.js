"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/Icons";
import TabBar from "@/components/TabBar";
import { useApp } from "@/components/AppState";
import { translate } from "@/lib/menu";

// Flash cards / 01 · Coffee orders — a stack of menu words; tap to flip, then Again / Got it.
const BASE = [
  { ko: "아아", full: "아이스 아메리카노", en: "iced americano", note: "What everyone actually says at the counter." },
  { ko: "따아", full: "따뜻한 아메리카노", en: "hot americano", note: "따뜻한 = warm. Shortened the same way as 아아." },
  { ko: "라떼", full: "ra-tte", en: "latte", note: "Add 아이스 in front for an iced one." },
  { ko: "샌드위치", full: "saen-deu-wi-chi", en: "sandwich", note: "Point at the case and say 이거 주세요 — this one, please." },
  { ko: "포장이요", full: "po-jang-i-yo", en: "to go, please", note: "Answer to 드시고 가세요? (eating here?)" },
  { ko: "매장이요", full: "mae-jang-i-yo", en: "for here", note: "매장 = the shop itself." },
  { ko: "사이즈 업", full: "sa-i-jeu eop", en: "size up", note: "Most chains charge ₩500 extra." },
];

export default function CoffeeOrders() {
  const { drink } = useApp();
  const deck = useMemo(() => {
    const t = drink ? translate(drink) : null;
    if (!t || t.unknown.length) return BASE.map((c, i) => ({ ...c, usual: i === 0 }));
    const mine = { ko: t.slang || t.ko, full: t.slang ? t.ko : t.rom, en: drink.toLowerCase(), note: "Your usual — this is your line for scene 2.", usual: true };
    return [mine, ...BASE.filter((c) => c.ko !== mine.ko)];
  }, [drink]);

  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const card = deck[i % deck.length];
  const go = (gotIt) => { if (gotIt) setKnown((k) => k + 1); setFlipped(false); setI((n) => n + 1); };
  const due = Math.max(0, 3 - known);
  const layers = ["var(--periwinkle)", "var(--lilac)"];

  return (
    <>
      <div className="screen">
        <div className="pad top-space">
          <Link href="/flashcards" className="back"><Icon name="back" size={20} /> flash cards</Link>
          <h1 className="t-display" style={{ marginTop: 16 }}>coffee order</h1>
          <div className="brand" style={{ fontFamily: "var(--font-serif)", fontSize: 20, marginTop: 4 }}>
            <span style={{ fontSize: 26 }}>{due}</span> due today
          </div>
        </div>

        {/* stack */}
        <div className="pad" style={{ marginTop: 20 }}>
          <div style={{ position: "relative", height: 220 }}>
            {layers.map((c, k) => (
              <div key={k} style={{ position: "absolute", top: k * 12, left: 24 - k * 12, right: 24 - k * 12, height: 196, borderRadius: "var(--radius-lg)", background: c }} />
            ))}
            <button
              key={i}
              onClick={() => setFlipped((f) => !f)}
              className="rise"
              aria-label="Flip card"
              style={{
                position: "absolute", top: 24, left: 0, right: 0, height: 196, borderRadius: "var(--radius-lg)",
                background: flipped ? "var(--plum)" : "var(--yellow)", color: flipped ? "var(--paper)" : "var(--plum)",
                padding: "18px 24px", textAlign: "left", display: "flex", flexDirection: "column", transition: "background .25s ease",
              }}
            >
              {card.usual && <span className="chip chip-tag" style={{ height: 24 }}>Your usual</span>}
              <span style={{ flex: 1 }} />
              {!flipped ? (
                <>
                  <span className="t-ko-l">{card.ko}</span>
                  <span className="t-small" style={{ opacity: .75, marginTop: 6 }}>tap to see what it means</span>
                </>
              ) : (
                <>
                  <span className="t-heading-m">{card.en}</span>
                  <span className="t-ko" style={{ marginTop: 6 }}>{card.ko} · {card.full}</span>
                  <span className="t-small" style={{ opacity: .8, marginTop: 4 }}>{card.note}</span>
                </>
              )}
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
            <button className="btn btn-brand" onClick={() => go(false)}>Again</button>
            <button className="btn btn-accent" onClick={() => go(true)}>Got it</button>
          </div>
          <p className="t-small muted" style={{ textAlign: "center", marginTop: 8 }}>{(i % deck.length) + 1} / {deck.length}</p>
        </div>

        {/* list */}
        <div className="pad" style={{ marginTop: 16, paddingBottom: 32 }}>
          <div className="t-small muted" style={{ marginBottom: 8 }}>On the menu</div>
          <div style={{ display: "grid", gap: 8 }}>
            {deck.map((c, k) => (
              <button key={c.ko} onClick={() => { setI(k); setFlipped(false); }} className="tile" style={{ gap: 12, boxShadow: k === i % deck.length ? "inset 0 0 0 1.5px var(--plum)" : "none" }}>
                <span className="t-ko brand" style={{ width: 84 }}>{c.ko}</span>
                <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <span className="t-body-strong">{c.en}</span>
                  <span className="t-small muted">{c.full}</span>
                </span>
                {k < 3 && <span className="chip chip-accent">due</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      <TabBar />
    </>
  );
}
