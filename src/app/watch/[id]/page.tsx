import { notFound } from "next/navigation";
import { movies } from "@/lib/movie";
import WatchScreen from "@/components/WatchScreen";

export async function generateStaticParams() {
  return movies.map((m) => ({ id: m.id }));
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = movies.find((m) => m.id === id);

  if (!movie) notFound();

  return <WatchScreen movie={movie} />;
}