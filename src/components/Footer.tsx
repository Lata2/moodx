
 

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-10 sm:py-16">
        <div className="flex flex-col gap-8 sm:gap-10">
          {/* brand block — full width, sits above the link columns */}
          <div>
            <span className="font-display text-xl font-medium tracking-tight text-paper sm:text-2xl">
              mood<span className="italic text-paper-dim">X</span>
            </span>
            <p className="mt-3 max-w-[26ch] font-body text-[12px] leading-relaxed text-paper-faint sm:max-w-[20ch] sm:text-[13px]">
              Streaming, sorted by feeling.
            </p>
          </div>

      
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line/60 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-paper-faint sm:text-[12px]">
            © {new Date().getFullYear()} moodX. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-[11px] text-paper-faint hover:text-paper sm:text-[12px]">
              Privacy
            </a>
            <a href="#" className="font-mono text-[11px] text-paper-faint hover:text-paper sm:text-[12px]">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}