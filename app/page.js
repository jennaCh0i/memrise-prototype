import Link from "next/link";
import TabBar from "@/components/TabBar";

// Lesson / 01 · Today (the Lessons tab)
const DAYS = [
  { day: 12, title: "airport check-in", state: "done" },
  { day: 13, title: "café order", state: "today" },
  { day: 14, title: "T-money top-up", state: "next" },
  { day: 15, title: "pharmacy", state: "next" },
  { day: 16, title: "takeout", state: "next" },
];

export default function Today() {
  return (
    <>
      <div className="screen">
        <section className="photo" style={{ "--img": "url(/images/barista.jpg)", height: 470, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(20,8,12,.55) 100%)" }} />
          <div style={{ position: "absolute", left: 24, bottom: 72, color: "var(--paper)" }}>
            <div className="t-heading-m">day 13</div>
            <div className="t-display">coffee order</div>
          </div>
        </section>

        <section style={{ position: "relative", marginTop: -44, background: "var(--paper)", borderRadius: "28px 120px 0 0", paddingTop: 28, paddingBottom: 24 }}>
          <div className="pad t-small muted" style={{ marginBottom: 12 }}>Korean · Seoul in 18 days</div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 24px 4px", scrollbarWidth: "none" }}>
            {DAYS.map((d) => {
              const today = d.state === "today";
              const card = (
                <div
                  style={{
                    width: 116, height: 104, flex: "none", borderRadius: "var(--radius-md)", padding: 12,
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    background: today ? "var(--yellow)" : "var(--plum)",
                    color: today ? "var(--plum)" : "var(--paper)",
                    opacity: d.state === "done" ? 0.55 : 1,
                  }}
                >
                  <span className="t-heading-s" style={{ fontSize: 18 }}>{d.title}</span>
                  <span className="t-small" style={{ textAlign: "right" }}>{d.state === "done" ? "✓ " : ""}day {d.day}</span>
                </div>
              );
              return today ? <Link key={d.day} href="/lesson/coffee-order/make-it-yours">{card}</Link> : <div key={d.day}>{card}</div>;
            })}
          </div>
          <div className="pad" style={{ marginTop: 24 }}>
            <Link href="/lesson/coffee-order/make-it-yours" className="btn btn-brand">Start day 13</Link>
            <p className="t-small muted" style={{ textAlign: "center", marginTop: 12 }}>
              5 scenes · about 6 min each
            </p>
          </div>
        </section>
      </div>
      <TabBar />
    </>
  );
}
