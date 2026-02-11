import { useEffect, useState, useRef } from "react";
import star from "../img/MovieCatalog/v-icon.png";
import logo from "../img/MovieCatalog/IMDBLogo.svg";
import { useGenre } from "../context/GenreContext";
import styles from "../module/MovieCatalog.module.css";
import { Link } from "react-router-dom";

type Movie = {
  backdrop_path: string;
  genre_ids: [];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  original_name: string;
};

export function MovieCatalog() {
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | "">("");
  const isSearching = query.trim() !== "";
  const genres = useGenre();
  const [sort, setSort] = useState({
    field: "popularity",
    direction: "desc",
  });

  const toggleSort = (field: string) => {
    const newDirection =
      sort.field === field && sort.direction === "desc" ? "asc" : "desc";
    const updated = { field, direction: newDirection };
    setSort(updated);
  };

  const genreParam =
    selectedGenre !== "" ? `&with_genres=${selectedGenre}` : "";

  const fetchData = async (
    field = sort.field,
    dir = sort.direction,
    genresList = selectedGenre,
    search = query,
  ) => {
    try {
      setLoading(true);

      let url = "";

      if (search.trim().length > 0) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=3a1ca9b3f541f933ecd4468611a1334e&query=${encodeURIComponent(
          search,
        )}&page=${page}&sort_by=${field}.${dir}&vote_count.gte=50&include_adult=false`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=3a1ca9b3f541f933ecd4468611a1334e&page=${page}&sort_by=${field}.${dir}&vote_count.gte=50&include_adult=false${
          selectedGenre !== "" ? `&with_genres=${selectedGenre}` : ""
        }`;
      }

      const response = await fetch(url);
      const json = await response.json();

      setData(json.results ?? []);
      setTotal(json.total_results ?? 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      fetchData();
    }, 800);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query, selectedGenre, sort, page]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.movies}>
        <h2 className={styles.title}>All Movies ({total})</h2>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => {
            setPage(1);
            setQuery(e.target.value);
          }}
        />
        <div className={styles.sortButtons}>
          <select
            disabled={isSearching}
            className={styles.sortSelect}
            value={selectedGenre}
            onChange={(e) => {
              const v = e.target.value;
              setPage(1);
              setSelectedGenre(v === "" ? "" : Number(v));
            }}
          >
            <option value="">All genres</option>

            {Array.from(genres.entries()).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <button
            disabled={isSearching}
            className={styles.sortBtn}
            onClick={() => toggleSort("popularity")}
          >
            Popularity{" "}
            {sort.field === "popularity"
              ? sort.direction === "desc"
                ? "↓"
                : "↑"
              : ""}
          </button>

          <button
            disabled={isSearching}
            className={styles.sortBtn}
            onClick={() => toggleSort("vote_average")}
          >
            Rating{" "}
            {sort.field === "vote_average"
              ? sort.direction === "desc"
                ? "↓"
                : "↑"
              : ""}
          </button>

          <button
            disabled={isSearching}
            className={styles.sortBtn}
            onClick={() => toggleSort("release_date")}
          >
            Release Date{" "}
            {sort.field === "release_date"
              ? sort.direction === "desc"
                ? "↓"
                : "↑"
              : ""}
          </button>
        </div>

        {data.map((item) => (
          <div className={styles.movie} key={item.id}>
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="no photo "
            />

            <div className={styles.movieDetails}>
              <h5 className={styles.movieName}>
                {item.title || item.original_name}
              </h5>
              <ul className={styles.genreList}>
                {(item.genre_ids ?? []).map((e) => (
                  <li className={styles.genreItem} key={`${item.id}-${e}`}>
                    {genres.get(e)}
                  </li>
                ))}
              </ul>

              <div className={styles.rating}>
                <img src={logo} alt="" className={styles.star} />
                {item.vote_average > 1
                  ? item.vote_average.toFixed(1)
                  : item.vote_average}
                <img src={star} alt="" />
              </div>

              <p className={styles.overview}>{item.overview}</p>

              <div className={styles.movieButtons}>
                <Link to={`/movie/${item.id}`}>
                  <button className={styles.btnWhite}>VIEW DETAILS</button>
                </Link>
                <button className={styles.btnDark}>ADD TO WATCHLISTS</button>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.pagination}>
          <button
            className={`${styles.pageButton} ${styles.pageButtonOne}`}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span className={styles.pageNumber}>Page {page}</span>

          <button
            className={styles.pageButton}
            disabled={page === 500}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
