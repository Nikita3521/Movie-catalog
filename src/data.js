import { log } from "console";
import { useEffect, useState } from "react";

export function data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/week?api_key=3a1ca9b3f541f933ecd4468611a1334e"
      );
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);
  return <div></div>;
}
