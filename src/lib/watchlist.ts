"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "moodx:watchlist";

function readStoredIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

let cached: string[] = readStoredIds();
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cached = readStoredIds();
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return cached;
}

function getServerSnapshot() {
  return cached;
}

function writeIds(next: string[]) {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable (private mode etc.) — fail silently.
  }
  listeners.forEach((l) => l());
}

/**
 * Frontend-only "My List" — persists to localStorage so it survives
 * refreshes without needing any backend/API. Reads through
 * useSyncExternalStore so it stays hydration-safe.
 */
export function useWatchlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const current = readStoredIds();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    writeIds(next);
  }, []);

  const isSaved = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, ready: true, toggle, isSaved };
}
