"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePhone } from "./Phone";
import Icon from "./Icons";
import { NavIcon, Svg, DECK_BUBBLE } from "./Shapes";

// ---------- primitives (Figma coordinates, 420 × 912) ----------

const FONTS = { serif: "var(--serif)", columba: "var(--columba)", dm: "var(--dm)", inter: "var(--inter)", ko: "var(--ko)" };

export function Box({ x, y, w, h, r, bg, style, children, ...rest }) {
  return <div {...rest} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, background: bg, ...style }}>{children}</div>;
}

// Text: font = serif | columba | dm | inter | ko ; size px ; lh px or % string ; w for wrapping/alignment.
export function T({ x, y, w, font = "dm", size = 15, weight = 400, color = "var(--ink-soft)", lh = "normal", ls, align, italic, style, children, as: Tag = "div", ...rest }) {
  return (
    <Tag {...rest} style={{
      position: x === undefined ? "static" : "absolute", left: x, top: y, width: w,
      fontFamily: FONTS[font], fontSize: size, fontWeight: weight, color, lineHeight: typeof lh === "number" ? `${lh}px` : lh,
      letterSpacing: ls, textAlign: align, fontStyle: italic ? "italic" : undefined,
      whiteSpace: w ? "pre-wrap" : "pre", ...style,
    }}>{children}</Tag>
  );
}

export function Photo({ x, y, w, h, r, src, style }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, overflow: "hidden", background: "#dadada", ...style }}>
      {src && <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
    </div>
  );
}

// Avatar: shows the photo when we have it, otherwise a quiet circle.
export function Avatar({ x, y, size, src, ring, style }) {
  const [ok, setOk] = useState(false);
  useEffect(() => { if (!src) return; const i = new Image(); i.onload = () => setOk(true); i.src = src; }, [src]);
  return (
    <div style={{ position: x === undefined ? "relative" : "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", overflow: "hidden", background: "#f0eee8", boxShadow: ring, flex: "none", ...style }}>
      {ok && <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
    </div>
  );
}
export const ME = "/images/av-37e486.jpg";
export const P2 = "/images/av-db155a.jpg";
export const P3 = "/images/av-8d5254.jpg";

// ---------- screen shell ----------

export function Screen({ bg = "#f3f4ef", nav, height = 912, children, overlay }) {
  const { height: ph } = usePhone();
  return (
    <div style={{ position: "absolute", inset: 0, background: bg }}>
      <div className="scroll">
        <div style={{ position: "relative", height: Math.max(height, nav ? ph : 0), minHeight: ph, overflow: "hidden" }}>{children}</div>
      </div>
      {nav && <NavNew active={nav} />}
      {overlay}
    </div>
  );
}

// ---------- Nav_New ----------

const TABS = [["Home", "/home", "home"], ["Lessons", "/", "lessons"], ["Flash cards", "/flashcards", "flash cards"], ["Community", "/community", "community"]];
export function NavNew({ active }) {
  return (
    <nav style={{ position: "absolute", left: 0, bottom: 0, width: 420, height: 88, background: "var(--paper)", borderTop: "1px solid var(--stone)", padding: "10px 12px 0", display: "flex", zIndex: 5 }}>
      {TABS.map(([name, href, label]) => {
        const on = name === active;
        return (
          <Link key={name} href={href} style={{ width: 99, height: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }} aria-current={on ? "page" : undefined}>
            <span style={{ width: 56, height: 32, borderRadius: 999, display: "grid", placeItems: "center", background: on ? "var(--yellow)" : "transparent", transition: "background .2s" }}>
              <NavIcon name={name} on={on} />
            </span>
            <T font="dm" size={10} weight={500} color="var(--plum)" lh={13}>{label}</T>
          </Link>
        );
      })}
    </nav>
  );
}

// ---------- components (match the Figma components) ----------

const BTN = {
  dark: { background: "var(--charcoal)", color: "var(--paper)" },
  brand: { background: "var(--plum)", color: "var(--paper)" },
  accent: { background: "var(--yellow)", color: "var(--plum)" },
  light: { background: "var(--paper)", color: "var(--plum)", boxShadow: "inset 0 0 0 1px var(--stone)" },
};
export function Button({ x, y, w = 372, label, kind = "dark", small, href, onClick, disabled, style }) {
  const s = {
    position: x === undefined ? "relative" : "absolute", left: x, top: y,
    height: small ? 40 : 56, width: small ? "auto" : w, padding: small ? "0 20px" : "0 24px",
    borderRadius: 999, display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--dm)", fontSize: 15, fontWeight: 500, whiteSpace: "nowrap", ...BTN[kind], ...style,
  };
  return href ? <Link href={href} className="press" style={s}>{label}</Link>
    : <button className="press" style={s} onClick={onClick} disabled={disabled}>{label}</button>;
}

