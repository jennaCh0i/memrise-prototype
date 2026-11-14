import Link from "next/link";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

// Flash cards / 01 · Decks — speech-bubble deck cards.
const DECKS = [
  { slug: "coffee-order", title: "coffee order", count: 8, c: "var(--yellow)" },
  { title: "takeout", count: 12, c: "var(--lilac)" },
  { title: "T-money", count: 5, c: "var(--periwinkle)" },
  { title: "pharmacy", count: null, c: "var(--khaki)" },
  { title: "airport", count: 4, c: "#ef6b4d" },
  { title: "dinner", count: null, c: "#fbd85c" },
];

export default function Decks() {
  return (
    <>
      <div className="screen">
        <Header title="flash cards">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 6 }}>
            <span className="brand" style={{ fontFamily: "var(--font-serif)", fontSize: 20 }}><span style={{ fontSize: 26 }}>12</span> due today</span>
            <span className="t-small">saved 24 →</span>
          </div>
        </Header>
        <div className="pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 10px", marginTop: 28, paddingBottom: 48 }}>
          {DECKS.map((d) => {
            const card = (
              <div className="bubble" style={{ "--c": d.c, height: 140, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span className="t-heading-m">{d.title}</span>
                {d.count && <span style={{ fontFamily: "var(--font-serif)", fontSize: 44, alignSelf: "flex-end", lineHeight: 1 }}>{d.count}</span>}
              </div>
            );
            return d.slug ? <Link key={d.title} href={`/flashcards/${d.slug}`}>{card}</Link> : <div key={d.title} style={{ opacity: .92 }}>{card}</div>;
          })}
        </div>
      </div>
      <TabBar />
    </>
  );
}
