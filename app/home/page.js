import Link from "next/link";
import TabBar from "@/components/TabBar";
import Avatar from "@/components/Avatar";

// Tab / Home — streak, date strip, today's situation, review.
const DATES = [22, 23, 24, 25, 26, 27];

export default function Home() {
  return (
    <>
      <div className="screen">
        <section style={{ background: "var(--yellow)", padding: "64px 24px 40px", borderRadius: "0 0 0 120px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Avatar src="/images/me.jpg" initials="ME" size={48} color="var(--paper)" />
          </div>
          <div style={{ fontFamily: "var(--font-serif)", marginTop: 4 }}>
            <span style={{ fontSize: 72, lineHeight: 1 }}>42</span> <span style={{ fontSize: 32 }}>days</span>
          </div>
        </section>

        <div style={{ display: "flex", gap: 10, padding: "20px 24px 4px", overflowX: "auto", scrollbarWidth: "none" }}>
          {DATES.map((d) => {
            const today = d === 24;
            return (
              <div key={d} style={{ flex: "none", width: 63, height: 56, borderRadius: "var(--radius-lg)", display: "grid", placeItems: "center", textAlign: "center",
                background: today ? "var(--yellow)" : "var(--charcoal)", color: today ? "var(--ink-soft)" : "var(--paper)", opacity: d < 24 ? .55 : 1 }}>
                <span className="t-heading-s" style={{ fontSize: 18 }}>Oct<br />{d}</span>
              </div>
            );
          })}
        </div>

        <div className="pad" style={{ marginTop: 20 }}>
          <div className="t-small muted">Korean · Seoul in 18 days</div>
          <Link href="/" className="photo" style={{ "--img": "url(/images/barista.jpg)", display: "block", height: 240, borderRadius: "var(--radius-lg)", marginTop: 8, position: "relative", overflow: "hidden" }}>
            <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(20,8,12,.5))" }} />
            <span className="chip chip-tag" style={{ position: "absolute", top: 16, left: 16 }}>Today · day 13</span>
            <span className="t-display" style={{ position: "absolute", left: 16, bottom: 18, color: "var(--paper)", fontSize: 36 }}>coffee order</span>
          </Link>

          <div className="t-small muted" style={{ marginTop: 24 }}>Before your trip</div>
          <Link href="/flashcards/coffee-order" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--plum)", color: "var(--paper)", borderRadius: "var(--radius-lg)", padding: "18px 20px", margin: "8px 0 32px" }}>
            <span className="t-heading-m" style={{ fontSize: 22 }}>12 words to review</span>
            <span className="chip chip-accent">4 min</span>
          </Link>
        </div>
      </div>
      <TabBar />
    </>
  );
}
