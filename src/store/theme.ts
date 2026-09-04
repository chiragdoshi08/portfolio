import { create } from "zustand";

type ThemeState = { dark: boolean; toggle: () => void };

function readInitial(): boolean {
  return document.documentElement.classList.contains("dark");
}

export const useTheme = create<ThemeState>((set, get) => ({
  dark: readInitial(),
  toggle: () => {
    const next = !get().dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    set({ dark: next });
  },
}));
