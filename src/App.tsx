import "./App.css";
import { PageRoutes } from "./components/PageRoutes";
import { BrowserRouter } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { GenreMap } from "./context/GenreContext";

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <GenreMap>
        <PageRoutes />
      </GenreMap>
    </BrowserRouter>
  );
}

export default App;
