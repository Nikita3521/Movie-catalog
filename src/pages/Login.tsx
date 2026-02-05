import { FormEvent } from "react";
import { Link } from "react-router-dom";
import styles from "../module/Login.module.css";
import Logo from "../img/AppHeaderImg/Vector.png";

export function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_section}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <img
            src={Logo}
            alt="MovieSPACE logo"
            style={{ width: "24px", height: "24px" }}
          />
          <h3
            style={{
              color: "orange",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "1.25px",
            }}
          >
            MovieSPACE
          </h3>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "35px",
            alignItems: "center",
          }}
        >
          <input
            className={styles.input_auth}
            placeholder="Email or username"
            type="text"
            required
          />

          <input
            className={styles.input_auth}
            placeholder="Password"
            type="password"
            required
          />

          <button className={styles.button_submit} type="submit">
            Login
          </button>

          <p style={{ color: "orange" }}>
            NEW USER?{" "}
            <Link
              to="/Register"
              style={{
                color: "orange",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              REGISTER HERE
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
