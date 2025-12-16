import { Link, Route, Routes } from "react-router-dom";
import Logo from "../img/AppHeaderImg/Vector.png";

export function AppHeader() {
  const ContainerStyle = {
    margin: "0 auto",
    maxWidth: "1080px",
    width: "100%",
  };
  const HeaderStyle = {
    backgroundColor: "#202020",
    height: "68px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderBottom: "3px solid orange",
  };
  const ContentStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const ListStyle = {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  };
  const LoginStyle = {
    color: "black",
    fontSize: "14px",
    fontWeight: "600",
    backgroundColor: "orange",
    padding: "10px 14px",
    borderRadius: "15px",
  };
  const GeneralNameStyle = {
    fontSize: "14px",
    color: "orange",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  return (
    <>
      <div className="header" style={HeaderStyle}>
        <div className="container" style={ContainerStyle}>
          <div className="content" style={ContentStyle}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link style={GeneralNameStyle} to="/">
                <img
                  src={Logo}
                  alt="MovieSPACE"
                  style={{ height: "24px", width: "24px" }}
                />
                MovieSPACE
              </Link>
            </div>
            <div className="list-routes" style={ListStyle}>
              <Link
                to="/"
                style={{ color: "white", fontSize: "14px", fontWeight: "600" }}
              >
                AllFilms
              </Link>

              <Link
                to="/Watchlists"
                style={{ color: "white", fontSize: "14px", fontWeight: "600" }}
              >
                Watchlists
              </Link>

              <Link to="/Login" style={LoginStyle}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
