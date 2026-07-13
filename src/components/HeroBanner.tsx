'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { movies, type Movie } from '@/lib/movie';

const GOLD = '#e99c0e';
const GOLD_BRIGHT = '#ffd34d';
const GOLD_GLOW = 'rgba(233, 156, 14, 0.65)';
const GOLD_GLOW_SOFT = 'rgba(233, 156, 14, 0.35)';
const GOLD_DIM = 'rgba(255, 200, 60, 0.16)';

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 7 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 2.5l2.9 6.2 6.7.7-5 4.6 1.4 6.7L12 17.6l-6 3.1 1.4-6.7-5-4.6 6.7-.7L12 2.5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable movie rail                                                */
/*  Cards: bright gradient top edge + brighter top-right corner glow, */
/*  faded left border, glowing colorful shadow underneath.            */
/* ------------------------------------------------------------------ */

function MovieRail({
  railId,
  title,
  accent,
  items,
  onPlay,
}: {
  railId: string;
  title: React.ReactNode;
  accent?: string;
  items: Movie[];
  onPlay: (movie: Movie) => void;
}) {
  return (
    <div className="mt-8">
      <div className="mb-5 flex items-baseline justify-between">
        <h2
          className="font-display text-xl italic text-white"
          style={{ textShadow: `0 0 22px ${GOLD_GLOW}` }}
        >
          {title}
        </h2>
        {accent && (
          <span
            className="hidden font-mono text-[11px] uppercase tracking-wider sm:block"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {accent}
          </span>
        )}
      </div>

      <div
        className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pb-2
                   sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0
                   md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {items.map((movie, idx) => (
          <button
            key={`${railId}-${movie.id}-${idx}`}
            type="button"
            onClick={() => onPlay(movie)}
            className="group relative w-[130px] flex-none overflow-hidden rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 sm:w-auto"
           
            style={{
              background: 'rgba(255,255,255,0.04)',
              boxShadow: `
                inset 0 1.5px 0 ${GOLD_BRIGHT},
                inset -1.5px 0 0 ${GOLD},
                inset 1px 0 0 rgba(255,255,255,0.12),
                0 20px 34px -10px ${GOLD_GLOW}
              `,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                inset 0 2px 0 ${GOLD_BRIGHT},
                inset -2px 0 0 ${GOLD_BRIGHT},
                inset 1px 0 0 rgba(255,255,255,0.25),
                0 26px 46px -8px ${GOLD_GLOW}
              `;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                inset 0 1.5px 0 ${GOLD_BRIGHT},
                inset -1.5px 0 0 ${GOLD},
                inset 1px 0 0 rgba(255,255,255,0.12),
                0 20px 34px -10px ${GOLD_GLOW}
              `;
            }}
          >
            {/* bright glowing accent blob in the top-right corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle, ${GOLD_BRIGHT}, transparent 70%)`,
              }}
            />

        <div className="relative w-full aspect-[2/3]">
              <Image
                src={movie.poster || movie.thumbnail}
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 22vw, 16vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
                }}
              />
              {movie.tag && (
                <span
                  className="absolute left-2.5 top-2.5 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white"
                  style={{
                    backgroundColor: 'rgba(10,4,16,0.6)',
                    border: `1px solid ${GOLD_BRIGHT}`,
                    boxShadow: `0 0 12px -2px ${GOLD_GLOW}`,
                  }}
                >
                  {movie.tag}
                </span>
              )}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'rgba(10,4,16,0.4)' }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD_BRIGHT}, ${GOLD})`,
                    boxShadow: `0 0 30px 6px ${GOLD_GLOW}`,
                  }}
                >
                  <PlayIcon className="h-4 w-4 text-black" />
                </span>
              </div>
            </div>
            <div className="relative p-2.5 sm:p-3.5">
              <p className="font-body text-[12px] font-medium leading-snug text-white sm:text-[13.5px]">
                {movie.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main hero banner                                                   */
/* ------------------------------------------------------------------ */

export default function HeroBanner() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % movies.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const heroMovie = movies[slide];

  // navigate to a dedicated page instead of opening an in-page popup
  const goToWatchPage = (movie: Movie) => {
    router.push(`/watch/${movie.id}`);
  };

  const forYouMovies = [...movies].reverse();
  const watchlistMovies = movies.map(
    (_, i) => movies[(i * 2 + 1) % movies.length],
  );
  const categoryMovies = [...movies].sort((a, b) =>
    (a.tag ?? '').localeCompare(b.tag ?? ''),
  );

  return (
    <section
      className="relative border-b border-line/60"
      style={{ backgroundColor: '#0a0410', contain: 'layout paint style' }}
    >
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.06) translate(0, 0); }
          100% { transform: scale(1.16) translate(-1.5%, -1%); }
        }
        @keyframes glowpulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* mobile: breathing room on the sides, faded white border all
           around, and a brighter golden faded border tracing the top +
           right edge, sitting on a soft golden shadow. Reverts to the
           original full-bleed look from sm and up. */
        .hero-frame {
          margin-left: 0.75rem;
          margin-right: 0.75rem;
          border-radius: 0 0 1.5rem 0;
          overflow: hidden;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.16),
            inset 0 1.5px 0 ${GOLD_BRIGHT},
            inset -1.5px 0 0 ${GOLD_BRIGHT},
            0 -14px 36px -16px ${GOLD_GLOW},
            14px 0 36px -16px ${GOLD_GLOW},
            0 30px 50px -12px rgba(0, 0, 0, 0.55);
        }
        @media (min-width: 640px) {
          .hero-frame {
            margin-left: 0;
            margin-right: 0;
            border-radius: 0;
            overflow: visible;
            box-shadow: none;
          }
        }
      `}</style>

      <div className="hero-frame relative">
        <div className="relative h-[58dvh] min-h-[340px] w-full overflow-hidden sm:h-[62dvh] sm:min-h-[420px] lg:h-[65dvh]">
          <div className="absolute inset-0">
            {movies.map((movie, i) => (
              <div
                key={movie.id}
                className="absolute inset-0 transition-opacity duration-1000 ease-out"
                style={{ opacity: i === slide ? 1 : 0 }}
              >
                <Image
                  src={movie.banner}
                  alt={movie.title}
                  fill
                  sizes="100vw"
                  priority={i === slide}
                  className="object-cover"
                  style={{
                    animation:
                      i === slide ? 'kenburns 9s ease-out forwards' : 'none',
                  }}
                />
              </div>
            ))}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(6,3,10,0.15) 0%, rgba(6,3,10,0.5) 55%, rgba(6,3,10,0.94) 100%)',
              }}
            />
            <div className="absolute bottom-5 right-6 flex gap-1.5 sm:right-10">
              {movies.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show ${movies[i].title}`}
                  onClick={() => setSlide(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === slide ? 26 : 7,
                    background:
                      i === slide
                        ? `linear-gradient(90deg, ${GOLD}, ${GOLD_BRIGHT})`
                        : 'rgba(255,255,255,0.35)',
                    boxShadow:
                      i === slide ? `0 0 14px 3px ${GOLD_GLOW}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* bright ambient glow blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-[-8%] h-[420px] w-[420px] rounded-full blur-[120px]"
            style={{
              backgroundColor: GOLD_DIM,
              animation: 'glowpulse 5s ease-in-out infinite',
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-6%] h-[320px] w-[320px] rounded-full blur-[110px]"
            style={{
              backgroundColor: GOLD_DIM,
              animation: 'glowpulse 6s ease-in-out infinite',
            }}
          />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-10 pt-14 sm:px-10 sm:pb-12 sm:pt-16">
            <div className="flex max-w-2xl flex-col justify-end">
              <div
                className="rounded-3xl border border-white/10 p-4 backdrop-blur-xl shadow-[0_32px_80px_-40px_rgba(0,0,0,0.75)] sm:p-7"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                  boxShadow: `
                    inset 0 1.5px 0 ${GOLD_BRIGHT},
                    inset -1.5px 0 0 ${GOLD},
                    inset 1px 0 0 rgba(255,255,255,0.15),
                    0 30px 60px -20px ${GOLD_GLOW_SOFT}
                  `,
                }}
              >
                <span
                  className="font-mono text-[11px] uppercase tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  Now featuring
                </span>
                <h1
                  className="mt-2 font-display text-2xl text-white sm:text-3xl lg:text-4xl"
                  style={{ textShadow: `0 0 26px ${GOLD_GLOW}` }}
                >
                  {heroMovie.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => goToWatchPage(heroMovie)}
                    className="flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[12px] uppercase tracking-wider text-black transition-transform duration-300 hover:scale-[1.05] sm:px-6 sm:py-3 sm:text-[13px]"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD_BRIGHT}, ${GOLD})`,
                      boxShadow: `0 10px 34px -6px ${GOLD_GLOW}, 0 0 0 1px rgba(255,255,255,0.15)`,
                    }}
                  >
                    <PlayIcon className="h-4 w-4" />
                    Play now
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-wider transition-colors hover:text-white sm:text-[13px]"
                    style={{
                      color: 'rgba(255,255,255,0.8)',
                      textShadow: `0 0 14px ${GOLD_GLOW}`,
                    }}
                  >
                    See how it works
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 px-1 sm:mt-5 sm:gap-5">
                <div className="flex items-center gap-1.5">
                  <StarIcon
                    className="h-3.5 w-3.5"
                    style={{ color: GOLD_BRIGHT }}
                  />
                  <span
                    className="font-mono text-[11px] tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    4.8 average mood match
                  </span>
                </div>
                <div
                  className="hidden h-3 w-px sm:block"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                />
                <span
                  className="font-mono text-[11px] tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {movies.length} titles · new drops weekly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-8xl px-4 py-10 sm:px-10 sm:py-14">
        <MovieRail
          railId="trending"
          title={
            <>
              Trending <span style={{ color: GOLD_BRIGHT }}>now</span>
            </>
          }
          accent={`${movies.length} titles`}
          items={movies}
          onPlay={goToWatchPage}
        />

        <MovieRail
          railId="for-you"
          title={
            <>
              For <span style={{ color: GOLD_BRIGHT }}>you</span>
            </>
          }
          items={forYouMovies}
          onPlay={goToWatchPage}
        />

        <MovieRail
          railId="my-watchlist"
          title={
            <>
              My <span style={{ color: GOLD_BRIGHT }}>watchlist</span>
            </>
          }
          items={watchlistMovies}
          onPlay={goToWatchPage}
        />

        <MovieRail
          railId="category"
          title={
            <>
              Browse by <span style={{ color: GOLD_BRIGHT }}>category</span>
            </>
          }
          items={categoryMovies}
          onPlay={goToWatchPage}
        />
      </div>
    </section>
  );
}