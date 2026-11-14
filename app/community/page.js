import Link from "next/link";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import Avatar from "@/components/Avatar";

// Community / 01 · Feed
const QUESTIONS = [
  { who: "Mina · Korean, day 30", img: "mina", init: "MN", q: "How do I politely say no to more food at a family dinner?", meta: "8 answers · native speaker answered" },
  { who: "Leo · French, day 12", img: "leo", init: "LO", q: "Is “tu” okay with a café barista, or too casual?", meta: "3 answers" },
];

export default function Community() {
  return (
    <>
      <div className="screen">
        <Header title="Community" />
        <div className="pad" style={{ marginTop: 20 }}>
          <div className="bubble" style={{ "--c": "var(--khaki)", padding: 20 }}>
            <div className="t-small"><span style={{ color: "var(--plum)" }}>●</span> Live now</div>
            <div className="t-heading-m" style={{ marginTop: 4 }}>Korean speaking room</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
              <span className="t-small muted">13 learners · all levels</span>
              <Link href="/community/live" className="btn btn-brand btn-sm">Join</Link>
            </div>
          </div>

          <div className="t-small muted" style={{ marginTop: 44 }}>Questions</div>
          {QUESTIONS.map((q) => (
            <div key={q.q} style={{ padding: "16px 0", borderBottom: "1px solid var(--stone)" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Avatar src={`/images/${q.img}.jpg`} initials={q.init} size={28} color="var(--khaki)" />
                <span className="t-small muted">{q.who}</span>
              </div>
              <div className="t-title" style={{ marginTop: 8 }}>{q.q}</div>
              <div className="t-small muted" style={{ marginTop: 6 }}>{q.meta}</div>
            </div>
          ))}
          <div style={{ height: 32 }} />
        </div>
      </div>
      <TabBar />
    </>
  );
}
