import { log } from "console";
import { useEffect, useState } from "react";

type Genre = {
  id: Number;
  name: string;
};

export function GenreContext() {
  const [genres, setGenres] = useState<Map<number, string>>(new Map());
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=3a1ca9b3f541f933ecd4468611a1334e&language=en"
      );
      const json = await response.json();
      const genreMap = new Map<number, string>(
        json.genres.map((genre: Genre) => [genre.id, genre.name])
      );
      setGenres(genreMap);
      console.log(genreMap);
    };
    fetchData();
  }, []);
  return <div></div>;
}
