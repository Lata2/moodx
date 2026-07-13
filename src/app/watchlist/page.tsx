"use client";

import Header from "@/components/Header";
import MovieGrid from "@/components/MovieGrid";
import { movies } from "@/lib/movie";
import { useWatchlist } from "@/lib/watchlist";

function BookmarkGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" style={{ color: "rgba(245,243,238,0.35)" }}>
      <path
        d="M6 4.5h12a1 1 0 0 1 1 1V20l-7-4-7 4V5.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WatchlistPage() {
  const { ids, ready } = useWatchlist();
  const saved = movies.filter((m) => ids.includes(m.id));

  return (
    <div className="flex min-h-full flex-col" style={{ backgroundColor: "#0a0410" }}>
      {/* <Header /> */}
      <main className="flex-1">
        <div className="mx-auto max-w-8xl px-4 py-8 sm:px-10 sm:py-12">
          <h1 className="font-display text-2xl italic text-white sm:text-3xl">
            My <span style={{ color: "#ffd34d" }}>list</span>
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-paper-faint">
            Saved on this device — tap the bookmark on any title to add or remove it
          </p>

          <div className="mt-8">
            {!ready ? null : saved.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-line/60 px-6 py-20 text-center">
                <BookmarkGlyph />
                <p className="font-body text-sm text-paper-dim">Your list is empty</p>
                <p className="max-w-xs font-mono text-[11px] uppercase tracking-wider text-paper-faint">
                  Tap the bookmark icon on any movie to save it here
                </p>
              </div>
            ) : (
              <MovieGrid items={saved} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
