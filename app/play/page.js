import Link from "next/link";
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import Avatar from "@/components/Avatar";

// Tab / Play — live room, word games, practice together.
export default function Play() {
  return (
    <>
      <div className="screen">
        <Header title="Play">
          <p className="t-body muted" style={{ marginTop: 8 }}>Practice with people, not just flash cards.</p>
        </Header>

        <div className="pad" style={{ marginTop: 20 }}>
          <div style={{ background: "var(--plum)", color: "var(--paper)", borderRadius: "var(--radius-lg)", padding: 20 }}>
            <div className="t-caps" style={{ color: "var(--yellow)" }}>● Live now · 14 learners</div>
            <div className="t-heading-m" style={{ marginTop: 6 }}>Korean speaking room</div>
            <div className="t-small" style={{ opacity: .75, marginTop: 4 }}>Today’s topic: 주말에 뭐 했어요?</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
              <span style={{ display: "flex" }}>
                {[["jisoo", "JS", "var(--lilac)"], ["mina", "MN", "var(--periwinkle)"], ["me", "ME", "var(--yellow)"]].map(([s, i, c], k) => (
                  <Avatar key={s} src={`/images/${s}.jpg`} initials={i} size={30} color={c} style={{ marginLeft: k ? -8 : 0, boxShadow: "0 0 0 2px var(--plum)" }} />
                ))}
              </span>
              <Link href="/community/live" className="btn btn-accent btn-sm">Join</Link>
            </div>
          </div>

          <div className="t-body-strong" style={{ marginTop: 24 }}>Word games</div>
          <div className="t-small muted">built from this week’s coffee-order words</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            {[
              { ko: "끝말잇기", en: "word relay", meta: "Say a word from the last syllable · 2–6 players", c: "var(--yellow)" },
              { ko: "메뉴 러시", en: "menu rush", meta: "Order the fastest · you vs. 3 others", c: "var(--lilac)" },
            ].map((g) => (
              <div key={g.en} className="bubble" style={{ "--c": g.c, height: 186, padding: 16, display: "flex", flexDirection: "column" }}>
                <span className="t-ko-m">{g.ko}</span>
                <span className="t-heading-s">{g.en}</span>
                <span style={{ flex: 1 }} />
                <span className="t-small" style={{ opacity: .75 }}>{g.meta}</span>
              </div>
            ))}
          </div>

          <div className="t-body-strong" style={{ marginTop: 44 }}>Practice together</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--white)", borderRadius: "var(--radius-md)", padding: "0 12px 0 16px", height: 72, margin: "10px 0 32px" }}>
            <Avatar src="/images/mina.jpg" initials="MN" size={40} color="var(--periwinkle)" />
            <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <span className="t-body-strong">Roleplay the café</span>
              <span className="t-small muted">with Mina · she’s the barista</span>
            </span>
            <button className="btn btn-brand btn-sm">Pair up</button>
          </div>
        </div>
      </div>
      <TabBar />
    </>
  );
}
