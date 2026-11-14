# Memrise · Korean for real life — week 9 prototype

A phone-sized web prototype of the Memrise rebrand (Jenna Choi, ArtCenter).
Design source: Figma `JennaChoi_CD5-VXD` → page **week9** and **🧩 Components**.

## What works
Every screen is laid out 1:1 from the Figma week9 frames (420 × 912 units, zoomed to the device), using the SVG shapes exported from Figma (speech bubbles, hero curves, wordmark, Nav_New icons).
- **Home**, **Lessons** (Tab / Lessons → Make it yours → Situation detail)
- **Flash cards** → *coffee order* stack (tap the card to flip, tap a menu word to bring it to the front)
- **Community** with a **Talk / Play** switch → **Korean speaking room** (next topic, upvotes, ask a question, raise hand, mic, chat with quick help + suggest a fix)

## Photos
Photo slots show a warm placeholder until images exist. Add these to `public/images/`:

| file | what |
|---|---|
| `barista.jpg` | the café barista photo (lesson hero) |
| `av-37e486.jpg`, `av-db155a.jpg`, `av-8d5254.jpg` | avatars (missing ones show as a plain circle) |

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
