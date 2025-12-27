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
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=3a1ca9b3f541f933ecd4468611a1334e&language=en"
      );
      const json = await response.json();

      const genreMap = new Map<number, string>(
        json.genres.map((genre: Genre) => [genre.id, genre.name])
      );

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
