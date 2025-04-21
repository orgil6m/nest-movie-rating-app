"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MovieForm = ({ movie }) => {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState(movie.name);
  const [rating, setRating] = useState(movie.rating);
  const [director, setDirector] = useState(movie.director);
  const [imgUrl, setImgUrl] = useState(movie.cover_img_url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await supabase
        .from("movies")
        .update({ name, rating, director, cover_img_url: imgUrl })
        .eq("id", movie.id);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="p-4 flex flex-col gap-4 bg-white/5 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Edit : {movie.name}</h1>
      <div>
        <img src={movie.cover_img_url} className="w-40 aspect-[3/4]" />
      </div>
      <div className="flex flex-col gap-1">
        <label>Movie name</label>
        <input
          className="border p-2 border-white/10 bg-white/5 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Movie rating</label>
        <input
          className="border p-2 border-white/10 bg-white/5 rounded"
          value={rating}
          type="number"
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Director name</label>
        <input
          className="border p-2 border-white/10 bg-white/5 rounded"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Cover image url</label>
        <input
          className="border p-2 border-white/10 bg-white/5 rounded"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <button className="w-full p-2 bg-red-500" type="submit">
        Submit
      </button>
    </form>
  );
};

export default MovieForm;
