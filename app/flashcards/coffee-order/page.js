"use client";
import { useState } from "react";
import { Screen, T, Avatar, ME, WordStack, MenuRow } from "@/components/ui";
import { Wordmark } from "@/components/Shapes";

// Flash cards / 01 · Coffee orders
const CARDS = [
  { ko: "아아", full: "아이스 아메리카노", meaning: "iced americano · what everyone actually says", en: "iced americano", note: "Short for 아이스 아메리카노 — what everyone actually says at the counter.", usual: true },
  { ko: "따아", full: "따뜻한 아메리카노", meaning: "hot americano", en: "hot americano", note: "따뜻한 = warm. Shortened the same way as 아아.", due: true },
  { ko: "라떼", full: "ra-tte", meaning: "latte", en: "latte", note: "Add 아이스 in front for an iced one.", due: true },
  { ko: "샌드위치", full: "saen-deu-wi-chi", meaning: "sandwich", en: "sandwich", note: "Point and say 이거 주세요 — this one, please." },
  { ko: "포장이요", full: "po-jang-i-yo", meaning: "to go, please", en: "to go, please", note: "The answer to 드시고 가세요? (eating here?)", due: true },
  { ko: "매장이요", full: "mae-jang-i-yo", meaning: "for here", en: "for here", note: "매장 = the shop itself." },
  { ko: "사이즈 업", full: "sa-i-jeu eop", meaning: "size up", en: "size up", note: "Most chains charge ₩500 extra." },
];

export default function CoffeeOrders() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  return (
    <Screen bg="#f7f6f2" nav="Flash cards" height={1049}>
      <Wordmark />
      <Avatar x={348} y={90} size={49} src={ME} />
      <T x={26} y={150} font="serif" size={44} lh={44}>coffee order</T>
      <div style={{ position: "absolute", left: 26, top: 199, lineHeight: "30px", whiteSpace: "pre", color: "var(--plum)", fontFamily: "var(--serif)" }}>
        <span style={{ fontSize: 30 }}>3</span><span style={{ fontSize: 26 }}> </span><span style={{ fontSize: 20 }}>due today</span>
      </div>
      <WordStack x={24} y={244} card={CARDS[i]} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
      <T x={24} y={484} font="dm" size={13} lh={17} color="var(--ash)">On the menu · 7 more words</T>
      {CARDS.slice(1).map((c, k) => (
        <MenuRow key={c.ko} x={24} y={513 + k * 72} word={c.ko} meaning={c.meaning} full={c.full} due={c.due}
          on={i === k + 1} onClick={() => { setI(i === k + 1 ? 0 : k + 1); setFlipped(false); }} />
      ))}
    </Screen>
  );
}
