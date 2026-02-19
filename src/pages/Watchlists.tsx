import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../module/Watchlist.module.css";
import IcoFavorite from "../components/IcoFavorite";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

export function Watchlists() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const loadWatchlist = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/watchlist", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    const ids: number[] = data.watchlist;

    const results = await Promise.all(
      ids.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=3a1ca9b3f541f933ecd4468611a1334e&language=en-US`,
        ).then((r) => r.json()),
      ),
    );

    setMovies(results);
    setLoading(false);
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const removeFromWatchlist = async (movie: Movie) => {
    setRemovingId(movie.id);

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/watchlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: movie.id,
      }),
    });

    setTimeout(() => {
      setMovies((prev) => prev.filter((m) => m.id !== movie.id));
      setRemovingId(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader} />
      </div>
    );
  }
  if (!movies.length)
    return <h2 className={styles.empty}>Your watchlist is empty</h2>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Watchlist</h2>

      <div className={styles.grid}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`${styles.card} ${
              removingId === movie.id ? styles.removing : ""
            }`}
          >
            <div className={styles.posterWrap}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
            </div>

            <div className={styles.info}>
              <h4 className={styles.movieTitle}>{movie.title}</h4>

              <div className={styles.movieButtons}>
                <p>⭐ {movie.vote_average.toFixed(1)}</p>

                <Link to={`/movie/${movie.id}`}>
                  <button className={styles.detailsBtn}>View details</button>
                </Link>

                <div onClick={() => removeFromWatchlist(movie)}>
                  <IcoFavorite isActive />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
