"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Every screen is laid out in Figma's 420 × 912 units and zoomed to fit the device.
// On a phone it fills the screen; on a laptop it shows as a framed phone.
const Ctx = createContext({ height: 912 });
export const usePhone = () => useContext(Ctx);

export default function Phone({ children }) {
  const [fit, setFit] = useState({ zoom: 1, height: 912, framed: true });

  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth, h = window.innerHeight;
      if (w < 520) {
        const zoom = w / 420;
        setFit({ zoom, height: Math.round(h / zoom), framed: false });
      } else {
        setFit({ zoom: Math.min(1, (h - 48) / 912), height: 912, framed: true });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <main className="stage" style={{ background: fit.framed ? "#1d1c1b" : "#f3f4ef" }}>
      <div className={`phone ${fit.framed ? "framed" : ""}`} style={{ zoom: fit.zoom, height: fit.height }}>
        <Ctx.Provider value={{ height: fit.height }}>{children}</Ctx.Provider>
      </div>
    </main>
  );
}