export function Chip({ x, y, label, kind = "accent", style }) {
  const k = { accent: ["var(--yellow)", "var(--plum)"], brand: ["var(--plum)", "var(--paper)"], tag: ["var(--paper)", "var(--plum)"] }[kind];
  return (
    <span style={{ position: x === undefined ? "relative" : "absolute", left: x, top: y, height: 28, padding: "0 12px", borderRadius: 999, background: k[0], color: k[1], display: "inline-flex", alignItems: "center", whiteSpace: "nowrap",
      fontFamily: "var(--dm)", ...(kind === "tag" ? { fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" } : { fontSize: 13 }), ...style }}>{label}</span>
  );
}

export function BackLink({ x, y, href = "/", color = "var(--ink-soft)", label = "back" }) {
  return (
    <Link href={href} style={{ position: "absolute", left: x, top: y, height: 24, display: "flex", alignItems: "center", gap: 8, color }}>
      <T font="inter" size={20} color={color} lh={24}>←</T>
      <T font="dm" size={15} color={color} lh={20}>{label}</T>
    </Link>
  );
}

export function Segmented({ x, y, value }) {
  const item = (name, href) => {
    const on = value === name;
    return (
      <Link href={href} style={{ height: 32, padding: "0 16px", borderRadius: 999, display: "grid", placeItems: "center", background: on ? "var(--plum)" : "transparent", color: on ? "var(--paper)" : "var(--plum)", fontFamily: "var(--dm)", fontSize: 15, fontWeight: 500 }}>{name}</Link>
    );
  };
  return (
    <div style={{ position: "absolute", left: x, top: y, height: 42, padding: 4, border: "1px solid var(--stone)", borderRadius: 999, background: "#fff", display: "flex" }}>
      {item("Talk", "/community")}{item("Play", "/community/play")}
    </div>
  );
}

export function TextField({ x, y, w = 372, value, onChange, placeholder, filled, onSubmit, mic = true, send }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit && onSubmit(); }}
      style={{ position: x === undefined ? "relative" : "absolute", left: x, top: y, width: w, height: 56, borderRadius: 999, background: "#fff",
        boxShadow: filled ? "inset 0 0 0 1.5px var(--yellow)" : "inset 0 0 0 1px var(--stone)", display: "flex", alignItems: "center", gap: 8, padding: "0 8px 0 20px" }}>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, minWidth: 0, fontFamily: "var(--dm)", fontSize: 15, color: "var(--ink-soft)" }} />
      {(mic || send) && (
        <button type={send ? "submit" : "button"} aria-label={send ? "Send" : "Speak"} className="press"
          style={{ width: 40, height: 40, borderRadius: 999, background: "var(--plum)", color: "var(--paper)", display: "grid", placeItems: "center", flex: "none" }}>
          <Icon name={send ? "send" : "mic"} size={send ? 18 : 24} />
        </button>
      )}
    </form>
  );
}

export function Pill({ ko, en, on, onClick }) {
  return (
    <button onClick={onClick} className="press" style={{ height: 32, padding: "0 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4,
      background: on ? "var(--plum)" : "#fff", boxShadow: on ? "none" : "inset 0 0 0 1px var(--stone)" }}>
      <T font="dm" size={15} weight={500} color={on ? "var(--paper)" : "var(--plum)"} lh={20}>{ko}</T>
      <T font="dm" size={13} color={on ? "var(--paper)" : "var(--ash)"} lh={17}>{en}</T>
    </button>
  );
}

export function ChoiceTile({ x, y, label, on, onClick }) {
  return (
    <button onClick={onClick} role="radio" aria-checked={on} className="press" style={{ position: "absolute", left: x, top: y, width: 182, height: 64, borderRadius: 16, padding: "0 16px",
      background: on ? "var(--plum)" : "#fff", color: on ? "var(--paper)" : "var(--ink-soft)", fontFamily: "var(--dm)", fontSize: 15, display: "flex", alignItems: "center" }}>{label}</button>
  );
}

