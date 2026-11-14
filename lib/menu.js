// Tiny café dictionary for the "Make it yours" live Korean preview.
// Phrases are matched longest-first, so "iced americano" wins over "americano".

const DICT = {
  "iced americano": { ko: "아이스 아메리카노", rom: "a-i-seu a-me-ri-ka-no", slang: "아아" },
  "ice americano": { ko: "아이스 아메리카노", rom: "a-i-seu a-me-ri-ka-no", slang: "아아" },
  "hot americano": { ko: "따뜻한 아메리카노", rom: "tta-tteu-tan a-me-ri-ka-no", slang: "따아" },
  "sweet potato latte": { ko: "고구마 라떼", rom: "go-gu-ma ra-tte" },
  "green tea latte": { ko: "녹차 라떼", rom: "nok-cha ra-tte" },
  "hot chocolate": { ko: "핫초코", rom: "hat-cho-ko" },
  "cold brew": { ko: "콜드브루", rom: "kol-deu-beu-ru" },
  "flat white": { ko: "플랫화이트", rom: "peul-laet-hwa-i-teu" },
  "extra shot": { ko: "샷 추가", rom: "syat chu-ga" },
  "less sweet": { ko: "덜 달게", rom: "deol dal-ge" },
  "no ice": { ko: "얼음 빼고", rom: "eo-reum ppae-go" },
  "less ice": { ko: "얼음 적게", rom: "eo-reum jeok-ge" },
  "to go": { ko: "포장", rom: "po-jang" },
  "size up": { ko: "사이즈 업", rom: "sa-i-jeu eop" },
  americano: { ko: "아메리카노", rom: "a-me-ri-ka-no" },
  latte: { ko: "라떼", rom: "ra-tte" },
  cafe: { ko: "카페", rom: "ka-pe" },
  "café": { ko: "카페", rom: "ka-pe" },
  iced: { ko: "아이스", rom: "a-i-seu" },
  ice: { ko: "아이스", rom: "a-i-seu" },
  hot: { ko: "따뜻한", rom: "tta-tteu-tan" },
  warm: { ko: "따뜻한", rom: "tta-tteu-tan" },
  vanilla: { ko: "바닐라", rom: "ba-nil-la" },
  caramel: { ko: "카라멜", rom: "ka-ra-mel" },
  hazelnut: { ko: "헤이즐넛", rom: "he-i-jeul-neot" },
  oat: { ko: "오트", rom: "o-teu" },
  soy: { ko: "두유", rom: "du-yu" },
  almond: { ko: "아몬드", rom: "a-mon-deu" },
  milk: { ko: "우유", rom: "u-yu" },
  cappuccino: { ko: "카푸치노", rom: "ka-pu-chi-no" },
  mocha: { ko: "모카", rom: "mo-ka" },
  macchiato: { ko: "마키아토", rom: "ma-ki-a-to" },
  espresso: { ko: "에스프레소", rom: "e-seu-peu-re-so" },
  decaf: { ko: "디카페인", rom: "di-ka-pe-in" },
  matcha: { ko: "말차", rom: "mal-cha" },
  tea: { ko: "티", rom: "ti" },
  chai: { ko: "차이", rom: "cha-i" },
  smoothie: { ko: "스무디", rom: "seu-mu-di" },
  lemonade: { ko: "레모네이드", rom: "re-mo-ne-i-deu" },
  ade: { ko: "에이드", rom: "e-i-deu" },
  juice: { ko: "주스", rom: "ju-seu" },
  strawberry: { ko: "딸기", rom: "ttal-gi" },
  banana: { ko: "바나나", rom: "ba-na-na" },
  grapefruit: { ko: "자몽", rom: "ja-mong" },
  lemon: { ko: "레몬", rom: "re-mon" },
  chocolate: { ko: "초코", rom: "cho-ko" },
  water: { ko: "물", rom: "mul" },
  large: { ko: "라지", rom: "ra-ji" },
  big: { ko: "큰", rom: "keun" },
  small: { ko: "스몰", rom: "seu-mol" },
  sandwich: { ko: "샌드위치", rom: "saen-deu-wi-chi" },
  bagel: { ko: "베이글", rom: "be-i-geul" },
  croissant: { ko: "크루아상", rom: "keu-ru-a-sang" },
  cake: { ko: "케이크", rom: "ke-i-keu" },
  cookie: { ko: "쿠키", rom: "ku-ki" },
};

const KEYS = Object.keys(DICT).sort((a, b) => b.split(" ").length - a.split(" ").length || b.length - a.length);

// Returns { ko, rom, slang, unknown[] } or null for empty input.
export function translate(input) {
  const words = input.toLowerCase().replace(/[^a-zà-ÿ\s]/g, " ").split(/\s+/).filter(Boolean)
    .filter((w) => !["a", "an", "one", "please", "with", "and", "the", "of", "cup"].includes(w));
  if (!words.length) return null;
  const ko = [], rom = [], unknown = [];
  let slang = null;
  let i = 0;
  while (i < words.length) {
    let hit = null;
    for (const key of KEYS) {
      const parts = key.split(" ");
      if (words.slice(i, i + parts.length).join(" ") === key) { hit = key; break; }
    }
    if (hit) {
      const e = DICT[hit];
      ko.push(e.ko); rom.push(e.rom);
      if (e.slang && words.length <= 3) slang = e.slang;
      i += hit.split(" ").length;
    } else {
      unknown.push(words[i]); ko.push(words[i]); rom.push(words[i]);
      i += 1;
    }
  }
  return { ko: ko.join(" "), rom: rom.join(" "), slang, unknown };
}

// Full line to say at the counter, polite (해요체) or extra-polite for elders.
export function orderLine(t, who) {
  if (!t) return null;
  const item = t.slang || t.ko;
  const formal = who === "older";
  return {
    ko: `${item} 하나 ${formal ? "주시겠어요?" : "주세요."}`,
    rom: `${t.slang ? t.slang === "아아" ? "a-a" : "tta-a" : t.rom} ha-na ${formal ? "ju-si-ge-sseo-yo?" : "ju-se-yo."}`,
  };
}

export const SUGGESTIONS = [
  { ko: "아아", en: "iced americano", value: "iced americano" },
  { ko: "라떼", en: "latte", value: "latte" },
  { ko: "따아", en: "hot americano", value: "hot americano" },
  { ko: "바닐라 라떼", en: "vanilla latte", value: "vanilla latte" },
];
