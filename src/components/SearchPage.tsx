'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { movies, type Movie } from '@/lib/movie';

const GOLD = '#e99c0e';
const GOLD_BRIGHT = '#ffd34d';
const GOLD_GLOW = 'rgba(233, 156, 14, 0.55)';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.tag ?? '').toLowerCase().includes(q),
    );
  }, [query]);

  const goToWatchPage = (movie: Movie) => {
    router.push(`/watch/${movie.id}`);
  };

  return (
    <section className="min-h-screen pb-24" style={{ backgroundColor: '#0a0410' }}>
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-10 sm:pt-10">
        <h1
          className="font-display text-2xl text-white sm:text-3xl"
          style={{ textShadow: `0 0 22px ${GOLD_GLOW}` }}
        >
          Search
        </h1>

        {/* search input */}
        <div
          className="mt-5 flex items-center gap-3 rounded-2xl border px-4 py-3"
          style={{
            borderColor: 'rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <SearchIcon className="h-5 w-5 flex-none"  />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, moods, categories…"
            className="w-full bg-transparent font-body text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <ClearIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* results */}
        <div className="mt-8">
          {query.trim() === '' && (
            <p
              className="font-mono text-[12px] uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Start typing to search {movies.length} titles
            </p>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div className="mt-10 flex flex-col items-center gap-2 text-center">
              <p className="font-body text-sm text-white/70">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                Try a different title or mood
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
              {results.map((movie) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => goToWatchPage(movie)}
                  className="group relative overflow-hidden rounded-2xl text-left transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    boxShadow: `
                      inset 0 1.5px 0 ${GOLD_BRIGHT},
                      inset -1.5px 0 0 ${GOLD},
                      0 16px 30px -12px ${GOLD_GLOW}
                    `,
                  }}
                >
                  <div className="relative w-full aspect-[2/3]">
                    <Image
                      src={movie.poster || movie.thumbnail}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 16vw"
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
                        className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white"
                        style={{
                          backgroundColor: 'rgba(10,4,16,0.6)',
                          border: `1px solid ${GOLD_BRIGHT}`,
                        }}
                      >
                        {movie.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-2 sm:p-2.5">
                    <p className="font-body text-[11px] font-medium leading-snug text-white sm:text-[12.5px]">
                      {movie.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}