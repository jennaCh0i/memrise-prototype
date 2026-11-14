"use client";
import { useEffect, useState } from "react";

// Photo with an initials fallback, so the prototype still looks right before photos are added to /public/images.
// The photo is only shown once it has actually loaded, so a missing file never shows a broken-image icon.
export default function Avatar({ src, initials, size = 40, radius = "50%", color = "var(--lilac)", style }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setLoaded(true);
    img.src = src;
    return () => { alive = false; };
  }, [src]);

  return (
    <span
      style={{
        width: size, height: size, borderRadius: radius, background: color, flex: "none",
        display: "inline-grid", placeItems: "center", overflow: "hidden", position: "relative",
        color: "var(--plum)", fontFamily: "var(--font-serif)", fontSize: size * 0.32, ...style,
      }}
    >
      {initials}
      {loaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      )}
    </span>
  );
}
