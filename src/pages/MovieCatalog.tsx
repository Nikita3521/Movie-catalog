import { useEffect, useState } from "react";
import star from "../img/MovieCatalog/v-icon.png";
import logo from "../img/MovieCatalog/IMDBLogo.svg";
import { useGenre } from "../context/GenreContext";
import { log } from "console";

const ContainerStyle = {
  margin: "0 auto",
  maxWidth: "1080px",
  width: "100%",
};

const MovieStyle = {
  color: "white",
  display: "flex",
};

const ListStyle = {
  fontSize: "12px",
  border: "1px solid white",
  padding: "4px 8px",
  borderRadius: "15px",
};

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
  const [data, setData] = useState<Movie[]>([]);
  const genres = useGenre();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/week?api_key=3a1ca9b3f541f933ecd4468611a1334e"
      );
      const json = await response.json();
      setData(json.results);
      // console.log(json.results);
    };
    fetchData();
  }, []);

  return (
    <>
      <main style={{ height: "100%" }}>
        <div className="container" style={ContainerStyle}>
          <div
            className="movies"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              padding: "40px 0",
            }}
          >
            {data.map((item) => (
              <div className="movie" key={item.id} style={MovieStyle}>
                <img
                  style={{ width: "150px", height: "225px" }}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt=""
                />
                <div
                  className="movie-details"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "4.5px 0px 4.5px 24px",
                    gap: "13px",
                  }}
                >
                  <h5 style={{ fontSize: "25px", paddingBottom: "5px" }}>
                    {item.title || item.original_name}
                  </h5>
                  <ul style={{ display: "flex", gap: "8px" }}>
                    {item.genre_ids.map((e) => (
                      <li style={ListStyle} key={`${item.id}-${e}`}>
                        {genres.get(e)}
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{ fontWeight: "600", display: "flex", gap: "5px" }}
                  >
                    <img src={logo} alt="" />
                    {item.vote_average.toFixed(1)} <img src={star} alt="" />
                  </div>
                  <p style={{ opacity: "0.8", lineHeight: "1.5" }}>
                    {item.overview}
                  </p>
                  <div
                    className="movie-buttons"
                    style={{ display: "flex", gap: "13px" }}
                  >
                    <button
                      style={{
                        fontSize: "16px",
                        backgroundColor: "white",
                        borderRadius: "36px",
                        padding: "6px 12px",
                      }}
                    >
                      VIEW DETAILS
                    </button>
                    <button
                      style={{
                        fontSize: "16px",
                        backgroundColor: "#202020",
                        border: "1px solid white",
                        color: "white",
                        borderRadius: "36px",
                        padding: "6px 12px",
                      }}
                    >
                      ADD TO WATCHLISTS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {}
    </>
  );
}
