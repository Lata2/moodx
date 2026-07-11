"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import { movies, type Movie } from "@/lib/movie";
import { useWatchlist } from "@/lib/watchlist";

const GOLD = "#e99c0e";
const GOLD_BRIGHT = "#ffd34d";
const GOLD_GLOW = "rgba(233, 156, 14, 0.65)";
const GOLD_GLOW_SOFT = "rgba(233, 156, 14, 0.35)";

function BackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
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

function StarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 2.5l2.9 6.2 6.7.7-5 4.6 1.4 6.7L12 17.6l-6 3.1 1.4-6.7-5-4.6 6.7-.7L12 2.5Z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 7 5.5Z" fill="currentColor" />
    </svg>
  );
}

export default function WatchScreen({ movie }: { movie: Movie }) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(movie.id);

  const moreLikeThis = movies.filter((m) => m.id !== movie.id && m.tag === movie.tag);
  const related = moreLikeThis.length > 0 ? moreLikeThis : movies.filter((m) => m.id !== movie.id);

  return (
    <div className="flex min-h-full flex-col" style={{ backgroundColor: "#0a0410" }}>
      <Header />

      <main className="flex-1 pb-16 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-10 sm:pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-paper-faint transition-colors hover:text-paper"
          >
            <BackIcon className="h-3.5 w-3.5" />
            Back to browse
          </Link>

          {/* video — golden border + glowing shadow */}
          <div
            className="relative mt-5 overflow-hidden rounded-2xl bg-black sm:mt-7"
            style={{
              border: `1px solid ${GOLD}`,
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.06),
                inset 0 1.5px 0 ${GOLD_BRIGHT},
                0 25px 70px -18px ${GOLD_GLOW},
                0 0 60px -12px ${GOLD_GLOW_SOFT}
              `,
            }}
          >
            <div className="aspect-video w-full">
              <VideoPlayer src={movie.hlsUrl} poster={movie.banner} />
            </div>
          </div>

          {/* details */}
          <div
            className="relative mt-6 rounded-2xl p-5 sm:mt-8 sm:p-8"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
              border: `1px solid rgba(233, 156, 14, 0.4)`,
              boxShadow: `
                inset 0 1.5px 0 ${GOLD_BRIGHT},
                0 20px 50px -22px ${GOLD_GLOW}
              `,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1
                  className="font-display text-2xl text-white sm:text-3xl lg:text-4xl"
                  style={{ textShadow: `0 0 26px ${GOLD_GLOW}` }}
                >
                  {movie.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                  {movie.releaseYear && (
                    <span className="font-mono text-[12px] tracking-wide" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {movie.releaseYear}
                    </span>
                  )}
                  {movie.tag && (
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white"
                      style={{
                        backgroundColor: "rgba(10,4,16,0.6)",
                        border: `1px solid ${GOLD_BRIGHT}`,
                        boxShadow: `0 0 12px -2px ${GOLD_GLOW}`,
                      }}
                    >
                      {movie.tag}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5">
                    <StarIcon className="h-3.5 w-3.5" style={{ color: GOLD_BRIGHT }} />
                    <span className="font-mono text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                      4.8 mood match
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggle(movie.id)}
                aria-label={saved ? "Remove from My List" : "Add to My List"}
                className="flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-transform hover:scale-[1.03]"
                style={{
                  border: `1px solid ${saved ? GOLD_BRIGHT : "rgba(255,255,255,0.3)"}`,
                  color: saved ? GOLD_BRIGHT : "rgba(255,255,255,0.85)",
                  boxShadow: saved ? `0 0 16px -4px ${GOLD_GLOW}` : "none",
                }}
              >
                <BookmarkIcon filled={saved} className="h-4 w-4" />
                {saved ? "Saved" : "Add to list"}
              </button>
            </div>

            {movie.description && (
              <p
                className="mt-5 max-w-3xl font-body text-[14px] leading-relaxed sm:text-[15px]"
                style={{ color: "rgba(245,243,238,0.78)" }}
              >
                {movie.description}
              </p>
            )}
          </div>

          {/* more like this */}
          {related.length > 0 && (
            <div className="mt-10 pb-10 sm:mt-12 sm:pb-16">
              <h2
                className="font-display text-xl italic text-white"
                style={{ textShadow: `0 0 22px ${GOLD_GLOW}` }}
              >
                More like <span style={{ color: GOLD_BRIGHT }}>this</span>
              </h2>

              <div className="no-scrollbar mt-5 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-5">
                {related.slice(0, 5).map((m) => (
                  <Link
                    key={m.id}
                    href={`/watch/${m.id}`}
                    className="group relative w-[130px] flex-none overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 sm:w-auto"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      boxShadow: `
                        inset 0 1.5px 0 ${GOLD_BRIGHT},
                        inset -1.5px 0 0 ${GOLD},
                        0 20px 34px -10px ${GOLD_GLOW}
                      `,
                    }}
                  >
                    <div className="relative h-[180px] w-full sm:h-[200px]">
                      <Image
                        src={m.poster || m.thumbnail}
                        alt={m.title}
                        fill
                        sizes="(max-width: 640px) 130px, 20vw"
                        className="object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)" }}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: "rgba(10,4,16,0.4)" }}
                      >
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${GOLD_BRIGHT}, ${GOLD})`,
                            boxShadow: `0 0 26px 5px ${GOLD_GLOW}`,
                          }}
                        >
                          <PlayIcon className="h-4 w-4 text-black" />
                        </span>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="font-body text-[12.5px] font-medium leading-snug text-white">{m.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}