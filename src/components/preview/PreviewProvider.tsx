"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SearchScope } from "@/data/site";
import styles from "./PreviewProvider.module.css";

/**
 * Shared client state for the single-page preview.
 *
 * Three jobs, all deliberately local:
 *  1. `announce` — one polite live region for every "not connected in this
 *     preview" message, so unimplemented destinations are honest and audible
 *     rather than dead links or fake successes.
 *  2. `favorites` — demo-only saved ads, held in memory. No account, no
 *     persistence, no network.
 *  3. `search` — the header's category search, read by the category directory.
 */

export type SearchState = { scope: SearchScope; query: string; nonce: number };

type PreviewContextValue = {
  announce: (message: string) => void;
  notConnected: (label: string) => void;
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string, label: string) => void;
  search: SearchState;
  setSearch: (next: { scope: SearchScope; query: string }) => void;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

export function usePreview(): PreviewContextValue {
  const ctx = useContext(PreviewContext);
  if (!ctx) {
    throw new Error("usePreview must be used inside <PreviewProvider>");
  }
  return ctx;
}

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearchState] = useState<SearchState>({
    scope: "all",
    query: "",
    nonce: 0,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback((next: string) => {
    setMessage(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 6000);
  }, []);

  const notConnected = useCallback(
    (label: string) => {
      announce(
        `“${label}” isn’t connected in this preview — it needs the live Dunlop & Butler service.`,
      );
    },
    [announce],
  );

  const toggleFavorite = useCallback(
    (id: string, label: string) => {
      setFavorites((current) => {
        const has = current.includes(id);
        announce(
          has
            ? `Removed ${label} from saved ads. Saving is demo-only in this preview.`
            : `Saved ${label}. Saving is demo-only in this preview and resets on reload.`,
        );
        return has ? current.filter((x) => x !== id) : [...current, id];
      });
    },
    [announce],
  );

  const setSearch = useCallback(
    (next: { scope: SearchScope; query: string }) => {
      setSearchState((current) => ({ ...next, nonce: current.nonce + 1 }));
    },
    [],
  );

  const value = useMemo<PreviewContextValue>(
    () => ({
      announce,
      notConnected,
      favorites,
      isFavorite: (id: string) => favorites.includes(id),
      toggleFavorite,
      search,
      setSearch,
    }),
    [announce, notConnected, favorites, toggleFavorite, search, setSearch],
  );

  return (
    <PreviewContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="visually-hidden">
        {message}
      </div>
      <div className={styles.toastWrap} aria-hidden="true">
        {message ? <p className={styles.toast}>{message}</p> : null}
      </div>
    </PreviewContext.Provider>
  );
}
