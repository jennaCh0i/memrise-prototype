"use client";
import { getSvgPath } from "figma-squircle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePhone } from "./Phone";
import Icon from "./Icons";
import { NavIcon, Svg, DECK_BUBBLE } from "./Shapes";

// ---------- primitives (Figma coordinates, 420 × 912) ----------

const FONTS = { serif: "var(--serif)", columba: "var(--columba)", dm: "var(--dm)", inter: "var(--inter)", ko: "var(--ko)" };

// iOS-style continuous corners (Figma corner smoothing 100%, as in the week 10 frames) for any fixed-size rounded box.
export function squircle(w, h, r) {
  if (typeof r !== "number" || typeof w !== "number" || typeof h !== "number" || r <= 0 || r >= Math.min(w, h) / 2) return undefined;
  return `path('${getSvgPath({ width: w, height: h, cornerRadius: r, cornerSmoothing: 1 })}')`;
}
export function Box({ x, y, w, h, r, bg, style, children, ...rest }) {
  return <div {...rest} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, clipPath: squircle(w, h, r), background: bg, ...style }}>{children}</div>;
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
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, clipPath: squircle(w, h, r), overflow: "hidden", background: "#dadada", ...style }}>
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

const TABS = [["Home", "/home", "home"], ["Lessons", "/", "lessons"], ["Flash cards", "/flashcards", "memrise"], ["Community", "/community", "community"]];
// Exact icons exported from week 10 › "With this" › Group 26 (18px glyphs)
const NAV_ICONS = {
  Home: { w: 18, h: 17, d: ["M9 0C10.1598 0 11.0933 0.93314 12.96 2.7998L16.3594 6.19922C17.1685 7.00837 17.5739 7.41329 17.7871 7.92773C18.0002 8.44225 18 9.01485 18 10.1592V11.2402C18 13.8798 17.9997 15.1995 17.1797 16.0195C16.5086 16.6907 15.5029 16.8099 13.7129 16.832C13.4913 16.8051 13.3995 16.6974 13.3994 16.5068V12.8398C9.84107 15.6164 6.99744 16.712 3.93555 16.8281C2.36296 16.793 1.44618 16.6454 0.820312 16.0195C0.000252187 15.1995 3.06302e-09 13.8798 1.06638e-09 11.2402V10.1592C2.29412e-09 9.01485 -0.000230491 8.44225 0.212891 7.92773C0.426055 7.41329 0.831472 7.00837 1.64062 6.19922L5.04004 2.7998C6.90671 0.933138 7.8402 3.53183e-09 9 0Z"] },
  Lessons: { w: 18, h: 15, d: [
    "M17.9999 10.9706C17.9999 12.0752 17.1045 12.9706 15.9999 12.9706H15.1764C13.3289 12.9706 11.6556 13.4594 9.5293 14.8235V2.94606C9.5293 2.26487 9.87118 1.62112 10.4673 1.29153C12.167 0.351866 13.609 0 15.1764 0H15.9999C17.1045 0 17.9999 0.895431 17.9999 2V10.9706Z",
    "M0.000114441 10.9706C0.000114441 12.0752 0.895545 12.9706 2.00011 12.9706H2.82364C4.67107 12.9706 6.34443 13.4594 8.4707 14.8235V2.94606C8.4707 2.26487 8.12882 1.62112 7.53268 1.29153C5.83305 0.351866 4.39099 0 2.82364 0H2.00011C0.895545 0 0.000114441 0.895431 0.000114441 2V10.9706Z"] },
  "Flash cards": { w: 18, h: 18, d: [
    "M10.9951 16.002C10.9289 16.0005 10.8614 16 10.7939 16C9.00562 16.0001 7.38542 16.5277 5.32715 18V16.167C5.32715 16.0559 5.25954 16 5.09082 16H5C2.64298 16 1.46465 15.9998 0.732422 15.2676C0.000188828 14.5353 0 13.357 0 11V9C0 6.64298 0.000188828 5.46465 0.732422 4.73242C1.46465 4.00019 2.64298 4 5 4H10C12.357 4 13.5353 4.00019 14.2676 4.73242C14.9998 5.46465 15 6.64298 15 9V11C15 13.357 14.9998 14.5353 14.2676 15.2676C13.5353 15.9998 12.357 16 10 16H11L10.9951 16.002Z",
    "M10 4C12.357 4 13.5353 4.00019 14.2676 4.73242C14.9998 5.46465 15 6.64298 15 9V11C15 11.3478 14.9985 11.6699 14.9961 11.9688C14.4442 11.9961 13.7881 12 13 12H8C5.64298 12 4.46465 11.9998 3.73242 11.2676C3.00019 10.5353 3 9.35702 3 7V5C3 4.65182 3.00056 4.32937 3.00293 4.03027C3.55504 4.00283 4.21149 4 5 4H10ZM13 0C15.357 0 16.5353 0.000190259 17.2676 0.732422C17.9998 1.46465 18 2.64298 18 5V7C18 9.35702 17.9998 10.5353 17.2676 11.2676C16.949 11.5862 16.5458 11.7655 15.998 11.8672C15.9997 11.5912 16 11.302 16 11V9C16 7.84993 16.002 6.88685 15.8994 6.12402C15.7929 5.33235 15.5574 4.60822 14.9746 4.02539C14.3918 3.44256 13.6677 3.20709 12.876 3.10059C12.1132 2.99802 11.1501 3 10 3H5C4.26567 3 3.60771 3.0022 3.0293 3.02832C3.08264 1.9152 3.2414 1.22344 3.73242 0.732422C4.46465 0.00018914 5.64298 0 8 0H13Z"] },
  Community: { w: 18, h: 15, d: [
    "M2 3C2 3.79565 2.31607 4.55871 2.87868 5.12132C3.44129 5.68393 4.20435 6 5 6C5.79565 6 6.55871 5.68393 7.12132 5.12132C7.68393 4.55871 8 3.79565 8 3C8 2.20435 7.68393 1.44129 7.12132 0.87868C6.55871 0.31607 5.79565 0 5 0C4.20435 0 3.44129 0.31607 2.87868 0.87868C2.31607 1.44129 2 2.20435 2 3Z",
    "M10 3C10 3.79565 10.3161 4.55871 10.8787 5.12132C11.4413 5.68393 12.2044 6 13 6C13.7956 6 14.5587 5.68393 15.1213 5.12132C15.6839 4.55871 16 3.79565 16 3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.31607 13.7956 0 13 0C12.2044 0 11.4413 0.31607 10.8787 0.87868C10.3161 1.44129 10 2.20435 10 3Z",
    "M0 14.9999V11.7272C0 7.96357 3.27273 6.81812 6.87273 6.81812H11.1273C14.7273 6.81812 18 7.96357 18 11.7272V14.9999H0Z"] },
};
// Tab centres inside the 384×68 bar (from Figma)
const TAB_X = [57.4, 145.75, 231.1, 317];

