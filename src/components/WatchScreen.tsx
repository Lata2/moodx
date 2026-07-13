'use client';

import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import type { Movie } from '@/lib/movie';

const GOLD_BRIGHT = '#ffd34d';
const GOLD_GLOW = 'rgba(233, 156, 14, 0.65)';
const GOLD_GLOW_SOFT = 'rgba(233, 156, 14, 0.35)';

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M19 12H5M11 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WatchScreen({ movie }: { movie: Movie }) {
  return (
    <section className="min-h-screen" style={{ backgroundColor: '#0a0410' }}>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          <ArrowIcon className="h-4 w-4" />
          Back
        </Link>

        {/* video frame */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            border: `1px solid ${GOLD_BRIGHT}`,
            boxShadow: `0 30px 80px -28px ${GOLD_GLOW}, 0 8px 30px -8px rgba(0,0,0,0.6)`,
          }}
        >
          <div className="relative h-[220px] w-full bg-black sm:h-[420px] lg:h-[640px]">
            <VideoPlayer src={movie.hlsUrl} poster={movie.banner} />
          </div>
        </div>

        {/* details panel */}
        <div
          className="mt-5 rounded-2xl border p-4 sm:p-6"
          style={{
            borderColor: 'rgba(255,255,255,0.06)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
            boxShadow: `0 20px 60px -30px ${GOLD_GLOW_SOFT}`,
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h1
                className="font-display text-xl text-white sm:text-2xl"
                style={{
                  textShadow: `0 0 18px ${GOLD_GLOW}, 0 0 4px ${GOLD_BRIGHT}`,
                }}
              >
                {movie.title}
              </h1>
              {movie.releaseYear && (
                <span
                  className="font-mono text-sm"
                  style={{ color: GOLD_BRIGHT, textShadow: `0 0 12px ${GOLD_GLOW}` }}
                >
                  ({movie.releaseYear})
                </span>
              )}
            </div>

            {movie.tag && (
              <span
                className="w-fit rounded-full px-3 py-1 font-mono text-[12px] uppercase tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                {movie.tag}
              </span>
            )}

            {movie.description && (
              <div
                className="mt-1 rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-sm leading-relaxed text-white/80">
                  {movie.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}