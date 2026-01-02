import { Route, Routes } from "react-router-dom";
import { MovieCatalog } from "../pages/MovieCatalog";
import { Watchlists } from "../pages/Watchlists";
import { Login } from "../pages/Login";
import { ViewDetails } from "../pages/ViewDetails";

export function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MovieCatalog />} />
      <Route path="/watchlists" element={<Watchlists />} />
      <Route path="/login" element={<Login />} />
      <Route path="/movie/:id" element={<ViewDetails />} />
    </Routes>
  );
}