export function WordStack({ x, y, card, flipped, onFlip }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 372, height: 220 }}>
      <Box x={24} y={0} w={324} h={196} r={20} bg="var(--periwinkle)" />
      <Box x={12} y={12} w={348} h={196} r={20} bg="var(--lilac)" />
      <button onClick={onFlip} aria-label="Flip card" style={{ position: "absolute", left: 0, top: 24, width: 372, height: 196, borderRadius: 20, background: flipped ? "var(--plum)" : "var(--yellow)",
        padding: "18px 24px 16px", display: "flex", flexDirection: "column", gap: 4, transition: "background .25s" }}>
        {card.usual && <Chip label="Your usual" kind="tag" />}
        <span style={{ flex: 1 }} />
        {!flipped ? (<>
          <T font="ko" size={40} weight={500} lh={44} color="var(--plum)">{card.ko}</T>
          <T font="dm" size={17} weight={500} lh={22} color="var(--plum)">{card.full}</T>
          <T font="dm" size={13} lh={17} color="var(--plum)" style={{ opacity: .75 }}>{card.meaning}</T>
        </>) : (<>
          <T font="serif" size={24} lh={28} color="var(--paper)">{card.en}</T>
          <T font="dm" size={13} lh={17} color="var(--paper)" style={{ opacity: .8 }}>{card.note}</T>
        </>)}
      </button>
    </div>
  );
}

export function MenuRow({ x, y, word, meaning, full, due, onClick, on }) {
  return (
    <button onClick={onClick} style={{ position: "absolute", left: x, top: y, width: 372, height: 64, borderRadius: 16, background: "#fff", padding: "0 16px", display: "flex", alignItems: "center", gap: 12,
      boxShadow: on ? "inset 0 0 0 1.5px var(--plum)" : "none" }}>
      <span style={{ width: 88, flex: "none" }}><T font="ko" size={16} weight={500} color="var(--plum)" lh={24}>{word}</T></span>
      <span style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <T font="dm" size={15} weight={500} lh={20}>{meaning}</T>
        <T font="dm" size={13} lh={17} color="var(--ash)">{full}</T>
      </span>
      {due && <Chip label="due" />}
    </button>
  );
}

export function DeckBubble({ x, y, color, title, count, opacity, href }) {
  const inner = (
    <>
      <Svg w={184} h={164} d={DECK_BUBBLE} fill={color} />
      <T x={20} y={18} w={150} font="serif" size={24} lh={24} color="var(--plum)">{title}</T>
      {count && <T x={124} y={78} w={44} font="serif" size={44} lh={44} align="right" color="var(--plum)">{count}</T>}
    </>
  );
  const s = { position: "absolute", left: x, top: y, width: 184, height: 164, opacity, display: "block" };
  return href ? <Link href={href} className="press" style={s}>{inner}</Link> : <div style={s}>{inner}</div>;
}

export function GameCard({ x, y, color, ko, en, meta }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 182, height: 212 }}>
      <Svg w={182} h={213}>
        <rect width="182" height="186" rx="20" fill={color} />
        <path d="M30 185H60L30 213Z" fill={color} />
      </Svg>
      <div style={{ position: "absolute", left: 0, top: 0, width: 182, height: 186, padding: 16, display: "flex", flexDirection: "column", gap: 2 }}>
        <T font="ko" size={26} weight={500} lh={30} color="var(--plum)">{ko}</T>
        <T font="serif" size={20} lh={20} color="var(--plum)">{en}</T>
        <span style={{ flex: 1 }} />
        <T w={150} font="dm" size={13} lh={17} color="var(--plum)" style={{ opacity: .75 }}>{meta}</T>
      </div>
    </div>
  );
}

