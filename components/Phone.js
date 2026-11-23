"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Shortcuts from "@/components/Shortcuts";
import { getSvgPath } from "figma-squircle";

// Every screen is laid out in Figma's 420 × 912 units and zoomed to fit the device.
// On a phone it fills the screen; on a laptop it shows as a plain 420-wide screen with shortcuts on the left.
const Ctx = createContext({ height: 912 });
export const usePhone = () => useContext(Ctx);

export default function Phone({ children }) {
  const [fit, setFit] = useState({ zoom: 1, height: 912, framed: true });

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      // Home-screen app on iPhone: iOS reports a window shorter than the screen
      // (it leaves out the status bar / home indicator). Use the full screen height there.
      const standalone = window.navigator.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
      const h = standalone ? Math.max(window.screen.height, window.innerHeight) : window.innerHeight;
      if (w < 520) {
        const zoom = w / 420;
        setFit({ zoom, height: Math.round(h / zoom), framed: false, screenH: h });
      } else {
        setFit({ zoom: Math.min(1, (h - 32) / 912), height: 912, framed: true });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <main className="stage" style={fit.framed ? { background: "#1d1c1b", paddingLeft: 260 } : { background: "#f7f6f2", height: fit.screenH, placeItems: "start center" }}>
      {fit.framed && <Shortcuts />}
      {/* Desktop: iOS-style corners — radius 30, 100% corner smoothing */}
      <div className="phone" style={{ zoom: fit.zoom, height: fit.height,
        ...(fit.framed ? { clipPath: `path('${getSvgPath({ width: 420, height: fit.height, cornerRadius: 30, cornerSmoothing: 1 })}')` } : {}) }}>
        <Ctx.Provider value={{ height: fit.height }}>{children}</Ctx.Provider>
      </div>
    </main>
  );
}
