"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { movies, type Movie } from "@/lib/movie";
import VideoPlayer from "./VideoPlayer";

const GOLD_BRIGHT = "#ffd34d";
const GOLD_GLOW = "rgba(233, 156, 14, 0.55)";

function SearchGlyph({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [playing, setPlaying] = useState<Movie | null>(null);

  const handleClose = () => {
    setQuery("");
    setPlaying(null);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter(
      (m) => m.title.toLowerCase().includes(q) || (m.tag ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#0a0912" }}>
      <div
        className="flex items-center gap-3 border-b px-4 py-4"
        style={{ borderColor: "rgba(255,255,255,0.1)", paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <SearchGlyph className="h-4.5 w-4.5 flex-none" style={{ color: "rgba(245,243,238,0.5)" }} />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, moods, genres..."
          className="flex-1 bg-transparent font-body text-sm text-paper placeholder:text-paper-faint focus:outline-none"
        />
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close search"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <CloseIcon className="h-4 w-4 text-paper" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 pb-28">
        {results.length === 0 ? (
          <p className="mt-14 text-center font-mono text-xs uppercase tracking-wider text-paper-faint">
            No titles match &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {results.map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => setPlaying(movie)}
                className="group relative aspect-[2/3] overflow-hidden rounded-xl text-left transition-transform duration-200 active:scale-[0.97]"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 26px -10px ${GOLD_GLOW}` }}
              >
                <Image
                  src={movie.poster || movie.thumbnail}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 640px) 45vw, 30vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                {movie.tag && (
                  <span
                    className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white"
                    style={{ backgroundColor: "rgba(10,4,16,0.6)", border: `1px solid ${GOLD_BRIGHT}` }}
                  >
                    {movie.tag}
                  </span>
                )}
                <p className="absolute bottom-2 left-2 right-2 font-body text-[12.5px] font-medium leading-snug text-white">
                  {movie.title}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {playing && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-0 sm:p-6"
          onClick={() => setPlaying(null)}
        >
          <div
            className="relative aspect-video w-full max-w-3xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.1), 0 30px 80px -20px ${GOLD_GLOW}` }}
          >
            <VideoPlayer src={playing.hlsUrl} poster={playing.banner} onClose={() => setPlaying(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
