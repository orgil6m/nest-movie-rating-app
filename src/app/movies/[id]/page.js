import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import MovieForm from "./form";

const MovieIdPage = async ({ params }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: movie } = await supabase
    .from("movies")
    .select(`*`)
    .eq("id", id)
    .single();

  console.log(movie);
  return (
    <div className="p-12">
      <MovieForm movie={movie} />
    </div>
  );
};

export default MovieIdPage;
