// Memrise type system — built on Apple's iOS text styles (HIG › Typography, default "Large" size).
// Sizes + line heights follow Apple's Dynamic Type table; letter-spacing follows Apple's tracking tables:
//   • DM Sans (UI sans)            → SF Pro tracking
//   • FAIRE Octave (serif) and Columba (numbers, via the serif stack) → New York tracking
//   • Noto Sans KR (Korean)        → Apple sizes, roomier leading for Hangul, no added tracking
// Every text in the app snaps to one of these steps. Nothing goes below Apple's 11 pt minimum
// except the tab-bar label (10 pt, as iOS tab bars do).

export const TYPE = {
  serif: {
    80: { lh: 80, ls: -0.016, role: "Display XL — countdown number" },
    48: { lh: 52, ls: -0.014, role: "Display — hero titles" },
    40: { lh: 46, ls: -0.014, role: "Large title (expressive) — tab titles, big stats" },
    34: { lh: 41, ls: -0.014, role: "Large Title — screen headings" },
    28: { lh: 34, ls: -0.012, role: "Title 1" },
    24: { lh: 29, ls: -0.011, role: "Title 2 — card titles" },
    20: { lh: 25, ls: -0.010, role: "Title 3" },
    17: { lh: 22, ls: -0.004, role: "Headline — quotes, italics" },
    16: { lh: 20, ls: -0.002, role: "Callout — tile labels" },
    14: { lh: 18, ls: 0.002, role: "Tile label, long words" },
  },
  dm: {
    22: { lh: 28, ls: -0.012, role: "Title 2" },
    20: { lh: 25, ls: -0.023, role: "Title 3" },
    17: { lh: 22, ls: -0.026, role: "Body / Headline" },
    16: { lh: 21, ls: -0.020, role: "Callout" },
    15: { lh: 20, ls: -0.016, role: "Subhead — rows, buttons" },
    13: { lh: 18, ls: -0.006, role: "Footnote" },
    12: { lh: 16, ls: 0, role: "Caption 1 — eyebrows" },
    11: { lh: 13, ls: 0.006, role: "Caption 2 — tags (Apple minimum)" },
    10: { lh: 12, ls: 0.012, role: "Tab bar label" },
  },
  ko: {
    52: { lh: 62, ls: -0.01, role: "Korean display — sound cards" },
    40: { lh: 52, ls: -0.01, role: "Korean line — scene sentence" },
    28: { lh: 36, ls: -0.01, role: "Korean title" },
    24: { lh: 32, ls: -0.01, role: "Korean title 2" },
    20: { lh: 27, ls: 0, role: "Korean title 3" },
    17: { lh: 24, ls: 0, role: "Korean body" },
    15: { lh: 21, ls: 0, role: "Korean subhead" },
    13: { lh: 18, ls: 0, role: "Korean footnote" },
    12: { lh: 17, ls: 0, role: "Korean caption" },
  },
};
TYPE.columba = TYPE.serif;
export const CAPS_TRACKING = 0.06; // all-caps labels (eyebrows, tags)

const STEPS = {
  serif: (s) => (s >= 64 ? 80 : s >= 46 ? 48 : s >= 38 ? 40 : s >= 31 ? 34 : s >= 27 ? 28 : s >= 22 ? 24 : s >= 18.5 ? 20 : s >= 16.5 ? 17 : s >= 15 ? 16 : 14),
  dm: (s) => (s >= 21 ? 22 : s >= 19 ? 20 : s >= 16.5 ? 17 : s >= 15.5 ? 16 : s >= 14 ? 15 : s >= 12.5 ? 13 : s >= 11.5 ? 12 : 11),
  ko: (s) => (s >= 46 ? 52 : s >= 34 ? 40 : s >= 25.5 ? 28 : s >= 22 ? 24 : s >= 18.5 ? 20 : s >= 16 ? 17 : s >= 14 ? 15 : s >= 12.5 ? 13 : 12),
};
STEPS.columba = STEPS.serif;

/** Style for a text in the system. `stacked` = multi-line display title (tight 1.0 leading); `caps` = all-caps label. */
export function type(font = "dm", size = 15, { stacked = false, caps = false, tab = false } = {}) {
  const step = tab ? 10 : (STEPS[font] || STEPS.dm)(size);
  const t = (TYPE[font] || TYPE.dm)[step];
  return {
    fontSize: step,
    lineHeight: `${stacked ? step : t.lh}px`,
    letterSpacing: `${caps ? CAPS_TRACKING : t.ls}em`,
  };
}
