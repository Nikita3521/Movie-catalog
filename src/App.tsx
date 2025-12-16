import "./App.css";
import { PageRoutes } from "./components/PageRoutes";
import { BrowserRouter } from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { GenreContext } from "./context/GenreContext";

function App() {
  return (
    <BrowserRouter>
      <>
        <AppHeader />
        <GenreContext />
        <PageRoutes />
      </>
    </BrowserRouter>
  );
}

export default App;
