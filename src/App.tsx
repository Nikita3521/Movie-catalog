import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppHeader } from "./components/AppHeader";
import { MovieCatalog } from "./pages/MovieCatalog";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MovieCatalog />
    </BrowserRouter>
  );
}

export default App;
