import { createContext, useContext, useEffect, useState } from "react";

type Genre = {
  id: number;
  name: string;
};

const GenreContext = createContext<Map<number, string>>(new Map());

export function GenreMap({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Map<number, string>>(new Map());
  useEffect(() => {
    const fetchData = async () => {
      const responseMovie = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=3a1ca9b3f541f933ecd4468611a1334e&language=en"
      );
      const jsonMovie = await responseMovie.json();
      const movie = jsonMovie.genres;
      //That send together
      const responseTv = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=3a1ca9b3f541f933ecd4468611a1334e&language=en"
      );
      const jsonTv = await responseTv.json();
      const tv = jsonTv.genres;

      const json = movie.concat(tv);

      const genreMap = new Map<number, string>(
        json.map((genre: Genre) => [genre.id, genre.name])
      );
      // console.log(genreMap);

      setGenres(genreMap);
    };
    fetchData();
  }, []);
  return (
    <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
  );
}

export { GenreContext };

export const useGenre = () => {
  return useContext(GenreContext);
};
