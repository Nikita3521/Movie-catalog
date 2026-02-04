import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../img/AppHeaderImg/Vector.png";
import styles from "../module/AppHeader.module.css";

export const AppHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
  };

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
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`${styles.navList} ${
              menuOpen ? styles.navListOpen : ""
            }`}
          >
            <Link to="/" className={styles.navLink} onClick={closeMenu}>
              AllFilms
            </Link>

            <Link
              to="/watchlists"
              className={styles.navLink}
              onClick={closeMenu}
            >
              Watchlists
            </Link>

            <Link
              to="/login"
              className={styles.loginButton}
              onClick={closeMenu}
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
