"use client";
import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icons";
import { useApp } from "@/components/AppState";
import { translate, orderLine } from "@/lib/menu";

// Lesson / 02 · Situation detail — now built around the learner's own order.
const SCENES = [
  { n: 1, title: "Meet the barista", state: "done", color: "var(--periwinkle)" },
  { n: 2, title: "Order a drink", state: "today", color: "var(--lilac)" },
  { n: 3, title: "“For here or to go?”", state: "next", color: "var(--yellow)" },
  { n: 4, title: "Pay and say thanks", state: "locked", color: "var(--tomato)" },
  { n: 5, title: "Fix a wrong order", state: "locked", color: "var(--plum)" },
];

export default function SituationDetail() {
  const { drink, who } = useApp();
  const [toast, setToast] = useState(false);
  const t = translate(drink || "iced americano");
  const line = orderLine(t, who);
  const formal = who === "older";

  return (
    <div className="screen">
      <section className="photo" style={{ "--img": "url(/images/barista.jpg)", height: 300, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(243,244,239,0) 40%, var(--cream) 100%)" }} />
        <Link href="/lesson/coffee-order/make-it-yours" className="back" style={{ position: "absolute", top: 64, left: 24, color: "var(--paper)" }}>
          <Icon name="back" size={20} /> back
        </Link>
      </section>

      <div className="pad" style={{ marginTop: -56, position: "relative" }}>
        <div className="t-caps brand">Day 13 · Seoul in 18 days</div>
        <h1 className="t-display" style={{ marginTop: 6 }}>coffee order</h1>
        <p className="t-small muted" style={{ marginTop: 8 }}>
          5 scenes · about 6 min each · {formal ? "extra-polite 주시겠어요" : "polite 해요체"}
        </p>

        <div className="rise" style={{ marginTop: 16, background: "var(--yellow)", color: "var(--plum)", borderRadius: "var(--radius-md)", padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div className="t-caps" style={{ opacity: .75 }}>Your order in this scene</div>
            <div className="t-ko" style={{ fontSize: 18, marginTop: 4 }}>{line.ko}</div>
            <div className="t-small" style={{ opacity: .75 }}>{line.rom}</div>
          </div>
          <Link href="/lesson/coffee-order/make-it-yours" className="t-small" style={{ textDecoration: "underline" }}>change</Link>
        </div>

        <ol style={{ listStyle: "none", marginTop: 16, display: "grid", gap: 8 }}>
          {SCENES.map((s) => {
            const today = s.state === "today";
            const title = s.n === 2 ? `Order ${drink ? (t.slang || t.ko) : "a drink"}` : s.title;
            return (
              <li key={s.n} style={{
                height: 64, borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: 14, padding: "0 16px",
                background: today ? "var(--white)" : "transparent",
                boxShadow: today ? "0 1px 0 rgba(0,0,0,.03)" : "none",
                opacity: s.state === "locked" ? .5 : 1,
              }}>
                <span style={{ width: 4, height: 28, borderRadius: 2, background: s.color }} />
                <span className="t-heading-s muted" style={{ width: 14 }}>{s.n}</span>
                <span className="t-body-strong" style={{ flex: 1, fontFamily: s.n === 2 && drink ? "var(--font-sans), var(--font-ko)" : undefined }}>{title}</span>
                <span className="t-small" style={{ color: today ? "var(--plum)" : "var(--ash)", fontWeight: today ? 600 : 400 }}>
                  {s.state === "done" ? "✓ done" : s.state === "today" ? "today" : s.state === "next" ? "next" : <Icon name="lock" size={14} />}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="t-small muted" style={{ textAlign: "center", marginTop: 12 }}>Watch locals → rehearse with a local → ready</p>
      </div>

      <div style={{ position: "sticky", bottom: 0, marginTop: 24, padding: "16px 24px 28px", background: "linear-gradient(180deg, rgba(243,244,239,0), var(--cream) 30%)" }}>
        {toast && (
          <div className="rise" role="status" style={{ marginBottom: 12, background: "var(--plum)", color: "var(--paper)", borderRadius: "var(--radius-md)", padding: "12px 16px" }}>
            <div className="t-body-strong">Scene 2 is next in the prototype ☕</div>
            <div className="t-small" style={{ opacity: .8 }}>You’ll practise “{line.ko}” with the barista.</div>
          </div>
        )}
        <button className="btn btn-dark" onClick={() => { setToast(true); setTimeout(() => setToast(false), 2600); }}>Start scene 2</button>
      </div>
    </div>
  );
}