// Floating glass tab bar — week 10 "With this": 384×68 at left 18, #E1DED1 @70%, r20 / 100% smoothing, Glass effect.
export function NavNew({ active }) {
  const W = 384, H = 68;
  return (
    <>
      {/* bottom fade behind the bar (Figma "Rectangle 52") */}
      <div aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 142, zIndex: 4, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FEFFF8 71%, #FEFFF8 100%)" }} />
      <nav style={{ position: "absolute", left: 18, bottom: 25, width: W, height: H, zIndex: 5, clipPath: squircle(W, H, 20), borderRadius: 20,
        background: "rgba(225, 222, 209, 0.7)", backdropFilter: "blur(4px) saturate(1.5)", WebkitBackdropFilter: "blur(4px) saturate(1.5)",
        boxShadow: "inset 1.5px 1.5px 0 rgba(255,255,255,.7), inset -1px -1px 0 rgba(255,255,255,.3)" }}>
        {TABS.map(([name, href, label], i) => {
          const on = name === active;
          const c = on ? "#430B27" : "#FEFFF8";
          const ic = NAV_ICONS[name];
          return (
            <Link key={name} href={href} aria-current={on ? "page" : undefined}
              style={{ position: "absolute", left: TAB_X[i] - 40, top: 0, width: 80, height: H, color: c }}>
              <svg width={ic.w} height={ic.h} viewBox={`0 0 ${ic.w} ${ic.h}`} fill="currentColor"
                style={{ position: "absolute", left: 40 - ic.w / 2, top: 37.5 - ic.h }}>
                {ic.d.map((d, k) => <path key={k} d={d} />)}
              </svg>
              <span style={{ position: "absolute", left: 0, top: 40, width: 80, textAlign: "center", fontFamily: "var(--dm)", fontSize: 9, fontWeight: 500,
                letterSpacing: "-0.02em", lineHeight: "12px", color: c }}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
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
