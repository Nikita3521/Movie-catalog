import { Route, Routes } from "react-router-dom";
import { MovieCatalog } from "../pages/MovieCatalog";
import { Watchlists } from "../pages/Watchlists";
import { Login } from "../pages/Login";

export function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MovieCatalog />} />
      <Route path="/Watchlists" element={<Watchlists />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}
