import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../img/AppHeaderImg/Vector.png";
import styles from "../module/AppHeader.module.css";
import { useAuth } from "../context/AuthContext";

export const AppHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

  const { isAuth, user } = useAuth();

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <Link to="/" className={styles.logoLink} onClick={closeMenu}>
              <img src={Logo} alt="MovieSPACE" className={styles.logoImage} />
              <span className={styles.logoText}>MovieSPACE</span>
            </Link>
          </div>

          <button
            className={`${styles.burger} ${menuOpen ? styles.active : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="mobile-navigation"
            className={`${styles.navList} ${
              menuOpen ? styles.navListOpen : ""
            }`}
          >
            <Link to="/" className={styles.navLink} onClick={closeMenu}>
              All Movies
            </Link>

            <Link
              to="/watchlists"
              className={styles.navLink}
              onClick={closeMenu}
            >
              Watchlists
            </Link>
            {!isAuth ? (
              <>
                <Link
                  to="/login"
                  className={styles.loginButton}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <div className={styles.userAvatar} title={user?.email}>
                  {user?.email}
                </div>
                <div className={styles.navLink} onClick={logout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M9 12h12l-3 -3" />
                    <path d="M18 15l3 -3" />
                  </svg>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