export function TopicCard({ x, y, topic, onNext }) {
  return (
    <div className="rise" key={topic.ko} style={{ position: "absolute", left: x, top: y, width: 372, borderRadius: 20, background: "var(--lilac)", padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <T font="dm" size={11} weight={600} ls="0.06em" color="var(--plum)" style={{ opacity: .75 }}>TOPIC · FROM JISOO</T>
        <button onClick={onNext}><T font="dm" size={13} color="var(--plum)">Next topic →</T></button>
      </div>
      <T font="ko" size={26} weight={500} lh="115%" color="var(--plum)">{topic.ko}</T>
      <T font="dm" size={13} color="var(--plum)" style={{ opacity: .75 }}>{topic.en}</T>
      <div style={{ background: "var(--paper)", borderRadius: 12, padding: "8px 12px" }}>
        <T font="dm" size={13} color="var(--plum)">{"Try:  " + topic.starter}</T>
      </div>
    </div>
  );
}

export function LiveQuestion({ x, y, q, onVote }) {
  const air = q.state === "on air";
  return (
    <div className="rise" style={{ position: "absolute", left: x, top: y, width: 372, height: 56, borderRadius: 16, background: "#fff", display: "flex", alignItems: "center", gap: 12, padding: "0 14px 0 8px",
      boxShadow: air ? "inset 0 0 0 2px var(--yellow)" : "none" }}>
      <button onClick={onVote} aria-label="Upvote" style={{ width: 40, height: 40, borderRadius: 12, background: q.voted ? "var(--plum)" : "var(--cream)", color: q.voted ? "var(--paper)" : "var(--plum)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: "none" }}>
        <T font="dm" size={10} weight={500} lh={12} color="inherit">▲</T>
        <T font="dm" size={15} weight={500} lh={18} color="inherit">{q.votes}</T>
      </button>
      <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <T font="dm" size={15} weight={500} lh={20} style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{q.q}</T>
        <T font="dm" size={13} lh={17} color="var(--ash)">{q.by}</T>
      </span>
      {air && <Chip label="on air" />}
    </div>
  );
}

export function Speaker({ x, y, name, role, src, speaking, vote, hand }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 104, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: 84, height: 84 }}>
        <div style={{ width: 84, height: 84, borderRadius: 30, overflow: "hidden", background: "var(--lilac)", boxShadow: speaking ? "0 0 0 4px var(--yellow)" : "none", transition: "box-shadow .2s" }}>
          {src && <AvatarFill src={src} />}
        </div>
        {vote && <span style={{ position: "absolute", left: -4, top: -4, width: 22, height: 22, borderRadius: 99, background: vote, boxShadow: "0 0 0 3px var(--paper)" }} />}
        {!speaking && <span style={{ position: "absolute", left: 62, top: 62, width: 28, height: 28, borderRadius: 99, background: "#fff", display: "grid", placeItems: "center", color: "var(--ash)" }}><Icon name="micOff" size={16} /></span>}
        {hand && <span style={{ position: "absolute", right: -8, top: -10, fontSize: 22 }}>✋</span>}
      </div>
      <T font="dm" size={15} weight={500} lh={20}>{name}</T>
      <T font="dm" size={10} weight={500} lh={13} color="var(--ash)">{role}</T>
    </div>
  );
}
function AvatarFill({ src }) {
  const [ok, setOk] = useState(false);
  useEffect(() => { const i = new Image(); i.onload = () => setOk(true); i.src = src; }, [src]);
  return ok ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null;
}

export function RoundLight({ x, y, icon, onClick, label }) {
  return (
    <button onClick={onClick} aria-label={label} className="press" style={{ position: "absolute", left: x, top: y, width: 48, height: 48, borderRadius: 99, background: "#fff", boxShadow: "inset 0 0 0 1px var(--stone)", display: "grid", placeItems: "center", color: "var(--plum)" }}>
      <Icon name={icon} />
    </button>
  );
}

export function MicToggle({ x, y, on, onClick }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 72, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <button onClick={onClick} aria-pressed={on} aria-label={on ? "Mute" : "Unmute"} className="press" style={{ width: 72, height: 72, borderRadius: 99, display: "grid", placeItems: "center",
        background: on ? "var(--yellow)" : "var(--charcoal)", color: on ? "var(--plum)" : "var(--paper)" }}>
        <Icon name={on ? "mic" : "micOff"} size={28} />
      </button>
      <T font="dm" size={10} weight={500} lh={13} color="var(--ash)">{on ? "mic on" : "mic off"}</T>
    </div>
  );
}

export function ChatMessage({ m }) {
  if (m.type === "mine") return (
    <div className="rise" style={{ alignSelf: "flex-end", maxWidth: 300, background: "var(--plum)", borderRadius: 16, padding: "10px 14px" }}>
      <T w={272} font="dm" size={15} lh={20} color="var(--paper)">{m.text}</T>
    </div>
  );
  const fix = m.type === "fix";
  return (
    <div className="rise" style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <span style={{ width: 28, height: 28, borderRadius: 99, flex: "none", background: fix ? "var(--periwinkle)" : m.c || "var(--stone)" }} />
      <div style={{ background: fix ? "var(--lilac)" : "#fff", borderRadius: 16, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 2, maxWidth: 318 }}>
        {fix ? (<>
          <T font="dm" size={11} weight={600} ls="0.06em" color="var(--plum)" style={{ opacity: .75 }}>{`✎ ${m.name.toUpperCase()} SUGGESTS A FIX FOR ${m.for.toUpperCase()}`}</T>
          <T font="dm" size={13} lh={17} color="var(--ash)" style={{ textDecoration: "line-through" }}>{m.original}</T>
          <T font="dm" size={15} weight={500} lh={20} color="var(--plum)">{m.corrected}</T>
          <T w={290} font="dm" size={13} lh={17} color="var(--plum)" style={{ opacity: .75 }}>{m.note}</T>
        </>) : (<>
          <T font="dm" size={13} lh={17} color="var(--ash)">{m.name}</T>
          <T w={290} font="dm" size={15} lh={20} style={{ width: "auto", maxWidth: 290 }}>{m.text}</T>
        </>)}
      </div>
    </div>
  );
}
