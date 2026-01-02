import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1 style={{ color: "white", fontSize: "24px" }}>{data.title}</h1>
      <img
        style={{ height: "300px", weight: "300px" }}
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt=""
      />
    </div>
  );
}
