import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: movies } = await supabase
    .from("movies")
    .select()
    .order("rating", { ascending: false });

  return (
    <div className="p-12 flex gap-4">
      {movies?.map((movie) => (
        <Link
          href={`/movies/${movie.id}`}
          key={movie.id}
          className="w-60 flex flex-col p-2 rounded-md border border-white/10 bg-white/5"
        >
          <img
            className="w-full aspect-[3/4] rounded"
            src={movie.cover_img_url}
          />
          <div className="p-2 flex flex-col gap-2">
            <span className="text-2xl text-center font-bold">{movie.name}</span>
            <span className="text-center">Rating: {movie.rating}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
