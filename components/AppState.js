"use client";
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
const KEY = "memrise-proto-v1";

export function AppState({ children }) {
  const [state, setState] = useState({ drink: "", who: "me" });

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (saved) setState((s) => ({ ...s, ...saved }));
    } catch {}
  }, []);

  const update = (patch) =>
    setState((s) => {
      const next = { ...s, ...patch };
      try { sessionStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });

  return <Ctx.Provider value={{ ...state, update }}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
