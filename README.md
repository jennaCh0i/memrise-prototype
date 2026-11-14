# Memrise · Korean for real life — week 9 prototype

A phone-sized web prototype of the Memrise rebrand (Jenna Choi, ArtCenter).
Design source: Figma `JennaChoi_CD5-VXD` → page **week9** and **🧩 Components**.

## What works
- **Lessons** — Lesson 01 · Today → **Make it yours** (type or say your drink, see it in Korean live, pick who you're with) → Situation detail rebuilt around your order.
- **Flash cards** — deck grid → *coffee order* stack: tap to flip, Again / Got it. Your drink from the lesson becomes the "your usual" card.
- **Play** — live room entry, word games, practice together.
- **Community** — feed → **live room**: topic card, upvotable questions, raise hand, mic, chat with quick-help phrases and *suggest a fix*.
- **Home** — streak, dates, today's lesson, review.

## Photos
Photo slots show a warm placeholder until images exist. Add these to `public/images/`:

| file | what |
|---|---|
| `barista.jpg` | the café barista photo (lesson hero) |
| `me.jpg` | your avatar |
| `jisoo.jpg`, `mina.jpg`, `leo.jpg` | community avatars |

On GitHub: open `public/images` → **Add file → Upload files** → commit. Vercel redeploys automatically.

## Run locally
```bash
npm install
npm run dev
```

## Design tokens
`app/globals.css` mirrors the Figma variables (`--color-bg-brand`, `--radius-md`, `--spacing-lg` …), so names match between design and code.

## Fonts
- **FAIRE Octave** — all serif text (`--font-serif`)
- **Columba Text** — numbers. Loaded as "Columba Numerals" with a digits-only unicode-range, so any number inside serif text switches to Columba automatically.
- DM Sans + Noto Sans KR (Google Fonts) for UI text and Korean.

Columba Text is a **trial** font (and check FAIRE Octave's licence too): fine for a class or portfolio prototype, but buy a web licence before using it on a public product.
