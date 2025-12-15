import { Route, Routes, BrowserRouter } from "react-router-dom";
import { MovieCatalog } from "../pages/MovieCatalog";
import { AllFilms } from "../pages/AllFilms";
import { Watchlists } from "../pages/Watchlists";
import { Login } from "../pages/Login";

export function PageRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" element={<MovieCatalog />} />
      <Route path="/AllFilms" element={<AllFilms />} />
      <Route path="/Watchlists" element={<Watchlists />} />
      <Route path="/Login" element={<Login />} />
    </BrowserRouter>
  );
}
