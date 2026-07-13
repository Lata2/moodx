'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type CSSProperties, type SVGProps } from 'react';
import { useWatchlist } from '@/lib/watchlist';

const GOLD = '#e99c0e';
const GOLD_BRIGHT = '#ffd34d';
const GOLD_GLOW = 'rgba(233, 156, 14, 0.55)';
const IDLE = 'rgba(245, 243, 238, 0.5)';

type IconProps = SVGProps<SVGSVGElement> & { style?: CSSProperties };

function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 11.5 12 4l8 7.5M6 9.5V20h5v-5.5h2V20h5V9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M20 20l-4.3-4.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoviesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 5v14M16 5v14M3.5 9.5h4M16.5 9.5h4M3.5 14.5h4M16.5 14.5h4"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function ListIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 4.5h9.5a1 1 0 0 1 1 1V20l-5.75-3.3L5 20V5.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/', Icon: HomeIcon },
  { key: 'search', label: 'Search', href: '/search', Icon: SearchIcon },
  { key: 'movies', label: 'Movies', href: '/movies', Icon: MoviesIcon },
  { key: 'list', label: 'My List', href: '/watchlist', Icon: ListIcon },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const { ids } = useWatchlist();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(10, 9, 18, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 -12px 30px -16px rgba(0,0,0,0.5)',
        padding: '0.35rem 0 0.75rem',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.75rem)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const color = active ? GOLD_BRIGHT : IDLE;

          return (
            <Link
              key={item.key}
              href={item.href}
              className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-3 select-none"
              style={{
                transition: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {active && (
                <span
                  className="absolute inset-x-1 top-1 mx-auto h-10 w-10 rounded-full bg-white/10"
                  style={{ boxShadow: `0 0 24px 2px ${GOLD_GLOW}`, transition: 'none' }}
                />
              )}
              {active && (
                <span
                  className="absolute top-0 left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_BRIGHT})`,
                    boxShadow: `0 0 10px 1px ${GOLD_GLOW}`,
                    transition: 'none',
                  }}
                />
              )}
              <span className="relative" style={{ transition: 'none' }}>
                <item.Icon className="h-5 w-5" style={{ color, transition: 'none' }} />
                {item.key === 'list' && ids.length > 0 && (
                  <span
                    className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full font-mono text-[8px] font-medium text-black"
                    style={{ background: GOLD_BRIGHT, transition: 'none' }}
                  >
                    {ids.length > 9 ? '9+' : ids.length}
                  </span>
                )}
              </span>
              <span
                className="mt-1 font-mono text-[10px] uppercase tracking-wider"
                style={{ color, transition: 'none' }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}