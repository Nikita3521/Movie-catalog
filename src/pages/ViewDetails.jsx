import styles from "../module/ViewDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import star from "../img/MovieCatalog/v-icon.png";
import logo from "../img/MovieCatalog/IMDBLogo.svg";

export function ViewDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=3a1ca9b3f541f933ecd4468611a1334e&language=en-US`
      );
      const json = await response.json();
      setData(json);
      console.log(json);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className={styles.container}>
        <img
          style={{ height: "400px", width: "275px" }}
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt=""
        />
        <div className={styles.content}>
          <ul style={{ display: "flex", gap: "7px" }}>
            {data?.genres?.map((e) => (
              <li key={e.id} className={styles.genres}>
                {e.name}
              </li>
            ))}
          </ul>
          <h1 style={{ color: "white", fontSize: "34px", fontWeight: "600" }}>
            {data.title}
          </h1>
          <div className={styles.rating}>
            <img src={logo} alt="" />
            {data.vote_average?.toFixed(1)}
            <img src={star} alt="" />
          </div>
          <p className={styles.overview}>{data.overview}</p>
          <div>
            <ul className={styles.company}>
              {data?.production_companies?.map((e) => (
                <li>
                  <img
                    style={{ height: "40px", width: "40px" }}
                    src={`https://image.tmdb.org/t/p/w500${e.logo_path}`}
                    alt=""
                  />
                  {e.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
