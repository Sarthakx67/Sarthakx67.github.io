import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "recruiter" | "engineer";

type Ctx = { mode: Mode; setMode: (m: Mode) => void; toggle: () => void };

const ModeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "portfolio-mode";

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("engineer");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Mode | null;
      if (stored === "recruiter" || stored === "engineer") setModeState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    try {
      window.localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, toggle: () => setMode(mode === "engineer" ? "recruiter" : "engineer") }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) return { mode: "engineer" as Mode, setMode: () => {}, toggle: () => {} };
  return ctx;
}
