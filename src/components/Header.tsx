'use client';

import Image from 'next/image';

const HOT_PINK = '#e99c0e';
const HOT_PINK_GLOW = 'rgba(233, 156, 14, 0.55)';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-10">
        {/* logo */}
        <a href="#" className="flex items-center gap-0">
          <Image
            src="/assets/app-icons/android-icon-foreground.png"
            alt="moodX logo"
            width={64}
            height={64}
            className="h-14 w-14 sm:h-16 sm:w-16"
            priority
          />
          <span
            className="font-display text-xl font-small tracking-tight sm:text-3xl"
            style={{ color: HOT_PINK, textShadow: `0 0 18px ${HOT_PINK_GLOW}` }}
          >
            mood<span className="italic text-paper-dim">X</span>
          </span>
        </a>

        {/* desktop actions */}
        <div className="hidden items-center gap-5 md:flex">
          <span
            className="rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em]"
            style={{ borderColor: HOT_PINK, color: HOT_PINK }}
          >
            Premium
          </span>
        </div>

        {/* mobile actions */}
        <div className="flex items-center gap-4 md:hidden">
          <span
            className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em]"
            style={{ borderColor: HOT_PINK, color: HOT_PINK }}
          >
            Premium
          </span>
        </div>
      </div>
    </header>
  );
}