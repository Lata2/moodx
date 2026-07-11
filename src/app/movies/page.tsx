import Header from "@/components/Header";
import MovieGrid from "@/components/MovieGrid";

export default function MoviesPage() {
  return (
    <div className="flex min-h-full flex-col" style={{ backgroundColor: "#0a0410" }}>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-8xl px-4 py-8 sm:px-10 sm:py-12">
          <h1 className="font-display text-2xl italic text-white sm:text-3xl">
            All <span style={{ color: "#ffd34d" }}>movies</span>
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-paper-faint">
            Browse the full moodX library
          </p>
          <div className="mt-8">
            <MovieGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
