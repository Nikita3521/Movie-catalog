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
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        }}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          <img
            style={{
              maxHeight: "600px",
              maxWidth: "400px",
              borderRadius: "15px",
            }}
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt=""
          />
          <div className={styles.description}>
            <h1
              style={{
                display: "flex",
                color: "white",
                fontSize: "34px",
                fontWeight: "600",
                gap: "15px",
                alignItems: "center",
              }}
            >
              {data.title}
              <div className={styles.rating}>
                <img src={logo} alt="" />
                {data.vote_average?.toFixed(1)}
                <img src={star} alt="" />
              </div>
            </h1>
            {data.overview && (
              <p className={styles.overview}>{data.overview}</p>
            )}

            {data.genres?.length > 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1.5",
                }}
              >
                <h5 style={{ fontSize: "14px" }}>Genres:</h5>
                <p style={{ fontSize: "16px" }}>
                  {data?.genres?.map((g) => g.name).join(", ")}.
                </p>
              </div>
            )}

            {data.runtime != 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1.5",
                }}
              >
                <h5 style={{ fontSize: "14px" }}>Run time</h5>
                <p style={{ fontSize: "16px" }}>{data.runtime} min</p>
              </div>
            )}

            {data.release_date && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: "1.5",
                }}
              >
                <h5 style={{ fontSize: "14px" }}>Release Date</h5>
                <p style={{ fontSize: "16px" }}>{data.release_date}</p>
              </div>
            )}

            {data.homepage && (
              <a
                href={data.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.homeBtn}
              >
                Home page
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
