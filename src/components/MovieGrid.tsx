"use client";

import { useState } from "react";
import Image from "next/image";
import { movies, type Movie } from "@/lib/movie";
import { useWatchlist } from "@/lib/watchlist";
import VideoPlayer from "./VideoPlayer";

const HOT_PINK = "#e99c0e";
const HOT_PINK_BRIGHT = "#ffd34d";
const HOT_PINK_GLOW = "rgba(233, 156, 14, 0.65)";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-black">
      <path d="M7 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 7 5.5Z" fill="currentColor" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M6 4.5h12a1 1 0 0 1 1 1V20l-7-4-7 4V5.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

export default function MovieGrid({ items }: { items?: Movie[] }) {
  const [active, setActive] = useState<Movie | null>(null);
  const { isSaved, toggle } = useWatchlist();
  const list = items ?? movies;

  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((movie) => (
          <button
            key={movie.id}
            onClick={() => setActive(movie)}
            className="group relative aspect-[2/3] overflow-hidden rounded-xl bg-black/40 text-left transition-all duration-300 hover:-translate-y-2"
            style={{
              boxShadow: `
                inset 0 1.5px 0 ${HOT_PINK_BRIGHT},
                inset -1.5px 0 0 ${HOT_PINK},
                inset 1px 0 0 rgba(255,255,255,0.12),
                0 20px 34px -10px ${HOT_PINK_GLOW}
              `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                inset 0 2px 0 ${HOT_PINK_BRIGHT},
                inset -2px 0 0 ${HOT_PINK_BRIGHT},
                inset 1px 0 0 rgba(255,255,255,0.25),
                0 26px 46px -8px ${HOT_PINK_GLOW}
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                inset 0 1.5px 0 ${HOT_PINK_BRIGHT},
                inset -1.5px 0 0 ${HOT_PINK},
                inset 1px 0 0 rgba(255,255,255,0.12),
                0 20px 34px -10px ${HOT_PINK_GLOW}
              `;
            }}
          >
            {/* bright glowing accent blob in the top-right corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle, ${HOT_PINK_BRIGHT}, transparent 70%)` }}
            />

            <Image
              src={movie.thumbnail}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

            {movie.tag && (
              <span
                className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white"
                style={{
                  backgroundColor: "rgba(10,4,16,0.6)",
                  border: `1px solid ${HOT_PINK_BRIGHT}`,
                  boxShadow: `0 0 12px -2px ${HOT_PINK_GLOW}`,
                }}
              >
                {movie.tag}
              </span>
            )}

            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                toggle(movie.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  e.preventDefault();
                  toggle(movie.id);
                }
              }}
              aria-label={isSaved(movie.id) ? "Remove from My List" : "Add to My List"}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
              style={{
                backgroundColor: "rgba(10,4,16,0.65)",
                border: `1px solid ${isSaved(movie.id) ? HOT_PINK_BRIGHT : "rgba(255,255,255,0.35)"}`,
                color: isSaved(movie.id) ? HOT_PINK_BRIGHT : "#f5f3ee",
              }}
            >
              <BookmarkIcon filled={isSaved(movie.id)} />
            </span>

            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "rgba(10,4,16,0.4)" }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${HOT_PINK_BRIGHT}, ${HOT_PINK})`,
                  boxShadow: `0 0 30px 6px ${HOT_PINK_GLOW}`,
                }}
              >
                <PlayIcon />
              </span>
            </div>

            <p className="absolute bottom-2 left-2.5 right-2.5 font-body text-[13px] font-medium leading-snug text-white">
              {movie.title}
            </p>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl"
            style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.1), 0 30px 80px -20px ${HOT_PINK_GLOW}` }}
          >
            <VideoPlayer
              src={active.hlsUrl}
              poster={active.thumbnail}
              onClose={() => setActive(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}